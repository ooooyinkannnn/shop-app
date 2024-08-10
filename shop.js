document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');

    // Fetch categories for the dropdown
    axios.get('https://fakestoreapi.com/products/categories')
        .then(response => {
            const categories = response.data;
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

    // Fetch and display products
    function fetchProducts(category = '') {
        let url = 'https://fakestoreapi.com/products';
        if (category) {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        axios.get(url)
            .then(response => {
                const products = response.data;
                displayProducts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title" title="${product.title}">${product.title}</h5>
                        <p class="card-text" title="${product.description}">${product.description}</p>
                        <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                        <a href="product.html?id=${product.id}" class="btn btn-dark">View Product</a>
                    </div>
                </div>
            </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    }

    // Initial fetch of all products
    fetchProducts();

    // Fetch products based on selected category
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        fetchProducts(selectedCategory);
    });
});
