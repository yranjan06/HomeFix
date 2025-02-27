from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

# User and Role models for Flask-Security
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    fs_uniquifier = db.Column(db.String, unique=True, nullable=False)
    active = db.Column(db.Boolean, default=True)
    roles = db.relationship('Role', backref='bearers', secondary='user_roles')
    
    # Common fields for all users
    username = db.Column(db.String(150), nullable=True)
    full_name = db.Column(db.String(100), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    pincode = db.Column(db.String(20), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    is_approved = db.Column(db.Boolean, default=True)
    is_blocked = db.Column(db.Boolean, default=False)
    
    # Relationships
    professional_profile = db.relationship('Professional', backref='user', uselist=False)
    service_requests = db.relationship('ServiceRequest', foreign_keys='ServiceRequest.customer_id', backref='customer')

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, nullable=False)

class UserRoles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))

# Service models
class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    base_price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500))
    category = db.Column(db.String(50), nullable=False, default='normal')  # emergency, basic
    
    # Relationships
    professionals = db.relationship('Professional', backref='service')
    service_packages = db.relationship('ServicePackage', backref='service')

class Professional(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    
    # Professional specific fields
    experience_years = db.Column(db.String(50), nullable=True)
    base_price = db.Column(db.Float, nullable=True)
    document_proof = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, default=0.0)
    
    # Relationships
    service_packages = db.relationship('ServicePackage', backref='professional')
    service_requests = db.relationship('ServiceRequest', foreign_keys='ServiceRequest.professional_id', backref='professional')

class ServicePackage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    professional_id = db.Column(db.Integer, db.ForeignKey('professional.id'), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    duration = db.Column(db.String(50), nullable=False, default='00:20:00')
    is_flagged = db.Column(db.Boolean, default=False)

class ServiceRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    package_id = db.Column(db.Integer, db.ForeignKey('service_package.id'), nullable=False)
    professional_id = db.Column(db.Integer, db.ForeignKey('professional.id'), nullable=True)
    date_of_request = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_of_completion = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='requested')  # requested, accepted, completed, closed
    remarks = db.Column(db.String(500))
    
    # Relationship
    package = db.relationship('ServicePackage', backref='service_requests')
    review = db.relationship('Review', backref='service_request', uselist=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_request_id = db.Column(db.Integer, db.ForeignKey('service_request.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)