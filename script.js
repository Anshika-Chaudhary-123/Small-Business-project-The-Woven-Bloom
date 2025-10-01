// Flip functionality
const flipCards = document.querySelectorAll('.flips');
flipCards.forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() === "button") return;
        this.classList.toggle('flipped');
    });
});

// ------------------ CART FUNCTIONALITY ------------------

// Select all ADD buttons
const addButtons = document.querySelectorAll('.flips button');

// Cart data
let cart = [];

// Cart section
const cartSection = document.querySelector("#yourCart");

// Create a container inside cart section
const cartList = document.createElement("ul");
const cartTotal = document.createElement("p");
const buyNowBtn = document.createElement("button");

cartList.style.listStyle = "none";
cartList.style.padding = "10px";
cartTotal.style.fontWeight = "bold";
buyNowBtn.textContent = "Buy Now";
buyNowBtn.style.marginTop = "10px";
buyNowBtn.style.padding = "10px 20px";
buyNowBtn.style.background = "#d2691e";
buyNowBtn.style.color = "#fff";
buyNowBtn.style.border = "none";
buyNowBtn.style.borderRadius = "8px";
buyNowBtn.style.cursor = "pointer";

cartSection.appendChild(cartList);
cartSection.appendChild(cartTotal);
cartSection.appendChild(buyNowBtn);

// Function to update cart UI
function updateCart() {
    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Total Items: ${cart.length} | Total Price: ₹${total}`;
}

// Add to cart button click
addButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        const productCard = this.closest(".flips");
        const name = productCard.querySelector(".front h3").textContent.trim();

        // price is in the back side inside <span>Price:
        const backText = productCard.querySelector(".back").textContent;
        const priceMatch = backText.match(/Price:\s*(\d+)/i);
        const price = priceMatch ? parseInt(priceMatch[1]) : 0;

        // Push product to cart
        cart.push({ name, price });

        updateCart();
        alert(`${name} has been added to your cart!`);
    });
});

// Buy Now button
buyNowBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Your items have been purchased!");
    cart = [];
    updateCart();
});