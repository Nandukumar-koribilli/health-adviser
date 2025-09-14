from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

# The static_folder is set to 'static' where your frontend files are.
app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# --- Configuration ---
# Updated with your MongoDB Atlas connection string.
# IMPORTANT: For production, use environment variables to keep this secret.
# Example: app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_URI"] = "mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/health_advisor_db?retryWrites=true&w=majority"

mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# --- API Routes (No changes needed here) ---

@app.route('/api/register', methods=['POST'])
def register():
    users = mongo.db.users
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    existing_user = users.find_one({'username': username})
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    users.insert_one({
        'username': username,
        'password': hashed_password
    })
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    users = mongo.db.users
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    login_user = users.find_one({'username': username})

    if login_user and bcrypt.check_password_hash(login_user['password'], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/health-details', methods=['POST'])
def health_details():
    health_data = mongo.db.health_data
    data = request.get_json()

    # In a real app, you'd get the user from a session/token.
    # For now, we'll trust the username sent from the client.
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    # Using update_one with upsert=True will create a new document
    # if one for the user doesn't exist, or update it if it does.
    health_data.update_one(
        {'username': username},
        {'$set': {
            'age': data.get('age'),
            'gender': data.get('gender'),
            'height': data.get('height'),
            'weight': data.get('weight')
        }},
        upsert=True
    )
    return jsonify({'message': 'Health data saved successfully'}), 200

# --- Frontend Serving ---

@app.route('/')
def serve_signup_page():
    # This now serves the new index.html as the default landing page.
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    # This will serve all other files like login.html, dashboard.html, etc.
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
