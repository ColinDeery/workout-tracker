const loginFormHandler = async (event) => {
    event.preventDefault();

    // Grab username and password values inputted in form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // If both username and password provided
    if (username && password) {
        // Send username and password to /api/users/login
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/calendar');
        } else {
            alert('Failed to log in.');
        }
    } else {
        alert('Please provide both the username and password.');
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);