// script.js

function ambilInput() {
  const nilai = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      const elemen = document.getElementById(`a${i}${j}`);
      nilai.push(parseFloat(elemen.value) || 0);
    }
  }
  return nilai;
}

function tampilkanHasil(metode, hasil, pembahasan) {
  const elemenHasil = document.getElementById("hasil");

  // Kosongkan hasil dulu
  elemenHasil.innerHTML = "";

  // Buat elemen hasil-box baru
  const hasilBox = document.createElement("div");
  hasilBox.className = "hasil-box reveal";

  hasilBox.innerHTML = `
    <h3>Hasil Determinan (${metode}): <span class="nilai">${hasil}</span></h3>
    <div class="pembahasan">
      ${pembahasan}
    </div>
  `;

  // Tambahkan ke DOM
  elemenHasil.appendChild(hasilBox);

  // Paksa trigger animasi lagi
  setTimeout(() => {
    hasilBox.classList.add("active");
  }, 50);
}

function hitungSarrus() {
  const [a11,a12,a13,a21,a22,a23,a31,a32,a33] = ambilInput();
  const du = a11*a22*a33 + a12*a23*a31 + a13*a21*a32;
  const ds = a13*a22*a31 + a11*a23*a32 + a12*a21*a33;
  const det = du - ds;

  const pembahasan = `
    <ul>
      <li>Diagonal Utama: ${a11}×${a22}×${a33} + ${a12}×${a23}×${a31} + ${a13}×${a21}×${a32} = ${du}</li>
      <li>Diagonal Sekunder: ${a13}×${a22}×${a31} + ${a11}×${a23}×${a32} + ${a12}×${a21}×${a33} = ${ds}</li>
      <li>Determinan = ${du} - ${ds} = ${det}</li>
    </ul>`;

  tampilkanHasil("Sarrus", det, pembahasan);
}

function hitungKofaktor() {
  const [a11,a12,a13,a21,a22,a23,a31,a32,a33] = ambilInput();
  const c11 = (a22 * a33 - a23 * a32);
  const c12 = -1 * (a21 * a33 - a23 * a31);
  const c13 = (a21 * a32 - a22 * a31);

  const det = a11*c11 + a12*c12 + a13*c13;

  const pembahasan = `
    <ul>
      <li>C11 = (${a22}×${a33} - ${a23}×${a32}) = ${c11}</li>
      <li>C12 = -1×(${a21}×${a33} - ${a23}×${a31}) = ${c12}</li>
      <li>C13 = (${a21}×${a32} - ${a22}×${a31}) = ${c13}</li>
      <li>Determinan = ${a11}×${c11} + ${a12}×${c12} + ${a13}×${c13} = ${det}</li>
    </ul>`;

  tampilkanHasil("Kofaktor", det, pembahasan);
}

function animateOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }
}

document.getElementById("btnSarrus").addEventListener("click", () => {
  hitungSarrus();
});

document.getElementById("btnKofaktor").addEventListener("click", () => {
  hitungKofaktor();
});

// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");
function animateOnScroll() {
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }
}
window.onload = function() {
  document.getElementById("btnSarrus").addEventListener("click", () => {
    hitungSarrus();
  });

  document.getElementById("btnKofaktor").addEventListener("click", () => {
    hitungKofaktor();
  });

  // Scroll animation
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);
};
