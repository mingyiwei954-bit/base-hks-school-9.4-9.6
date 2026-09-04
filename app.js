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
const loginTrigger = document.querySelector('#loginTrigger');
const loginDialog = document.querySelector('#loginDialog');
const loginClose = document.querySelector('#loginClose');
const loginForm = document.querySelector('#loginForm');
const loginAccount = document.querySelector('#loginAccount');
const loginSecret = document.querySelector('#loginSecret');
const accountLabel = document.querySelector('#accountLabel');
const secretLabel = document.querySelector('#secretLabel');
const codeButton = document.querySelector('#codeButton');
const loginNote = document.querySelector('#loginNote');
const verticalsTrack = document.querySelector('#verticalsTrack');
const verticalName = document.querySelector('#verticalName');
const serpDescription = document.querySelector('#serpDescription');

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

function setLoginMode(mode) {
  const isPhone = mode === 'phone';
  document.querySelectorAll('[data-login-mode]').forEach((tab) => {
    const active = tab.dataset.loginMode === mode;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  accountLabel.textContent = isPhone ? '手机号' : '邮箱';
  loginAccount.type = isPhone ? 'tel' : 'email';
  loginAccount.inputMode = isPhone ? 'tel' : 'email';
  loginAccount.autocomplete = isPhone ? 'tel' : 'email';
  loginAccount.placeholder = isPhone ? '请输入手机号' : 'name@example.com';
  secretLabel.textContent = isPhone ? '验证码' : '密码';
  loginSecret.type = isPhone ? 'text' : 'password';
  loginSecret.inputMode = isPhone ? 'numeric' : 'text';
  loginSecret.autocomplete = isPhone ? 'one-time-code' : 'current-password';
  loginSecret.placeholder = isPhone ? '请输入验证码' : '请输入密码';
  codeButton.hidden = !isPhone;
  loginAccount.value = '';
  loginSecret.value = '';
  loginNote.textContent = '本阶段为界面占位，暂不连接真实账号。';
}

loginTrigger.addEventListener('click', () => {
  setLoginMode('phone');
  loginDialog.showModal();
  window.setTimeout(() => loginAccount.focus(), 80);
});

loginClose.addEventListener('click', () => loginDialog.close());
loginDialog.addEventListener('click', (event) => {
  if (event.target === loginDialog) loginDialog.close();
});

document.querySelectorAll('[data-login-mode]').forEach((tab) => {
  tab.addEventListener('click', () => setLoginMode(tab.dataset.loginMode));
});

codeButton.addEventListener('click', () => {
  loginNote.textContent = '验证码能力将在账号系统接入后开放。';
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginNote.textContent = '登录能力将在下一阶段接入。';
});

function selectVertical(button) {
  verticalsTrack.querySelectorAll('[data-vertical]').forEach((item) => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });

  const name = button.dataset.vertical;
  verticalName.textContent = name;
  serpDescription.textContent = `${name}自然搜索结果将在这里呈现。当前只保留结果区域，不添加卡片或通用结果框架。`;
  const targetLeft = button.offsetLeft - (verticalsTrack.clientWidth - button.offsetWidth) / 2;
  verticalsTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
}

verticalsTrack.querySelectorAll('[data-vertical]').forEach((button) => {
  button.addEventListener('click', () => selectVertical(button));
  button.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const tabs = [...verticalsTrack.querySelectorAll('[data-vertical]')];
    const current = tabs.indexOf(button);
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(current + direction + tabs.length) % tabs.length];
    selectVertical(next);
    next.focus();
  });
});

verticalsTrack.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
  event.preventDefault();
  verticalsTrack.scrollBy({ left: event.deltaY, behavior: 'smooth' });
}, { passive: false });
