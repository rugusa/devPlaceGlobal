document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/api/script')
        .then(response => response.json())
        .then(result => {
            const scripts = result.data; // <- aquí está el array con los scripts
            const container = document.getElementById('script-list');

            // Limpiar contenido previo
            container.innerHTML = '';

            // Crear una tarjeta por cada script
            scripts.forEach(script => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h3>${script.title}</h3>
                    <p>${script.description}</p>
                    <p><strong>Precio:</strong> ${script.price}€</p>
                    <hr/>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error al obtener scripts:', error);
        });
});
