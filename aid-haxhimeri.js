// NovaLaptops - Shporta (sidebar) + footer - Aid Haxhimeri

// ----------------------
// Shporta - jQuery sidebar
// ----------------------
function setupCartSidebar() {
  const toggle = document.getElementById("cart-toggle");
  const closeBtn = document.getElementById("cart-close");
  const sidebar = $("#cart-sidebar");
  const overlay = $("#cart-overlay");

  if (!toggle || !closeBtn || sidebar.length === 0) return;

  function openCart() {
    sidebar.addClass("open");
    overlay.addClass("visible");
    overlay.stop(true, true).fadeIn(150);
  }

  function closeCart() {
    sidebar.removeClass("open");
    overlay.removeClass("visible");
    overlay.stop(true, true).fadeOut(150);
  }

  toggle.addEventListener("click", openCart);
  closeBtn.addEventListener("click", closeCart);
  overlay.on("click", closeCart);

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(
        "Kjo është një porosi demo vetëm në anën e klientit. " +
          "Asnjë pagesë nuk kryhet dhe të dhënat nuk ruhen në server."
      );
    });
  }
}

// ----------------------
// Footer year
// ----------------------
function setupFooterYear() {
  const span = document.getElementById("footer-year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}
