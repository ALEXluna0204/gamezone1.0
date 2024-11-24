const API_URL = 'http://localhost:3000'; // Укажите ваш серверный адрес

// Реєстрація
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        alert(data.message || 'Реєстрація успішна!');
    } catch (err) {
        alert('Помилка реєстрації!');
    }
});

// Вхід
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Вхід успішний!');
        } else {
            alert('Невірний email або пароль!');
        }
    } catch (err) {
        alert('Помилка входу!');
    }
});
