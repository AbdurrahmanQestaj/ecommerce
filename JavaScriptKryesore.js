// Të dhënat bazë të laptopëve + shporta + formati i çmimit.

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
  return value
    .toLocaleString("sq-AL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0
    })
    .replace("€", "€");
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
