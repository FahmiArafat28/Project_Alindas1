document.addEventListener("DOMContentLoaded", () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll(".section").forEach(sec => obs.observe(sec));
});

/************ Utilitas ************/
const $ = id => document.getElementById(id);
const vals = () => [
  +$('a11').value || 0, +$('a12').value || 0, +$('a13').value || 0,
  +$('a21').value || 0, +$('a22').value || 0, +$('a23').value || 0,
  +$('a31').value || 0, +$('a32').value || 0, +$('a33').value || 0
];

/************ Hitung Sarrus ************/
function sarrus([a11,a12,a13,a21,a22,a23,a31,a32,a33]){
  const du = a11*a22*a33 + a12*a23*a31 + a13*a21*a32;
  const ds = a13*a22*a31 + a11*a23*a32 + a12*a21*a33;
  const det = du - ds;
  const langkah =
`Du (Diagonal kanan):
  ${a11}·${a22}·${a33} + ${a12}·${a23}·${a31} + ${a13}·${a21}·${a32} = ${du}

Ds (Diagonal kiri):
  ${a13}·${a22}·${a31} + ${a11}·${a23}·${a32} + ${a12}·${a21}·${a33} = ${ds}

Determinan = Du − Ds = ${det}`;
  return {det, langkah};
}

/************ Hitung Kofaktor (baris 1) ************/
function kofaktor([a11,a12,a13,a21,a22,a23,a31,a32,a33]){
  const M11=a22*a33-a23*a32, M12=a21*a33-a23*a31, M13=a21*a32-a22*a31;
  const C11= M11, C12=-M12, C13=M13;
  const det = a11*C11 + a12*C12 + a13*C13;
  const langkah =
`Minor & Kofaktor:
  M11=${M11} → C11=${C11}
  M12=${M12} → C12=${C12}
  M13=${M13} → C13=${C13}

Determinan:
  ${a11}·${C11} + ${a12}·${C12} + ${a13}·${C13} = ${det}`;
  return {det, langkah};
}

/************ Tampilkan hasil ************/
function tampil(method, {det, langkah}){
  const card = document.createElement("div");
  card.className = "result-card";
  card.innerHTML = `<h3>${method}</h3>
<p><strong>Hasil:</strong> ${det}</p>
<pre>${langkah}</pre>`;
  $('hasil').prepend(card);
}

/************ Event listener tombol ************/
$('btnSarrus').onclick = () => {
  $('hasil').innerHTML = "";               
  tampil("Metode Sarrus", sarrus(vals()));
};
$('btnKofaktor').onclick = () => {
  $('hasil').innerHTML = "";
  tampil("Ekspansi Kofaktor", kofaktor(vals()));
};
