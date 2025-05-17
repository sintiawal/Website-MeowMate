const dataKucing = [
  {
    nama: "Khalid Khasmiri",
    umur: "1 Tahun",
    ras: "Sphynx",
    jenis: "Jantan",
    perawatan: "Bersihkan minyak alami dari tubuh seminggu sekali.",
    gambar: "khalidkhasmiri.jpg"
  },
  {
    nama: "Oyen",
    umur: "2 Bulan",
    ras: "Tabby orange short-hair",
    jenis: "Jantan",
    perawatan: "Makanan tinggi protein & rutin grooming.",
    gambar: "oyen.jpg"
  },
  {
    nama: "Uiiauiia",
    umur: "2 Tahun",
    ras: "Munchkin",
    jenis: "Jantan",
    perawatan: "Hindari makanan tinggi lemak, gunakan mainan interaktif.",
    gambar: "uiiauiia.jpg"
  },
  {
    nama: "Worlddestroyer7799",
    umur: "6 Bulan",
    ras: "Scottish Fold",
    jenis: "Jantan",
    perawatan: "Periksa tulang belakang dan sendi secara rutin.",
    gambar: "worlddestroyer7799.jpg"
  },
  {
    nama: "Oreo",
    umur: "2 Tahun",
    ras: "Tuxedo DSH",
    jenis: "Jantan",
    perawatan: "Sikat bulu 1-2x seminggu.",
    gambar: "oreo.jpg"
  },
  {
    nama: "Ahmad Sumbul",
    umur: "4 Bulan",
    ras: "Persian Mix",
    jenis: "Jantan",
    perawatan: "Sikat bulu setiap hari.",
    gambar: "ahmadsumbul.jpg"
  },
  {
    nama: "Apin",
    umur: "2 Tahun",
    ras: "DSH",
    jenis: "Jantan",
    perawatan: "Jaga kebersihan area mata.",
    gambar: "apin.jpg"
  },
  {
    nama: "Chucky",
    umur: "5 Bulan",
    ras: "Tabby  orange short hair",
    jenis: "Betina",
    perawatan: "Berikan makanan tinggi protein.",
    gambar: "chucky.jpg"
  },
  {
    nama: "Malika",
    umur: "2 Tahun",
    ras: "Anggora Lokal",
    jenis: "Betina",
    perawatan: "Sisir bulu minimal 2x seminggu.",
    gambar: "malika.jpg"
  }
];

const container = document.querySelector("#daftarKucing");
const formAdopsi = document.getElementById("formAdopsi");
const namaKucingSpan = document.getElementById("namaKucing");

let adopsiList = JSON.parse(localStorage.getItem("adopsiList")) || [];

dataKucing.forEach((kucing) => {
  const sudahDiadopsi = adopsiList.some(data => data.namaKucing === kucing.nama);
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${kucing.gambar}" alt="Foto ${kucing.nama}">
    <h3>${kucing.nama}</h3>
    <p><strong>Ras:</strong> ${kucing.ras}</p>
    <p><strong>Jenis:</strong> ${kucing.jenis}</p>
    <p><strong>Perawatan:</strong> ${kucing.perawatan}</p>
    ${sudahDiadopsi 
      ? '<button disabled>Sudah Diadopsi</button>' 
      : `<button onclick="bukaForm('${kucing.nama}')">Adopsi</button>`}
  `;
  container.appendChild(card);
});

function bukaForm(nama) {
  namaKucingSpan.textContent = nama;
  formAdopsi.style.display = "block";
  window.scrollTo({ top: formAdopsi.offsetTop, behavior: "smooth" });
}

document.getElementById("adopsiForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const dataAdopsi = {
    namaKucing: namaKucingSpan.textContent,
    namaPemohon: this.nama.value,
    emailPemohon: this.email.value,
    teleponPemohon: this.telepon.value,
    tanggalAdopsi: new Date().toLocaleString()
  };
  adopsiList.push(dataAdopsi);
  localStorage.setItem("adopsiList", JSON.stringify(adopsiList));
  alert("Meow~ Permintaan adopsi terkirim!");
  formAdopsi.style.display = "none";
  this.reset();
  location.reload();
});

// Login Modal
function showLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function hideLogin() {
  document.getElementById("loginModal").style.display = "none";
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Login berhasil (dummy). Silakan upload kucingmu sekarang.");
  hideLogin();
});

// Upload kucing (dummy, belum ke database)
document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Data kucing berhasil diunggah! (simulasi)");
  this.reset();
});
// Fungsi untuk menutup form adopsi
function tutupForm() {
  formAdopsi.style.display = "none";
}
const reviewForm = document.getElementById("reviewForm");
const listReview = document.getElementById("listReview");

reviewForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("namaReviewer").value;
  const isi = document.getElementById("isiReview").value;

  const p = document.createElement("p");
  p.innerHTML = `💬 "${isi}" - ${nama}`;
  listReview.appendChild(p);

  // Reset form
  reviewForm.reset();

  // Opsional: Simpan ke localStorage agar tidak hilang saat di-refresh
  const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  savedReviews.push({ nama, isi });
  localStorage.setItem("reviews", JSON.stringify(savedReviews));
});

// Tampilkan review yang tersimpan saat halaman dimuat
window.addEventListener("load", () => {
  const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  savedReviews.forEach(r => {
    const p = document.createElement("p");
    p.innerHTML = `💬 "${r.isi}" - ${r.nama}`;
    listReview.appendChild(p);
  });
});

let userCats = JSON.parse(localStorage.getItem("userCats")) || [];
function renderUserCats() {
  userCats.forEach((kucing, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${kucing.gambar}" alt="Foto ${kucing.nama}">
      <h3>${kucing.nama}</h3>
      <p><strong>Umur:</strong> ${kucing.umur} bulan</p>
      <p><strong>Kondisi:</strong> ${kucing.kondisi}</p>
      <p><strong>Alamat:</strong> ${kucing.alamat}</p>
    `;
    container.appendChild(card);
  });
}
renderUserCats();
document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = this.nama.value;
  const umur = this.umur.value;
  const kondisi = this.kondisi.value;
  const alamat = this.alamat.value;
  const fileInput = this.gambar;
  const reader = new FileReader();

  reader.onload = function() {
    const newCat = {
      nama: nama,
      umur: umur,
      kondisi: kondisi,
      alamat: alamat,
      gambar: reader.result  // Data URL (base64)
    };
    userCats.push(newCat);
    localStorage.setItem("userCats", JSON.stringify(userCats));
    alert("Kucing berhasil diunggah!");
    location.reload(); // Refresh untuk menampilkan kucing baru
  };

  reader.readAsDataURL(fileInput.files[0]);
});
