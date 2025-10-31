// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all products for animation
document.querySelectorAll('.product').forEach(product => {
    observer.observe(product);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#e74c3c';
            newsletterForm.reset();
        }, 2000);
    });
}

// Quick view functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.product');
        const productName = product.querySelector('h3').textContent;
        
        // Determine which page to redirect to based on product name
        let redirectUrl = '';
        
        if (productName.toLowerCase().includes('oversized') || 
            productName.toLowerCase().includes('t-shirt') || 
            productName.toLowerCase().includes('tshirt')) {
            redirectUrl = 'Nextpage/Oversized%20T-shirts/Secoundpage.html';
        } else if (productName.toLowerCase().includes('shirt') ||
                   productName.toLowerCase().includes('jeans') ) {
            redirectUrl = 'Nextpage/Shirts/Secoundpage.html';
        } else if (productName.toLowerCase().includes('womens') || 
                   productName.toLowerCase().includes("women's")) {
            redirectUrl = 'Nextpage/Womens%20Wear/Secoundpage.html';
        } else if (productName.toLowerCase().includes('kids') || 
                   productName.toLowerCase().includes("kids'")) {
            redirectUrl = 'Nextpage/Kids%20Wear/Secoundpage.html';
        } else {
            // For other products, show a modal with "Coming Soon" message
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${productName}</h2>
                    <p>This product collection is coming soon! Stay tuned for more updates.</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close');
            closeBtn.onclick = () => modal.remove();
            
            modal.onclick = (e) => {
                if (e.target === modal) modal.remove();
            };
            return;
        }
        
        // Redirect to the appropriate page
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    });
});

// Add to cart animation
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        e.target.textContent = 'Added!';
        e.target.style.background = '#27ae60';
        
        setTimeout(() => {
            e.target.textContent = 'Add to Cart';
            e.target.style.background = '#e74c3c';
        }, 1500);
    }
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for modal
const modalStyles = `
<style>
.modal {
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    position: relative;
    animation: slideIn 0.3s ease;
}

.close {
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    color: #aaa;
}

.close:hover {
    color: #000;
}

.modal-content h2 {
    margin-bottom: 20px;
    color: #2c3e50;
}

.modal-content p {
    margin-bottom: 20px;
    color: #7f8c8d;
    line-height: 1.6;
}

.add-to-cart {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-to-cart:hover {
    background: #c0392b;
    transform: translateY(-2px);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
}

.product.animate {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for page loading
const loadingStyles = `
<style>
body {
    opacity: 0;
    transition: opacity 0.5s ease;
}

body.loaded {
    opacity: 1;
}

.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.loading::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #e74c3c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles); 