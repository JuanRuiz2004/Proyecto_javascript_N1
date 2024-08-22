document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const searchInput = document.getElementById("buscarproductos");
    const searchButton = document.getElementById("botonbuscar");

    let allProducts = []; 

    function fetchProducts() {
        fetch('productos.json')
            .then(response => response.json())
            .then(products => {
                allProducts = products;
                displayProducts(allProducts);
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
    }

    function displayProducts(products) {
        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const productImg = document.createElement("img");
            productImg.src = product.img;
            productImg.alt = product.alt;

            const productName = document.createElement("h3");
            productName.textContent = product.nombre;

            const productWeight = document.createElement("p");
            productWeight.textContent = `Peso: ${product.peso}`;

            const productPrice = document.createElement("p");
            productPrice.textContent = `Precio: ${product.precio}`;

            const addToCartButton = document.createElement("button");
            addToCartButton.textContent = ' ¡A Comprar!';
            addToCartButton.classList.add("boton_comprar");
            addToCartButton.addEventListener("click", () => addToCart(product));

            productDiv.appendChild(productImg);
            productDiv.appendChild(productName);
            productDiv.appendChild(productWeight);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(addToCartButton);

            productsContainer.appendChild(productDiv);
        });
    }

    function buscarproductos() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.busqueda.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    function addToCart(product) {
        let carro = JSON.parse(localStorage.getItem('carro')) || [];
        const existingProduct = carro.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            carro.push(product);
            alert("¡Producto añadido al carrito con exito!");
        }

        localStorage.setItem('carro', JSON.stringify(carro));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const productos = document.getElementById('productos');
        productos.innerHTML = '';

        let cart = JSON.parse(localStorage.getItem('carro')) || [];
        cart.forEach(product => {
            const item = document.createElement('li');

            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.alignItems = 'center';

            const img = document.createElement('img');
            img.src = product.img;
            img.alt = product.alt;
            img.style.width = '50px';
            img.style.marginRight = '10px';

            const detalles = document.createElement('div');
            detalles.innerHTML = `<strong>${product.nombre}</strong><br>
            ${product.quantity} x ${product.precio}<br>
            <small>Peso: ${product.peso}</small>`;

            itemDiv.appendChild(img);
            itemDiv.appendChild(detalles);

            item.appendChild(itemDiv);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.classList.add('boton_eliminar');
            removeButton.addEventListener('click', () => removeFromCart(product.id));

            item.appendChild(removeButton);

            productos.appendChild(item);
        });
    }

    function removeFromCart(productId) {
        let carro = JSON.parse(localStorage.getItem('carro')) || [];
        carro = carro.filter(item => item.id !== productId);
        localStorage.setItem('carro', JSON.stringify(carro));
        updateCartDisplay();
    }

    searchButton.addEventListener("click", buscarproductos);
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            buscarproductos();
        }
    });

    fetchProducts();
});
