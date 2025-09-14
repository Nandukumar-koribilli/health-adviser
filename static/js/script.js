// This script handles signup and login form submissions.

// --- Health Calculator ---
function calculateBMI(weight, height) {
  return (weight / ((height / 100) ** 2)).toFixed(2);
}

function calculateBMR(weight, height, age, gender) {
  if (gender === "male") {
    return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
  } else {
    return (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const healthForm = document.getElementById('healthForm');
    if (healthForm) {
        healthForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const height = parseInt(document.getElementById('height').value);
            const weight = parseInt(document.getElementById('weight').value);
            const username = localStorage.getItem('username'); // Get username from storage

            // Send data to the backend
            try {
                const response = await fetch('/api/health-details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, age, gender, height, weight }),
                });

                if (response.ok) {
                    alert('Health data saved successfully!');

                    // --- Provide immediate feedback on the dashboard ---
                    const bmi = calculateBMI(weight, height);
                    const resultDiv = document.getElementById('healthResult');
                    
                    let message = `Your BMI is <strong>${bmi}</strong>. `;
                    
                    if (bmi < 18.5) {
                        message += "This is considered <strong>underweight</strong>. It's a good idea to consult with a healthcare provider to ensure you are getting enough nutrients.";
                    } else if (bmi >= 18.5 && bmi < 25) {
                        message += "This is within the <strong>normal weight</strong> range. Keep up the great work with a balanced diet and regular exercise!";
                    } else if (bmi >= 25 && bmi < 30) {
                        message += "This is considered <strong>overweight</strong>. A balanced diet and increased physical activity can help in managing weight.";
                    } else {
                        message += "This is within the <strong>obesity</strong> range. Consulting a healthcare professional for guidance on a health plan is recommended.";
                    }

                    resultDiv.innerHTML = message;
                    resultDiv.style.padding = '15px';
                    resultDiv.style.borderRadius = '8px';
                    resultDiv.style.backgroundColor = '#e6f7ff';

                } else {
                    const data = await response.json();
                    alert(`Error: ${data.error}`);
                }
            } catch (error) {
                alert('An error occurred while saving health data.');
            }
        });
    }

    // --- Auth Forms ---
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    // --- Signup Handler ---
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    messageDiv.textContent = 'Signup successful! Redirecting to login...';
                    messageDiv.style.color = 'green';
                    setTimeout(() => { window.location.href = 'login.html'; }, 2000);
                } else {
                    messageDiv.textContent = `Error: ${data.error}`;
                    messageDiv.style.color = 'red';
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred. Please try again.';
                messageDiv.style.color = 'red';
            }
        });
    }

    // --- Login Handler ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    messageDiv.textContent = 'Login successful! Redirecting to dashboard...';
                    messageDiv.style.color = 'green';
                    localStorage.setItem('username', username); // Save username
                    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
                } else {
                    messageDiv.textContent = `Error: ${data.error}`;
                    messageDiv.style.color = 'red';
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred. Please try again.';
                messageDiv.style.color = 'red';
            }
        });
    }
});