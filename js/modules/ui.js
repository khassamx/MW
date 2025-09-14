export function showStatusMessage(message, type) {
    const statusMessageElement = document.getElementById('status-message');
    if (statusMessageElement) {
        statusMessageElement.textContent = message;
        statusMessageElement.className = `status-message ${type}`;
        statusMessageElement.style.display = 'block';

        setTimeout(() => {
            statusMessageElement.style.display = 'none';
        }, 5000);
    } else {
        console.warn('Elemento #status-message no encontrado en el DOM.');
        // Fallback simple si el elemento no existe (ej. para depuración)
        alert(`${type.toUpperCase()}: ${message}`);
    }
}