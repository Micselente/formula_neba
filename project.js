/* main.js */
const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#site-nav');

menuButton.hidden = false;

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'false';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

for (const list of document.querySelectorAll('[data-tabs]')) {
  const buttons = [...list.querySelectorAll('button')];
  const panels = buttons.map((button) => document.getElementById(button.getAttribute('aria-controls')));

  function select(index, focus = false) {
    buttons.forEach((button, position) => {
      const active = position === index;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      panels[position].hidden = !active;
    });
    if (focus) buttons[index].focus();
  }

  buttons.forEach((button, index) => {
    button.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', (event) => {
      const targets = {
        ArrowLeft: (index + buttons.length - 1) % buttons.length,
        ArrowRight: (index + 1) % buttons.length,
        Home: 0,
        End: buttons.length - 1
      };
      if (!Object.hasOwn(targets, event.key)) return;
      event.preventDefault();
      select(targets[event.key], true);
    });
  });

  select(0);
}

const dialog = document.querySelector('#plan-dialog');
const planTitle = document.querySelector('#plan-title');
const planImage = document.querySelector('#plan-image');

for (const link of document.querySelectorAll('[data-zoom]')) {
  link.addEventListener('click', (event) => {
    if (typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    planTitle.textContent = link.dataset.zoom;
    planImage.src = link.href;
    planImage.alt = link.dataset.zoom;
    dialog.showModal();
  });
}

dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const { left, right, top, bottom } = dialog.getBoundingClientRect();
  if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.close();
});
;
