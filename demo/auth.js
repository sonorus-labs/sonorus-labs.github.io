// Password protection for Sonorus Labs demo
const CORRECT_PASSWORD = 'sonorusdemo_777';
const AUTH_KEY = 'sonorus_demo_auth';

// Check if user is already authenticated
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY);
    if (isAuthenticated === 'true') {
        showDemoContent();
    }
}

// Show demo content
function showDemoContent() {
    document.getElementById('password-gate').style.display = 'none';
    document.getElementById('demo-content').style.display = 'block';
}

// Show password gate
function showPasswordGate() {
    document.getElementById('password-gate').style.display = 'block';
    document.getElementById('demo-content').style.display = 'none';
}

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
    }
});

// Handle password form submission
document.getElementById('password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password
        sessionStorage.setItem(AUTH_KEY, 'true');
        errorMessage.style.display = 'none';
        passwordInput.value = '';
        showDemoContent();
    } else {
        // Incorrect password
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Hide error message after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// Handle logout
document.getElementById('logout-button').addEventListener('click', function() {
    sessionStorage.removeItem(AUTH_KEY);
    showPasswordGate();
    document.getElementById('password-input').focus();
});

// Check authentication on page load
checkAuth();

