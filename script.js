/* cuon menu*/
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});



const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === i);
    dots[idx].classList.toggle('active', idx === i);
  });
  index = i;
}

// Auto slide
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 3000);

// Click dot
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.index));
  });
});

// Testimonials carousel
let currentReview = 0;
const reviews = document.querySelectorAll(".review");

function showReview(index) {
  reviews.forEach((rev, i) => {
    rev.classList.remove("active");
    if (i === index) rev.classList.add("active");
  });
}

document.getElementById("next").addEventListener("click", () => {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
});

document.getElementById("prev").addEventListener("click", () => {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(currentReview);
});

// Auto slide mỗi 5s
setInterval(() => {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
}, 5000);

// Contact form xử lý
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
  e.target.reset();
});


// About
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


   // Hiển thị popup
    document.getElementById("openLogin").onclick = () =>
      document.getElementById("loginPopup").style.display = "flex";

    document.getElementById("openRegister").onclick = () =>
      document.getElementById("registerPopup").style.display = "flex";

    function closePopup(id) {
      document.getElementById(id).style.display = "none";
    }

    window.onclick = function(e) {
      if (e.target.classList.contains('popup')) e.target.style.display = "none";
    }

    // === Đăng ký tài khoản ===
    function register() {
      const user = document.getElementById("regUser").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const pass = document.getElementById("regPass").value.trim();

      if (!user || !email || !pass) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find(u => u.user === user)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
      }

      users.push({ user, email, pass });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Đăng ký thành công! Hãy đăng nhập.");
      closePopup("registerPopup");
    }

    // === Đăng nhập ===
    function login() {
      const user = document.getElementById("loginUser").value.trim();
      const pass = document.getElementById("loginPass").value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];

      let found = users.find(u => u.user === user && u.pass === pass);

      if (found) {
        localStorage.setItem("currentUser", user);
        showWelcome();
        closePopup("loginPopup");
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    }

    // === Hiển thị chào mừng ===
    function showWelcome() {
      const user = localStorage.getItem("currentUser");
      if (user) {
        document.getElementById("welcome").innerHTML = `Xin chào, ${user}!`;
        document.getElementById("openLogin").style.display = "none";
        document.getElementById("openRegister").style.display = "none";
      }
    }

    // === Giữ trạng thái đăng nhập sau khi tải lại trang ===
    window.onload = showWelcome;

