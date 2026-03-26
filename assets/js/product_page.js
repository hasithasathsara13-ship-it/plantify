// ================= TOGGLE (UNCHANGED) =================
function setupSelectionToggle(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    element.addEventListener('click', () => {
      const currentActive = element.parentElement.querySelector('.active');
      if (currentActive) currentActive.classList.remove('active');
      element.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSelectionToggle('.color_circle');
  setupSelectionToggle('.size_btn');
});

// ================= CART =================
const cartSide = document.getElementById("cartSide");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartIcon = document.querySelector(".ri-shopping-cart-2-line");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// OPEN CART
cartIcon.onclick = () => {
  cartSide.classList.add("active");
  cartOverlay.classList.add("active");
};

closeCart.onclick = () => closeCartFunction();
cartOverlay.onclick = () => closeCartFunction();

function closeCartFunction() {
  cartSide.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// ================= ADD TO CART (FIXED) =================
const addBtn = document.querySelector(".add_to_cart");

addBtn.addEventListener("click", () => {

  const name = document.getElementById("product_name").innerText;

  const price = parseInt(
    document.getElementById("product_price").innerText.replace("Rs.", "")
  );

  const size = document.querySelector(".size_btn.active").innerText;

  const image = document.querySelector(".product_card img").src;

  const id = name + "-" + size; // unique per size

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id,
      name: name + " (" + size + ")",
      price,
      image,
      quantity: 1
    });
  }

  updateCart();

  // OPEN CART AFTER ADD
  cartSide.classList.add("active");
  cartOverlay.classList.add("active");
});

// ================= UPDATE CART =================
function updateCart() {
  cartItemsContainer.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}">
      <div class="cart-info">
        <h5>${item.name}</h5>
        <p>Rs.${item.price}</p>
        <div class="quantity-control">
          <button onclick="changeQty('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotal.innerText = total;
  cartCount.innerText = count;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= CHANGE QTY =================
function changeQty(id, amount) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

// LOAD CART ON PAGE LOAD
updateCart();

// ================= SIZE PRICE UPDATE =================
document.addEventListener('DOMContentLoaded', () => {
  const sizeBtns = document.querySelectorAll('.size_btn');
  const priceDisplay = document.getElementById('product_price');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.size_btn.active').classList.remove('active');
      btn.classList.add('active');

      const newPrice = btn.getAttribute('data-price');
      priceDisplay.innerText = `Rs.${newPrice}`;

      priceDisplay.style.transform = "scale(1.1)";
      setTimeout(() => { priceDisplay.style.transform = "scale(1)"; }, 100);
    });
  });
});

// ================= WISHLIST =================
const wishlistBtn = document.querySelector(".wishlist_btn");
const heartIcon = document.querySelector(".wishlist_btn i");

wishlistBtn.addEventListener("click", function () {

  heartIcon.classList.toggle("active");

  if (heartIcon.classList.contains("active")) {
    heartIcon.classList.remove("ri-heart-line");
    heartIcon.classList.add("ri-heart-fill");
  } else {
    heartIcon.classList.remove("ri-heart-fill");
    heartIcon.classList.add("ri-heart-line");
  }

});