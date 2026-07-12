/*==================================================
  QUANTUM PORTFOLIO SCRIPT — "Signal from 2147"
  22nd Century Interface Controller
==================================================*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*=========================================
QUANTUM BOOT SEQUENCE
=========================================*/
(function quantumBoot(){
  const boot = document.getElementById("quantumBoot");
  if(!boot) return;

  if(prefersReducedMotion){
    boot.classList.add("hide");
    setTimeout(()=>boot.remove(), 50);
    return;
  }

  const lines = document.querySelectorAll(".boot-line");
  const bar = document.querySelector(".boot-progress-bar");
  const pct = document.querySelector(".boot-progress-text");
  let delay = 300;
  let totalChars = 0;

  lines.forEach(l => totalChars += (l.getAttribute("data-full") || "").length);
  let charDelay = 18;

  lines.forEach((line, i) => {
    const full = line.getAttribute("data-full") || "";
    setTimeout(() => {
      let idx = 0;
      const type = setInterval(() => {
        line.textContent = full.substring(0, idx++);
        if(bar && pct) {
          const progress = Math.min(100, Math.round((idx / full.length) * (100 / lines.length) + (i * 100 / lines.length)));
          bar.style.width = progress + "%";
          pct.textContent = progress + "%";
        }
        if(idx > full.length) clearInterval(type);
      }, charDelay);
    }, delay);
    delay += full.length * charDelay + 250;
  });

  setTimeout(() => {
    boot.classList.add("hide");
    setTimeout(() => boot.remove(), 1000);
  }, delay + 600);
})();

/*=========================================
QUANTUM PARTICLE FIELD (3D Constellation)
=========================================*/
(function quantumField(){
  const canvas = document.getElementById("quantumField");
  if(!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];
  const mouse = { x: null, y: null, vx: 0, vy: 0 };
  let mouseHistory = [];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(120, Math.floor((w * h) / 12000));
    particles = Array.from({length: count}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 2 - 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.02,
      size: Math.random() * 2 + 0.5,
      hue: Math.random() > 0.5 ? 160 : 270
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);

    // Update particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
      if(p.z < -1 || p.z > 1) p.vz *= -1;

      const depth = (p.z + 2) / 4;
      const px = p.x;
      const py = p.y;
      const alpha = depth * 0.6;
      const size = p.size * depth;

      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.shadowColor = `hsla(${p.hue}, 80%, 70%, ${alpha * 0.5})`;
      ctx.shadowBlur = size * 4;
      ctx.beginPath();
      ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Connections
    for(let i = 0; i < particles.length; i++){
      for(let j = i + 1; j < particles.length; j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 150){
          const alpha = (1 - dist / 150) * 0.12;
          ctx.strokeStyle = `rgba(126, 247, 212, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Mouse connections
      if(mouse.x != null){
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 200){
          const alpha = (1 - dist / 200) * 0.25;
          ctx.strokeStyle = `rgba(180, 140, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Mouse trail effect
    if(mouseHistory.length > 1){
      ctx.beginPath();
      ctx.moveTo(mouseHistory[0].x, mouseHistory[0].y);
      for(let i = 1; i < mouseHistory.length; i++){
        ctx.lineTo(mouseHistory[i].x, mouseHistory[i].y);
      }
      ctx.strokeStyle = `rgba(126, 247, 212, 0.05)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouseHistory.push({x: e.clientX, y: e.clientY});
    if(mouseHistory.length > 20) mouseHistory.shift();
  });

  resize();
  draw();
})();

/*=========================================
SPACETIME CURSOR SYSTEM
=========================================*/
const spacetimeCursor = document.getElementById("spacetime-cursor");
const spacetimeTrail = document.getElementById("spacetime-trail");
const spacetimeGlow = document.getElementById("spacetime-glow");

if(!prefersReducedMotion){
  let cursorX = 0, cursorY = 0;
  let trailX = 0, trailY = 0;

  window.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if(spacetimeCursor){
      spacetimeCursor.style.left = cursorX + "px";
      spacetimeCursor.style.top = cursorY + "px";
    }
    if(spacetimeGlow){
      spacetimeGlow.style.left = cursorX + "px";
      spacetimeGlow.style.top = cursorY + "px";
    }
  });

  // Trail animation
  function animateTrail(){
    trailX += (cursorX - trailX) * 0.15;
    trailY += (cursorY - trailY) * 0.15;
    if(spacetimeTrail){
      spacetimeTrail.style.left = trailX + "px";
      spacetimeTrail.style.top = trailY + "px";
      const dist = Math.sqrt((cursorX - trailX)**2 + (cursorY - trailY)**2);
      spacetimeTrail.style.opacity = Math.min(1, dist / 50);
    }
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover effects
  document.querySelectorAll("a, button, .quantum-glass, .quantum-btn").forEach(el => {
    el.addEventListener("mouseenter", () => spacetimeCursor && spacetimeCursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => spacetimeCursor && spacetimeCursor.classList.remove("hovering"));
  });
}

/*=========================================
TEMPORAL PROGRESS BAR
=========================================*/
const temporalProgress = document.getElementById("temporal-progress");
window.addEventListener("scroll", () => {
  if(!temporalProgress) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  temporalProgress.style.width = progress + "%";
});

/*=========================================
STICKY HEADER
=========================================*/
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  if(!header) return;
  header.classList.toggle("sticky", window.scrollY > 60);
});

/*=========================================
ACTIVE NAV + SMOOTH SCROLL
=========================================*/
const sections = document.querySelectorAll("main section, #home");
const navLinks = document.querySelectorAll("#nav a, .mobile-nav a");

document.querySelectorAll('#nav a, .mobile-nav a').forEach(link => {
  link.addEventListener("click", function(e){
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if(target){
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: prefersReducedMotion ? "auto" : "smooth" });
      closeMobileNav();
    }
  });
});

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 160;
    if(window.scrollY >= top) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

/*=========================================
MOBILE NAV
=========================================*/
const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav(){
  if(mobileNav) mobileNav.classList.remove("open");
  if(navToggle) navToggle.setAttribute("aria-expanded", "false");
}

if(navToggle){
  navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/*=========================================
TEMPORAL CLOCK
=========================================*/
const tcTime = document.querySelector(".tc-time");
const tcDate = document.querySelector(".tc-date");
function updateTemporalClock(){
  const now = new Date();
  if(tcTime) tcTime.textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
  if(tcDate) tcDate.textContent = "2147." + String(now.getMonth()+1).padStart(2,'0') + "." + String(now.getDate()).padStart(2,'0');
}
updateTemporalClock();
setInterval(updateTemporalClock, 1000);

/*=========================================
QUANTUM TYPEWRITER
=========================================*/
const roles = [
  "AI & Software Engineer",
  "Python Developer",
  "Backend Developer",
  "AI Enthusiast",
  "Open Source Learner",
  "Quantum-Classical Hybrid"
];
const typedEl = document.getElementById("typed");
let rIndex = 0, cIndex = 0, deleting = false;

function quantumTypeLoop(){
  if(!typedEl) return;
  const word = roles[rIndex];
  if(!deleting){
    typedEl.textContent = word.substring(0, cIndex++);
    if(cIndex > word.length){ deleting = true; setTimeout(quantumTypeLoop, 1800); return; }
  } else {
    typedEl.textContent = word.substring(0, cIndex--);
    if(cIndex < 0){ deleting = false; rIndex = (rIndex + 1) % roles.length; }
  }
  setTimeout(quantumTypeLoop, deleting ? 35 : 80);
}
if(!prefersReducedMotion) quantumTypeLoop();
else if(typedEl) typedEl.textContent = roles[0];

/*=========================================
HERO METRICS ANIMATION
=========================================*/
const quantumStateEl = document.getElementById("quantumState");
const entropyEl = document.getElementById("entropyVal");

if(quantumStateEl && !prefersReducedMotion){
  const states = ["SUPERPOSITION", "ENTANGLED", "COLLAPSED", "COHERENT", "DECOHERENT"];
  let sIdx = 0;
  setInterval(() => {
    quantumStateEl.textContent = states[sIdx];
    sIdx = (sIdx + 1) % states.length;
  }, 3000);
}

if(entropyEl && !prefersReducedMotion){
  let entropy = 0;
  setInterval(() => {
    entropy = (entropy + Math.random() * 0.01) % 1;
    entropyEl.textContent = entropy.toFixed(3);
  }, 200);
}

/*=========================================
SCROLL REVEAL
=========================================*/
document.querySelectorAll(
  ".quantum-section, .q-skill-card, .quantum-project-card, .value-card, .timeline-item, .quantum-transmission, .quantum-github-card, .quantum-service-card, .quantum-goal-card, .quantum-cert-card, .quantum-stat-card, .quantum-tech-item"
).forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/*=========================================
STAT COUNTERS
=========================================*/
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"));
      if(isNaN(target)) return;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 80));
      const update = () => {
        current += step;
        if(current < target){
          el.textContent = current;
          requestAnimationFrame(update);
        } else {
          el.textContent = target + "+";
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".qsc-number[data-target]").forEach(el => counterObserver.observe(el));

/*=========================================
SKILL PROGRESS BARS
=========================================*/
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const width = entry.target.getAttribute("data-width");
      entry.target.style.width = width;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".q-skill-fill").forEach(bar => barObserver.observe(bar));

/*=========================================
TIMELINE SPINE PROGRESS
=========================================*/
const timelineSpine = document.querySelector(".ts-progress");
if(timelineSpine && !prefersReducedMotion){
  const timelineSection = document.getElementById("journey");
  if(timelineSection){
    window.addEventListener("scroll", () => {
      const rect = timelineSection.getBoundingClientRect();
      const sectionHeight = timelineSection.offsetHeight;
      const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.3);
      const progress = Math.min(100, (scrolled / sectionHeight) * 100);
      timelineSpine.style.height = progress + "%";
    });
  }
}

/*=========================================
3D TILT EFFECT
=========================================*/
if(!prefersReducedMotion){
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

/*=========================================
THEME TOGGLE
=========================================*/
const themeBtn = document.getElementById("theme-toggle");
if(themeBtn){
  const saved = localStorage.getItem("dk-quantum-theme");
  if(saved === "light"){
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-atom"></i>';
    localStorage.setItem("dk-quantum-theme", isLight ? "light" : "dark");
  });
}

/*=========================================
BACK TO TOP
=========================================*/
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if(topBtn) topBtn.classList.toggle("show", window.scrollY > 500);
});
if(topBtn){
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/*=========================================
CONTACT FORM
=========================================*/
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("formStatus");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!name || !email || !message){
      formStatus.textContent = "◈ ERROR: All fields required";
      formStatus.style.color = "var(--q-magenta)";
      return;
    }
    if(!emailRegex.test(email)){
      formStatus.textContent = "◈ ERROR: Invalid quantum signature";
      formStatus.style.color = "var(--q-magenta)";
      return;
    }
    formStatus.textContent = "◈ SIGNAL TRANSMITTED — awaiting response";
    formStatus.style.color = "var(--q-cyan)";
    form.reset();
    setTimeout(() => { formStatus.textContent = ""; }, 4000);
  });
}

/*=========================================
COPY EMAIL
=========================================*/
const copyBtn = document.getElementById("copy-email");
if(copyBtn){
  copyBtn.addEventListener("click", () => {
    const email = "your-email@example.com";
    navigator.clipboard.writeText(email).then(() => {
      copyBtn.textContent = "Copied";
      copyBtn.style.background = "var(--q-cyan)";
      copyBtn.style.color = "var(--q-void)";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.style.background = "";
        copyBtn.style.color = "";
      }, 2000);
    });
  });
}

/*=========================================
DOWNLOAD RESUME
=========================================*/
const resumeBtn = document.getElementById("download-resume");
if(resumeBtn){
  resumeBtn.addEventListener("click", () => {
    window.open("resume.pdf", "_blank");
  });
}

/*=========================================
GITHUB PROFILE (live fetch)
=========================================*/
const githubCard = document.getElementById("github-profile");
if(githubCard){
  fetch("https://api.github.com/users/ezugem")
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => {
      githubCard.innerHTML = `
        <div class="qgc-icon"><i class="fab fa-github"></i></div>
        <h3>${data.name || "Dipesh Kashyap"}</h3>
        <p style="color:var(--q-gray);font-size:0.85rem;margin-bottom:0.5rem">${data.bio || "AI & Software Engineer"}</p>
        <div style="display:flex;gap:1rem;justify-content:center;font-family:var(--font-mono);font-size:0.7rem;color:var(--q-cyan-dim)">
          <span><i class="fas fa-users" style="margin-right:0.3rem"></i>${data.followers}</span>
          <span><i class="fas fa-code-branch" style="margin-right:0.3rem"></i>${data.public_repos}</span>
        </div>
      `;
    })
    .catch(() => {
      githubCard.innerHTML = `
        <div class="qgc-icon"><i class="fab fa-github"></i></div>
        <h3>Repositories</h3>
        <p style="color:var(--q-gray);font-size:0.85rem">Live data unavailable — visit profile directly.</p>
      `;
    });
}

/*=========================================
CURRENT YEAR
=========================================*/
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

/*=========================================
PARALLAX EFFECTS
=========================================*/
if(!prefersReducedMotion){
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector(".quantum-hero");
    if(hero && scrolled < window.innerHeight){
      hero.style.backgroundPositionY = scrolled * 0.3 + "px";
    }
  });
}

/*=========================================
CONSOLE EASTER EGG
=========================================*/
console.log("%c◈ QUANTUM INTERFACE ONLINE ◈", "color:#7ef7d4;font-size:16px;font-weight:bold;font-family:monospace;");
console.log("%cBuild 2147.QNT — Temporal Anchor: 22nd Century", "color:#b48cff;font-size:11px;font-family:monospace;");
console.log("%cSignal from the future. Are you ready?", "color:#ff6b9d;font-size:11px;font-family:monospace;");