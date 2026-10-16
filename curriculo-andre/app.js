"use strict";
(() => {
  // Set the repository-relative filename after the original portrait is uploaded.
  const PROFILE_PHOTO = null;
  const projects = Array.from(document.querySelectorAll(".project"));
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const filterStatus = document.querySelector("[data-filter-status]");
  filters.forEach(button => button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    let count = 0;
    projects.forEach(project => {
      const show = selected === "todos" || project.dataset.tags.split(" ").includes(selected);
      project.hidden = !show;
      if (show) count += 1;
    });
    filters.forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
    if (filterStatus) filterStatus.textContent = count + (count === 1 ? " projeto exibido." : " projetos exibidos.");
  }));

  document.querySelectorAll("[data-print]").forEach(button => button.addEventListener("click", () => window.print()));

  const copyButton = document.querySelector("[data-copy-phone]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton) copyButton.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard not available");
      await navigator.clipboard.writeText("+55 11 97308-3636");
      copyStatus.textContent = "Contato copiado.";
      copyButton.textContent = "Contato copiado ✓";
    } catch {
      copyStatus.textContent = "Selecione e copie o telefone: +55 11 97308-3636";
    }
  });

  const sections = Array.from(document.querySelectorAll("main > section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".sidebar nav a"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      navLinks.forEach(link => {
        if (link.hash === "#" + active.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, {rootMargin:"-18% 0px -48% 0px", threshold:[0,.1,.3,.6,1]});
    sections.forEach(section => observer.observe(section));
  }

  const progress = document.querySelector(".scroll-progress");
  let ticking = false;
  function updateProgress() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (available > 0 ? Math.min(100,Math.max(0,window.scrollY / available * 100)) : 0) + "%";
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, {passive:true});
  window.addEventListener("resize", updateProgress, {passive:true});
  updateProgress();

  if (PROFILE_PHOTO) {
    const photo = new Image();
    photo.alt = "Retrato profissional de André Marques da Silva";
    photo.decoding = "async";
    photo.fetchPriority = "high";
    photo.addEventListener("load", () => {
      const host = document.querySelector("[data-photo-container]");
      if (host) host.replaceChildren(photo);
      const monogram = document.querySelector(".portrait-monogram");
      if (monogram) monogram.hidden = true;
      const caption = document.querySelector(".portrait figcaption");
      if (caption) caption.textContent = photo.alt;
    }, {once:true});
    photo.src = PROFILE_PHOTO;
  }
})();