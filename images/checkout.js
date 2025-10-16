 const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tbody = document.querySelector("#checkout-table tbody");
    const totalEl = document.getElementById("checkout-total");

    let total = 0;

    cart.forEach(item => {
      const tr = document.createElement("tr");

      const subtotal = item.price * item.quantity;
      total += subtotal;

      tr.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()}₫</td>
        <td>${item.quantity}</td>
        <td>${subtotal.toLocaleString()}₫</td>
      `;
      tbody.appendChild(tr);
    });

    totalEl.textContent = total.toLocaleString() + "₫";

    // Xử lý nút Thanh toán thực sự
    const payBtn = document.getElementById("pay-btn");
    payBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
      }

      // Ví dụ: xử lý thanh toán thành công
      alert("Thanh toán thành công! Tổng: " + total.toLocaleString() + "₫");

      // Xoá giỏ hàng sau khi thanh toán
      localStorage.removeItem("cart");

      // Quay về trang chủ
      window.location.href = "index.html";
    });