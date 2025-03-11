from flask import Flask
from backend.config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore
from backend.models import db, User, Role
from backend.create_initial_data import initialize_database

def create_app():
    app = Flask(__name__, template_folder='frontend', static_folder='frontend', static_url_path='/static')
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)

    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.security = Security(app, datastore=datastore, register_blueprint=False)
    
    with app.app_context():
        db.create_all()
    
    initialize_database(app, db)
    
    # Register routes
    from backend.routes import register_routes
    register_routes(app)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8080)
