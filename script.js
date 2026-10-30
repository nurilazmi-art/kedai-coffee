// Tandai bahwa JavaScript aktif (dipakai CSS untuk animasi .reveal)
document.documentElement.classList.add("js");

/* =========================================================
   KONFIGURASI (ubah bagian ini sesuai data asli)
   ========================================================= */
// Isi nomor WhatsApp format internasional tanpa tanda + atau spasi.
// Contoh: "6281234567890". Biarkan kosong jika belum ada.
const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE = "Halo Kedai Coffee, saya ingin bertanya.";

/* =========================================================
   1. MENU HAMBURGER
   ========================================================= */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Tutup menu setelah salah satu tautan diklik
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* =========================================================
   2. BAYANGAN NAVBAR SAAT SCROLL
   ========================================================= */
const navbar = document.getElementById("navbar");
function handleScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", handleScroll);
handleScroll();

/* =========================================================
   3. ANIMASI MUNCUL SAAT SCROLL (tanpa library)
   ========================================================= */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animasi cukup sekali
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  // Browser lama: langsung tampilkan semua
  revealItems.forEach((item) => item.classList.add("visible"));
}

/* =========================================================
   4. TAHUN OTOMATIS DI FOOTER
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   5. TOMBOL WHATSAPP (hanya aktif jika nomor diisi)
   ========================================================= */
const waButton = document.getElementById("waButton");
const waNote = document.getElementById("waNote");

if (WHATSAPP_NUMBER.trim() !== "") {
  waButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  waButton.hidden = false;
  waNote.hidden = true;
}

/* =========================================================
   6. GAMBAR CADANGAN
   Jika gambar gagal dimuat, sembunyikan gambar rusak.
   Warna cokelat dari CSS akan tampil sebagai latar.
   ========================================================= */
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
  });
});