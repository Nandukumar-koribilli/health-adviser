// This script handles signup and login form submissions.

// --- Health Calculator ---
const calculateBMI = (weight, height) => (weight / ((height / 100) ** 2)).toFixed(2);

const calculateBMR = (weight, height, age, gender) => {
    if (gender === "male") {
        return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
    }
    return (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);
};

const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
};

// --- Data for Recommendations ---
const dietPlans = {
    poor: [
        { name: 'Lentil Soup (Dal)', price: '~$1', image: 'https://tse2.mm.bing.net/th/id/OIP.RHG_1WB9Wh3z1OMmsm7Q-gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' },
        { name: 'Seasonal Veggies & Roti', price: '~$1.5', image: 'https://i.redd.it/9rh2txslkrx51.jpg?q=80&w=300' },
        { name: 'Sprouts Salad', price: '~$0.5', image: 'https://tse2.mm.bing.net/th/id/OIP.hIShnU-OfBXiotZfrAaEJQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' }
    ],
    middle: [
        { name: 'Grilled Chicken Salad', price: '~$5', image: 'https://tse3.mm.bing.net/th/id/OIP.TE3qLeZYgHL_rP8GlfNsqwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' },
        { name: 'Quinoa Bowl', price: '~$6', image: 'https://thealmondeater.com/wp-content/uploads/2022/06/mediterranean-quinoa-bowl_web-3.jpg?q=80&w=300' },
        { name: 'Oatmeal with Fruits', price: '~$3', image: 'https://tse1.explicit.bing.net/th/id/OIP.6KdA-YiWUVKtBqx-Q5y4DQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' }
    ],
    rich: [
        { name: 'Salmon with Asparagus', price: '~$15', image: 'https://www.lecremedelacrumb.com/wp-content/uploads/2019/04/sheet-pan-salmon-potatoes-asparagus-1-3.jpg?q=80&w=300' },
        { name: 'Avocado Toast & Eggs', price: '~$10', image: 'https://tse4.mm.bing.net/th/id/OIP.Kq72P-6m7v4hzOrseREingHaLH?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' },
        { name: 'Steak & Veggies', price: '~$20', image: 'https://s23209.pcdn.co/wp-content/uploads/2018/07/Grilled-Flank-Steak-and-VegetablesIMG_5677-640x960.jpg?q=80&w=300' }
    ]
};
const exercisePlans = {
    Underweight: [
        { name: 'Push-ups', image: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?q=80&w=300', desc: 'Builds upper body strength.' },
        { name: 'Squats', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=300', desc: 'Strengthens legs and core.' },
        { name: 'Lunges', image: 'https://images.unsplash.com/photo-1533681018184-6821b9f5a072?q=80&w=300', desc: 'Improves balance and leg strength.' }
    ],
    Normal: [
        { name: 'Jogging', image: 'https://images.unsplash.com/photo-1579362469315-60618d38832a?q=80&w=300', desc: 'Great for cardiovascular health.' },
        { name: 'Cycling', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=300', desc: 'Low-impact cardio exercise.' },
        { name: 'Swimming', image: 'https://images.unsplash.com/photo-1569366759013-9a597e0af331?q=80&w=300', desc: 'Full-body workout.' }
    ],
    Overweight: [
        { name: 'Brisk Walking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=300', desc: 'Effective and low-impact.' },
        { name: 'Light Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300', desc: 'Improves flexibility and mindfulness.' },
        { name: 'Bodyweight Exercises', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=300', desc: 'Use your own weight for resistance.' }
    ],
    Obese: [
        { name: 'Water Aerobics', image: 'https://images.unsplash.com/photo-1575452873-AC8563a35b24?q=80&w=300', desc: 'Easy on the joints.' },
        { name: 'Chair Exercises', image: 'https://plus.unsplash.com/premium_photo-1661496669399-b2f37a5079a0?q=80&w=300', desc: 'Safe and accessible.' },
        { name: 'Slow Walking', image: 'https://images.unsplash.com/photo-1622432299358-7f551a43a046?q=80&w=300', desc: 'Start slow and build endurance.' }
    ]
};

const yogaPlans = {
    Underweight: [
        { name: 'Tadasana (Mountain Pose)', image: 'https://schoolofyoga.in/wp-content/uploads/2016/12/4-Asana-18-tadasana-Anu.png?q=80&w=300' },
        { name: 'Bhujangasana (Cobra Pose)', image: 'https://images.unsplash.com/photo-1597962620493-2c72a5b4f492?q=80&w=300' },
        { name: 'Vrikshasana (Tree Pose)', image: 'https://images.unsplash.com/photo-1591291621229-d074aef63899?q=80&w=300' }
    ],
    Normal: [
        { name: 'Surya Namaskar (Sun Salutation)', image: 'https://tse3.mm.bing.net/th/id/OIP.6yjbBdvmIMWBO3hO5hNtaQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' },
        { name: 'Trikonasana (Triangle Pose)', image: 'https://images.unsplash.com/photo-1593811167563-9d3123572b7c?q=80&w=300' },
        { name: 'Shavasana (Corpse Pose)', image: 'https://images.unsplash.com/photo-1545205298-8839b7343aaa?q=80&w=300' }
    ],
    Overweight: [
        { name: 'Balasana (Child\'s Pose)', image: 'https://tse2.mm.bing.net/th/id/OIP.rUotpwB3KrjQ969jZIZX1AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3?q=80&w=300' },
        { name: 'Setu Bandhasana (Bridge Pose)', image: 'https://images.unsplash.com/photo-1614928228253-dc09cbc00f19?q=80&w=300' },
        { name: 'Ardha Matsyendrasana', image: 'https://images.unsplash.com/photo-1598834913123-7c4503825852?q=80&w=300' }
    ],
    Obese: [
        { name: 'Pranayama (Breathing)', image: 'https://static.vecteezy.com/system/resources/previews/047/749/806/non_2x/man-doing-bellow-breath-or-bhastrika-pranayama-yoga-exercise-vector.jpg?q=80&w=300' },
        { name: 'Tadasana (Mountain Pose)', image: 'https://images.unsplash.com/photo-1603988363602-9120a5246b8c?q=80&w=300' },
        { name: 'Baddha Konasana', image: 'https://images.unsplash.com/photo-1598834913123-7c4503825852?q=80&w=300' }
    ]
};

const createCard = (item) => `
    <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-content">
            <h4>${item.name}</h4>
            ${item.price ? `<p>Price: ${item.price}</p>` : ''}
            ${item.desc ? `<p>${item.desc}</p>` : ''}
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    const healthForm = document.getElementById('healthForm');
    if (healthForm) {
        healthForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const height = parseInt(document.getElementById('height').value);
            const weight = parseInt(document.getElementById('weight').value);
            const income = document.getElementById('income').value;
            const activity = document.getElementById('activity').value;
            const username = localStorage.getItem('username'); // Get username from storage

            // Send data to the backend
            try {
                const response = await fetch('/api/health-details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, age, gender, height, weight, income, activity }),
                });

                if (response.ok) {
                    alert('Health data saved successfully!');

                    // --- Generate and display the detailed health report ---
                    const bmi = calculateBMI(weight, height);
                    const bmr = calculateBMR(weight, height, age, gender);
                    const bmiCategory = getBMICategory(bmi);

                    // Select the report sections
                    const reportContainer = document.getElementById('healthReport');
                    const metricsSection = document.getElementById('metricsSection');
                    const dietSection = document.getElementById('dietSection');
                    const exerciseSection = document.getElementById('exerciseSection');
                    const yogaSection = document.getElementById('yogaSection');

                    // 1. Populate Metrics
                    metricsSection.innerHTML = `
                        <p><strong>BMI:</strong> ${bmi}</p>
                        <p><strong>BMR:</strong> ${bmr} calories/day</p>
                        <p><strong>Category:</strong> ${bmiCategory}</p>
                    `;

                    // 2. Populate Diet Plan based on income
                    dietSection.innerHTML = `<h3>Diet Plan (for ${income} class)</h3><div class="card-container">${dietPlans[income].map(createCard).join('')}</div>`;

                    // 3. Populate Exercise Plan based on BMI category
                    exerciseSection.innerHTML = `<h3>Exercise Plan</h3><div class="card-container">${exercisePlans[bmiCategory].map(createCard).join('')}</div>`;

                    // 4. Populate Yoga Plan
                    yogaSection.innerHTML = `<h3>Yoga Poses</h3><div class="card-container">${yogaPlans[bmiCategory].map(createCard).join('')}</div>`;

                    // Show the report
                    reportContainer.style.display = 'block';

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