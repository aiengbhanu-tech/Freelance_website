/* =====================================================================
   Boosterrr portfolio: interactions
   EDIT HERE: contact email + demo site content live in the two
   constants below. Everything else is behavior.
   ===================================================================== */
(() => {
  'use strict';

  const CONTACT_EMAIL = 'coderbhanu070296@gmail.com'; // used by the form's email fallback

  /* Content for the fake sites shown inside the browser/phone mockups.
     Colors: c1/c2 = brand gradient, bg = page background, tx = text color. */
  const SITES = {
    dental:     { name: 'BrightSmile', c1: '#0d9488', c2: '#2dd4bf', bg: '#ffffff', tx: '#0f172a',
                  head: 'Healthy smiles, zero stress.', sub: 'Gentle family dentistry. New patients welcome.', cta: 'Book a visit',
                  cards: [['🦷', 'Cleanings'], ['✨', 'Whitening'], ['😁', 'Braces']],
                  rating: '4.9 ★  312 Google reviews', about: 'Meet Dr. Lee & team',
                  quote: '“Finally a dentist I look forward to visiting.”', who: 'Sample patient', phone: '(555) 014-2290 · Open Mon–Sat' },
    roof:       { name: 'CleanPeak', c1: '#c2410c', c2: '#f59e0b', bg: '#fff8f1', tx: '#1c1917',
                  head: 'Tired roof? We make it new again.', sub: 'Safe soft-wash roof cleaning. Free quotes.', cta: 'Get free quote',
                  cards: [['🏠', 'Soft wash'], ['🌿', 'Moss removal'], ['🛡️', 'Protection']],
                  rating: '5.0 ★  180 Google reviews', about: 'Before & after results',
                  quote: '“Looks brand new. Neighbors keep asking who did it.”', who: 'Sample homeowner', phone: '(555) 010-7742 · Serving your county' },
    floor:      { name: 'FreshFloor', c1: '#6d28d9', c2: '#818cf8', bg: '#faf8ff', tx: '#1e1b4b',
                  head: 'Floors that shine. Guaranteed.', sub: 'Tile, hardwood & carpet care for homes and offices.', cta: 'Request estimate',
                  cards: [['🧼', 'Deep clean'], ['🪵', 'Hardwood'], ['✨', 'Polish']],
                  rating: '4.8 ★  96 Google reviews', about: 'Our floor care process',
                  quote: '“Our office floors look better than the day we moved in.”', who: 'Sample manager', phone: '(555) 019-3381 · Open 7 days' },
    hvac:       { name: 'CoolBreeze', c1: '#1d4ed8', c2: '#38bdf8', bg: '#f4f9ff', tx: '#0b1b3a',
                  head: 'Comfort, on call 24/7.', sub: 'Fast AC & heating repair. Same-day service.', cta: 'Call now',
                  cards: [['❄️', 'AC repair'], ['🔥', 'Heating'], ['🛠️', 'Plans']],
                  rating: '4.9 ★  540 Google reviews', about: 'Licensed & insured techs',
                  quote: '“Tech arrived in an hour and fixed it the same day.”', who: 'Sample customer', phone: '(555) 012-8800 · Emergency line 24/7' },
    salon:      { name: 'Luna Studio', c1: '#be185d', c2: '#f472b6', bg: '#fff7fb', tx: '#3b0a24',
                  head: 'Hair that feels like you.', sub: 'Cuts, color & styling by award-winning stylists.', cta: 'Book now',
                  cards: [['💇', 'Cut & style'], ['🎨', 'Color'], ['💅', 'Nails']],
                  rating: '4.9 ★  220 Google reviews', about: 'Meet your stylists',
                  quote: '“Best color I have ever had. Booking was so easy.”', who: 'Sample client', phone: '(555) 017-6620 · Tue–Sun' },
    restaurant: { name: 'Ember & Oak', c1: '#d97706', c2: '#b45309', bg: '#1c1917', tx: '#f5f5f4',
                  head: 'Wood-fired. Locally sourced.', sub: 'Dinner, drinks & private events downtown.', cta: 'Reserve a table',
                  cards: [['🍝', 'Pasta'], ['🍷', 'Wine'], ['🔥', 'Wood-fired']],
                  rating: '4.8 ★  860 Google reviews', about: 'Our story',
                  quote: '“A perfect date night. The wood-fired dishes are unreal.”', who: 'Sample guest', phone: '(555) 015-4410 · Dinner nightly' }
  };

  const html = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);

  /* ---------- 1. Build the mockup sites ---------- */
  const pageHTML = (s) => `
    <div class="m-nav"><b>${s.name}</b><i></i><i></i><i></i><span class="m-btn">Call</span></div>
    <div class="m-hero"><h4>${s.head}</h4><p>${s.sub}</p><span class="m-btn">${s.cta}</span></div>
    <div class="m-cards">${s.cards.map(c => `<div class="m-card"><span>${c[0]}</span>${c[1]}</div>`).join('')}</div>
    <div class="m-band">${s.rating}</div>
    <div class="m-about"><div class="m-img"></div><div><b>${s.about}</b><u></u><u></u><u></u></div></div>
    <div class="m-quote">${s.quote}<small>${s.who}</small></div>
    <div class="m-cta"><b>Ready when you are</b><span class="m-btn">${s.cta}</span></div>
    <div class="m-foot">${s.phone}</div>`;

  function paint(el, key) {
    const s = SITES[key];
    if (!s) return;
    el.style.setProperty('--c1', s.c1);
    el.style.setProperty('--c2', s.c2);
    el.style.setProperty('--bg-s', s.bg);
    el.style.setProperty('--tx', s.tx);
    el.style.background = s.bg;
    el.style.color = s.tx;
    el.innerHTML = pageHTML(s);
  }
  $$('[data-site]').forEach(el => paint(el, el.dataset.site));
  $$('[data-site-phone]').forEach(el => paint(el, el.dataset.sitePhone));

  /* Measure how far each mock page must scroll inside its viewport */
  function measure() {
    $$('.mock-page').forEach(page => {
      const vp = page.closest('.viewport');
      if (!vp) return;
      const dist = Math.max(0, page.offsetHeight - vp.clientHeight);
      page.style.setProperty('--dist', dist + 'px');
      page.style.setProperty('--dur', Math.max(3, Math.round(dist / 75)) + 's');
    });
  }
  measure();
  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);

  /* Touch devices: auto-preview the demo that is in the middle of the screen */
  if (!window.matchMedia('(hover: hover)').matches && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('is-active', e.isIntersecting));
    }, { rootMargin: '-35% 0px -35% 0px' });
    $$('.demo-card').forEach(c => io.observe(c));
  }

  /* ---------- 2. Navigation, progress bar, floating CTA ---------- */
  const nav = $('#nav'), progress = $('.progress'), fab = $('#fab'), contact = $('#contact');
  const toggle = $('#nav-toggle'), links = $('#nav-links');

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle('scrolled', y > 40);
    const contactTop = contact.getBoundingClientRect().top;
    fab.classList.toggle('show', y > window.innerHeight * 0.8 && contactTop > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('open', !open);
  });

  /* ---------- 3. Smooth scrolling (Lenis) + anchor links ---------- */
  let lenis = null;
  if (window.Lenis && hasGsap && !reduced) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      if (lenis) lenis.scrollTo(target, { offset: -60 });
      else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- 4. Footer year + contact form ---------- */
  $('#year').textContent = new Date().getFullYear();

  const form = $('#contact-form'), status = $('#form-status');
  const needsSetup = () => (form.getAttribute('action') || '').includes('YOUR_FORM_ID');

  // No form service connected yet: offer two ways to email that work even without a default mail app.
  function showFallback(data) {
    const subject = 'Website enquiry from ' + (data.get('business') || 'a new client');
    const body = [...data.entries()].filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n');
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Send your request with: ';
    [['Open in Gmail', gmail, true], ['My email app', mailto, false]].forEach(([label, href, blank]) => {
      const a = document.createElement('a');
      a.textContent = label; a.href = href;
      if (blank) { a.target = '_blank'; a.rel = 'noopener'; }
      a.style.cssText = 'color:inherit;text-decoration:underline;margin-right:1rem;font-weight:600';
      status.appendChild(a);
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get('_gotcha')) return;                 // hidden spam trap was filled: it's a bot
    if (needsSetup()) { showFallback(data); return; }
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.getAttribute('action'), { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      let json = {};
      try { json = await res.json(); } catch (_) { /* some services return no JSON */ }
      if (!res.ok || json.success === false || json.ok === false) throw new Error('send failed');
      form.reset();
      status.textContent = 'Thank you! I will reply within 24 hours.';
    } catch (err) {
      status.textContent = 'Something went wrong. Please email ' + CONTACT_EMAIL + ' instead.';
    }
  });

  /* ---------- 5. Animations (need GSAP; otherwise the page just stays static) ---------- */
  if (!hasGsap || reduced) {
    html.classList.remove('js');
    return;
  }
  html.classList.add('js');
  gsap.registerPlugin(ScrollTrigger);

  /* Hero intro: starts as the CSS loader fades out (~1.05s) */
  gsap.set('#hero-title .w > span', { yPercent: 115 });
  gsap.set('[data-hero]', { opacity: 0, y: 28 });
  const intro = gsap.timeline({ delay: 0.95, defaults: { ease: 'power4.out' } });
  intro
    .to('[data-hero].pill', { opacity: 1, y: 0, duration: 0.6 }, 0)
    .to('#hero-title .w > span', { yPercent: 0, duration: 0.9, stagger: 0.05 }, 0.05)
    .to('.hero-sub, .hero-cta, .hero-points', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.45)
    .to('.hero-visual', { opacity: 1, y: 0, duration: 1 }, 0.35);

  /* Scroll reveals (staggers items that enter together) */
  gsap.set('[data-reveal]', { opacity: 0, y: 44 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true })
  });

  /* Animated number counters */
  $$('[data-count]').forEach(el => {
    const end = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
    const dec = el.dataset.count.includes('.') ? 1 : 0;
    const obj = { v: 0 };
    el.textContent = prefix + '0' + suffix;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, {
        v: end, duration: 1.8, ease: 'power2.out',
        onUpdate: () => { el.textContent = prefix + obj.v.toFixed(dec) + suffix; },
        onComplete: () => { el.textContent = prefix + end + suffix; }
      })
    });
  });

  /* Process timeline: line fills as you scroll, steps light up */
  gsap.fromTo('.timeline-fill', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 65%', scrub: true }
  });
  $$('.step').forEach(step => {
    ScrollTrigger.create({
      trigger: step, start: 'top 68%',
      onEnter: () => step.classList.add('active'),
      onLeaveBack: () => step.classList.remove('active')
    });
  });

  /* Gentle parallax on the aurora blobs */
  gsap.to('.hero .aurora', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* ---------- 6. Pointer micro-interactions (mouse devices only) ---------- */
  if (finePointer) {
    // Magnetic buttons
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' }));
    });

    // Hover tilt on cards
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotationY: px * 8, rotationX: -py * 8, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'power3.out' }));
    });

    // Custom cursor ring (the normal cursor stays visible for accessibility)
    const ring = $('.cursor-ring');
    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    const qx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const qy = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('mousemove', e => { ring.classList.add('on'); qx(e.clientX); qy(e.clientY); });
    document.addEventListener('mouseleave', () => ring.classList.remove('on'));
    document.addEventListener('mouseover', e => {
      ring.classList.toggle('hover', !!e.target.closest('a, button, summary, input, select, [data-tilt]'));
    });
  }

  window.addEventListener('load', () => { measure(); ScrollTrigger.refresh(); });
})();