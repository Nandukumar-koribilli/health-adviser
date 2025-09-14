pip install -r requirements.txt

python app.py

# Health Advisor Web Application

A simple web application built with Python, Flask, and MongoDB that allows users to register, log in, and track their health metrics like Body Mass Index (BMI).

## Features

- **User Authentication**: Secure user registration and login.
- **Health Dashboard**: After logging in, users can access a dashboard to input their health details.
- **Data Persistence**: User credentials and health data are stored in a MongoDB database.
- **BMI Calculation**: Calculates the user's BMI based on their height and weight and provides immediate feedback.

## Tech Stack

- **Backend**:
  - Python
  - Flask (for the web server and API)
  - Flask-PyMongo (for MongoDB integration)
  - Flask-Bcrypt (for password hashing)
  - Flask-Cors

- **Database**:
  - MongoDB (designed for a cloud-hosted instance like MongoDB Atlas)

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (for form handling and API requests)

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.7+ and `pip`
- A MongoDB Atlas account (or a local MongoDB server)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd python-mongodb-app
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure the Database:**
    Open `app.py` and replace the placeholder connection string with your own MongoDB Atlas connection string:
    ```python
    app.config["MONGO_URI"] = "YOUR_MONGODB_ATLAS_CONNECTION_STRING"
    ```

## Running the Application

1.  **Start the Flask server:**
    ```bash
    python app.py
    ```

2.  **Access the application:**
    Open your web browser and navigate to `http://127.0.0.1:5000/`. The application will start on the signup page.
