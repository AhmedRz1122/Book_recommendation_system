from flask import Flask, request, jsonify
from recommendation import recommend_books
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError
from flask_cors import CORS

app = Flask(__name__)
CORS(appresources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['JWT_SECRET_KEY'] = 'secret_key12#'

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120),nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    
with app.app_context():
    db.create_all()
    
# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'msg': 'All fields are required'}), 400
    
    try:
        valid = validate_email(data["email"]).email
        # print("Valid Email: ",valid)
    except EmailNotValidError as e:
        return jsonify({'msg': str(e)}), 400
    
    if len(data["password"])<6:
        return jsonify({'msg':"Password should be atleast 6 characters long."}),400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'User already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'],email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'User created successfully'}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    try:
        valid = validate_email(data["email"]).email
        # print("Valid Email: ",valid)
    except EmailNotValidError as e:
        return jsonify({'msg': str(e)}), 400
    
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'Invalid credentials'}), 401

# Recommendation Route
@app.route('/recommend', methods=['POST','GET'])
@jwt_required()
def get_recommendations():
    if request.method == "GET":
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200
    else:
        data = request.get_json()
        query = data.get('query', '')
        category = data.get('category', 'All')
        tone = data.get('tone', 'All')

        if not query:
            return jsonify({'error': 'Please enter a query'}), 400

        try:
            recommendations = recommend_books(query, category, tone)
            return jsonify({'recommendations': recommendations})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
