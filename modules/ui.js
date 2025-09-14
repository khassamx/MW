export function showStatusMessage(message, type) {
    const statusMessageElement = document.getElementById('status-message');
    statusMessageElement.textContent = message;
    statusMessageElement.className = `status-message ${type}`;
    statusMessageElement.style.display = 'block';

    setTimeout(() => {
        statusMessageElement.style.display = 'none';
    }, 5000);
}