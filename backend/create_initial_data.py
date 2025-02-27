from flask_security import hash_password
from backend.models import Service, ServicePackage, Professional, ServiceRequest, Review
from datetime import datetime

def initialize_database(app, db):
    with app.app_context():
        db.create_all()
        userdatastore = app.security.datastore

        # Create roles
        admin_role = userdatastore.find_or_create_role(name='admin', description='Administrator')
        customer_role = userdatastore.find_or_create_role(name='customer', description='Customer user')
        provider_role = userdatastore.find_or_create_role(name='service_provider', description='Service provider user')

        # Create admin user if not exists
        if not userdatastore.find_user(email='admin@study.in'):
            admin_user = userdatastore.create_user(
                email='admin@study.in', 
                password=hash_password('adminpass'), 
                username='admin',
                full_name='Administrator',
                address='Admin Address',
                pincode='000000',
                phone_number='1234567890'
            )
            userdatastore.add_role_to_user(admin_user, admin_role)

        # Create customer user if not exists
        if not userdatastore.find_user(email='customer@study.in'):
            customer_user = userdatastore.create_user(
                email='customer@study.in', 
                password=hash_password('customerpass'),
                username='Coshu',
                full_name='Test Customer',
                address='123 Customer St',
                pincode='123456',
                phone_number='1234567890'
            )
            userdatastore.add_role_to_user(customer_user, customer_role)

        # Create service provider user if not exists
        if not userdatastore.find_user(email='serviceprovider@study.in'):
            provider_user = userdatastore.create_user(
                email='serviceprovider@study.in', 
                password=hash_password('providerpass'),
                username='Anipro', 
                full_name='Test Provider',
                address='456 Provider Ave',
                pincode='654321',
                phone_number='9876543210'
            )
            userdatastore.add_role_to_user(provider_user, provider_role)

        db.session.commit()

        # Create services if not exists
        if not Service.query.count():
            services = [
                Service(name="Plumbing", base_price=50.0, description="Normal Plumbing Service", category="normal"),
                Service(name="Cleaning", base_price=30.0, description="Normal Cleaning Service", category="normal"),
                Service(name="Cooking", base_price=30.0, description="Normal Cooking Service", category="normal"),
                Service(name="Repairs", base_price=30.0, description="Repairing Service", category="normal"),          
                Service(name="Electrical", base_price=100.0, description="Normal Electrical Service", category="normal"),               
                Service(name="Laundry", base_price=50.0, description="Laundry Service", category="normal"),
                Service(name="Emergency Repairs", base_price=50.0, description="Emergency Repair Service", category="emergency"),
                Service(name="Premium Cleaning", base_price=50.0, description="Premium Cleaning Service", category="platinum")            
            ]
            db.session.bulk_save_objects(services)
            db.session.commit()

        # Create professional profiles if not exists
        provider_user = userdatastore.find_user(email='serviceprovider@study.in')
        if provider_user and not Professional.query.filter_by(user_id=provider_user.id).first():
            professional = Professional(
                user_id=provider_user.id,
                service_id=1,  # Plumbing
                experience_years="3-5",
                base_price=400.0,
                document_proof="Anipro.pdf",
                rating=0.0
            )
            db.session.add(professional)
            db.session.commit()

            # Create service packages for this professional
            service_packages = [
                ServicePackage(
                    professional_id=professional.id, 
                    service_id=1, 
                    name="Faucet repair", 
                    price=100.0, 
                    description="Inspecting all faucets for leaks", 
                    duration='00:40:00'
                ),
                ServicePackage(
                    professional_id=professional.id, 
                    service_id=1, 
                    name="Pressure check", 
                    price=80.0, 
                    description="Checking water pressure", 
                    duration='00:20:00'
                ),
                ServicePackage(
                    professional_id=professional.id, 
                    service_id=1, 
                    name="Pipe fixtures", 
                    price=300.0, 
                    description="Tightening loose pipes and fixtures", 
                    duration='00:50:00'
                )
            ]
            db.session.bulk_save_objects(service_packages)
            db.session.commit()

        # Create an example service request if not exists
        customer_user = userdatastore.find_user(email='customer@study.in')
        if customer_user and Professional.query.count() and not ServiceRequest.query.count():
            professional = Professional.query.first()
            package = ServicePackage.query.first()
            
            if professional and package:
                service_request = ServiceRequest(
                    customer_id=customer_user.id,
                    package_id=package.id,
                    professional_id=professional.id,
                    date_of_request=datetime.strptime('2024-10-31 16:12:53', '%Y-%m-%d %H:%M:%S'),
                    date_of_completion=datetime.strptime('2024-11-01 18:16:00', '%Y-%m-%d %H:%M:%S'),
                    status='Closed',
                    remarks='Service completed successfully'
                )
                db.session.add(service_request)
                db.session.commit()
                
                # Add a review for this service request
                review = Review(
                    service_request_id=service_request.id,
                    rating=4,
                    comment='Good service, arrived on time',
                    date_created=datetime.strptime('2024-11-01 18:16:00', '%Y-%m-%d %H:%M:%S')
                )
                db.session.add(review)
                db.session.commit()