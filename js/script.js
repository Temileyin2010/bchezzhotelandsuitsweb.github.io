document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Switch
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // Pre-fill Check-In/Out Inputs
  const checkinInputs = document.querySelectorAll("input[type='date'][id*='checkin']");
  const checkoutInputs = document.querySelectorAll("input[type='date'][id*='checkout']");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  checkinInputs.forEach(input => { if (!input.value) input.value = formatDate(today); });
  checkoutInputs.forEach(input => { if (!input.value) input.value = formatDate(tomorrow); });

  // FAQ Accordion Interactivity
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle("active");
    });
  });

  // Booking Calculator Logic
  const calcRoom = document.getElementById("calcRoom");
  const calcCheckin = document.getElementById("booking-checkin");
  const calcCheckout = document.getElementById("booking-checkout");
  const calcNights = document.getElementById("calcNights");
  const calcRate = document.getElementById("calcRate");
  const calcTotal = document.getElementById("calcTotal");

  const roomRates = {
    "Deluxe Single": 35000,
    "Deluxe Double": 42000,
    "Executive Suite": 55000,
    "Serviced Apartment": 70000
  };

  function updatePriceCalculator() {
    if (!calcRoom || !calcCheckin || !calcCheckout) return;

    const selectedRoom = calcRoom.value;
    const rate = roomRates[selectedRoom] || 35000;
    
    const d1 = new Date(calcCheckin.value);
    const d2 = new Date(calcCheckout.value);
    
    let nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const total = rate * nights;

    if (calcRate) calcRate.textContent = `₦${rate.toLocaleString()}`;
    if (calcNights) calcNights.textContent = `${nights} Night(s)`;
    if (calcTotal) calcTotal.textContent = `₦${total.toLocaleString()}`;
  }

  if (calcRoom && calcCheckin && calcCheckout) {
    calcRoom.addEventListener("change", updatePriceCalculator);
    calcCheckin.addEventListener("change", updatePriceCalculator);
    calcCheckout.addEventListener("change", updatePriceCalculator);
    updatePriceCalculator();
  }

  // Handle Reservation Form Submission
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your reservation request has been transmitted to Bchezz Hotel reception. We will call you at 0908 874 9577 shortly.");
      reservationForm.reset();
    });
  }
});