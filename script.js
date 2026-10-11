document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeNav();
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const statusDiv = document.getElementById('contact-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!email || !subject || !message) {
        statusDiv.textContent = 'Please fill in all fields.';
        statusDiv.style.color = '#c0392b';
        return;
      }

      submitBtn.disabled = true;
      statusDiv.textContent = 'Sending…';
      statusDiv.style.color = 'var(--light-text-color)';

      try {
        const response = await fetch('https://formsubmit.co/ajax/sahmanish20@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            email,
            _subject: subject,
            message
          })
        });
        const result = await response.json();
        if (!response.ok || result.success === 'false') {
          throw new Error(result.message || 'Send failed');
        }
        contactForm.reset();
        statusDiv.textContent = 'Message sent. I will get back to you soon.';
        statusDiv.style.color = '#1b7a3a';
      } catch (error) {
        statusDiv.textContent = 'Could not send from the form. Email sahmanish20@gmail.com instead.';
        statusDiv.style.color = '#c0392b';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
