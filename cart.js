const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Mở / đóng giỏ hàng
cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartSidebar);
overlay.addEventListener("click", closeCartSidebar);

function openCart() {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeCartSidebar() {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// Thêm sản phẩm vào giỏ
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity++;
  else cart.push({ name, price, image, quantity: 1 });
  saveCart();
  updateCart();
}

// Xoá 1 sản phẩm
function removeFromCart(name) {
  const itemDiv = Array.from(document.querySelectorAll(".cart-item"))
    .find(div => div.querySelector("p").textContent === name);

  if (itemDiv) {
    itemDiv.classList.add("removing");
    setTimeout(() => {
      cart = cart.filter(item => item.name !== name);
      saveCart();
      updateCart();
    }, 300); // thời gian trùng với fadeOut animation
  } else {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCart();
  }
}


// Thay đổi số lượng
function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(name);
  saveCart();
  updateCart();
}

// Cập nhật giao diện
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <p>${item.name}</p>
        <p>${item.price.toLocaleString()}₫</p>
        <div class="qty-controls">
          <button onclick="changeQuantity('${item.name}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity('${item.name}', 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart('${item.name}')">x</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price * item.quantity;
    count += item.quantity;
  });

  cartTotal.textContent = total.toLocaleString() + "₫";
  cartCount.textContent = count;
}

// Lưu giỏ hàng
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load khi mở trang
updateCart();
 // Gán sự kiện "Thêm vào giỏ" cho tất cả nút
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const image = btn.dataset.image;
      addToCart(name, price, image);
    });
  });
// Nút thanh toán
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    // Lưu lại giỏ hàng để trang checkout sử dụng
    saveCart();

    // Chuyển đến trang thanh toán
    window.location.href = "checkout.html";
  });
}