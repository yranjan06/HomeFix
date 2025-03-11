from flask import jsonify, request
from flask_restful import Api, Resource, fields, marshal_with
from flask_security import auth_required, current_user
from backend.models import db, User, Service, ServiceRequest, Review

api = Api(prefix='/api')

# Output fields for marshaling
user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'full_name': fields.String,
}

service_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'base_price': fields.Float,
    'description': fields.String,
    'category': fields.String,
}

request_fields = {
    'id': fields.Integer,
    'customer_id': fields.Integer,
    'package_id': fields.Integer,
    'professional_id': fields.Integer,
    'status': fields.String,
}

review_fields = {
    'id': fields.Integer,
    'service_request_id': fields.Integer,
    'rating': fields.Integer,
    'comment': fields.String,
    'date_created': fields.DateTime,
}

# User API
class UserAPI(Resource):
    @marshal_with(user_fields)
    @auth_required('token')
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404
        return user

# Service API
class ServiceAPI(Resource):
    @marshal_with(service_fields)
    def get(self, service_id):
        service = Service.query.get(service_id)
        if not service:
            return {"message": "Service not found"}, 404
        return service

    @auth_required('token')
    def delete(self, service_id):
        service = Service.query.get(service_id)
        if not service:
            return {"message": "Service not found"}, 404
        db.session.delete(service)
        db.session.commit()
        return {"message": "Service deleted"}, 200

# Service Request API
class ServiceRequestAPI(Resource):
    @marshal_with(request_fields)
    @auth_required('token')
    def get(self, request_id):
        req = ServiceRequest.query.get(request_id)
        if not req:
            return {"message": "Request not found"}, 404
        return req

    @auth_required('token')
    def post(self):
        data = request.get_json()
        new_request = ServiceRequest(
            customer_id=current_user.id,
            package_id=data.get('package_id'),
            professional_id=data.get('professional_id'),
            status='requested'
        )
        db.session.add(new_request)
        db.session.commit()
        return {"message": "Service request created"}, 201

    @auth_required('token')
    def delete(self, request_id):
        req = ServiceRequest.query.get(request_id)
        if not req:
            return {"message": "Request not found"}, 404
        db.session.delete(req)
        db.session.commit()
        return {"message": "Service request deleted"}, 200

# Review API
class ReviewAPI(Resource):
    @marshal_with(review_fields)
    def get(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {"message": "Review not found"}, 404
        return review

    @auth_required('token')
    def post(self):
        data = request.get_json()
        new_review = Review(
            service_request_id=data.get('service_request_id'),
            rating=data.get('rating'),
            comment=data.get('comment')
        )
        db.session.add(new_review)
        db.session.commit()
        return {"message": "Review added"}, 201

    @auth_required('token')
    def delete(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {"message": "Review not found"}, 404
        db.session.delete(review)
        db.session.commit()
        return {"message": "Review deleted"}, 200

# Registering API endpoints
api.add_resource(UserAPI, '/users/<int:user_id>')
api.add_resource(ServiceAPI, '/services/<int:service_id>')
api.add_resource(ServiceRequestAPI, '/service-requests', '/service-requests/<int:request_id>')
api.add_resource(ReviewAPI, '/reviews', '/reviews/<int:review_id>')
