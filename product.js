document.addEventListener('DOMContentLoaded', function() {
    const productDetailsContainer = document.getElementById('product-details');
    const successMessage = document.getElementById('success-message');

    // Get the product ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Fetch the product details
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                const product = response.data;
                displayProductDetails(product);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                productDetailsContainer.innerHTML = '<p class="text-center">Product not found.</p>';
            });
    } else {
        productDetailsContainer.innerHTML = '<p class="text-center">No product ID provided.</p>';
    }

    function displayProductDetails(product) {
        // const carouselItems = product.image.map((image, index) => `
            // `<div class="carousel-item active">
            //     <img src="${product.image}" class="d-block w-100" alt="${product.title}">
            // </div>`
        // `).join('');

        const productHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div id="carouselExampleIndicators" class="carousel slide">
                        <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="" class="active" aria-current="true"} aria-label="Slide "></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                <img src="${product.image}" class="d-block w-100" alt="${product.title}">
            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="col-md-6 product-details">
                    <h2>${product.title}</h2>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <button id="add-to-cart" class="btn btn-dark mt-3">Add to Cart</button>
                </div>
            </div>
        `;
        productDetailsContainer.innerHTML = productHTML;

        // Add event listener to the "Add to Cart" button
        document.getElementById('add-to-cart').addEventListener('click', () => {
            addToCart(product);
        });
    }

    function addToCart(product) {
        // Get the cart from local storage or initialize an empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            // Update the quantity if the product already exists
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add the product to the cart
            cart.push({ ...product, quantity: 1 });
        }

        // Save the updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show success message
        successMessage.classList.remove('d-none');
        setTimeout(() => successMessage.classList.add('d-none'), 3000); // Hide the message after 3 seconds
    }
});
