// NovaLaptops - JavaScript kryesor
// Qasja klasike: manipulim direkt i DOM-it me JavaScript + jQuery, pa build tools.

// ----------------------
// Të dhënat bazë të laptopëve
// ----------------------
const LAPTOPS = [
  {
    id: 1,
    brand: "Lenovo",
    model: "ThinkPad E16",
    cpu: "Intel Core i5-1340P",
    ram: "16 GB",
    storage: "512 GB SSD",
    gpu: "Intel Iris Xe",
    segment: "biznes",
    price: 1050,
    image: "img/thinkpad_e16.svg"
  },
  {
    id: 2,
    brand: "Lenovo",
    model: "IdeaPad Slim 5",
    cpu: "AMD Ryzen 7 7840U",
    ram: "16 GB",
    storage: "1 TB SSD",
    gpu: "Radeon 780M",
    segment: "student",
    price: 950,
    image: "img/download.jpeg"
  },
  {
    id: 3,
    brand: "ASUS",
    model: "ROG Strix G16",
    cpu: "Intel Core i7-13650HX",
    ram: "16 GB",
    storage: "1 TB SSD",
    gpu: "NVIDIA GeForce RTX 4060",
    segment: "gaming",
    price: 1650,
    image: "img/ASUS ROG Strix G16.jpeg"
  },
  {
    id: 4,
    brand: "HP",
    model: "Pavilion 15",
    cpu: "Intel Core i5-1240P",
    ram: "16 GB",
    storage: "512 GB SSD",
    gpu: "Intel Iris Xe",
    segment: "student",
    price: 820,
    image: "img/HP Pavilion 15.jpeg"
  },
  {
    id: 5,
    brand: "Dell",
    model: "XPS 13 Plus",
    cpu: "Intel Core i7-1360P",
    ram: "16 GB",
    storage: "1 TB SSD",
    gpu: "Intel Iris Xe",
    segment: "biznes",
    price: 1750,
    image: "img/Dell XPS 13 Plus.jpeg"
  },
  {
    id: 6,
    brand: "MSI",
    model: "Pulse 17",
    cpu: "Intel Core i7-13700H",
    ram: "16 GB",
    storage: "1 TB SSD",
    gpu: "NVIDIA GeForce RTX 4070",
    segment: "gaming",
    price: 1950,
    image: "img/MSI Pulse 17.jpeg"
  },
  {
    id: 7,
    brand: "Apple",
    model: "MacBook Air 15 M3",
    cpu: "Apple M3",
    ram: "16 GB",
    storage: "512 GB SSD",
    gpu: "Integrated",
    segment: "student",
    price: 1600,
    image: "img/Apple MacBook Air 15 M3.jpeg"
  },
  {
    id: 8,
    brand: "Apple",
    model: "MacBook Pro 14 M3 Pro",
    cpu: "Apple M3 Pro",
    ram: "16 GB",
    storage: "1 TB SSD",
    gpu: "Integrated",
    segment: "biznes",
    price: 2400,
    image: "img/Apple MacBook Air 15 M3.jpeg"
  }
];

// ----------------------
// Shporta në anën e klientit
// ----------------------
let cart = [];

// Shto produkt në shportë
function addToCart(laptopId) {
  const item = LAPTOPS.find(l => l.id === laptopId);
  if (!item) return;

  const existing = cart.find(ci => ci.id === laptopId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();
  updateCartCount();
}

// Llogarit totali
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Numri i artikujve
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    countSpan.textContent = getCartCount();
  }
}

function formatPrice(value) {
  return value.toLocaleString("sq-AL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0
  }).replace("€", "€");
}

// Render shportën në sidebar
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  if (cart.length === 0) {
    const p = document.createElement("p");
    p.className = "cart-empty";
    p.textContent = "Shporta është bosh për momentin.";
    container.appendChild(p);
  } else {
    cart.forEach(item => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div>
          <div class="cart-item-title">${item.brand} ${item.model}</div>
          <div class="cart-item-meta">${formatPrice(item.price)} / copë</div>
        </div>
        <div class="cart-item-qty">× ${item.qty}</div>
      `;
      container.appendChild(row);
    });
  }

  totalEl.textContent = formatPrice(getCartTotal());
}

// ----------------------
// Oferta javore dinamike në faqen kryesore
// ----------------------
function setupDynamicOffer() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();

  const weekLater = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
  const day2 = weekLater.getDate().toString().padStart(2, "0");
  const month2 = (weekLater.getMonth() + 1).toString().padStart(2, "0");
  const year2 = weekLater.getFullYear();

  const offerText = document.getElementById("offer-text");
  const offerDates = document.getElementById("offer-dates");
  if (!offerText || !offerDates) return;

  const gaming = LAPTOPS.find(l => l.segment === "gaming") || LAPTOPS[0];
  const discountPrice = Math.round(gaming.price * 0.9);

  offerText.textContent =
    `${gaming.brand} ${gaming.model} me zbritje speciale vetëm këtë javë: ` +
    `${discountPrice} € nga ${gaming.price} €`;

  offerDates.textContent = `Oferta vlen nga ${day}.${month}.${year} deri më ${day2}.${month2}.${year2}.`;
}

// ----------------------
// Statistika në faqen kryesore me map/filter/reduce
// ----------------------

// ----------------------
// Katalogu i produkteve + filtra
// ----------------------
function getFilterValues() {
  const brand = document.getElementById("filter-brand")?.value || "";
  const segment = document.getElementById("filter-segment")?.value || "";
  const maxPriceStr = document.getElementById("filter-max-price")?.value || "";
  const search = document.getElementById("filter-search")?.value || "";
  const maxPrice = maxPriceStr ? Number(maxPriceStr) : null;

  return { brand, segment, maxPrice, search };
}

function applyFilters() {
  const { brand, segment, maxPrice, search } = getFilterValues();
  const searchLower = search.trim().toLowerCase();

  let result = LAPTOPS.filter(l => {
    const matchesBrand = !brand || l.brand === brand;
    const matchesSegment = !segment || l.segment === segment;
    const matchesPrice = maxPrice === null || l.price <= maxPrice;
    const matchesSearch =
      !searchLower ||
      `${l.brand} ${l.model} ${l.cpu} ${l.gpu}`
        .toLowerCase()
        .includes(searchLower);

    return matchesBrand && matchesSegment && matchesPrice && matchesSearch;
  });

  renderProductsCards(result);
  renderProductsTable(result);
  updateFilterStats(result);
}

function updateFilterStats(list) {
  const countEl = document.getElementById("filter-count");
  const avgEl = document.getElementById("filter-average");
  if (!countEl || !avgEl) return;

  const count = list.length;
  const average =
    count === 0
      ? 0
      : list.reduce((sum, l) => sum + l.price, 0) / count;

  countEl.textContent =
    count === 1
      ? "Po shfaqet 1 produkt."
      : `Po shfaqen ${count} produkte.`;
  avgEl.textContent = `Çmimi mesatar: ${Math.round(average)} €`;
}

function renderProductsCards(list) {
  const container = document.getElementById("products-cards");
  if (!container) return;
  container.innerHTML = "";

  list.forEach(l => {
    const card = document.createElement("article");
    card.className = "product-card";

    const badgeLabel =
      l.segment === "student"
        ? "Student"
        : l.segment === "biznes"
        ? "Biznes"
        : "Gaming";

    card.innerHTML = `
      <div class="product-badge">${badgeLabel}</div>
      <div class="product-img">
        <img src="${l.image}" alt="Laptop ${l.brand} ${l.model}">
      </div>
      <div class="product-title">${l.brand} ${l.model}</div>
      <div class="product-specs">
        <span>CPU: ${l.cpu}</span>
        <span>RAM: ${l.ram}</span>
        <span>Memoria: ${l.storage}</span>
        <span>GPU: ${l.gpu}</span>
      </div>
      <div class="product-price-line">
        <span>Çmimi</span>
        <span class="product-price">${l.price} €</span>
      </div>
      <button type="button" class="btn-primary small" data-add-to-cart="${l.id}">
        Shto në shportë
      </button>
    `;

    container.appendChild(card);
  });

  // Ngjit event listeners për butonat
  container
    .querySelectorAll("[data-add-to-cart]")
    .forEach(btn => {
      const id = Number(btn.getAttribute("data-add-to-cart"));
      btn.addEventListener("click", () => addToCart(id));
    });
}

function renderProductsTable(list) {
  const tbody = document.querySelector("#products-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  list.forEach(l => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${l.brand}</td>
      <td>${l.model}</td>
      <td>${l.cpu}</td>
      <td>${l.ram}</td>
      <td>${l.storage}</td>
      <td>${l.gpu}</td>
      <td>${l.segment}</td>
      <td>${l.price} €</td>
    `;
    tbody.appendChild(tr);
  });
}

function populateBrandFilter() {
  const select = document.getElementById("filter-brand");
  if (!select) return;

  const brands = Array.from(new Set(LAPTOPS.map(l => l.brand))).sort();
  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    select.appendChild(opt);
  });
}

// ----------------------
// Tabela / karta toggle
// ----------------------

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
// Forma e kontaktit – validim në anën e klientit
// ----------------------
function validateContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const fullName = form.querySelector("#full-name");
  const email = form.querySelector("#email");
  const phone = form.querySelector("#phone");
  const topic = form.querySelector("#topic");
  const message = form.querySelector("#message");
  const date = form.querySelector("#preferred-date");
  const successEl = document.getElementById("contact-success");

  const errors = {
    fullName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    date: ""
  };

  // Emri + mbiemri: min 3 karaktere
  if (!fullName.value.trim() || fullName.value.trim().length < 3) {
    errors.fullName = "Ju lutem shkruani emrin dhe mbiemrin (të paktën 3 karaktere).";
  }

  // Email: duhet të përmbajë @ dhe .
  const emailVal = email.value.trim();
  if (!emailVal || !emailVal.includes("@") || !emailVal.includes(".")) {
    errors.email = "Email-i nuk është në format të vlefshëm.";
  }

  // Telefoni: min 7 shifra
  const phoneVal = phone.value.trim();
  if (!phoneVal || phoneVal.replace(/\D/g, "").length < 7) {
    errors.phone = "Ju lutem shkruani numrin e telefonit (të paktën 7 shifra).";
  }

  // Tema
  if (!topic.value) {
    errors.topic = "Ju lutem zgjidhni një temë.";
  }

  // Mesazhi: min 10 karaktere
  if (!message.value.trim() || message.value.trim().length < 10) {
    errors.message = "Mesazhi duhet të përmbajë të paktën 10 karaktere.";
  }

  // Data në të ardhmen
  if (!date.value) {
    errors.date = "Ju lutem zgjidhni një datë të preferuar.";
  } else {
    const selected = new Date(date.value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected <= today) {
      errors.date = "Data duhet të jetë në të ardhmen.";
    }
  }

  // Shfaq gabimet
  const errorSpans = form.querySelectorAll(".error-message");
  errorSpans.forEach(span => {
    const field = span.getAttribute("data-for");
    if (field === "full-name") {
      span.textContent = errors.fullName;
    } else if (field === "email") {
      span.textContent = errors.email;
    } else if (field === "phone") {
      span.textContent = errors.phone;
    } else if (field === "topic") {
      span.textContent = errors.topic;
    } else if (field === "message") {
      span.textContent = errors.message;
    } else if (field === "preferred-date") {
      span.textContent = errors.date;
    }
  });

  const hasErrors = Object.values(errors).some(msg => msg);
  if (!hasErrors) {
    successEl.textContent =
      "Faleminderit, " +
      fullName.value.trim() +
      "! Mesazhi juaj u pranua. Do t’ju kontaktojmë së shpejti.";
    form.reset();

  } else {
    successEl.textContent = "";
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

// ----------------------
// Inicializimi
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  setupFooterYear();
  setupCartSidebar();
  renderCart();
  updateCartCount();

  // Ballina
  if (document.body.classList.contains("page-index")) {
    setupDynamicOffer();
  }

  // Produktet
  if (document.body.classList.contains("page-produktet")) {
    populateBrandFilter();
    renderProductsCards(LAPTOPS);
    renderProductsTable(LAPTOPS);
    updateFilterStats(LAPTOPS);

    const form = document.getElementById("filter-form");

    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        applyFilters();
      });
    }
  }

  // Kontakti
  if (document.body.classList.contains("page-kontakti")) {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", validateContactForm);
    }
  }

});
