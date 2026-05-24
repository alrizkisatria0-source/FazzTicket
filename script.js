//nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}
const page = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === page) link.classList.add("active");
});
const toTopBtn = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (toTopBtn) toTopBtn.classList.toggle("show", window.scrollY > 400);
});
if (toTopBtn) {
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObs.observe(el));

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mountain = document.getElementById("mountain").value;
    const date = document.getElementById("date").value;
    const climbers = document.getElementById("climbers").value;
    if (!name || !phone || !mountain || !date || !climbers) {
      alert("Harap lengkapi semua data terlebih dahulu.");
      return;
    }
    const dateObj = new Date(date);
    const formatted = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const message =
      `Halo FazTicket! \n\n` +
      `Saya ingin memesan tiket pendakian:\n` +
      `Nama      : ${name}\n` +
      `WhatsApp  : ${phone}\n` +
      `Gunung    : ${mountain}\n` +
      `Tanggal   : ${formatted}\n` +
      `Peserta   : ${climbers} orang\n\n` +
      `Mohon konfirmasi pemesanan saya. Terima kasih! `;
    const waNumber = "6285751787232";
    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    bookingForm.reset();
  });
}
const chartCanvas = document.getElementById("visitorChart");
if (chartCanvas) {
  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      datasets: [
        {
          label: "Jumlah Pendaki",
          data: [
            420, 580, 710, 830, 1050, 1340, 1580, 1420, 1100, 870, 650, 390,
          ],
          backgroundColor: "#1a6bcc",
          borderRadius: 7,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y.toLocaleString("id")} pendaki`,
          },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: "#e8f2ff" },
          ticks: { callback: (v) => v.toLocaleString("id") },
        },
      },
    },
  });
}
