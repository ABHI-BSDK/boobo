
// BOOBO PRODUCT COLLECTION

const products = [
    {
        id: 1,
        name: "Stylish T-Shirt",
        category: "Fashion",
        price: 499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 2,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 1299,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 4,
        name: "Headphones",
        category: "Electronics",
        price: 1799,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 5,
        name: "Fashion Handbag",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "Accessories",
        price: 599,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 7,
        name: "Decorative Lamp",
        category: "Home",
        price: 899,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },
    {
        id: 8,
        name: "Home Vase",
        category: "Home",
        price: 699,
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500"
    }
];

let cart = [];
let selectedCategory = "All";

// DISPLAY PRODUCTS

function displayProducts(items) {
    const grid = document.getElementById("product-grid");

    if (items.length === 0) {
        grid.innerHTML = '<p class="no-products">No products found.</p>';
        return;
    }

    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy"
                 onerror="this.src='https://placehold.co/500x400?text=BOOBO'">

            <div class="product-info">
                <small>${product.category}</small>
                <h3>${product.name}</h3>
                <p class="price">₹${product.price.toLocaleString("en-IN")}</p>

                <button class="add-button"
                    onclick="addToCart(${product.id})">
                    Add to Cart +
                </button>
            </div>
        </div>
    `).join("");
}

// CATEGORY FILTER

function filterProducts(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    searchProducts();
}

// SEARCH PRODUCTS

function searchProducts() {
    const searchValue = document
        .getElementById("search")
        .value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}

// ADD TO CART

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();

    document.getElementById("cart-count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);
}

// UPDATE CART

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString("en-IN")}</p>
                    <button class="remove-button"
                        onclick="removeItem(${item.id})">
                        Remove
                    </button>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent =
        total.toLocaleString("en-IN");

    document.getElementById("cart-count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);
}

// CHANGE QUANTITY

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

// REMOVE PRODUCT

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// OPEN AND CLOSE CART

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");
    document.getElementById("cart-overlay").classList.toggle("show");
}

// CHECKOUT DEMO

function checkout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "Thank you for shopping with BOOBO!\n" +
        "Your order total is ₹" +
        total.toLocaleString("en-IN") +
        "\nThis is a demo checkout. No payment has been made."
    );
}

// INITIALIZE WEBSITE

displayProducts(products);
updateCart();
