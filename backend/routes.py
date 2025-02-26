from flask import request, jsonify, render_template
from flask_security import auth_required, verify_password, hash_password
from backend.models import db

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
                'role': role,
                'id': user.id,
                'full_name': user.full_name
            }
            
            # Add role-specific fields
            if role == 'service_provider':
                user_info.update({
                    'service_type': user.service_type,
                    'years_of_experience': user.years_of_experience,
                    'base_price': user.base_price
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
                roles=['customer'],
                full_name=full_name,
                address=address,
                pincode=pincode,
                phone_number=phone_number
            )
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
        data = request.get_json()
        
        # Extract provider data
        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name')
        address = data.get('address')
        pincode = data.get('pincode')
        phone_number = data.get('phone_number')
        service_type = data.get('service_type')
        years_of_experience = data.get('years_of_experience')
        base_price = data.get('base_price')

        # Validate required fields
        if not email or not password or not service_type:
            return jsonify({'message': 'Email, password, and service type are required'}), 400

        # Check if user already exists
        user = datastore.find_user(email=email)
        if user:
            return jsonify({'message': 'User already exists'}), 409

        try:
            # Create new service provider user
            user = datastore.create_user(
                email=email,
                password=hash_password(password),
                roles=['service_provider'],
                full_name=full_name,
                address=address,
                pincode=pincode,
                phone_number=phone_number,
                service_type=service_type,
                years_of_experience=years_of_experience,
                base_price=base_price
            )
            db.session.commit()
            
            return jsonify({
                'message': 'Service provider registered successfully',
                'user_id': user.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': f'Error creating user: {str(e)}'}), 500