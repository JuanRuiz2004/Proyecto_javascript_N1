document.addEventListener("DOMContentLoaded", () => {
    function updateCarroDisplay() {
        const productos = document.getElementById('productos');
        const compratotal = document.getElementById('compratotal');
        productos.innerHTML = '';

        let carro = JSON.parse(localStorage.getItem('carro')) || [];
        let total = 0;

        carro.forEach((product, index) => {
            const item = document.createElement('li');

            const contenedor = document.createElement('div');
            contenedor.style.display = "flex";
            contenedor.style.alignItems = "center";
            
            const img = document.createElement('img');
            img.src = product.img;
            img.alt = product.alt;
            img.style.width = "50px"; 
            img.style.marginRight = "10px";
            
            const detalles = document.createElement('div');
            detalles.innerHTML = `<strong>${product.nombre}</strong><br>
            ${product.quantity} x ${product.precio}<br>
            <small>Peso: ${product.peso}</small>`;

            contenedor.appendChild(img);
            contenedor.appendChild(detalles);
            
            item.appendChild(contenedor);

            const priceValue = parseFloat(product.precio.replace(/[^0-9.-]+/g, ""));
            total += priceValue * product.quantity;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar Producto';
            removeButton.classList.add('boton_eliminar');
            removeButton.addEventListener('click', () => removeFromCart(index));
            item.appendChild(removeButton);

            productos.appendChild(item);
        });

        compratotal.textContent = `$${total.toFixed(3)} COP`;
    }

    function removeFromCart(index) {
        let carro = JSON.parse(localStorage.getItem('carro')) || [];
        carro.splice(index, 1);
        localStorage.setItem('carro', JSON.stringify(carro));
        updateCarroDisplay();
    }

    updateCarroDisplay();

    document.getElementById('boton').addEventListener('click', () => {
        alert("¡Gracias por tu compra bebesote!");
        localStorage.removeItem('carro');
        updateCarroDisplay();
    });
});