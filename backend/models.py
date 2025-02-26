from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    fs_uniquifier = db.Column(db.String, unique=True, nullable=False)
    active = db.Column(db.Boolean, default=True)
    roles = db.relationship('Role', backref='bearers', secondary='user_roles')
    
    # Common fields for all users
    full_name = db.Column(db.String(100), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    pincode = db.Column(db.String(20), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    
    # Service provider specific fields
    service_type = db.Column(db.String(50), nullable=True)
    years_of_experience = db.Column(db.Integer, nullable=True)
    base_price = db.Column(db.Float, nullable=True)
    document_proof = db.Column(db.String(255), nullable=True)

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, nullable=False)

class UserRoles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))