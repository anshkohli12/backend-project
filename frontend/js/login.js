document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        const response = await API.login({ username, password });
        
        if (response.user) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = response.message || 'Login failed';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'An error occurred during login';
    }
});
