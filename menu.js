let currentWeek = 1;
let menuData = {};

async function loadMenuData() {
  const res = await fetch("menu.json");
  menuData = await res.json();
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById("menu-content");
  const data = menuData[`week${currentWeek}`];
  const fadeDiv = document.querySelector(".fade");

  // Hiệu ứng mờ dần trước khi đổi
  fadeDiv.classList.add("hidden");

  setTimeout(() => {
    container.innerHTML = "";

    // Cập nhật ngày đầu – cuối
    document.getElementById("start-date").textContent = data[0].date;
    document.getElementById("end-date").textContent = data[data.length - 1].date;

    // Tạo từng hàng thực đơn
    data.forEach(item => {
      const row = document.createElement("div");
      row.className = "menu-row";
      row.innerHTML = `
        <div class="day-col">
          <div class="day-cell">${item.day}<br>${item.date}</div>
        </div>
        <div class="meal-cell">
          <div class="meal-title">${item.lunch.title}${item.lunch.new ? '<span class="new-label">NEW</span>' : ''}</div>
          <div class="meal-sub">${item.lunch.sub}</div>
          <div class="kcal">${item.lunch.kcal}</div>
        </div>
        <div class="meal-cell">
          <div class="meal-title">${item.dinner.title}${item.dinner.new ? '<span class="new-label">NEW</span>' : ''}</div>
          <div class="meal-sub">${item.dinner.sub}</div>
          <div class="kcal">${item.dinner.kcal}</div>
        </div>
      `;
      container.appendChild(row);
    });

    // Hiển thị lại sau khi đổi nội dung
    setTimeout(() => fadeDiv.classList.remove("hidden"), 50);
  }, 400);
}

// Điều hướng tuần
document.getElementById("prev-week").addEventListener("click", () => {
  if (currentWeek > 1) {
    currentWeek--;
    renderMenu();
  }
});

document.getElementById("next-week").addEventListener("click", () => {
  if (currentWeek < Object.keys(menuData).length) {
    currentWeek++;
    renderMenu();
  }
});

loadMenuData();
