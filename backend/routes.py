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
            return jsonify({
                'token': user.get_auth_token(),
                'email': user.email,
                'role': user.roles[0].name,
                'id': user.id
            }), 200

        return jsonify({'message': 'Invalid password'}), 401


    @app.route('/register', methods=['POST'])
    def register():
        datastore = app.security.datastore
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not email or not password or role not in ['admin', 'customer', 'service_provider']:
            return jsonify({'message': 'Invalid inputs'}), 400

        user = datastore.find_user(email=email)
        if user:
            return jsonify({'message': 'User already exists'}), 409

        try:
            datastore.create_user(email=email, password=hash_password(password), roles=[role], active=True)
            db.session.commit()
            return jsonify({'message': 'User created'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error creating user'}), 500