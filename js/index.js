// PRELOADER
(function(){
  const pre = document.getElementById('preloader');
  let loaded = false;
  function hidePreloader(){
    if(loaded) return;
    loaded = true;
    pre.style.transition = 'opacity 600ms ease, visibility 600ms';
    pre.style.opacity = '0';
    pre.style.visibility = 'hidden';
    pre.setAttribute('aria-hidden','true');
  }
  window.addEventListener('load', ()=>{ setTimeout(hidePreloader, 350); });
  setTimeout(hidePreloader, 2000);
})();

// REVEAL ON SCROLL
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('show');
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

// SMOOTH SCROLL NAV LINKS
(function(){
  document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();

// PRIMARY CTA BUTTONS
// document.querySelectorAll('.btn.primary').forEach(b=>{
//   b.addEventListener('click', ()=>{
//     const el = document.getElementById('projects');
//     if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
//   });
// });


// FORM CONTROL
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Es. Mario Rossi"]').value.trim();
    const email = form.querySelector('input[placeholder="tuo@email.com"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    // Controllo dei campi
    if (!name || !email || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }

    // Prepara la mailto
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Apre Gmail (oppure il client di posta predefinito)
    window.location.href = `mailto:yourmail@gmail.com?subject=${subject}&body=${body}`;
  });
});
