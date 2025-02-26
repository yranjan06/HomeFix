from flask_security import hash_password

def initialize_database(app, db):
    with app.app_context():
        db.create_all()
        userdatastore = app.security.datastore

        # Create roles
        userdatastore.find_or_create_role(name='admin', description='Superuser')
        userdatastore.find_or_create_role(name='customer', description='Customeruser')
        userdatastore.find_or_create_role(name='service_provider', description='Serviceprovideruser')

        # Create admin user if not exists
        if not userdatastore.find_user(email='admin@study.in'):
            userdatastore.create_user(email='admin@study.in', password=hash_password('adminpass'), roles=['admin'])

        # Create customer user if not exists
        if not userdatastore.find_user(email='customer@study.in'):
            userdatastore.create_user(
                email='customer@study.in', 
                password=hash_password('customerpass'), 
                roles=['customer'],
                full_name='Test Customer',
                address='123 Customer St',
                pincode='123456',
                phone_number='1234567890'
            )

        # Create service provider user if not exists
        if not userdatastore.find_user(email='serviceprovider@study.in'):
            userdatastore.create_user(
                email='serviceprovider@study.in', 
                password=hash_password('providerpass'), 
                roles=['service_provider'],
                full_name='Test Provider',
                address='456 Provider Ave',
                pincode='654321',
                phone_number='9876543210',
                service_type='plumbing',
                years_of_experience=5,
                base_price=50.0
            )

        db.session.commit()