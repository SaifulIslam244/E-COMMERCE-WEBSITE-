// Mobile menu toggle
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
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all products for animation
document.querySelectorAll('.product').forEach(product => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(30px)';
    product.style.transition = 'all 0.6s ease';
    observer.observe(product);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = '#27ae60';
            newsletterForm.querySelector('input[type="email"]').value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#3498db';
                button.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Quick view functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.product');
        const productName = product.querySelector('h3').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${productName}</h2>
                <p>Product details and quick view functionality will be implemented here.</p>
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
    });
});

// Add to cart animation
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        e.target.textContent = 'Added!';
        e.target.style.background = '#27ae60';
        
        setTimeout(() => {
            e.target.textContent = 'Add to Cart';
            e.target.style.background = '#3498db';
        }, 1500);
    }
});

// Wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#3498db';
            button.style.borderColor = '#3498db';
            button.style.background = 'rgba(52, 152, 219, 0.1)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '#7f8c8d';
            button.style.borderColor = '#e9ecef';
            button.style.background = 'none';
        }
    });
});

// Size selection functionality
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Create size selection popup
        const popup = document.createElement('div');
        popup.className = 'size-popup';
        popup.innerHTML = `
            <div class="size-popup-content">
                <h3>Select Size</h3>
                <div class="size-options">
                    <button class="size-option" data-size="2-3Y">2-3 Years</button>
                    <button class="size-option" data-size="4-5Y">4-5 Years</button>
                    <button class="size-option" data-size="6-7Y">6-7 Years</button>
                    <button class="size-option" data-size="8-9Y">8-9 Years</button>
                    <button class="size-option" data-size="10-12Y">10-12 Years</button>
                </div>
                <button class="close-popup">Close</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Size option selection
        popup.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                const selectedSize = option.dataset.size;
                button.textContent = `Size: ${selectedSize}`;
                popup.remove();
            });
        });
        
        // Close popup
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.remove();
        });
    });
});

// View toggle functionality
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', () => {
        const view = button.dataset.view;
        const container = document.querySelector('.container');
        
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update grid layout
        if (view === 'list') {
            container.style.gridTemplateColumns = '1fr';
            container.style.maxWidth = '800px';
        } else {
            container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
            container.style.maxWidth = '1200px';
        }
    });
});

// Filter functionality
document.getElementById('sort').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const products = Array.from(document.querySelectorAll('.product'));
    const container = document.querySelector('.container');
    
    // Sort products based on selection
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.current-price').textContent.replace('₹', '').replace(',', ''));
        const priceB = parseInt(b.querySelector('.current-price').textContent.replace('₹', '').replace(',', ''));
        
        if (sortBy === 'price-low') {
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            return priceB - priceA;
        }
        return 0;
    });
    
    // Reorder products in DOM
    products.forEach(product => container.appendChild(product));
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
    const hero = document.querySelector('.hero-banner');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for modal and popup
const additionalStyles = `
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
    transition: color 0.3s ease;
}

.close:hover {
    color: #3498db;
}

.size-popup {
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

.size-popup-content {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    animation: slideIn 0.3s ease;
}

.size-popup-content h3 {
    margin-bottom: 20px;
    color: #2c3e50;
}

.size-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}

.size-option {
    padding: 10px;
    border: 2px solid #e9ecef;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.size-option:hover {
    border-color: #3498db;
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
}

.close-popup {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-popup:hover {
    background: #34495e;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Performance optimization - debounce scroll events
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
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-banner');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 