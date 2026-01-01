
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

  if (!fullName.value.trim() || fullName.value.trim().length < 3) {
    errors.fullName =
      "Ju lutem shkruani emrin dhe mbiemrin (të paktën 3 karaktere).";
  }

  const emailVal = email.value.trim();
  if (!emailVal || !emailVal.includes("@") || !emailVal.includes(".")) {
    errors.email = "Email-i nuk është në format të vlefshëm.";
  }

  const phoneVal = phone.value.trim();
  if (!phoneVal || phoneVal.replace(/\D/g, "").length < 7) {
    errors.phone =
      "Ju lutem shkruani numrin e telefonit (të paktën 7 shifra).";
  }

  if (!topic.value) {
    errors.topic = "Ju lutem zgjidhni një temë.";
  }

  if (!message.value.trim() || message.value.trim().length < 10) {
    errors.message =
      "Mesazhi duhet të përmbajë të paktën 10 karaktere.";
  }

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


document.addEventListener("DOMContentLoaded", () => {
  setupFooterYear();
  setupCartSidebar();
  renderCart();
  updateCartCount();

  
  if (document.body.classList.contains("page-index")) {
    setupDynamicOffer();
  }

  
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

  
  if (document.body.classList.contains("page-kontakti")) {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", validateContactForm);
    }
  }
});
