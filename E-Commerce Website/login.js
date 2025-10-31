// Password Toggle Functionality
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Form Validation
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('#email');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Real-time validation
emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        removeError(emailInput);
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value && passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters long');
    } else {
        removeError(passwordInput);
    }
});

// Form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;
        
        // Clear previous errors
        removeError(emailInput);
        removeError(passwordInput);
        
        // Validate email
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const loginBtn = loginForm.querySelector('.login-btn');
            loginBtn.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                loginBtn.classList.remove('loading');
                loginBtn.classList.add('success');
                
                // Redirect after success animation
                setTimeout(() => {
                    window.location.href = 'Firstpage.html';
                }, 1500);
            }, 2000);
        }
    });
}

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add loading animation
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        btn.style.pointerEvents = 'none';
        
        // Simulate social login
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.pointerEvents = 'auto';
            
            // Show success message
            showNotification('Social login feature will be implemented soon!', 'info');
        }, 2000);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 20px;
            }
            
            .notification-success {
                border-left: 4px solid #27ae60;
            }
            
            .notification-error {
                border-left: 4px solid #e74c3c;
            }
            
            .notification-info {
                border-left: 4px solid #3498db;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #7f8c8d;
                margin-left: auto;
            }
            
            .notification-close:hover {
                color: #2c3e50;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Input focus effects
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.closest('.form-group').classList.remove('focused');
    });
});

// Add focus styles
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    .form-group.focused label {
        color: #e74c3c;
    }
    
    .form-group.focused label i {
        transform: scale(1.1);
    }
    
    .form-group label i {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(focusStyles);

// Remember me functionality
const rememberMe = document.querySelector('input[name="remember"]');
if (rememberMe) {
    // Check if user previously checked remember me
    const remembered = localStorage.getItem('rememberMe');
    if (remembered === 'true') {
        rememberMe.checked = true;
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
    }
    
    rememberMe.addEventListener('change', () => {
        if (rememberMe.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === passwordInput) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Accessibility improvements
document.querySelectorAll('input').forEach(input => {
    input.setAttribute('aria-describedby', `${input.id}-description`);
});

// Add ARIA descriptions
const ariaDescriptions = document.createElement('div');
ariaDescriptions.innerHTML = `
    <div id="email-description" class="sr-only">Enter your email address</div>
    <div id="password-description" class="sr-only">Enter your password</div>
`;
document.body.appendChild(ariaDescriptions);

// Screen reader only class
const srOnlyStyles = document.createElement('style');
srOnlyStyles.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(srOnlyStyles);

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add page load styles
const pageLoadStyles = document.createElement('style');
pageLoadStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(pageLoadStyles); 