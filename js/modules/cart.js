export let cart = JSON.parse(localStorage.getItem('mallywearCart')) || [];

export function getCart() {
    return cart;
}

export function addToCart(product, size, color) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size && item.color === color);
    const variant = product.variants.find(v => v.size === size && v.color === color);

    if (!variant) {
        console.error("Variante no encontrada para el producto:", product.id, size, color);
        return false; // No se pudo añadir si la variante no existe
    }

    if (existingItem) {
        if (existingItem.quantity < variant.stock) {
            existingItem.quantity += 1;
            saveCart();
            return true;
        } else {
            alert(`No hay más stock de ${product.name} (${color}, ${size}).`);
            return false;
        }
    } else {
        if (variant.stock > 0) {
            cart.push({
                id: product.id,
                name: product.name,
                color: color,
                size: size,
                price: variant.price_gs,
                image: variant.image,
                quantity: 1,
                maxStock: variant.stock // Guardamos el stock máximo para no excederlo
            });
            saveCart();
            return true;
        } else {
            alert(`El producto ${product.name} (${color}, ${size}) está agotado.`);
            return false;
        }
    }
}

export function removeFromCart(productId, size, color) {
    cart = cart.filter(item => !(item.id === productId && item.size === size && item.color === color));
    saveCart();
}

export function saveCart() {
    localStorage.setItem('mallywearCart', JSON.stringify(cart));
}

export function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function clearCart() {
    cart = [];
    saveCart();
}