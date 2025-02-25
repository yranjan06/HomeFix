from flask import Flask
from backend.config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore
from backend.models import db, User, Role
from backend.create_initial_data import initialize_database
import backend.routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)

    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.security = Security(app, datastore=datastore, register_blueprint=True)
    
    with app.app_context():
        db.create_all()
    
    initialize_database(app, db)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8080)
