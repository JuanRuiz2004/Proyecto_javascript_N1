document.addEventListener("DOMContentLoaded", () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const productsContainer = document.getElementById("products");

            const comprar = document.createElement("h1");
            comprar.textContent = "¿Qué te gustaría comprar?";
            comprar.classList.add("cabeza");
            const body = document.querySelector("body");
            const productos2 = document.getElementById("products");
            body.insertBefore(comprar, productos2);

            productos.forEach(product => {
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

                const buyButton = document.createElement("button");
                buyButton.textContent = " ¡A Comprar!";
                buyButton.classList.add("boton_comprar");
                buyButton.addEventListener("click", () => {
                    addToCart(product);
                });
                productDiv.appendChild(productImg);
                productDiv.appendChild(productName);
                productDiv.appendChild(productWeight);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(buyButton);

                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});

function addToCart(product) {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];
    const existingProduct = carro.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
      
    } else {
        product.quantity = 1;
        carro.push(product);
        alert("¡producto añadido al carrito con exito!")
    }

    localStorage.setItem('carro', JSON.stringify(carro));
    updateCartDisplay();
}

function updateCartDisplay() {
    const productos = document.getElementById('productos');
    productos.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem('carro')) || [];
    carro.forEach(product => {
        const item = document.createElement('li');
        item.textContent = ` ${product.img} - ${product.nombre} - ${product.quantity} x ${product.precio}`;
        productos.appendChild(item);
    });
}


updateCartDisplay();