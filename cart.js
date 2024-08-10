// Initialize the cart from localStorage or create an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartCount);
}

// Function to add a product to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // If the product is already in the cart, increment the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it as a new item
        cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count in the header
    updateCartCount();
}

// Function to render cart items in the cart page
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemRow = document.createElement('tr');

        itemRow.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
                ${item.title}
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-id="${item.id}"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">Remove</button></td>
        `;

        cartItemsContainer.appendChild(itemRow);
    });

    updateCartTotal();
}

// Function to update the cart total
function updateCartTotal() {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = `$${cartTotal.toFixed(2)}`;
    document.getElementById('order-total').textContent = `$${cartTotal.toFixed(2)}`;
}

// Function to update item quantity in the cart
function updateItemQuantity(id, quantity) {
    const item = cart.find(item => item.id == id);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }
}

// Function to remove an item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Event listeners for quantity change and remove buttons
document.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        const id = event.target.dataset.id;
        const quantity = parseInt(event.target.value);
        updateItemQuantity(id, quantity);
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const id = event.target.dataset.id;
        removeFromCart(id);
    }
});

// Initialize cart count and render cart items on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    if (document.getElementById('cart-items')) {
        renderCartItems();
    }
});
