let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function getCart() {
    return cart;
}

export function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

export function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Gs. ${item.price_gs.toLocaleString('es-PY')}</p>
                        <p>Cantidad: ${item.quantity}</p>
                    </div>
                </div>
                <button class="remove-btn" data-id="${item.id}">X</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    const cartTotal = calculateCartTotal();
    document.getElementById('cart-total-price').textContent = `Gs. ${cartTotal.toLocaleString('es-PY')}`;
    
    // Añadir listener para el botón de eliminar
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

export function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price_gs * item.quantity), 0);
}

export function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}