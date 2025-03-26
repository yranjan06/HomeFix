from flask import request, jsonify, render_template, current_app
from flask_security import auth_required, verify_password, hash_password, current_user
from backend.models import db, User, Service, Professional, ServicePackage, ServiceRequest, Review
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
import os
from datetime import datetime


def register_routes(app):
    @app.get('/')
    def home():
        return render_template('index.html')

    @app.get('/protected')
    @auth_required()
    def protected():
        return '<h1>Protected - Only for logged-in users</h1>'

    @app.route('/login', methods=['POST'])
    def login():
        datastore = app.security.datastore
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        user = datastore.find_user(email=email)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        if verify_password(password, user.password):
            # Get user role name
            role = user.roles[0].name if user.roles else None
            
            # Include additional user info in response
            user_info = {
                'token': user.get_auth_token(),
                'email': user.email,
                'username': user.username,
                'role': role,
                'id': user.id,
                'full_name': user.full_name
            }
            
            # Add role-specific fields
            if role == 'service_provider':
                prof = Professional.query.filter_by(user_id=user.id).first()
                if prof:
                    user_info.update({
                        'service_id': prof.service_id,
                        'service_name': prof.service.name if prof.service else None,
                        'years_of_experience': prof.experience_years,
                        'base_price': prof.base_price,
                        'rating': prof.rating
                    })
            
            return jsonify(user_info), 200

        return jsonify({'message': 'Invalid password'}), 401

    @app.route('/register/customer', methods=['POST'])
    def register_customer():
        """Register a new customer user"""
        datastore = app.security.datastore
        data = request.get_json()
        
        # Extract customer data
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')
        full_name = data.get('full_name')
        address = data.get('address')
        pincode = data.get('pincode')
        phone_number = data.get('phone_number')

        # Validate required fields
        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        # Check if user already exists
        user = datastore.find_user(email=email)
        if user:
            return jsonify({'message': 'User already exists'}), 409

        try:
            # Create new customer user
            user = datastore.create_user(
                email=email,
                password=hash_password(password),
                username=username,
                full_name=full_name,
                address=address,
                pincode=pincode,
                phone_number=phone_number
            )
            datastore.add_role_to_user(user, 'customer')
            db.session.commit()
            
            return jsonify({
                'message': 'Customer registered successfully',
                'user_id': user.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': f'Error creating user: {str(e)}'}), 500

    @app.route('/register/provider', methods=['POST'])
    def register_provider():
        """Register a new service provider user"""
        datastore = app.security.datastore
        
        # Check content type and handle accordingly
        if request.content_type and 'multipart/form-data' in request.content_type:
            # Handle form data from multipart request
            email = request.form.get('email')
            password = request.form.get('password')
            username = request.form.get('username')
            full_name = request.form.get('full_name')
            address = request.form.get('address')
            pincode = request.form.get('pincode')
            phone_number = request.form.get('phone_number')
            service_id = request.form.get('service_id')
            experience_years = request.form.get('experience_years')
            base_price = request.form.get('base_price')
            document_proof = request.form.get('document_proof')
            
            # Handle file upload
            if 'document_file' in request.files:
                file = request.files['document_file']
                if file and file.filename:
                    # Import secure_filename if not already imported
                    from werkzeug.utils import secure_filename
                    import os
                    
                    # Make sure you have UPLOAD_FOLDER defined in your app config
                    if not hasattr(current_app.config, 'UPLOAD_FOLDER'):
                        current_app.config['UPLOAD_FOLDER'] = 'uploads'
                        os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)
                    
                    # Save the file to a secure location
                    filename = secure_filename(file.filename)
                    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                    file.save(file_path)
                    # Set document_proof to the file path
                    document_proof = file_path
        else:
            # Handle JSON data
            data = request.get_json()
            if not data:
                return jsonify({'message': 'Invalid request data'}), 400
            
            email = data.get('email')
            password = data.get('password')
            username = data.get('username')
            full_name = data.get('full_name')
            address = data.get('address')
            pincode = data.get('pincode')
            phone_number = data.get('phone_number')
            service_id = data.get('service_id')
            experience_years = data.get('experience_years')
            base_price = data.get('base_price')
            document_proof = data.get('document_proof')

        # Validate required fields
        if not email or not password or not service_id:
            return jsonify({'message': 'Email, password, and service ID are required'}), 400

        # Check if user already exists
        user = datastore.find_user(email=email)
        if user:
            return jsonify({'message': 'User already exists'}), 409

        try:
            # Create new service provider user
            user = datastore.create_user(
                email=email,
                password=hash_password(password),
                username=username,
                full_name=full_name,
                address=address,
                pincode=pincode,
                phone_number=phone_number
            )
            datastore.add_role_to_user(user, 'service_provider')
            db.session.commit()
            
            # Create professional profile
            professional = Professional(
                user_id=user.id,
                service_id=service_id,
                experience_years=experience_years,
                base_price=float(base_price) if base_price else 0.0,  # Handle possible string from form
                document_proof=document_proof,
                rating=0.0
            )
            db.session.add(professional)
            db.session.commit()
            
            return jsonify({
                'message': 'Service provider registered successfully',
                'user_id': user.id,
                'professional_id': professional.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': f'Error creating user: {str(e)}'}), 500

    # Add these new routes for services
    
    @app.route('/services', methods=['GET'])
    def get_all_services():
        """Get all available services"""
        services = Service.query.all()
        return jsonify([{
            'id': service.id,
            'name': service.name,
            'base_price': service.base_price,
            'description': service.description,
            'category': service.category
        } for service in services]), 200
    
    @app.route('/service-packages', methods=['GET'])
    def get_service_packages():
        """Get all service packages, can filter by service_id"""
        service_id = request.args.get('service_id')
        
        if service_id:
            packages = ServicePackage.query.filter_by(service_id=service_id).all()
        else:
            packages = ServicePackage.query.all()
            
        return jsonify([{
            'id': package.id,
            'name': package.name,
            'description': package.description,
            'price': package.price,
            'duration': package.duration,
            'service_id': package.service_id,
            'service_name': package.service.name,
            'professional_id': package.professional_id,
            'professional_name': package.professional.user.full_name if package.professional and package.professional.user else None
        } for package in packages]), 200
    
    # @app.route('/request-service', methods=['POST'])
    # @auth_required()
    # def request_service():
    #     """Create a new service request"""
    #     data = request.get_json()
    #     package_id = data.get('package_id')
        
    #     if not package_id:
    #         return jsonify({'message': 'Package ID is required'}), 400
            
    #     package = ServicePackage.query.get(package_id)
    #     if not package:
    #         return jsonify({'message': 'Service package not found'}), 404
            
    #     try:
    #         service_request = ServiceRequest(
    #             customer_id=current_user.id,
    #             package_id=package_id,
    #             professional_id=package.professional_id,
    #             status='requested'
    #         )
    #         db.session.add(service_request)
    #         db.session.commit()
            
    #         return jsonify({
    #             'message': 'Service requested successfully',
    #             'request_id': service_request.id
    #         }), 201
            
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({'message': f'Error creating service request: {str(e)}'}), 500



    @app.route('/request-service', methods=['POST'])
    @auth_required()
    def request_service():
        data = request.get_json()
        package_id = data.get('package_id')
        date = data.get('date')
        time = data.get('time')
        phone = data.get('phone')
        
        if not all([package_id, date, time, phone]):
            return jsonify({'message': 'All fields are required'}), 400
            
        package = ServicePackage.query.get(package_id)
        if not package:
            return jsonify({'message': 'Service package not found'}), 404
            
        try:
            service_request = ServiceRequest(
                customer_id=current_user.id,
                package_id=package_id,
                professional_id=package.professional_id,
                status='requested',
                date_of_request=datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
            )
            db.session.add(service_request)
            db.session.commit()
            
            return jsonify({
                'message': 'Service requested successfully',
                'request_id': service_request.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': f'Error creating service request: {str(e)}'}), 500

    
    @app.route('/my-requests', methods=['GET'])
    @auth_required()
    def my_requests():
        """Get all service requests for the current user"""
        role = current_user.roles[0].name if current_user.roles else None
        
        if role == 'customer':
            requests = ServiceRequest.query.filter_by(customer_id=current_user.id).all()
        elif role == 'service_provider':
            professional = Professional.query.filter_by(user_id=current_user.id).first()
            if not professional:
                return jsonify({'message': 'Professional profile not found'}), 404
                
            requests = ServiceRequest.query.filter_by(professional_id=professional.id).all()
        else:
            return jsonify({'message': 'Unauthorized'}), 403
            
        return jsonify([{
            'id': req.id,
            'package_name': req.package.name,
            'service_name': req.package.service.name,
            'price': req.package.price,
            'status': req.status,
            'date_of_request': req.date_of_request.strftime('%Y-%m-%d %H:%M:%S'),
            'date_of_completion': req.date_of_completion.strftime('%Y-%m-%d %H:%M:%S') if req.date_of_completion else None,
            'remarks': req.remarks,
            'professional_name': req.professional.user.full_name if req.professional and req.professional.user else None
        } for req in requests]), 200

    
    @app.route('/update-request/<int:request_id>', methods=['PUT'])
    @auth_required()
    def update_request(request_id):
        """Update a service request (status, remarks, etc.)"""
        data = request.get_json()
        status = data.get('status')
        remarks = data.get('remarks')
        
        service_request = ServiceRequest.query.get(request_id)
        if not service_request:
            return jsonify({'message': 'Service request not found'}), 404
            
        role = current_user.roles[0].name if current_user.roles else None
        professional = Professional.query.filter_by(user_id=current_user.id).first() if role == 'service_provider' else None
        
        if (role == 'customer' and service_request.customer_id != current_user.id) or \
           (role == 'service_provider' and service_request.professional_id != professional.id):
            return jsonify({'message': 'Unauthorized'}), 403
            
        try:
            if status:
                service_request.status = status
                
            if remarks:
                service_request.remarks = remarks
                
            # If status is completed, set completion date
            if status == 'completed':
                service_request.date_of_completion = datetime.utcnow()
                
            db.session.commit()
            
            return jsonify({
                'message': 'Service request updated successfully'
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': f'Error updating service request: {str(e)}'}), 500
    
    @app.route('/add-review/<int:request_id>', methods=['POST'])
    @auth_required()
    def add_review(request_id):
        """Add a review for a completed service request"""
        data = request.get_json()
        rating = data.get('rating')
        comment = data.get('comment')
        
        if not rating:
            return jsonify({'message': 'Rating is required'}), 400
            
        service_request = ServiceRequest.query.get(request_id)
        if not service_request:
            return jsonify({'message': 'Service request not found'}), 404
            
        if service_request.customer_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
            
        if service_request.status not in ['completed', 'closed']:
            return jsonify({'message': 'Service request must be completed before reviewing'}), 400
            
        # Check if review already exists
        existing_review = Review.query.filter_by(service_request_id=request_id).first()
        if existing_review:
            return jsonify({'message': 'Review already exists for this service request'}), 409
            
        try:
            review = Review(
                service_request_id=request_id,
                rating=rating,
                comment=comment
            )
            db.session.add(review)
            
            # Update professional's rating
            professional = service_request.professional
            if professional:
                reviews = Review.query.join(ServiceRequest).filter(
                    ServiceRequest.professional_id == professional.id
                ).all()
                
                total_rating = sum(r.rating for r in reviews) + rating
                professional.rating = total_rating / (len(reviews) + 1)
                
            db.session.commit()
            
            return jsonify({
                'message': 'Review added successfully',
                'review_id': review.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': f'Error adding review: {str(e)}'}), 500