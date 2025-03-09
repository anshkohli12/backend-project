document.addEventListener('DOMContentLoaded', () => {
    // For demo purposes, using a hardcoded userId
    const userId = 'user123';
    loadCart(userId);

    document.getElementById('clear-cart-btn').addEventListener('click', () => clearCart(userId));
});

async function loadCart(userId) {
    try {
        const cart = await API.getCart(userId);
        renderCart(cart);
        updateCartButtons(cart);
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

function renderCart(cart) {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('cart-total-amount');
    
    if (!cart.items || cart.items.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        totalAmount.textContent = '₹0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.items.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${cart.userId}', '${item.itemId}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${cart.userId}', '${item.itemId}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem('${cart.userId}', '${item.itemId}')">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

function updateCartButtons(cart) {
    const hasItems = cart.items && cart.items.length > 0;
    document.getElementById('checkout-btn').disabled = !hasItems;
    document.getElementById('clear-cart-btn').disabled = !hasItems;
}

async function updateQuantity(userId, itemId, newQuantity) {
    try {
        if (newQuantity <= 0) {
            await removeItem(userId, itemId);
        } else {
            await API.updateCartItem(userId, itemId, newQuantity);
        }
        loadCart(userId);
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

async function removeItem(userId, itemId) {
    try {
        await API.removeFromCart(userId, itemId);
        loadCart(userId);
    } catch (error) {
        console.error('Error removing item:', error);
    }
}

async function clearCart(userId) {
    try {
        await API.clearCart(userId);
        loadCart(userId);
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}
