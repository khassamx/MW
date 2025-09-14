import { getProducts } from './modules/products.js';
import { getCart, addToCart, removeFromCart, calculateCartTotal, clearCart } from './modules/cart.js';
import { showStatusMessage } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('#cart-modal .close-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const categoryButtons = document.getElementById('category-buttons');
    const searchInput = document.getElementById('search-input');
    const contactForm = document.getElementById('contact-form');
    const checkoutBtn = document.getElementById('checkout-btn'); // Botón de finalizar pedido en el modal

    let allProducts = [];
    let currentCart = getCart(); // Cargar el carrito al inicio

    // --- Carga inicial de productos ---
    try {
        allProducts = await getProducts();
        renderProducts(allProducts);
        updateCartCount(); // Actualizar el contador del carrito al cargar la página
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
        showStatusMessage("Error al cargar los productos. Inténtalo de nuevo más tarde.", "error");
    }

    // --- Funciones de Renderizado y Actualización ---
    function updateCartCount() {
        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function renderProducts(productsToRender) {
        productList.innerHTML = ''; // Limpiar la lista antes de renderizar
        if (productsToRender.length === 0) {
            productList.innerHTML = '<p class="no-results">No se encontraron productos que coincidan con los criterios de búsqueda o filtro.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'producto';

            // Generar miniaturas de la galería
            const thumbnailsHTML = product.images.map((img, index) =>
                `<img src="${img}" alt="Miniatura ${index + 1}" class="gallery-thumbnail" data-img-src="${img}">`
            ).join('');

            // Generar opciones de color y talla basadas en las variantes
            const uniqueColors = [...new Set(product.variants.map(v => v.color))];
            const uniqueSizes = [...new Set(product.variants.map(v => v.size))];

            const colorsHTML = uniqueColors.map(color =>
                `<option value="${color}">${color}</option>`
            ).join('');

            const sizesHTML = uniqueSizes.map(size =>
                `<option value="${size}">${size}</option>`
            ).join('');

            // Encontrar el precio de la primera variante como precio predeterminado
            const defaultPrice = product.variants[0]?.price_gs || 0;

            productDiv.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" class="product-main-image">
                <div class="product-gallery">
                    ${thumbnailsHTML}
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-options">
                    <label>Color: <select class="product-color">${colorsHTML}</select></label>
                    <label>Talla: <select class="product-size">${sizesHTML}</select></label>
                </div>
                <div class="precio">Gs. ${defaultPrice.toLocaleString('es-PY')}</div>
                <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
            `;
            productList.appendChild(productDiv);

            // Evento para cambiar la imagen principal al hacer clic en miniaturas
            const mainImage = productDiv.querySelector('.product-main-image');
            productDiv.querySelectorAll('.gallery-thumbnail').forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    mainImage.src = thumbnail.dataset.imgSrc;
                });
            });
        });
    }

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor del carrito
        if (currentCart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
        } else {
            currentCart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Color: ${item.color} | Talla: ${item.size}</p>
                        <p>Cantidad: ${item.quantity}</p>
                        <p class="cart-item-price">Gs. ${(item.price * item.quantity).toLocaleString('es-PY')}</p>
                    </div>
                    <button class="remove-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        cartTotalPrice.textContent = calculateCartTotal().toLocaleString('es-PY') + ' Gs.';
    }

    // --- Manejadores de Eventos ---

    // Abrir modal del carrito
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
        renderCart();
    });

    // Cerrar modal del carrito
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Añadir producto al carrito desde la galería
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productDiv = e.target.closest('.producto');
            const productId = e.target.dataset.id;
            const size = productDiv.querySelector('.product-size').value;
            const color = productDiv.querySelector('.product-color').value;

            const productToAdd = allProducts.find(p => p.id === productId);

            if (productToAdd) {
                const success = addToCart(productToAdd, size, color);
                if (success) {
                    currentCart = getCart(); // Actualizar el carrito local después de añadir
                    updateCartCount();
                    showStatusMessage(`"${productToAdd.name} (${color}, ${size})" añadido al carrito.`, "success");
                }
            }
        }
    });

    // Eliminar producto del carrito dentro del modal
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const productId = e.target.dataset.id;
            const size = e.target.dataset.size;
            const color = e.target.dataset.color;

            const itemToRemove = currentCart.find(item => item.id === productId && item.size === size && item.color === color);

            if (itemToRemove) {
                removeFromCart(productId, size, color);
                currentCart = getCart(); // Actualizar el carrito local después de eliminar
                renderCart(); // Volver a renderizar el carrito
                updateCartCount(); // Actualizar el contador del carrito
                showStatusMessage(`"${itemToRemove.name} (${color}, ${size})" eliminado del carrito.`, "error"); // Usar error para eliminar es común
            }
        }
    });

    // Filtrar productos por categoría
    categoryButtons.addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.tagName === 'BUTTON') {
            // Remover 'active' de todos los botones y añadirlo al clicado
            document.querySelectorAll('.category-buttons .active').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            let filteredProducts = allProducts;
            if (category !== 'all') {
                filteredProducts = allProducts.filter(p => p.category === category);
            }
            renderProducts(filteredProducts);
        }
    });

    // Búsqueda de productos
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            p.variants.some(v => v.color.toLowerCase().includes(searchTerm) || v.size.toLowerCase().includes(searchTerm))
        );
        renderProducts(filteredProducts);
    });

    // Botón "Ver Colección" en el hero
    const ctaButton = document.querySelector('.hero-overlay .cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
        });
    }


    // Finalizar pedido (desde el modal del carrito)
    checkoutBtn.addEventListener('click', () => {
        if (currentCart.length === 0) {
            showStatusMessage('Tu carrito está vacío. Añade productos para finalizar el pedido.', 'error');
            return;
        }
        // Cerrar el modal del carrito y redirigir a la sección de contacto
        cartModal.style.display = 'none';
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        showStatusMessage('Completa el formulario para enviar tu pedido.', 'success');
    });


    // Envío del formulario de contacto/pedido
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (currentCart.length === 0) {
            showStatusMessage('Tu carrito está vacío. No se puede enviar un pedido sin productos.', 'error');
            return;
        }

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        let message = `*📦 Nuevo Pedido MallyWear*\n\n`;
        message += `*👤 Datos del Cliente:*\n`;
        message += `*Nombre*: ${data.Nombre}\n`;
        message += `*Cédula*: ${data.Cedula}\n`;
        message += `*Teléfono*: ${data.Telefono}\n`;
        message += `*Ciudad*: ${data.Ciudad}\n`;
        message += `*Región/Departamento*: ${data.Region}\n`;
        message += `*Dirección de Encomienda*: ${data.Direccion}\n`;
        if (data.Mensaje) {
            message += `*Mensaje Adicional*: ${data.Mensaje}\n`;
        }
        message += `\n*🛒 Productos del Pedido:*\n`;
        currentCart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (${item.color} - ${item.size}) - Cantidad: ${item.quantity} - Precio Unit.: Gs. ${item.price.toLocaleString('es-PY')} - Subtotal: Gs. ${(item.price * item.quantity).toLocaleString('es-PY')}\n`;
        });
        message += `\n*💰 Total a Pagar*: Gs. ${calculateCartTotal().toLocaleString('es-PY')}`;
        message += `\n\n*✅ ¡MallyWear agradece tu compra!* Te contactaremos pronto para los detalles de pago y envío.`;


        const whatsappLink = `https://wa.me/595984869105?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');

        showStatusMessage('Pedido enviado a WhatsApp. ¡Gracias por tu compra!', 'success');
        contactForm.reset();
        clearCart(); // Vaciar el carrito después de enviar el pedido
        currentCart = getCart(); // Actualizar la referencia local del carrito
        updateCartCount();
        renderCart(); // Actualizar la vista del carrito (vacío)
    });
});