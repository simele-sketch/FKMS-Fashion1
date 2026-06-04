// ===============================
// FKMS FASHION - FULL WORKING JS
// ===============================

// CART STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// -------------------------------
// ADD TO CART FUNCTION
// -------------------------------

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();

    renderCart();
    updateCartCount();
}
// -------------------------------
// DISPLAY CART
// -------------------------------
function renderCart() {
    const cartBox = document.getElementById("cart-items");
    const totalBox = document.getElementById("total");

    cartBox.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        let div = document.createElement("p");

        div.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartBox.appendChild(div);
    });

    totalBox.textContent = total;
}
function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

// -------------------------------
// REMOVE ITEM FROM CART
// -------------------------------
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();

    renderCart();
    updateCartCount();
}
// -------------------------------
// CHECKOUT
// -------------------------------
function checkout() {

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    alert("Thank you for your purchase!");

    cart = [];
    localStorage.removeItem("cart");

    renderCart();
    updateCartCount();
}
// -------------------------------
// SEARCH + AUTOSUGGEST
// -------------------------------
function amazonSearch() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product-card");
    let box = document.getElementById("suggestBox");

    box.innerHTML = "";

    if (input === "") {
        box.style.display = "none";
        products.forEach(p => p.classList.remove("hide"));
        return;
    }

    let found = false;

    products.forEach(product => {
        let nameTag = product.querySelector("h3");

        if (!nameTag) return;

        let text = nameTag.textContent.toLowerCase();

        if (text.includes(input)) {
            found = true;
            product.classList.remove("hide");

            // create suggestion item
            let item = document.createElement("div");
            item.classList.add("suggest-item");
            item.textContent = nameTag.textContent;

            item.onclick = () => {
                product.scrollIntoView({ behavior: "smooth" });
                box.style.display = "none";
            };

            box.appendChild(item);

        } else {
            product.classList.add("hide");
        }
    });

    box.style.display = found ? "block" : "none";
}

const exchangeRate =150 ; // 1 USD ≈ 150 ETB (approx)

function convertPricesToETB() {
    let prices = document.querySelectorAll("[data-price]");

    prices.forEach(p => {
        let usd = parseFloat(p.getAttribute("data-price"));
        let etb = usd * exchangeRate;

        p.innerHTML = `${etb.toFixed(0)} Br`;
    });
}

window.onload = function () {
    convertPricesToETB();
};
// -------------------------------
// OPTIONAL: CLOSE SUGGEST BOX ON CLICK OUTSIDE
// -------------------------------
document.addEventListener("click", function (e) {
    let box = document.getElementById("suggestBox");
    let input = document.getElementById("searchInput");

    if (e.target !== input) {
        box.style.display = "none";
    }
});

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    let btn = document.getElementById("darkBtn");

    if (document.body.classList.contains("dark")) {
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}
document.querySelector("#signup form").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Account created successfully!");
});
document.querySelector("#contact form").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Message sent successfully!");
});