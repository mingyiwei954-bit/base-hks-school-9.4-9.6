const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.connection-card');
const dialog = document.querySelector('#composeDialog');
const toast = document.querySelector('#toast');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    cards.forEach((card) => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
  });
});

document.querySelectorAll('[data-open-compose]').forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

document.querySelector('#publishButton').addEventListener('click', (event) => {
  const need = document.querySelector('#needInput');
  if (!need.value.trim()) {
    event.preventDefault();
    need.focus();
    return;
  }
  showToast('连接已发出', '同频的人很快会看见你');
});

document.querySelectorAll('.connect-button, .round-button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('connected');
    showToast('回应已送达', '一次新的连接正在发生');
  });
});

document.querySelector('#randomMatch').addEventListener('click', () => {
  const choices = [...cards];
  const chosen = choices[Math.floor(Math.random() * choices.length)];
  chosen.scrollIntoView({ behavior: 'smooth', block: 'center' });
  chosen.animate([{ outline: '2px solid transparent' }, { outline: '2px solid #ff8b66' }, { outline: '2px solid transparent' }], { duration: 1400 });
});

document.querySelector('#searchButton').addEventListener('click', openSearch);
document.querySelector('#closeSearch').addEventListener('click', closeSearch);
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  cards.forEach((card) => card.classList.toggle('hidden', keyword && !card.textContent.toLowerCase().includes(keyword)));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeSearch();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openSearch();
  }
});

function openSearch() {
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden', 'false');
  setTimeout(() => searchInput.focus(), 250);
}

function closeSearch() {
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden', 'true');
}

let toastTimer;
function showToast(title, message) {
  toast.querySelector('b').textContent = title;
  toast.querySelector('small').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
