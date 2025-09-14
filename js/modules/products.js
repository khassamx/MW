export async function getProducts() {
    try {
        const response = await fetch('products.json'); // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        return []; // Retorna un array vacío en caso de error
    }
}