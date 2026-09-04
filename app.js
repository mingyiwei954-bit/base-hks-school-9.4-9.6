const shell = document.querySelector('#searchShell');
const searchAction = document.querySelector('#searchAction');
const searchInput = document.querySelector('#searchInput');
const typingMode = document.querySelector('#typingMode');
const voiceAction = document.querySelector('#voiceAction');
const voiceBack = document.querySelector('#voiceBack');
const voiceMode = document.querySelector('#voiceMode');
const holdToTalk = document.querySelector('#holdToTalk');
const voiceCopy = document.querySelector('#voiceCopy');
const photoAction = document.querySelector('#photoAction');
const photoMenu = document.querySelector('#photoMenu');
const toast = document.querySelector('#toast');
const toastMessage = document.querySelector('#toastMessage');

let isPinned = false;
let isListening = false;
let toastTimer;
let collapseTimer;

function setExpanded(expanded, focusInput = false) {
  shell.classList.toggle('is-expanded', expanded);
  searchAction.setAttribute('aria-expanded', String(expanded));
  searchAction.setAttribute('aria-label', expanded ? '搜索' : '展开搜索');

  if (!expanded) {
    closePhotoMenu();
    exitVoiceMode();
  } else if (focusInput) {
    window.setTimeout(() => searchInput.focus(), 80);
  }
}

function pinAndExpand(focusInput = false) {
  window.clearTimeout(collapseTimer);
  isPinned = true;
  setExpanded(true, focusInput);
}

function submitSearch() {
  pinAndExpand();
  showToast('搜索能力将在下一层接入');
}

function enterVoiceMode() {
  closePhotoMenu();
  pinAndExpand();
  shell.classList.add('is-voice');
  typingMode.inert = true;
  voiceMode.inert = false;
  voiceMode.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => holdToTalk.focus(), 120);
}

function exitVoiceMode() {
  stopListening();
  shell.classList.remove('is-voice');
  typingMode.inert = false;
  voiceMode.inert = true;
  voiceMode.setAttribute('aria-hidden', 'true');
}

function startListening(event) {
  if (event?.button !== undefined && event.button !== 0) return;
  isListening = true;
  holdToTalk.classList.add('is-listening');
  holdToTalk.setAttribute('aria-label', '正在聆听，松开结束');
  voiceCopy.textContent = '正在聆听…';
  if (event?.pointerId !== undefined) holdToTalk.setPointerCapture?.(event.pointerId);
}

function stopListening() {
  if (!isListening) return;
  isListening = false;
  holdToTalk.classList.remove('is-listening');
  holdToTalk.setAttribute('aria-label', '按住说话');
  voiceCopy.textContent = '按住说话';
}

function togglePhotoMenu() {
  const willOpen = !photoMenu.classList.contains('is-open');
  if (willOpen) exitVoiceMode();
  photoMenu.classList.toggle('is-open', willOpen);
  photoMenu.setAttribute('aria-hidden', String(!willOpen));
  photoAction.setAttribute('aria-expanded', String(willOpen));
  pinAndExpand();
  if (willOpen) window.setTimeout(() => photoMenu.querySelector('[role="menuitem"]').focus(), 80);
}

function closePhotoMenu() {
  photoMenu.classList.remove('is-open');
  photoMenu.setAttribute('aria-hidden', 'true');
  photoAction.setAttribute('aria-expanded', 'false');
}

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2300);
}

shell.addEventListener('pointerenter', () => {
  window.clearTimeout(collapseTimer);
  setExpanded(true);
});

shell.addEventListener('pointerleave', () => {
  collapseTimer = window.setTimeout(() => {
    const hasFocus = shell.contains(document.activeElement);
    if (!isPinned && !hasFocus && !photoMenu.classList.contains('is-open')) setExpanded(false);
  }, 110);
});

shell.addEventListener('focusin', () => pinAndExpand());

searchAction.addEventListener('click', () => {
  if (!shell.classList.contains('is-expanded')) {
    pinAndExpand(true);
    return;
  }
  submitSearch();
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitSearch();
  } else if (event.key === 'Escape') {
    event.preventDefault();
  }
});

voiceAction.addEventListener('click', enterVoiceMode);
voiceBack.addEventListener('click', () => {
  exitVoiceMode();
  searchInput.focus();
});

holdToTalk.addEventListener('pointerdown', startListening);
holdToTalk.addEventListener('pointerup', stopListening);
holdToTalk.addEventListener('pointercancel', stopListening);
holdToTalk.addEventListener('lostpointercapture', stopListening);
holdToTalk.addEventListener('keydown', (event) => {
  if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
    event.preventDefault();
    startListening();
  }
});
holdToTalk.addEventListener('keyup', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    stopListening();
  }
});

photoAction.addEventListener('click', togglePhotoMenu);
photoMenu.querySelectorAll('[data-photo-option]').forEach((button) => {
  button.addEventListener('click', () => {
    const label = button.dataset.photoOption;
    closePhotoMenu();
    showToast(`${label}能力将在下一层接入`);
    photoAction.focus();
  });
});

document.addEventListener('pointerdown', (event) => {
  if (shell.contains(event.target)) return;
  isPinned = false;
  setExpanded(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  isPinned = false;
  document.activeElement?.blur();
  setExpanded(false);
});
