let cart = [];
let isSignUp = false;
let loggedInUser = null;

const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const toggleAuth = document.getElementById('toggleAuth');
const modalTitle = document.getElementById('modalTitle');
const authForm = document.getElementById('authForm');
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartUI();
    cartModal.classList.add('open');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString()} × ${item.quantity}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    if (!loggedInUser) {
        alert('Please login to complete your purchase!');
        loginModal.classList.add('active');
        return;
    }

    alert(`Thank you ${loggedInUser}! Your order is placed.`);
    cart = [];
    updateCartUI();
    cartModal.classList.remove('open');
}
loginBtn.addEventListener('click', () => {
    if (loggedInUser) {
        // Logout action
        loggedInUser = null;
        loginBtn.textContent = 'Login';
        alert('Logged out successfully.');
    } else {
        loginModal.classList.add('active');
    }
});

closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
});
toggleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    
    if (isSignUp) {
        modalTitle.textContent = 'Create Account';
        authForm.querySelector('button').textContent = 'Sign Up';
        toggleAuth.textContent = 'Login';
        toggleAuth.previousSibling.textContent = 'Already have an account? ';
    } else {
        modalTitle.textContent = 'Account Login';
        authForm.querySelector('button').textContent = 'Login';
        toggleAuth.textContent = 'Sign Up';
        toggleAuth.previousSibling.textContent = "Don't have an account? ";
    }
});

function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    loggedInUser = email.split('@')[0];
    loginBtn.textContent = `Logout (${loggedInUser})`;
    loginModal.classList.remove('active');
    
    alert(isSignUp ? 'Account created successfully!' : `Welcome back, ${loggedInUser}!`);
    authForm.reset();
}