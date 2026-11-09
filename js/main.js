// Mobilné menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Aktuálny rok v pätičke
document.getElementById('year').textContent = new Date().getFullYear();

// Kontaktný formulár – odoslanie na pozadí cez Web3Forms
const form = document.getElementById('contact-form');

if (form) {
  const status = form.querySelector('.form__status');
  const button = form.querySelector('button[type="submit"]');
  const buttonText = button.textContent;

  const showStatus = (html, type) => {
    status.innerHTML = html;
    status.className = `form__status form__status--${type}`;
    status.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = 'Odosielam…';
    status.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      form.reset();
      showStatus('Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.', 'ok');
    } catch {
      showStatus(
        'Správu sa nepodarilo odoslať. Napíšte nám prosím na ' +
          '<a href="mailto:info@mngroup.sk">info@mngroup.sk</a> alebo zavolajte na ' +
          '<a href="tel:+421905433433">+421 905 433 433</a>.',
        'error'
      );
    } finally {
      button.disabled = false;
      button.textContent = buttonText;
    }
  });
}
