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

// View toggle functionality
const viewBtns = document.querySelectorAll('.view-btn');
const container = document.querySelector('.container');

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        viewBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const view = btn.dataset.view;
        if (view === 'list') {
            container.classList.add('list-view');
        } else {
            container.classList.remove('list-view');
        }
    });
});

// Filter functionality
const sortSelect = document.getElementById('sort');
const sizeSelect = document.getElementById('size');

function filterProducts() {
    const products = document.querySelectorAll('.product');
    const sortValue = sortSelect.value;
    const sizeValue = sizeSelect.value;
    
    // Add loading animation
    products.forEach(product => {
        product.style.opacity = '0.5';
        product.style.transform = 'scale(0.95)';
    });
    
    setTimeout(() => {
        // Reset products
        products.forEach(product => {
            product.style.opacity = '1';
            product.style.transform = 'scale(1)';
        });
        
        // Apply sorting (simplified for demo)
        if (sortValue === 'price-low') {
            // Sort by price low to high
            console.log('Sorting by price: low to high');
        } else if (sortValue === 'price-high') {
            // Sort by price high to low
            console.log('Sorting by price: high to low');
        }
        
        // Apply size filter
        if (sizeValue !== 'all') {
            console.log(`Filtering by size: ${sizeValue}`);
        }
    }, 300);
}

sortSelect.addEventListener('change', filterProducts);
sizeSelect.addEventListener('change', filterProducts);

// Product interactions
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.product');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.current-price').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${product.querySelector('img').src}" alt="${productName}">
                    </div>
                    <div class="modal-info">
                        <h2>${productName}</h2>
                        <div class="modal-price">
                            <span class="current-price">${productPrice}</span>
                            <span class="original-price">₹999</span>
                            <span class="discount">₹400 OFF</span>
                        </div>
                        <div class="size-selection">
                            <h3>Select Size</h3>
                            <div class="size-options">
                                <button class="size-option" data-size="xs">XS</button>
                                <button class="size-option" data-size="s">S</button>
                                <button class="size-option" data-size="m">M</button>
                                <button class="size-option" data-size="l">L</button>
                                <button class="size-option" data-size="xl">XL</button>
                                <button class="size-option" data-size="xxl">XXL</button>
                            </div>
                        </div>
                        <div class="quantity-selector">
                            <h3>Quantity</h3>
                            <div class="quantity-controls">
                                <button class="qty-btn" data-action="decrease">-</button>
                                <span class="qty-display">1</span>
                                <button class="qty-btn" data-action="increase">+</button>
                            </div>
                        </div>
                        <button class="add-to-cart-modal">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Modal functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.remove();
        
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        // Size selection
        const sizeOptions = modal.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        // Quantity controls
        const qtyBtns = modal.querySelectorAll('.qty-btn');
        const qtyDisplay = modal.querySelector('.qty-display');
        let quantity = 1;
        
        qtyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'increase') {
                    quantity++;
                } else if (action === 'decrease' && quantity > 1) {
                    quantity--;
                }
                qtyDisplay.textContent = quantity;
            });
        });
        
        // Add to cart
        const addToCartBtn = modal.querySelector('.add-to-cart-modal');
        addToCartBtn.addEventListener('click', () => {
            addToCartBtn.textContent = 'Added!';
            addToCartBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                modal.remove();
                showNotification('Product added to cart!', 'success');
            }, 1000);
        });
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.product');
        const productName = product.querySelector('h3').textContent;
        
        button.textContent = 'Added!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = '#e74c3c';
        }, 1500);
        
        showNotification(`${productName} added to cart!`, 'success');
    });
});

// Wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#e74c3c';
            showNotification('Added to wishlist!', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '#7f8c8d';
            showNotification('Removed from wishlist!', 'info');
        }
    });
});

// Size button functionality
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.product');
        const productName = product.querySelector('h3').textContent;
        
        // Create size selection popup
        const popup = document.createElement('div');
        popup.className = 'size-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>Select Size for ${productName}</h3>
                <div class="size-grid">
                    <button class="size-grid-btn" data-size="xs">XS</button>
                    <button class="size-grid-btn" data-size="s">S</button>
                    <button class="size-grid-btn" data-size="m">M</button>
                    <button class="size-grid-btn" data-size="l">L</button>
                    <button class="size-grid-btn" data-size="xl">XL</button>
                    <button class="size-grid-btn" data-size="xxl">XXL</button>
                </div>
                <button class="close-popup">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Size selection
        const sizeBtns = popup.querySelectorAll('.size-grid-btn');
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const size = btn.dataset.size;
                button.textContent = `Size: ${size.toUpperCase()}`;
                button.style.background = '#27ae60';
                popup.remove();
                showNotification(`Size ${size.toUpperCase()} selected!`, 'success');
            });
        });
        
        // Close popup
        const closePopup = popup.querySelector('.close-popup');
        closePopup.onclick = () => popup.remove();
        
        popup.onclick = (e) => {
            if (e.target === popup) popup.remove();
        };
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#e74c3c';
            newsletterForm.reset();
        }, 2000);
        
        showNotification('Successfully subscribed to newsletter!', 'success');
    });
}

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
    
    // Add notification styles if not already added
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
            
            .product-modal {
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
                border-radius: 15px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
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
                z-index: 1;
            }
            
            .close:hover {
                color: #000;
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                padding: 30px;
            }
            
            .modal-image img {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
            
            .modal-info h2 {
                margin-bottom: 15px;
                color: #2c3e50;
            }
            
            .modal-price {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .size-selection,
            .quantity-selector {
                margin-bottom: 20px;
            }
            
            .size-options {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-top: 10px;
            }
            
            .size-option {
                padding: 10px;
                border: 2px solid #e9ecef;
                background: white;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .size-option:hover,
            .size-option.selected {
                border-color: #e74c3c;
                background: rgba(231, 76, 60, 0.1);
            }
            
            .quantity-controls {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-top: 10px;
            }
            
            .qty-btn {
                width: 35px;
                height: 35px;
                border: 2px solid #e9ecef;
                background: white;
                border-radius: 50%;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .qty-btn:hover {
                border-color: #e74c3c;
                color: #e74c3c;
            }
            
            .qty-display {
                font-size: 18px;
                font-weight: 600;
                min-width: 30px;
                text-align: center;
            }
            
            .add-to-cart-modal {
                width: 100%;
                padding: 15px;
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .add-to-cart-modal:hover {
                background: #c0392b;
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
            
            .popup-content {
                background-color: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                animation: slideIn 0.3s ease;
            }
            
            .size-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin: 20px 0;
            }
            
            .size-grid-btn {
                padding: 15px;
                border: 2px solid #e9ecef;
                background: white;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
            }
            
            .size-grid-btn:hover {
                border-color: #e74c3c;
                background: rgba(231, 76, 60, 0.1);
            }
            
            .close-popup {
                padding: 10px 20px;
                border: 2px solid #e9ecef;
                background: white;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .close-popup:hover {
                border-color: #e74c3c;
                color: #e74c3c;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .container.list-view {
                grid-template-columns: 1fr;
            }
            
            .container.list-view .product {
                display: grid;
                grid-template-columns: 200px 1fr;
                gap: 20px;
            }
            
            .container.list-view .product-image {
                height: 200px;
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                }
                
                .size-options {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .container.list-view .product {
                    grid-template-columns: 1fr;
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
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
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
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(loadingStyles); 