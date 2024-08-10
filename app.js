document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from the API
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            const products = response.data.slice(0, 4); // Get products from index 0 to 4
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from the API
    axios.get('https://fakestoreapi.com/products/categories')
        .then(response => {
            const categories = response.data.slice(0, 4);
            displayCategories(categories);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
});

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productCard = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title" title="${product.title}">${product.title}</h5>
                        <p class="card-text" title="${product.description}">${product.description}</p>
                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                        <a href="product.html?id=${product.id}" class="btn btn-dark">View Product</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}


// Function to display products
function displayCategories(categories) {
    const container = document.getElementById('category-container');
    container.innerHTML = ''; // Clear any existing content
    let images = ['./images/electronics.png', './images/jewelry.png', './images/men.png', './images/women.png']
    let iteration = 0
    categories.forEach(category => {
        const productCard = `
            <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${images[iteration]}" class="card-img-top" alt="Category 1">
                        <div class="card-body">
                            <h5 class="card-title">${category}</h5>
                            <a href="shop.html" class="btn btn-dark">Shop Now</a>
                        </div>
                    </div>
                </div>
        `;
        container.innerHTML += productCard;
        iteration++
    });
}
