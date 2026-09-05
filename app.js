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
const accountMenu = document.querySelector('#accountMenu');
const pointsTrigger = document.querySelector('#pointsTrigger');
const settingsTrigger = document.querySelector('#settingsTrigger');
const logoutTrigger = document.querySelector('#logoutTrigger');
const settingsView = document.querySelector('#settingsView');
const settingsBack = document.querySelector('#settingsBack');
const universityMark = document.querySelector('.university-mark');
const hangingEmblem = document.querySelector('.hanging-emblem');
const appearanceTrigger = document.querySelector('#appearanceTrigger');
const currentThemeName = document.querySelector('#currentThemeName');
const themePanel = document.querySelector('#themePanel');
const themeBack = document.querySelector('#themeBack');
const themeGrid = document.querySelector('#themeGrid');
const discoveryLayer = document.querySelector('.discovery-layer');
const searchShell = document.querySelector('#searchShell');
const canvas = document.querySelector('.canvas');

function returnToHome(event) {
  event.preventDefault();
  settingsView.hidden = true;
  canvas?.classList.remove('is-settings-view');
  themePanel.hidden = true;
  document.querySelector('.settings-list').hidden = false;
  discoveryLayer.hidden = false;
  searchShell.hidden = false;
  accountMenu.classList.remove('is-open');
  accountMenu.setAttribute('aria-hidden', 'true');
  loginTrigger.setAttribute('aria-expanded', 'false');
}
universityMark.addEventListener('click', returnToHome);
hangingEmblem.addEventListener('click', returnToHome);
const verticalsTrack = document.querySelector('#verticalsTrack');
const mobileSubnav = document.querySelector('#mobileSubnav');
const mobileSubnavTrack = document.querySelector('#mobileSubnavTrack');
const supportDrawer = document.querySelector('#supportDrawer');
const resultItems = document.querySelector('#resultItems');
const pomodoroDialog = document.querySelector('#pomodoroDialog');
const pomodoroFocusView = document.querySelector('#pomodoroFocusView');
const postDetailDialog = document.querySelector('#postDetailDialog');

let isPinned = false;
let isListening = false;
let toastTimer;
let collapseTimer;
let lastScrollY = window.scrollY;
let scrollFrame = 0;
const topRail = document.querySelector('.top-rail');

const avatarIds = {
  林: 'avatar-lin', 周: 'avatar-zhou', 陈: 'avatar-chen', 许: 'avatar-xu',
  王: 'avatar-wang', 李: 'avatar-li', 赵: 'avatar-zhao', 孙: 'avatar-sun',
  高: 'avatar-gao', 苏: 'avatar-su', 夜: 'avatar-night', 蓝: 'avatar-blue', 球: 'avatar-ball',
};

function avatarMarkup(name = '', fallback = '') {
  const key = String(name || fallback).trim().slice(0, 1);
  const avatarId = String(name).includes('匿名') ? 'avatar-anon' : (avatarIds[key] || 'avatar-lin');
  return `<svg class="avatar-svg" aria-hidden="true" focusable="false"><use href="assets/avatars.svg#${avatarId}"></use></svg>`;
}

const themePresets = [
  ['classic-green', '经典绿', 'linear-gradient(110deg,#d9e5d3,#34735b)', '#f6f3eb'],
  ['apricot-grove', '杏林', 'linear-gradient(110deg,#ffcb7a,#b56535)', '#fff8ed'],
  ['green-mist', '青岚', 'linear-gradient(110deg,#1c8769,#dff4ea)', '#f4faf7'],
  ['mint-sea', '薄荷海', 'linear-gradient(110deg,#c6f8dd,#0bb1ea)', '#f1fbfa'],
  ['mist-sea', '雾海', 'linear-gradient(110deg,#d3ceea,#5572be)', '#f6f7fc'],
  ['star-blue', '星蓝', 'linear-gradient(110deg,#3d5afe,#e8eaf6)', '#f4f6ff'],
  ['sunny-rainbow', '晴霓', 'linear-gradient(110deg,#ffa6d7,#25a6dc)', '#fff7fb'],
  ['wisteria', '紫藤', 'linear-gradient(110deg,#cb89ff,#6a4cff)', '#faf7ff'],
  ['berry-cloud', '莓云', 'linear-gradient(110deg,#ff517e,#abb9ff)', '#fff7fb'],
  ['orange-light', '橙光', 'linear-gradient(110deg,#ff8200,#fff5ce)', '#fff9ed'],
];
const themeMeta = {
  'classic-green': ['清爽、安静，延续在场现在的学习氛围。', ['#f6f3eb','#d9e5d3','#34735b']],
  'apricot-grove': ['暖杏色与自然绿相遇，柔和但仍然清晰。', ['#fff8ed','#ffcb7a','#349b26']],
  'green-mist': ['沉静青绿融入淡粉雾气，温柔而克制。', ['#f4faf7','#1c8769','#dff4ea']],
  'mint-sea': ['清透薄荷绿连接明亮海蓝，轻盈醒目。', ['#f1fbfa','#c6f8dd','#0bb1ea']],
  'mist-sea': ['淡紫薄雾与青蓝海面，安静又清爽。', ['#f6f7fc','#d3ceea','#5572be']],
  'star-blue': ['清晰靛蓝渐入冷白，专注而有秩序。', ['#f4f6ff','#3d5afe','#e8eaf6']],
  'sunny-rainbow': ['柔粉与晴空蓝交汇，轻快而明亮。', ['#fff7fb','#ffa6d7','#25a6dc']],
  wisteria: ['浅紫到深紫的同色渐变，柔和又集中。', ['#faf7ff','#cb89ff','#6a4cff']],
  'berry-cloud': ['莓果粉漫入云雾紫，甜美但不轻浮。', ['#fff7fb','#ff517e','#abb9ff']],
  'orange-light': ['活力橙过渡到奶油黄，明朗又温暖。', ['#fff9ed','#ff8200','#fff5ce']],
};

let storedTheme = null;
try { storedTheme = localStorage.getItem('zaichang-color-theme'); } catch { /* ignore unavailable storage */ }
if (themePresets.some(([id]) => id === storedTheme)) document.documentElement.dataset.colorTheme = storedTheme;
let activeTheme = document.documentElement.dataset.colorTheme || 'classic-green';

function renderThemeCards() {
  themeGrid.innerHTML = themePresets.map(([id, name, gradient]) => { const [description, swatches] = themeMeta[id]; return `<button class="theme-card${id === activeTheme ? ' is-active' : ''}" type="button" role="radio" aria-checked="${id === activeTheme}" data-theme="${id}"><span class="theme-preview" style="background:${gradient}"><span class="theme-preview-inner"><span class="theme-palette" aria-hidden="true">◌</span><span class="theme-aa">Aa</span></span></span><span class="theme-card-body"><span class="theme-card-head"><b>${name}</b><span class="theme-dots" aria-hidden="true">${swatches.map((swatch) => `<i style="background:${swatch}"></i>`).join('')}</span></span><small>${description}</small></span></button>`; }).join('');
}

function switchTheme(id) {
  const preset = themePresets.find(([themeId]) => themeId === id);
  if (!preset || id === activeTheme) return;
  activeTheme = id;
  try { localStorage.setItem('zaichang-color-theme', id); } catch { /* ignore unavailable storage */ }
  document.documentElement.dataset.colorTheme = id;
  currentThemeName.textContent = `当前：${preset[1]}`;
  renderThemeCards();
}

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

let pageSearchMatches = [];
let pageSearchIndex = -1;
let pageSearchQuery = '';
let pageSearchMutating = false;
const pageSearchControls = document.querySelector('#pageSearchControls');
const pageSearchCount = document.querySelector('#pageSearchCount');
const pageSearchPrev = document.querySelector('#pageSearchPrev');
const pageSearchNext = document.querySelector('#pageSearchNext');

function restorePageSearch() {
  pageSearchMutating = true;
  document.querySelectorAll('.page-search-match').forEach((mark) => mark.replaceWith(document.createTextNode(mark.textContent)));
  document.querySelectorAll('.page-search-attribute-match').forEach((node) => node.classList.remove('page-search-attribute-match'));
  pageSearchMutating = false;
  pageSearchMatches = [];
  pageSearchIndex = -1;
}

function pageSearchTextNodes() {
  const root = document.querySelector('.canvas');
  if (!root) return [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('#searchShell, script, style, .page-search-controls, .page-search-match')) return NodeFilter.FILTER_REJECT;
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);
  return nodes;
}

function updatePageSearchCount() {
  if (!pageSearchQuery) pageSearchCount.textContent = '输入关键词开始查找';
  else if (!pageSearchMatches.length) pageSearchCount.textContent = '未找到匹配内容';
  else pageSearchCount.textContent = `${pageSearchIndex + 1} / ${pageSearchMatches.length} 个匹配`;
  pageSearchPrev.disabled = pageSearchMatches.length < 2;
  pageSearchNext.disabled = pageSearchMatches.length < 2;
}

function focusPageSearchMatch(index) {
  if (!pageSearchMatches.length) return;
  pageSearchIndex = (index + pageSearchMatches.length) % pageSearchMatches.length;
  pageSearchMatches.forEach((match, matchIndex) => match.classList.toggle('is-current', matchIndex === pageSearchIndex));
  pageSearchMatches[pageSearchIndex].scrollIntoView({ block: 'center', behavior: 'smooth' });
  updatePageSearchCount();
}

function runPageSearch(query = searchInput.value) {
  pageSearchQuery = query.trim();
  pageSearchObserver?.disconnect();
  restorePageSearch();
  if (!pageSearchQuery) { pageSearchControls.hidden = true; updatePageSearchCount(); pageSearchObserver?.observe(document.querySelector('.canvas'), { childList: true, subtree: true }); return; }
  pageSearchControls.hidden = false;
  const normalizedQuery = pageSearchQuery.toLocaleLowerCase();
  const escapedQuery = pageSearchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(escapedQuery, 'gi');
  pageSearchTextNodes().forEach((node) => {
    if (!node.textContent.toLocaleLowerCase().includes(normalizedQuery)) return;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    node.textContent.replace(expression, (match, offset) => { fragment.append(document.createTextNode(node.textContent.slice(cursor, offset))); const mark = document.createElement('mark'); mark.className = 'page-search-match'; mark.textContent = match; fragment.append(mark); cursor = offset + match.length; return match; });
    fragment.append(document.createTextNode(node.textContent.slice(cursor)));
    node.replaceWith(fragment);
  });
  document.querySelectorAll('.canvas [aria-label], .canvas [alt], .canvas [data-tool], .canvas [data-support]').forEach((node) => {
    const values = [node.getAttribute('aria-label'), node.getAttribute('alt'), node.getAttribute('data-tool'), node.getAttribute('data-support')].filter(Boolean).join(' ');
    if (values.toLocaleLowerCase().includes(normalizedQuery)) node.classList.add('page-search-attribute-match');
  });
  pageSearchMatches = [...document.querySelectorAll('.page-search-match')];
  pageSearchIndex = pageSearchMatches.length ? 0 : -1;
  if (pageSearchMatches.length) pageSearchMatches[0].classList.add('is-current');
  updatePageSearchCount();
  pageSearchObserver?.observe(document.querySelector('.canvas'), { childList: true, subtree: true });
}

function closePageSearch() {
  searchInput.value = '';
  pageSearchQuery = '';
  restorePageSearch();
  pageSearchControls.hidden = true;
  isPinned = false;
  setExpanded(false);
}

function submitSearch() {
  pinAndExpand();
  if (searchInput.value.trim()) runPageSearch();
  else searchInput.focus();
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

window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    const currentY = window.scrollY;
    const shouldCollapse = currentY > lastScrollY && currentY > 8;
    const shouldRestore = currentY <= 64;
    if (shouldCollapse && !topRail?.classList.contains('is-scrolled')) topRail?.classList.add('is-scrolled');
    else if (shouldRestore && topRail?.classList.contains('is-scrolled')) topRail?.classList.remove('is-scrolled');
    lastScrollY = currentY;
    scrollFrame = 0;
  });
}, { passive: true });

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
    if (pageSearchMatches.length) focusPageSearchMatch(pageSearchIndex + 1);
    else runPageSearch();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    closePageSearch();
  }
});
searchInput.addEventListener('input', () => runPageSearch());
pageSearchPrev.addEventListener('click', () => focusPageSearchMatch(pageSearchIndex - 1));
pageSearchNext.addEventListener('click', () => focusPageSearchMatch(pageSearchIndex + 1));

const pageSearchObserver = new MutationObserver(() => {
  if (!pageSearchQuery || pageSearchMutating) return;
  window.clearTimeout(pageSearchObserver.timer);
  pageSearchObserver.timer = window.setTimeout(() => runPageSearch(pageSearchQuery), 0);
});
pageSearchObserver.observe(document.querySelector('.canvas'), { childList: true, subtree: true });

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
  if (!loginTrigger.contains(event.target) && !accountMenu.contains(event.target)) {
    accountMenu.classList.remove('is-open');
    accountMenu.setAttribute('aria-hidden', 'true');
    loginTrigger.setAttribute('aria-expanded', 'false');
  }
  if (shell.contains(event.target)) return;
  isPinned = false;
  setExpanded(false);
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'f') {
    event.preventDefault();
    pinAndExpand(true);
    return;
  }
  if (event.key !== 'Escape') return;
  if (pageSearchQuery || document.activeElement === searchInput) {
    closePageSearch();
    return;
  }
  if (document.querySelector('.course-notes-layer')) {
    closeCourseNotes();
    renderCourseTable();
    return;
  }
  if (document.querySelector('.resource-detail-layer')) {
    closeResourceDetail();
    return;
  }
  if (document.querySelector('.mutual-detail-layer')) {
    closeMutualDetail();
    return;
  }
  if (document.querySelector('.learning-detail-layer,.learning-editor-layer')) {
    closeLearningLayer();
    return;
  }
  if (document.querySelector('.points-layer')) {
    closePointsPanel();
    return;
  }
  if (pomodoroFocusActive) {
    requestClosePomodoroFocus();
    return;
  }
  if (pomodoroDialog?.open) {
    closePomodoro();
    return;
  }
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

function openLoginDialog() {
  setLoginMode('phone');
  if (!loginDialog.open) loginDialog.showModal();
  window.setTimeout(() => loginAccount.focus(), 80);
}

loginTrigger.addEventListener('click', () => {
  const willOpen = !accountMenu.classList.contains('is-open');
  accountMenu.classList.toggle('is-open', willOpen);
  accountMenu.setAttribute('aria-hidden', String(!willOpen));
  loginTrigger.setAttribute('aria-expanded', String(willOpen));
  if (willOpen) settingsTrigger.focus();
});

let pointsBalance = 0;
let pointsTransactions = [];
try {
  const pointsState = JSON.parse(localStorage.getItem('zaichang-points-state') || '{}');
  if (Number.isFinite(pointsState.balance) && pointsState.balance >= 0) pointsBalance = pointsState.balance;
  if (Array.isArray(pointsState.transactions)) pointsTransactions = pointsState.transactions.slice(0, 20);
} catch { /* ignore unavailable or invalid storage */ }

function savePointsState() {
  try { localStorage.setItem('zaichang-points-state', JSON.stringify({ balance: pointsBalance, transactions: pointsTransactions })); } catch { /* ignore unavailable storage */ }
}

function closePointsPanel() {
  document.querySelector('.points-layer')?.remove();
}

function showPointsPlaceholder(action) {
  const messages = {
    recharge: '充值功能开发中，仅展示演示入口。',
    withdraw: '提现功能开发中，当前不会产生真实提现。',
    records: pointsTransactions.length ? '交易记录为本地演示数据。' : '暂无本地演示交易记录。',
  };
  showToast(messages[action] || '当前为前端演示流程。');
}

function openPointsPanel() {
  closePointsPanel();
  const layer = document.createElement('div');
  layer.className = 'points-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', '我的积分');
  layer.innerHTML = `<article class="points-card"><button class="points-close" type="button" aria-label="关闭积分面板">×</button><span class="points-eyebrow">ACCOUNT CREDIT · 演示</span><h2>我的积分</h2><div class="points-balance"><span>当前积分</span><strong>${pointsBalance}</strong><small>所有充值、兑换与提现均为前端占位流程</small></div><div class="points-rule"><span>兑换规则</span><b>1 元 = 7 积分</b></div><div class="points-actions"><button type="button" data-points-action="recharge">积分充值</button><button type="button" data-points-action="withdraw">提现</button><button type="button" data-points-action="records">交易记录</button></div><p class="points-note">资料兑换会先检查本地积分余额；余额不足时不会扣除积分。</p></article>`;
  document.body.append(layer);
  const close = () => closePointsPanel();
  layer.querySelector('.points-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelectorAll('[data-points-action]').forEach((button) => button.addEventListener('click', () => showPointsPlaceholder(button.dataset.pointsAction)));
  layer.querySelector('.points-close').focus();
}

function closeAccountMenu() {
  accountMenu.classList.remove('is-open');
  accountMenu.setAttribute('aria-hidden', 'true');
  loginTrigger.setAttribute('aria-expanded', 'false');
}

let settingsReturnFocus = loginTrigger;
function openSettingsView(returnFocus = loginTrigger) {
  settingsReturnFocus = returnFocus;
  closeAccountMenu();
  discoveryLayer.hidden = true;
  searchShell.hidden = true;
  settingsView.hidden = false;
  canvas?.classList.add('is-settings-view');
  settingsBack.focus();
}

pointsTrigger.addEventListener('click', () => {
  closeAccountMenu();
  openPointsPanel();
});

settingsTrigger.addEventListener('click', () => openSettingsView(loginTrigger));

settingsBack.addEventListener('click', () => {
  settingsView.hidden = true;
  canvas?.classList.remove('is-settings-view');
  discoveryLayer.hidden = false;
  searchShell.hidden = false;
  settingsReturnFocus?.focus();
});

appearanceTrigger.addEventListener('click', () => {
  document.querySelector('.settings-list').hidden = true;
  themePanel.hidden = false;
  renderThemeCards();
  themeBack.focus();
});

themeBack.addEventListener('click', () => {
  themePanel.hidden = true;
  document.querySelector('.settings-list').hidden = false;
  appearanceTrigger.focus();
});

themeGrid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-theme]');
  if (!card) return;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    card.animate([{ transform: 'scale(1)' }, { transform: 'scale(.985)' }, { transform: 'scale(1)' }], { duration: 160, easing: 'ease-out' });
  }
  switchTheme(card.dataset.theme, event);
});

logoutTrigger.addEventListener('click', () => {
  accountMenu.classList.remove('is-open');
  accountMenu.setAttribute('aria-hidden', 'true');
  loginTrigger.setAttribute('aria-expanded', 'false');
  showToast('已退出登录（演示）');
  loginTrigger.focus();
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
  activeVertical = name;
  const drawerPreset = name === '互助' ? '互助' : name === '学习库' ? '学习库' : '综合';
  setDrawerPreset(drawerPreset);
  const remembered = getRememberedSidebarItem(name, drawerPreset);
  if (name === '工具箱') {
    toolboxActiveTab = remembered;
    renderToolbox();
  } else if (name === '综合' || name === '互助' || name === '学习库') {
    renderSupportResult(remembered);
  } else {
    renderVerticalAggregate(name);
  }
  // 工具箱使用主内容顶部 Tab，不显示互助/综合的页面侧栏；其他页面保留全局快捷栏。
  const isToolbox = name === '工具箱';
  supportDrawer.classList.toggle('is-visible', !isToolbox);
  supportDrawer.setAttribute('aria-hidden', String(isToolbox));
  renderMobileSubnav(name);
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

supportDrawer.addEventListener('click', (event) => {
  const button = event.target.closest('[data-support]');
  if (button) {
    sidebarState[activeVertical] = button.dataset.support;
    saveSidebarState();
    renderSupportResult(button.dataset.support);
  }
});

const supportExamples = {
  临时求助: [
    { avatar: '匿', name: '匿名用户', badge: '匿名发布', title: '今晚有人可以帮我把资料带到北区吗？', summary: '19:00 前在北区取一份打印材料，愿意请一杯咖啡作为感谢。', tags: ['临时求助', '北区', '今晚'], meta: '发布于 12 分钟前 · 需要 1 人' },
    { avatar: '赵', name: '赵清禾', badge: '校园认证', title: '求助：有同学能帮忙看一下实验室的猫吗？', summary: '周末离校两天，猫粮和钥匙都已准备好，只需要每天去一次。', tags: ['临时求助', '周末', '实验室'], meta: '发布于 24 分钟前 · 需要 1 人' },
    { avatar: '高', name: '高知远', badge: '新闻学院', title: '摄影作业临时缺一位出镜同学', summary: '今天下午在校园内拍摄，约 30 分钟，可以互相帮忙完成作业。', tags: ['临时求助', '摄影', '校园'], meta: '发布于 41 分钟前 · 今天 16:00' },
  ],
  学习搭子: [
    { avatar: '周', name: '周砚', badge: '经济学院', title: '找一位下周一起复习高等数学的搭子', summary: '计划在图书馆安静学习，互相讲题和打卡，不卷进度，稳定见面。', tags: ['学习搭子', '高等数学', '图书馆'], meta: '发布于 28 分钟前 · 周末开始' },
    { avatar: '许', name: '许知夏', badge: '校园认证', title: '英语口语练习搭子，想一起坚持一个月', summary: '每天 20 分钟线上练习，主题轻松，互相纠正表达。', tags: ['学习搭子', '英语', '长期'], meta: '发布于 35 分钟前 · 需要 1 人' },
    { avatar: '王', name: '王嘉树', badge: '法学院', title: '周三晚自习，寻找一位安静学习搭子', summary: '图书馆三层靠窗位置，专注两小时，中途可以互相提醒休息。', tags: ['学习搭子', '自习', '周三'], meta: '发布于 1 小时前 · 本周三' },
  ],
  技能交换: [
    { avatar: '陈', name: '陈默', badge: '校园认证', title: '我可以帮你做简历排版，交换英语口语练习', summary: '熟悉 Figma 和信息排版，希望找一位同学每周练习两次日常英语。', tags: ['技能交换', '简历', '英语口语'], meta: '发布于 1 小时前 · 可长期' },
    { avatar: '李', name: '李星遥', badge: '艺术学院', title: '会修图和剪短视频，想换一节吉他入门课', summary: '可以帮忙处理证件照、活动照片或剪辑 30 秒短片。', tags: ['技能交换', '剪辑', '吉他'], meta: '发布于 1 小时前 · 可约时间' },
    { avatar: '孙', name: '孙意', badge: '校园认证', title: '一起交换做饭技能：家常菜换烘焙', summary: '擅长三道快手菜，想和会做面包或甜点的同学互相教学。', tags: ['技能交换', '做饭', '生活'], meta: '发布于 2 小时前 · 周末可约' },
  ],
};
let expandedSupportItem = null;

const drawerPresets = {
  综合: ['随便看看', '校园动态', '正在发生', '找同频的人', '我的'],
  互助: ['话题广场', '失物回家', '闲置流转', '临时求助', '学习搭子', '技能交换', '拼行组队'],
  学习库: ['学习首页', '我的课程', '资料库', '学习计划', '笔记与收藏'],
};
const mobileToolboxTabs = [['all', '所有工具'], ['favorites', '我的收藏'], ['history', '我的历史']];

const sidebarDefaults = { 综合: '随便看看', 互助: '话题广场', 学习库: '学习首页', 工具箱: 'all' };
let activeVertical = '综合';
let sidebarState = { ...sidebarDefaults };
try {
  const storedSidebarState = JSON.parse(localStorage.getItem('zaichang-sidebar-state') || '{}');
  if (storedSidebarState && typeof storedSidebarState === 'object' && !Array.isArray(storedSidebarState)) {
    sidebarState = { ...sidebarDefaults, ...storedSidebarState };
  }
} catch { /* ignore unavailable or invalid storage */ }

function saveSidebarState() {
  try {
    localStorage.setItem('zaichang-sidebar-state', JSON.stringify(sidebarState));
  } catch { /* ignore unavailable storage */ }
}

function getRememberedSidebarItem(vertical, preset) {
  const remembered = sidebarState[vertical];
  if (vertical === '工具箱') return ['all', 'favorites', 'history'].includes(remembered) ? remembered : sidebarDefaults.工具箱;
  const available = drawerPresets[preset] || [];
  return available.includes(remembered) ? remembered : (available[0] || sidebarDefaults.综合);
}

function syncMobileSubnavSelection(value) {
  if (!mobileSubnavTrack) return;
  let activeButton = null;
  mobileSubnavTrack.querySelectorAll('[data-mobile-section]').forEach((button) => {
    const active = button.dataset.mobileSection === value;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
    if (active) activeButton = button;
  });
  if (activeButton && window.matchMedia('(max-width: 767px)').matches) {
    window.requestAnimationFrame(() => {
      const targetLeft = activeButton.offsetLeft - (mobileSubnavTrack.clientWidth - activeButton.offsetWidth) / 2;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      mobileSubnavTrack.scrollTo({ left: targetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
}

function renderMobileSubnav(vertical = activeVertical) {
  if (!mobileSubnav || !mobileSubnavTrack) return;
  const isToolbox = vertical === '工具箱';
  const items = isToolbox
    ? mobileToolboxTabs
    : (drawerPresets[vertical] || []).map((label) => [label, label]);
  const selected = isToolbox
    ? toolboxActiveTab
    : getRememberedSidebarItem(vertical, vertical);
  mobileSubnav.setAttribute('aria-label', `${vertical}栏目`);
  mobileSubnavTrack.innerHTML = items.map(([value, label]) => `<button type="button" role="tab" data-mobile-section="${value}" aria-selected="${value === selected}">${label}</button>`).join('');
  mobileSubnav.hidden = false;
  syncMobileSubnavSelection(selected);
}

mobileSubnavTrack?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-mobile-section]');
  if (!button) return;
  const value = button.dataset.mobileSection;
  if (activeVertical === '工具箱') {
    toolboxActiveTab = value;
    sidebarState.工具箱 = value;
    saveSidebarState();
    renderToolbox();
  } else {
    sidebarState[activeVertical] = value;
    saveSidebarState();
    renderSupportResult(value);
  }
});

mobileSubnavTrack?.addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const buttons = [...mobileSubnavTrack.querySelectorAll('[data-mobile-section]')];
  const currentIndex = buttons.indexOf(document.activeElement);
  if (currentIndex < 0) return;
  event.preventDefault();
  let nextIndex = currentIndex;
  if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
  if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % buttons.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = buttons.length - 1;
  buttons[nextIndex].focus();
  buttons[nextIndex].click();
});

const drawerIcons = {
  '随便看看': '<circle cx="12" cy="12" r="8"/><path d="m14.8 9.2-2 4.1-3.6 1.5 2-4.1z"/>',
  '校园动态': '<path d="M4 20h16M6 20V9l6-4 6 4v11M9 20v-5h6v5M9 10h.01M15 10h.01"/>',
  '正在发生': '<path d="M3 13h4l2-5 3 10 2-5h7"/><circle cx="12" cy="12" r="9"/>',
  '找同频的人': '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0"/>',
  '我的': '<circle cx="12" cy="8" r="3"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  '失物回家': '<path d="m4 11 8-7 8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M9 20v-5h6v5M15 8h.01"/>',
  '闲置流转': '<path d="M7 7h10l-2.5-2.5M17 17H7l2.5 2.5M17 7a5 5 0 0 1 1.5 3.5M7 17A5 5 0 0 1 5.5 13.5"/>',
  '临时求助': '<path d="M12 21a8 8 0 1 0-8-8 8 8 0 0 0 1.2 4.2L4 21l3.8-1.2A8 8 0 0 0 12 21Z"/><path d="M12 8v4M12 16h.01"/>',
  '学习搭子': '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22zM20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5A2.5 2.5 0 0 1 20 22z"/><path d="M8 8h1M15 8h1"/>',
  '技能交换': '<path d="m8 12 2.5 2.5L16 9"/><path d="M6 5h12v14H6zM9 5V3h6v2"/>',
  '拼行组队': '<path d="M5 16h14l-1-5H6zM7 16v2M17 16v2M8 11l1.5-4h5l1.5 4"/><circle cx="8" cy="13" r=".7"/><circle cx="16" cy="13" r=".7"/>',
  '学习首页': '<path d="M4 10 12 4l8 6v9H4z"/><path d="M9 19v-5h6v5"/>',
  '我的课程': '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22zM20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5A2.5 2.5 0 0 1 20 22z"/>',
  '资料库': '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>',
  '学习计划': '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M7 11h10M8 15h.01M12 15h.01M16 15h.01"/>',
  '笔记与收藏': '<path d="M6 4h12v17l-6-3-6 3z"/><path d="m9 11 2 2 4-4"/>',
};

const mutualCardData = {
  失物回家: [
    { icon: '☂', tone: 'lost-umbrella', title: '黑色长柄雨伞', place: '明德楼一层门厅', time: '今天 08:40', status: '失物', description: '伞柄上有一圈浅灰色胶带，最后一次使用是在早课前。', contact: '李同学 · 站内联系', action: '联系失主' },
    { icon: '📚', tone: 'lost-books', title: '蓝色帆布书袋', place: '图书馆三层靠窗区', time: '昨天 19:10', status: '失物', description: '袋内有两本专业课教材和一只银色签字笔，已交到图书馆服务台。', contact: '周同学 · 图书馆服务台', action: '联系失主' },
    { icon: '🎧', tone: 'lost-headphones', title: '白色无线耳机盒', place: '世纪馆报告厅外', time: '9 月 16 日 16:30', status: '寻物', description: '透明保护壳上贴着一颗小树贴纸，希望有拾到的同学帮忙留意。', contact: '陈同学 · 站内联系', action: '联系发布者' },
  ],
  闲置流转: [
    { icon: '🪑', tone: 'idle-chair', title: '宿舍折叠椅', price: '25 元', condition: '九成新', place: '品园一舍附近', time: '今天 10:15', description: '靠背和坐垫都保持良好，毕业离校前转出，支持现场查看。', contact: '王同学 · 站内联系', action: '联系发布者' },
    { icon: '📖', tone: 'idle-books', title: '考研英语资料一套', price: '免费', condition: '八成新', place: '北区食堂门口', time: '昨天 21:00', description: '包含单词书、真题册和笔记，适合刚开始准备英语复习的同学。', contact: '赵同学 · 可约取件', action: '联系发布者' },
    { icon: '🖥️', tone: 'idle-monitor', title: '24 英寸显示器', price: '180 元', condition: '九成新', place: '知行楼一层', time: '9 月 15 日', description: '1080p 分辨率，接口齐全，已恢复出厂设置，可现场通电检查。', contact: '高同学 · 站内联系', action: '联系发布者' },
  ],
  拼行组队: [
    { icon: '🚄', tone: 'ride-train', title: '周末回济南，找两位同行', from: '中国人民大学', to: '济南西站', departure: '9 月 20 日 周六 13:30', remaining: '还差 2 人', transport: '高铁 · 费用 AA', contact: '许同学', description: '计划从学校一起出发到北京南站，路上可以互相照应。' },
    { icon: '🚕', tone: 'ride-taxi', title: '机场线拼车，周一早上出发', from: '海淀校区东门', to: '首都机场 T3', departure: '9 月 22 日 周一 06:20', remaining: '还差 1 人', transport: '网约车 · 预计 35 元/人', contact: '林同学', description: '已预约 6 座车，途经中关村和望京，行李较多的同学优先。' },
    { icon: '🚲', tone: 'ride-bike', title: '校园东区到西区，一起骑行', from: '品园南门', to: '世纪馆广场', departure: '今天 17:40', remaining: '还差 3 人', transport: '自行车 · 无费用', contact: '苏同学', description: '下课后顺路同行，节奏较慢，预计 20 分钟到达。' },
  ],
};

function closeMutualDetail() {
  resultItems.querySelector('.mutual-detail-layer')?.remove();
}

function openMutualDetail(item, category) {
  closeMutualDetail();
  const layer = document.createElement('div');
  layer.className = 'mutual-detail-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', `${item.title}详情`);
  const isRide = category === '拼行组队';
  const isLost = category === '失物回家';
  const info = isRide
    ? `<div class="mutual-detail-info"><span>出发地<b>${item.from}</b></span><span>目的地<b>${item.to}</b></span><span>出发时间<b>${item.departure}</b></span><span>队伍状态<b>${item.remaining}</b></span></div>`
    : `<div class="mutual-detail-info"><span>${isLost ? '地点' : '价格'}<b>${isLost ? item.place : item.price}</b></span><span>${isLost ? '发现时间' : '物品成色'}<b>${isLost ? item.time : item.condition}</b></span><span>${isLost ? '状态' : '交易地点'}<b>${isLost ? item.status : item.place}</b></span></div>`;
  layer.innerHTML = `<article class="mutual-detail-card ${isRide ? 'is-ride-detail' : ''}"><button class="mutual-detail-close" type="button" aria-label="关闭详情">×</button><span class="mutual-detail-eyebrow">${category} · 详情</span><div class="mutual-detail-art mutual-art-${item.tone}" aria-hidden="true"><span>${item.icon}</span></div><h2>${item.title}</h2>${info}<p>${item.description}</p><div class="mutual-detail-contact"><span>发起人 / 联系方式</span><b>${item.contact}</b></div><div class="mutual-detail-actions"><button class="mutual-detail-primary" type="button">${isRide ? '加入组队' : item.action}</button><button class="mutual-detail-secondary" type="button">☆ 收藏</button></div></article>`;
  resultItems.append(layer);
  const close = () => closeMutualDetail();
  layer.querySelector('.mutual-detail-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('.mutual-detail-primary').addEventListener('click', () => showToast(`${isRide ? '加入组队' : '联系发起人'}功能为前端演示`));
  layer.querySelector('.mutual-detail-secondary').addEventListener('click', (event) => { event.currentTarget.textContent = '★ 已收藏'; showToast('已收藏（本地演示）'); });
  layer.querySelector('.mutual-detail-close').focus();
}

function renderMutualCards(category) {
  const items = mutualCardData[category] || [];
  const isRide = category === '拼行组队';
  resultItems.innerHTML = `<section class="mutual-cards-page ${isRide ? 'is-ride-page' : ''}" aria-label="${category}"><header class="mutual-cards-head"><span class="campus-eyebrow">${category}</span><h2>${category}</h2><p>${isRide ? '把出发时间和同行信息说清楚，轻松找到顺路伙伴。' : category === '失物回家' ? '让遗失的物品回到主人手里。' : '把暂时不用的物品留给真正需要的人。'}</p></header><div class="mutual-card-grid">${items.map((item) => `<article class="mutual-card ${isRide ? 'is-ride-card' : ''}" tabindex="0" data-mutual-card="${items.indexOf(item)}"><div class="mutual-card-art mutual-art-${item.tone}" aria-label="${item.title}插画"><span>${item.icon}</span></div><div class="mutual-card-body"><div class="mutual-card-kicker">${isRide ? item.remaining : item.status || item.condition}</div><h3>${item.title}</h3>${isRide ? `<div class="mutual-route"><span>${item.from}</span><b>→</b><span>${item.to}</span></div><p>${item.departure}</p><div class="mutual-card-meta"><span>${item.transport}</span><span>${item.contact}</span></div>` : `<p>${item.place}</p><div class="mutual-card-meta"><span>${item.time || item.price}</span><span>${item.condition || item.status}</span></div>`}</div></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
  resultItems.querySelectorAll('[data-mutual-card]').forEach((card) => {
    const item = items[Number(card.dataset.mutualCard)];
    card.addEventListener('click', () => openMutualDetail(item, category));
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openMutualDetail(item, category); } });
  });
  setSupportSelection(category);
}

const defaultLearningPlans = [
  { id: 'plan-math', title: '完成高等数学（二）第三章复习', course: '高等数学（二）', deadline: '本周五', tasks: [{ title: '整理偏导数公式', done: true }, { title: '完成课后题 3、5、8', done: false }, { title: '订正错题并写下疑问', done: false }] },
  { id: 'plan-writing', title: '完成城市与社会课程论文提纲', course: '城市与社会', deadline: '下周一', tasks: [{ title: '确定一个可观察的公共空间', done: true }, { title: '补充三篇参考文献', done: false }, { title: '完成研究问题和方法部分', done: false }] },
];
const defaultLearningNotes = [
  { id: 'note-limit', title: '极限题的三种常见拆解方式', summary: '先判断趋近方式，再决定使用等价无穷小、夹逼定理或洛必达法则。', course: '高等数学（二）', type: '学习笔记', updated: '今天 09:20', favorite: true, body: '遇到含根式的极限，优先尝试有理化；分式结构则先比较分子分母的最高阶。做完后补写每一步选择方法的理由。' },
  { id: 'note-space', title: '公共空间观察记录：停留比经过更重要', summary: '同一处座椅在午间和傍晚呈现完全不同的使用方式。', course: '城市与社会', type: '课堂记录', updated: '昨天 18:40', favorite: false, body: '观察时记录时间、人数、停留时长和行为，而不是只描述“人很多”。这能帮助后续把空间感受转成可比较的材料。' },
  { id: 'note-english', title: '四级阅读错题：先找转折再定位答案', summary: 'however、rather than、in contrast 往往决定句子的真正方向。', course: '大学英语（四）', type: '复习摘录', updated: '9 月 16 日', favorite: true, body: '做题时先读题干和选项，再回到原文定位。遇到同义替换，不要只找原词，要确认句子之间的逻辑关系。' },
];
let learningPlans = [];
let learningNotes = [];
try {
  learningPlans = JSON.parse(localStorage.getItem('zaichang-learning-plans') || 'null');
  learningNotes = JSON.parse(localStorage.getItem('zaichang-learning-notes') || 'null');
} catch { /* ignore unavailable or invalid storage */ }
if (!Array.isArray(learningPlans)) learningPlans = defaultLearningPlans;
if (!Array.isArray(learningNotes)) learningNotes = defaultLearningNotes;
function saveLearningPlans() { try { localStorage.setItem('zaichang-learning-plans', JSON.stringify(learningPlans)); } catch { /* ignore unavailable storage */ } }
function saveLearningNotes() { try { localStorage.setItem('zaichang-learning-notes', JSON.stringify(learningNotes)); } catch { /* ignore unavailable storage */ } }
function planProgress(plan) { const total = plan.tasks.length || 1; const completed = plan.tasks.filter((task) => task.done).length; return { completed, total, percent: Math.round(completed / total * 100) }; }

function closeLearningLayer(selector = '.learning-detail-layer,.learning-editor-layer') {
  resultItems.querySelector(selector)?.remove();
}

function openLearningPlanDetail(plan) {
  closeLearningLayer();
  const layer = document.createElement('div');
  layer.className = 'learning-detail-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', `${plan.title}计划详情`);
  const progress = planProgress(plan);
  layer.innerHTML = `<article class="learning-detail-card"><button class="learning-layer-close" type="button" aria-label="关闭计划详情">×</button><span class="learning-detail-label">计划详情</span><h2>${escapeVoteText(plan.title)}</h2><div class="learning-detail-meta"><span>${escapeVoteText(plan.course)}</span><span>截止 ${escapeVoteText(plan.deadline)}</span><b>${progress.completed}/${progress.total} 项完成</b></div><div class="learning-task-list">${plan.tasks.map((task, index) => `<label class="learning-task${task.done ? ' is-done' : ''}"><input type="checkbox" data-plan-task="${index}"${task.done ? ' checked' : ''} /><span>${escapeVoteText(task.title)}</span></label>`).join('')}</div><div class="learning-detail-actions"><button type="button" class="learning-primary-action" data-plan-edit>编辑计划</button><button type="button" class="learning-light-action" data-plan-delete>删除计划</button></div></article>`;
  resultItems.append(layer);
  const close = () => closeLearningLayer('.learning-detail-layer');
  layer.querySelector('.learning-layer-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelectorAll('[data-plan-task]').forEach((checkbox) => checkbox.addEventListener('change', () => {
    plan.tasks[Number(checkbox.dataset.planTask)].done = checkbox.checked;
    saveLearningPlans();
    checkbox.closest('.learning-task').classList.toggle('is-done', checkbox.checked);
    const nextProgress = planProgress(plan);
    layer.querySelector('.learning-detail-meta b').textContent = `${nextProgress.completed}/${nextProgress.total} 项完成`;
  }));
  layer.querySelector('[data-plan-edit]').addEventListener('click', () => { close(); openLearningPlanEditor(plan); });
  layer.querySelector('[data-plan-delete]').addEventListener('click', () => {
    if (!window.confirm('确定删除这个学习计划吗？')) return;
    learningPlans = learningPlans.filter((item) => item.id !== plan.id);
    saveLearningPlans();
    close();
    renderLearningPlans();
  });
  layer.querySelector('.learning-layer-close').focus();
}

function openLearningPlanEditor(existing = null) {
  closeLearningLayer();
  const layer = document.createElement('div');
  layer.className = 'learning-editor-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', existing ? '编辑学习计划' : '新建学习计划');
  const tasks = existing ? existing.tasks.map((task) => task.title).join('\n') : '';
  layer.innerHTML = `<article class="learning-editor-card"><button class="learning-layer-close" type="button" aria-label="关闭编辑">×</button><span class="learning-detail-label">${existing ? '编辑计划' : '新建计划'}</span><h2>${existing ? '编辑学习计划' : '新建学习计划'}</h2><form data-plan-form><label><span>计划目标</span><input name="title" required value="${existing ? escapeVoteText(existing.title) : ''}" placeholder="例如：完成本周高数复习" /></label><label><span>关联课程</span><input name="course" value="${existing ? escapeVoteText(existing.course) : ''}" placeholder="例如：高等数学（二）" /></label><label><span>截止时间</span><input name="deadline" value="${existing ? escapeVoteText(existing.deadline) : ''}" placeholder="例如：本周五" /></label><label><span>子任务（每行一项）</span><textarea name="tasks" rows="5" placeholder="整理课堂笔记\n完成练习题">${escapeVoteText(tasks)}</textarea></label><button class="learning-primary-action" type="submit">保存计划</button></form></article>`;
  resultItems.append(layer);
  const close = () => closeLearningLayer('.learning-editor-layer');
  layer.querySelector('.learning-layer-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('[data-plan-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const taskTitles = String(formData.get('tasks') || '').split('\n').map((title) => title.trim()).filter(Boolean);
    const next = { id: existing?.id || `plan-${Date.now()}`, title: String(formData.get('title') || '').trim(), course: String(formData.get('course') || '').trim() || '自主学习', deadline: String(formData.get('deadline') || '').trim() || '待定', tasks: taskTitles.map((title) => ({ title, done: existing?.tasks.find((task) => task.title === title)?.done || false })) };
    if (!next.tasks.length) next.tasks = [{ title: '补充第一个子任务', done: false }];
    if (existing) learningPlans = learningPlans.map((item) => item.id === existing.id ? next : item); else learningPlans = [next, ...learningPlans];
    saveLearningPlans();
    close();
    renderLearningPlans();
  });
  layer.querySelector('input').focus();
}

function renderLearningPlans() {
  const totalTasks = learningPlans.reduce((sum, plan) => sum + plan.tasks.length, 0);
  const completedTasks = learningPlans.reduce((sum, plan) => sum + plan.tasks.filter((task) => task.done).length, 0);
  const todayTasks = learningPlans.flatMap((plan) => plan.tasks.filter((task) => !task.done).slice(0, 1).map((task) => ({ ...task, course: plan.course })));
  resultItems.innerHTML = `<section class="learning-plans-page" aria-label="学习计划"><header class="learning-plans-head"><div><span class="campus-eyebrow">学习安排</span><h2>学习计划</h2><p>把这一周要完成的事情拆开，一项一项推进。</p></div><button type="button" class="learning-primary-action" data-plan-new>＋ 新建计划</button></header><div class="learning-overview-grid"><article class="learning-overview-card"><span>本周进度</span><strong>${completedTasks}/${totalTasks || 0}</strong><div class="learning-progress-bar"><i style="width:${totalTasks ? Math.round(completedTasks / totalTasks * 100) : 0}%"></i></div><small>${totalTasks ? Math.round(completedTasks / totalTasks * 100) : 0}% 已完成</small></article><article class="learning-overview-card"><span>今日任务</span><strong>${todayTasks.length}</strong><div class="learning-today-list">${todayTasks.length ? todayTasks.map((task) => `<p>· ${escapeVoteText(task.title)}<small>${escapeVoteText(task.course)}</small></p>`).join('') : '<p>今天的计划已完成</p>'}</div></article></div><div class="learning-section-heading"><h3>我的计划</h3><span>${learningPlans.length} 个计划</span></div><div class="learning-plan-grid">${learningPlans.map((plan) => { const progress = planProgress(plan); return `<article class="learning-plan-card" tabindex="0" data-plan-id="${plan.id}"><div class="learning-plan-top"><span>${escapeVoteText(plan.course)}</span><b>${escapeVoteText(plan.deadline)}</b></div><h3>${escapeVoteText(plan.title)}</h3><p>${progress.completed}/${progress.total} 项子任务完成</p><div class="learning-progress-bar"><i style="width:${progress.percent}%"></i></div><div class="learning-plan-foot"><span>${progress.percent}%</span><span>查看详情 →</span></div></article>`; }).join('')}</div></section>`;
  resultItems.hidden = false;
  resultItems.querySelector('[data-plan-new]').addEventListener('click', () => openLearningPlanEditor());
  resultItems.querySelectorAll('[data-plan-id]').forEach((card) => { const plan = learningPlans.find((item) => item.id === card.dataset.planId); card.addEventListener('click', () => openLearningPlanDetail(plan)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLearningPlanDetail(plan); } }); });
  setSupportSelection('学习计划');
}

function openLearningNoteDetail(note) {
  closeLearningLayer();
  const layer = document.createElement('div');
  layer.className = 'learning-detail-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', `${note.title}笔记详情`);
  layer.innerHTML = `<article class="learning-detail-card note-detail-card"><button class="learning-layer-close" type="button" aria-label="关闭笔记详情">×</button><span class="learning-detail-label">${escapeVoteText(note.type)} · ${escapeVoteText(note.course)}</span><h2>${escapeVoteText(note.title)}</h2><p class="note-detail-body">${escapeVoteText(note.body || note.summary)}</p><div class="learning-detail-meta"><span>更新于 ${escapeVoteText(note.updated)}</span><b>${note.favorite ? '已收藏' : '未收藏'}</b></div><div class="learning-detail-actions"><button type="button" class="learning-primary-action" data-note-edit>编辑笔记</button><button type="button" class="learning-light-action" data-note-delete>删除笔记</button></div></article>`;
  resultItems.append(layer);
  const close = () => closeLearningLayer('.learning-detail-layer');
  layer.querySelector('.learning-layer-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('[data-note-edit]').addEventListener('click', () => { close(); openLearningNoteEditor(note); });
  layer.querySelector('[data-note-delete]').addEventListener('click', () => { if (!window.confirm('确定删除这条笔记吗？')) return; learningNotes = learningNotes.filter((item) => item.id !== note.id); saveLearningNotes(); close(); renderLearningNotes(); });
  layer.querySelector('.learning-layer-close').focus();
}

function openLearningNoteEditor(existing = null) {
  closeLearningLayer();
  const layer = document.createElement('div');
  layer.className = 'learning-editor-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', existing ? '编辑笔记' : '新建笔记');
  layer.innerHTML = `<article class="learning-editor-card"><button class="learning-layer-close" type="button" aria-label="关闭编辑">×</button><span class="learning-detail-label">${existing ? '编辑笔记' : '新建笔记'}</span><h2>${existing ? '编辑学习笔记' : '新建学习笔记'}</h2><form data-note-form><label><span>标题</span><input name="title" required value="${existing ? escapeVoteText(existing.title) : ''}" placeholder="输入笔记标题" /></label><label><span>关联课程</span><input name="course" value="${existing ? escapeVoteText(existing.course) : ''}" placeholder="例如：大学英语（四）" /></label><label><span>类型</span><input name="type" value="${existing ? escapeVoteText(existing.type) : '学习笔记'}" placeholder="例如：学习笔记" /></label><label><span>摘要</span><textarea name="summary" rows="2" required placeholder="用一句话概括这条笔记">${existing ? escapeVoteText(existing.summary) : ''}</textarea></label><label><span>正文</span><textarea name="body" rows="5" placeholder="写下具体内容">${existing ? escapeVoteText(existing.body || existing.summary) : ''}</textarea></label><button class="learning-primary-action" type="submit">保存笔记</button></form></article>`;
  resultItems.append(layer);
  const close = () => closeLearningLayer('.learning-editor-layer');
  layer.querySelector('.learning-layer-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('[data-note-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const next = { id: existing?.id || `note-${Date.now()}`, title: String(formData.get('title') || '').trim(), course: String(formData.get('course') || '').trim() || '自主学习', type: String(formData.get('type') || '').trim() || '学习笔记', summary: String(formData.get('summary') || '').trim(), body: String(formData.get('body') || '').trim() || String(formData.get('summary') || '').trim(), updated: '刚刚', favorite: existing?.favorite || false };
    if (existing) learningNotes = learningNotes.map((item) => item.id === existing.id ? next : item); else learningNotes = [next, ...learningNotes];
    saveLearningNotes();
    close();
    renderLearningNotes();
  });
  layer.querySelector('input').focus();
}

function renderLearningNotes() {
  resultItems.innerHTML = `<section class="learning-notes-page" aria-label="笔记与收藏"><header class="learning-notes-head"><div><span class="campus-eyebrow">学习记录</span><h2>笔记与收藏</h2><p>把值得回看的课堂片段和复习线索留在这里。</p></div><button type="button" class="learning-primary-action" data-note-new>＋ 新建笔记</button></header><div class="learning-note-grid">${learningNotes.map((note) => `<article class="learning-note-card" tabindex="0" data-note-id="${note.id}"><div class="learning-note-top"><span>${escapeVoteText(note.type)}</span><button type="button" class="learning-note-favorite" data-note-favorite="${note.id}" aria-label="${note.favorite ? '取消收藏' : '收藏'} ${escapeVoteText(note.title)}">${note.favorite ? '★' : '☆'}</button></div><h3>${escapeVoteText(note.title)}</h3><p>${escapeVoteText(note.summary)}</p><div class="learning-note-meta"><span>${escapeVoteText(note.course)}</span><span>${escapeVoteText(note.updated)}</span></div></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
  resultItems.querySelector('[data-note-new]').addEventListener('click', () => openLearningNoteEditor());
  resultItems.querySelectorAll('[data-note-id]').forEach((card) => { const note = learningNotes.find((item) => item.id === card.dataset.noteId); card.addEventListener('click', (event) => { if (event.target.closest('[data-note-favorite]')) return; openLearningNoteDetail(note); }); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLearningNoteDetail(note); } }); });
  resultItems.querySelectorAll('[data-note-favorite]').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); const note = learningNotes.find((item) => item.id === button.dataset.noteFavorite); note.favorite = !note.favorite; saveLearningNotes(); renderLearningNotes(); }));
  setSupportSelection('笔记与收藏');
}

function setDrawerPreset(preset) {
  const labels = drawerPresets[preset] || drawerPresets.综合;
  const title = preset === '综合' ? '综合' : preset === '互助' ? '互助' : '学习库';
  supportDrawer.setAttribute('aria-label', `${title}快捷栏目`);
  supportDrawer.querySelector('.support-drawer-inner').innerHTML = `<div class="support-drawer-title" aria-hidden="true">${title}</div>${labels.map((label) => `<button class="support-item" type="button" data-support="${label}" aria-label="${label}" aria-pressed="false"><span class="support-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${drawerIcons[label] || drawerIcons['随便看看']}</svg></span><span class="support-label">${label}</span></button>`).join('')}`;
}

function setSupportSelection(category) {
  if (drawerPresets[activeVertical]?.includes(category)) {
    sidebarState[activeVertical] = category;
    saveSidebarState();
  }
  supportDrawer.querySelectorAll('[data-support]').forEach((button) => {
    const active = button.dataset.support === category;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  syncMobileSubnavSelection(category);
}

function renderSupportResult(category) {
  if (category === '学习首页') { renderLearningHome(); setSupportSelection(category); return; }
  if (category === '我的课程') { renderCourseTable(); setSupportSelection(category); return; }
  if (category === '资料库') { renderResourceLibrary(); setSupportSelection(category); return; }
  if (category === '学习计划') { renderLearningPlans(); return; }
  if (category === '笔记与收藏') { renderLearningNotes(); return; }
  if (mutualCardData[category]) { renderMutualCards(category); return; }
  if (category === '校园动态') {
    renderCampusBoard();
    setSupportSelection(category);
    return;
  }
  if (category === '正在发生') {
    renderCampusRadar();
    setSupportSelection(category);
    return;
  }
  if (category === '话题广场') { renderDiscussionFeed(); setSupportSelection(category); return; }
  if (category === '我的') { renderProfilePage(); setSupportSelection(category); return; }
  if (category === '找同频的人') { renderInterestFeed(); setSupportSelection(category); return; }
  const items = (category === '随便看看' || category === '话题广场')
    ? Object.values(supportExamples).flat()
    : supportExamples[category];
  if (!items) { showToast(`${category}内容将在下一层接入`); return; }
  expandedSupportItem = null;
  setSupportSelection(category);
  resultItems.innerHTML = items.map((item, index) => `<article class="result-item" aria-label="${category}搜索结果" data-support-item="${index}" aria-expanded="false" tabindex="0">
    <div class="author-rail"><span class="avatar" aria-hidden="true">${avatarMarkup(item.name, item.avatar)}</span><span class="display-name">${item.name}</span><span class="user-badge">${item.badge} <b aria-hidden="true">●</b></span></div>
    <div class="result-content"><h2 class="result-header">${item.title}</h2><p class="result-summary">${item.summary}</p><div class="result-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div><div class="result-meta"><span>◷ ${item.meta.replace(/ · .*/, '')}</span><span>♙ ${item.meta.includes('需要') ? item.meta.match(/需要\s*\d+\s*人/)?.[0] || '1 人参与' : '1 人参与'}</span><span>◌ 0 条回复</span></div><span class="result-chevron" aria-hidden="true">›</span>
    <div class="result-detail" data-support-detail>
      <div class="result-detail-copy"><div class="result-detail-section-label"><span>DETAIL</span><strong>详情</strong></div><p>${item.summary}</p><div class="result-detail-info"><div><span class="result-detail-icon">♙</span><small>参与人数</small><b>${item.meta.match(/需要\s*\d+\s*人/)?.[0] || '1 人'}</b></div><div><span class="result-detail-icon">◷</span><small>时间安排</small><b>${item.tags[item.tags.length - 1] || '待约时间'}</b></div><div><span class="result-detail-icon">◌</span><small>联系方式</small><b>站内联系</b></div></div><div class="result-detail-tags"><span>${item.tags[1] || item.tags[0]}</span></div></div>
      <div class="result-detail-actions"><button type="button" class="result-detail-primary">联系发起人</button><button type="button" class="result-detail-secondary" aria-label="收藏这条"><span aria-hidden="true">☆</span> 收藏</button></div>
    </div>
  </article>`).join('');
  resultItems.hidden = false;
  const toggleSupportItem = (itemNode) => {
    const index = itemNode.dataset.supportItem;
    const shouldOpen = expandedSupportItem !== index;
    resultItems.querySelectorAll('[data-support-item]').forEach((node) => { node.classList.remove('is-expanded'); node.setAttribute('aria-expanded', 'false'); });
    expandedSupportItem = shouldOpen ? index : null;
    if (shouldOpen) { itemNode.classList.add('is-expanded'); itemNode.setAttribute('aria-expanded', 'true'); }
  };
  resultItems.querySelectorAll('[data-support-item]').forEach((itemNode) => itemNode.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;
    toggleSupportItem(itemNode);
  }));
  resultItems.querySelectorAll('[data-support-item]').forEach((itemNode) => itemNode.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSupportItem(itemNode); } }));
  resultItems.querySelectorAll('.result-detail-actions button').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); showToast(button.classList.contains('result-detail-primary') ? '已发起站内联系（演示）' : '已收藏这条互助信息（演示）'); }));
}

function renderProfilePage() {
  resultItems.innerHTML = `<section class="profile-page" aria-label="我的个人主页"><header class="profile-cover"><div class="profile-cover-art"></div><div class="profile-identity"><div class="profile-avatar">${avatarMarkup('林予安', '林')}</div><div><h2>林予安</h2><p>英语 2302 · 喜欢摄影、猫和夜跑</p><div class="profile-tags"><span>校园摄影</span><span>音乐</span><span>阅读</span></div></div><button type="button" class="profile-edit">编辑主页</button></div></header><section class="profile-account-panel" aria-label="账户快捷操作"><button type="button" data-profile-account="login"><span>登录账户</span><small>手机号或邮箱登录</small></button><button type="button" data-profile-account="points"><span>我的积分</span><small>查看余额与记录</small></button><button type="button" data-profile-account="settings"><span>设置</span><small>外观、账号与安全</small></button></section><div class="profile-tabs"><button class="is-active" type="button">主页</button><button type="button">我的发布</button><button type="button">收藏</button><button type="button">关注</button><button type="button">连接记录</button></div><div class="profile-grid"><aside class="profile-sidebar"><h3>关于我</h3><p>记录校园里值得停下来的瞬间，也在寻找一起学习和散步的人。</p><div class="profile-stats"><b>24<small>关注</small></b><b>128<small>获赞</small></b><b>16<small>连接</small></b></div></aside><main class="profile-main"><div class="profile-section-head"><span class="campus-eyebrow">FEATURED</span><h3>精选</h3></div><div class="profile-feature-grid"><article class="profile-feature feature-photo"><span>校园摄影</span><h4>雨后的校园</h4></article><article class="profile-feature feature-note"><span>最近的一段经历</span><h4>把路灯下的影子拍下来，发现校园会在夜里变得很温柔。</h4></article><article class="profile-feature feature-collection"><span>收藏的话题</span><h4>期末周图书馆要不要延长开放？</h4></article></div><div class="profile-section-head"><span class="campus-eyebrow">RECENT POSTS</span><h3>最近发布</h3></div><article class="profile-post"><div><span class="campus-eyebrow">校园生活 · 28 分钟前</span><h4>雨后的校园，适合散步也适合发呆</h4><p>下课后绕着湖边走了一圈，发现校园在雨里有另一种安静。</p></div><span class="profile-post-meta">24 ♡　3 ◌</span></article></main><aside class="profile-right"><h3>最近关注</h3><p>周砚 · 摄影</p><p>校园夜跑组 · 运动</p><h3>我的连接</h3><p>四级词汇搭子</p><p>草坪音乐会 · 已参加</p></aside></div></section>`;
  resultItems.hidden = false;
  resultItems.querySelector('.profile-edit').addEventListener('click',()=>showToast('编辑主页将在下一层接入'));
  resultItems.querySelectorAll('[data-profile-account]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.profileAccount === 'login') openLoginDialog();
    else if (button.dataset.profileAccount === 'points') openPointsPanel();
    else openSettingsView(button);
  }));
}

const discussionThreads = [
  ['校园生活','大家觉得学校应该延长图书馆开放时间吗？','最近考试周，晚上九点以后几乎没有位置了。想看看大家对延长开放时间的看法。','12 分钟前','匿名用户',126,38,24,'官方回复'],
  ['课程学习','早八课程真的应该取消吗？','连续几天六点起床之后，我开始认真思考早八对学习效率的影响。','35 分钟前','赵清禾',98,42,16,'高赞回答'],
  ['食堂生活','三食堂最近为什么突然涨价？','同样的套餐比上学期贵了三元，大家有了解背后的原因吗？','1 小时前','周砚',87,29,12,''],
  ['校园生活','期末周图书馆要不要延长开放？','如果延长到凌晨一点，你会愿意留下来学习吗？','2 小时前','许知夏',76,31,9,''],
  ['成长选择','你们会选择保研还是直接工作？','身边的同学都在做不同选择，想听听已经经历过的人怎么想。','3 小时前','陈默',64,27,8,'高赞回答'],
];

function renderDiscussionFeed() {
  resultItems.innerHTML = `<section class="discussion-layout"><main class="discussion-main"><header class="discussion-head"><div><span class="campus-eyebrow">CAMPUS DISCUSSION</span><h2>话题广场</h2></div><div class="discussion-filters"><button class="is-active" type="button">推荐</button><button type="button">最新</button><button type="button">校园</button><button type="button">学习</button></div></header>${discussionThreads.map(t=>`<article class="thread-item"><div class="thread-topic">${t[0]} · ${t[3]}</div><h3>${t[1]}</h3><p>${t[2]}</p><div class="thread-meta"><span>赞同 ${t[5]}</span><span>${t[6]} 个回答</span><span>收藏 ${t[7]}</span><span>${t[4]} 发起</span>${t[8]?`<em>${t[8]}</em>`:''}</div></article>`).join('')}</main><aside class="discussion-sidebar"><h3>大家都在聊</h3><ol>${discussionThreads.slice(0,5).map(t=>`<li><span>${t[1]}</span><small>${t[5]} 赞同 · ${t[6]} 回答</small></li>`).join('')}</ol><section><h4>校园标签</h4><div class="discussion-tags">课程　食堂　宿舍　社团　实习　考试</div></section></aside></section>`;
  resultItems.hidden = false;
  resultItems.querySelectorAll('.thread-item').forEach(item=>item.addEventListener('click',()=>showToast('讨论详情将在下一层接入')));
}

function renderVerticalAggregate(name) {
  if (name === '工具箱') { renderToolbox(); return; }
  const copy = ['学习库', '课程资料、学习搭子与校园知识整理在这里汇总。', '课程笔记', '复习计划', '学习讨论'];
  resultItems.innerHTML = `<section class="aggregate-board" aria-label="${copy[0]}汇总"><span class="campus-eyebrow">${copy[0].toUpperCase()} · OVERVIEW</span><h2>${copy[0]}</h2><p>${copy[1]}</p><div class="aggregate-grid">${copy.slice(2).map((item,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${item}</h3><p>相关内容与入口将在后续版本接入。</p><button type="button">浏览 →</button></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
}

const toolboxItems = [
  ['番茄钟', 'tool-coral'],
  ['学学单词', 'tool-indigo'],
  ['单词卡', 'tool-paper'],
  ['文件扫描', 'tool-folder'],
  ['校园地图', 'tool-map'],
  ['创建投票', 'tool-lilac'],
  ['发起签到', 'tool-sage'],
  ['制作问卷', 'tool-amber'],
  ['课程表', 'tool-lake'],
];
let toolboxActiveTab = 'all';
let toolboxFavorites = [];
let toolboxHistory = [];
try {
  toolboxFavorites = JSON.parse(localStorage.getItem('zaichang-toolbox-favorites') || '[]');
  toolboxHistory = JSON.parse(localStorage.getItem('zaichang-toolbox-history') || '[]');
  if (!Array.isArray(toolboxFavorites)) toolboxFavorites = [];
  if (!Array.isArray(toolboxHistory)) toolboxHistory = [];
} catch { /* ignore unavailable storage */ }

const toolboxCoverMap = {
  番茄钟: ['./assets/tomato-clock-cover.png', 'has-cover'],
  创建投票: ['./assets/vote-cover.png', 'has-cover vote-cover'],
  制作问卷: ['./assets/survey-cover.png', 'has-cover survey-cover'],
  单词卡: ['./assets/word-card-cover.png', 'has-cover word-cover'],
  校园地图: ['./assets/campus-map-cover.png', 'has-cover map-cover'],
};

function saveToolboxState() {
  try {
    localStorage.setItem('zaichang-toolbox-favorites', JSON.stringify(toolboxFavorites));
    localStorage.setItem('zaichang-toolbox-history', JSON.stringify(toolboxHistory));
  } catch { /* ignore unavailable storage */ }
}

function getToolboxVisibleItems() {
  if (toolboxActiveTab === 'favorites') return toolboxItems.filter(([name]) => toolboxFavorites.includes(name));
  if (toolboxActiveTab === 'history') {
    const recent = [...new Set(toolboxHistory.map((item) => item.name))];
    return recent.map((name) => toolboxItems.find((item) => item[0] === name)).filter(Boolean);
  }
  return toolboxItems;
}

function toggleToolboxFavorite(name) {
  toolboxFavorites = toolboxFavorites.includes(name) ? toolboxFavorites.filter((item) => item !== name) : [...toolboxFavorites, name];
  saveToolboxState();
  renderToolbox();
}

function openToolboxTool(name) {
  toolboxHistory = [{ name, openedAt: Date.now() }, ...toolboxHistory.filter((item) => item.name !== name)].slice(0, 20);
  saveToolboxState();
  if (name === '单词卡') {
    window.open('https://word.yunzhicompany.com/', '_blank', 'noopener,noreferrer');
    return;
  }
  if (name === '番茄钟') {
    openPomodoro();
    return;
  }
  if (name === '创建投票') {
    resetVoteDraft();
    renderVotePage();
    return;
  }
  if (name === '制作问卷') {
    renderSurveyPage();
    return;
  }
  if (name === '校园地图') {
    renderCampusMapPage();
    return;
  }
  if (name === '课程表') {
    renderCourseTable();
    return;
  }
  showToast(`${name}工具页将在下一阶段接入`);
}

let voteMode = 'edit';
let votePreviewSelected = 0;
let voteDraft = null;

function resetVoteDraft() {
  voteMode = 'edit';
  votePreviewSelected = 0;
  voteDraft = { title: '', description: '', options: ['', ''], allowMultiple: false, anonymous: false, deadline: '' };
}

function escapeVoteText(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function voteIsValid() {
  return voteDraft.title.trim() && voteDraft.options.filter((option) => option.trim()).length >= 2;
}

function renderVotePage() {
  if (!voteDraft) resetVoteDraft();
  const options = voteDraft.options;
  const cleanOptions = options.filter((option) => option.trim());
  const title = escapeVoteText(voteDraft.title);
  const description = escapeVoteText(voteDraft.description);
  const optionInputs = options.map((option, index) => `<div class="vote-option-input"><input data-vote-option="${index}" type="text" value="${escapeVoteText(option)}" placeholder="选项 ${index + 1}" aria-label="投票选项 ${index + 1}" /><button class="vote-remove-option" type="button" data-vote-remove="${index}" aria-label="删除选项 ${index + 1}">×</button></div>`).join('');
  if (voteMode === 'published') {
    const link = `${window.location.origin}${window.location.pathname}?vote=campus-demo`;
    resultItems.innerHTML = `<section class="vote-page" aria-label="投票已发布"><button class="vote-back" type="button" data-vote-back>← 返回工具箱</button><article class="vote-card vote-published-card"><span class="vote-published-status">已发布</span><h2>${title || '未命名投票'}</h2>${description ? `<p class="vote-description">${description}</p>` : ''}<p class="vote-published-note">投票已生成，可以复制链接分享给同学。</p><div class="vote-link-row"><input type="text" value="${link}" readonly aria-label="投票链接" /><button type="button" class="vote-copy-link" data-vote-copy>复制链接</button></div><button type="button" class="vote-publish vote-return-button" data-vote-back>返回工具箱</button></article></section>`;
  } else if (voteMode === 'preview') {
    resultItems.innerHTML = `<section class="vote-page" aria-label="投票预览"><button class="vote-back" type="button" data-vote-edit>← 返回编辑</button><article class="vote-card vote-preview-card"><span class="campus-eyebrow">投票预览</span><h2>${title || '未填写投票标题'}</h2>${description ? `<p class="vote-description">${description}</p>` : '<p class="vote-description vote-empty-description">暂未填写投票说明</p>'}<div class="vote-preview-options" role="${voteDraft.allowMultiple ? 'group' : 'radiogroup'}" aria-label="投票选项">${cleanOptions.map((option, index) => `<button type="button" class="vote-preview-option${votePreviewSelected === index ? ' is-selected' : ''}" data-vote-preview-option="${index}"><span class="vote-option-mark">${votePreviewSelected === index ? '✓' : ''}</span><span>${escapeVoteText(option)}</span></button>`).join('')}</div><p class="vote-preview-meta">${voteDraft.allowMultiple ? '可多选' : '单选'} · ${voteDraft.anonymous ? '匿名投票' : '公开投票'}${voteDraft.deadline ? ` · 截止 ${escapeVoteText(voteDraft.deadline)}` : ''}</p><div class="vote-actions"><button type="button" class="vote-preview" data-vote-edit>继续编辑</button><button type="button" class="vote-publish" data-vote-publish>发布投票</button></div></article></section>`;
  } else {
    resultItems.innerHTML = `<section class="vote-page" aria-label="发起投票"><button class="vote-back" type="button" data-vote-back>← 返回工具箱</button><article class="vote-card vote-editor-card"><span class="campus-eyebrow">CAMPUS VOTE</span><h2>发起投票</h2><form class="vote-form" data-vote-form><label class="vote-field"><span>投票标题</span><input id="voteTitle" type="text" value="${title}" placeholder="例如：校园学习空间，怎样安排更合适？" required /></label><label class="vote-field"><span>投票说明</span><textarea id="voteDescription" placeholder="补充投票背景和选择说明">${description}</textarea></label><div class="vote-editor-heading"><span>投票选项</span><small>至少保留两项</small></div><div class="vote-option-editor">${optionInputs}</div><button type="button" class="vote-add-option" data-vote-add>＋ 添加选项</button><div class="vote-settings-grid"><label class="vote-toggle"><input id="voteMultiple" type="checkbox"${voteDraft.allowMultiple ? ' checked' : ''} /><span>多选</span><small>允许选择多个选项</small></label><label class="vote-toggle"><input id="voteAnonymous" type="checkbox"${voteDraft.anonymous ? ' checked' : ''} /><span>匿名投票</span><small>不显示参与者姓名</small></label></div><label class="vote-field vote-deadline-field"><span>截止时间</span><input id="voteDeadline" type="date" value="${escapeVoteText(voteDraft.deadline)}" /></label><div class="vote-actions"><button type="button" class="vote-preview" data-vote-preview>预览</button><button type="submit" class="vote-publish">发布投票</button></div></form></article></section>`;
  }
  resultItems.hidden = false;
  resultItems.querySelectorAll('[data-vote-back]').forEach((button) => button.addEventListener('click', () => { resetVoteDraft(); renderToolbox(); }));
  resultItems.querySelectorAll('[data-vote-edit]').forEach((button) => button.addEventListener('click', () => { voteMode = 'edit'; renderVotePage(); }));
  resultItems.querySelectorAll('[data-vote-option]').forEach((input) => input.addEventListener('input', () => { voteDraft.options[Number(input.dataset.voteOption)] = input.value; }));
  resultItems.querySelector('[data-vote-add]')?.addEventListener('click', () => { voteDraft.options.push(''); renderVotePage(); resultItems.querySelector(`[data-vote-option="${voteDraft.options.length - 1}"]`)?.focus(); });
  resultItems.querySelectorAll('[data-vote-remove]').forEach((button) => button.addEventListener('click', () => { if (voteDraft.options.length <= 2) return; voteDraft.options.splice(Number(button.dataset.voteRemove), 1); renderVotePage(); }));
  resultItems.querySelector('#voteTitle')?.addEventListener('input', (event) => { voteDraft.title = event.target.value; });
  resultItems.querySelector('#voteDescription')?.addEventListener('input', (event) => { voteDraft.description = event.target.value; });
  resultItems.querySelector('#voteMultiple')?.addEventListener('change', (event) => { voteDraft.allowMultiple = event.target.checked; });
  resultItems.querySelector('#voteAnonymous')?.addEventListener('change', (event) => { voteDraft.anonymous = event.target.checked; });
  resultItems.querySelector('#voteDeadline')?.addEventListener('change', (event) => { voteDraft.deadline = event.target.value; });
  resultItems.querySelector('[data-vote-preview]')?.addEventListener('click', () => { if (!voteIsValid()) { showToast('请填写标题并至少保留两个选项'); return; } voteMode = 'preview'; renderVotePage(); });
  resultItems.querySelector('[data-vote-publish]')?.addEventListener('click', () => { voteMode = 'published'; renderVotePage(); });
  resultItems.querySelector('[data-vote-form]')?.addEventListener('submit', (event) => { event.preventDefault(); if (!voteIsValid()) { showToast('请填写标题并至少保留两个选项'); return; } voteMode = 'published'; renderVotePage(); });
  resultItems.querySelectorAll('[data-vote-preview-option]').forEach((button) => button.addEventListener('click', () => { votePreviewSelected = Number(button.dataset.votePreviewOption); renderVotePage(); }));
  resultItems.querySelector('[data-vote-copy]')?.addEventListener('click', async () => { const value = resultItems.querySelector('[aria-label="投票链接"]').value; try { await navigator.clipboard.writeText(value); showToast('投票链接已复制'); } catch { showToast('链接已生成，请手动复制'); } });
}

let surveyMode = 'edit';
let surveyDraft = null;

function resetSurvey() {
  surveyMode = 'edit';
  surveyDraft = { title: '', description: '', questions: [{ type: 'radio', title: '', required: true, options: ['', ''] }] };
}

function surveyTypeLabel(type) { return ({ radio: '单选题', checkbox: '多选题', text: '简答题' })[type] || '单选题'; }

function surveyDraftValid() { return surveyDraft.title.trim() && surveyDraft.questions.length > 0 && surveyDraft.questions.every((question) => question.title.trim() && (question.type === 'text' || question.options.filter((option) => option.trim()).length >= 2)); }

function renderSurveyQuestion(question, index) {
  const typeOptions = [['radio', '单选题'], ['checkbox', '多选题'], ['text', '简答题']].map(([value, label]) => `<option value="${value}"${question.type === value ? ' selected' : ''}>${label}</option>`).join('');
  const options = question.type === 'text' ? '' : `<div class="survey-editor-options">${question.options.map((option, optionIndex) => `<div class="survey-editor-option"><input data-survey-option="${index}:${optionIndex}" type="text" value="${escapeVoteText(option)}" placeholder="选项 ${optionIndex + 1}" aria-label="第 ${index + 1} 题选项 ${optionIndex + 1}" /><button type="button" data-survey-remove-option="${index}:${optionIndex}" aria-label="删除选项">×</button></div>`).join('')}</div><button type="button" class="survey-add-option" data-survey-add-option="${index}">＋ 添加选项</button>`;
  return `<article class="survey-editor-question"><header class="survey-editor-question-head"><span class="survey-question-number">${String(index + 1).padStart(2, '0')}</span><select data-survey-type="${index}" aria-label="第 ${index + 1} 题类型">${typeOptions}</select><div class="survey-question-actions"><button type="button" data-survey-up="${index}"${index === 0 ? ' disabled' : ''}>↑</button><button type="button" data-survey-down="${index}"${index === surveyDraft.questions.length - 1 ? ' disabled' : ''}>↓</button><button type="button" data-survey-remove-question="${index}" aria-label="删除第 ${index + 1} 题">删除</button></div></header><label class="survey-editor-title"><span>题目内容</span><textarea data-survey-title="${index}" rows="2" placeholder="输入题目">${escapeVoteText(question.title)}</textarea></label><div class="survey-required-toggle"><label><input type="checkbox" data-survey-required="${index}"${question.required ? ' checked' : ''} /> <span>必填</span></label><small>${question.required ? '填写者必须回答' : '填写者可以跳过'}</small></div>${options}</article>`;
}

function renderSurveyPreview() {
  const questions = surveyDraft.questions.map((question, index) => question.type === 'text' ? `<fieldset class="survey-question"><legend><span class="survey-question-number">${String(index + 1).padStart(2, '0')}</span><span>${escapeVoteText(question.title)}</span>${question.required ? '<span class="survey-required">必填</span>' : '<span class="survey-optional">选填</span>'}</legend><textarea placeholder="请输入你的回答" aria-label="${escapeVoteText(question.title)}"></textarea></fieldset>` : `<fieldset class="survey-question"><legend><span class="survey-question-number">${String(index + 1).padStart(2, '0')}</span><span>${escapeVoteText(question.title)}</span>${question.required ? '<span class="survey-required">必填</span>' : '<span class="survey-optional">选填</span>'}</legend><div class="survey-options">${question.options.filter((option) => option.trim()).map((option) => `<label class="survey-option"><input type="${question.type === 'checkbox' ? 'checkbox' : 'radio'}" name="survey-preview-${index}" /><span class="survey-option-mark"></span><span>${escapeVoteText(option)}</span></label>`).join('')}</div></fieldset>`).join('');
  resultItems.innerHTML = `<section class="survey-page" aria-label="问卷预览"><button class="survey-back" type="button" data-survey-edit>← 返回编辑</button><article class="survey-card"><span class="campus-eyebrow">CAMPUS SURVEY · PREVIEW</span><h2>${escapeVoteText(surveyDraft.title) || '未填写问卷标题'}</h2><p class="survey-description">${escapeVoteText(surveyDraft.description) || '暂未填写问卷说明'}</p><form class="survey-preview-form">${questions}<button class="survey-submit" type="button" disabled>提交问卷（预览）</button></form></article></section>`;
}

function renderSurveyPage() {
  if (!surveyDraft) resetSurvey();
  if (surveyMode === 'preview') { renderSurveyPreview(); }
  else if (surveyMode === 'published') {
    const link = `${window.location.origin}${window.location.pathname}?survey=campus-demo`;
    resultItems.innerHTML = `<section class="survey-page" aria-label="问卷已发布"><button class="survey-back" type="button" data-survey-back>← 返回工具箱</button><article class="survey-card survey-complete"><span class="survey-published-status">已发布</span><h2>${escapeVoteText(surveyDraft.title) || '未命名问卷'}</h2><p>问卷已经准备好，可以复制链接分享给同学。</p><div class="survey-link-row"><input type="text" value="${link}" readonly aria-label="问卷链接" /><button type="button" data-survey-copy>复制链接</button></div><button class="survey-submit" type="button" data-survey-back>返回工具箱</button></article></section>`;
  } else {
    const questions = surveyDraft.questions.map(renderSurveyQuestion).join('');
    resultItems.innerHTML = `<section class="survey-page" aria-label="创建问卷"><button class="survey-back" type="button" data-survey-back>← 返回工具箱</button><article class="survey-card"><span class="campus-eyebrow">CAMPUS SURVEY</span><h2>创建问卷</h2><form class="survey-builder" data-survey-builder><label class="survey-field"><span>问卷标题</span><input data-survey-title-main type="text" value="${escapeVoteText(surveyDraft.title)}" placeholder="例如：校园学习空间使用体验" required /></label><label class="survey-field"><span>问卷说明</span><textarea data-survey-description placeholder="告诉填写者这份问卷的目的">${escapeVoteText(surveyDraft.description)}</textarea></label><div class="survey-builder-heading"><span>题目列表</span><small>共 ${surveyDraft.questions.length} 题</small></div><div class="survey-editor-list">${questions}</div><button type="button" class="survey-add-question" data-survey-add-question>＋ 添加题目</button><div class="survey-builder-actions"><button type="button" class="survey-preview" data-survey-preview>预览问卷</button><button type="submit" class="survey-submit">发布问卷</button></div></form></article></section>`;
  }
  resultItems.hidden = false;
  resultItems.querySelectorAll('[data-survey-back]').forEach((button) => button.addEventListener('click', () => { resetSurvey(); renderToolbox(); }));
  resultItems.querySelectorAll('[data-survey-edit]').forEach((button) => button.addEventListener('click', () => { surveyMode = 'edit'; renderSurveyPage(); }));
  resultItems.querySelector('[data-survey-title-main]')?.addEventListener('input', (event) => { surveyDraft.title = event.target.value; });
  resultItems.querySelector('[data-survey-description]')?.addEventListener('input', (event) => { surveyDraft.description = event.target.value; });
  resultItems.querySelectorAll('[data-survey-title]').forEach((input) => input.addEventListener('input', () => { surveyDraft.questions[Number(input.dataset.surveyTitle)].title = input.value; }));
  resultItems.querySelectorAll('[data-survey-type]').forEach((select) => select.addEventListener('change', () => { const index = Number(select.dataset.surveyType); surveyDraft.questions[index].type = select.value; if (select.value !== 'text' && surveyDraft.questions[index].options.length < 2) surveyDraft.questions[index].options = ['', '']; renderSurveyPage(); }));
  resultItems.querySelectorAll('[data-survey-required]').forEach((input) => input.addEventListener('change', () => { surveyDraft.questions[Number(input.dataset.surveyRequired)].required = input.checked; }));
  resultItems.querySelectorAll('[data-survey-option]').forEach((input) => input.addEventListener('input', () => { const [questionIndex, optionIndex] = input.dataset.surveyOption.split(':').map(Number); surveyDraft.questions[questionIndex].options[optionIndex] = input.value; }));
  resultItems.querySelectorAll('[data-survey-add-option]').forEach((button) => button.addEventListener('click', () => { surveyDraft.questions[Number(button.dataset.surveyAddOption)].options.push(''); renderSurveyPage(); }));
  resultItems.querySelectorAll('[data-survey-remove-option]').forEach((button) => button.addEventListener('click', () => { const [questionIndex, optionIndex] = button.dataset.surveyRemoveOption.split(':').map(Number); if (surveyDraft.questions[questionIndex].options.length <= 2) return; surveyDraft.questions[questionIndex].options.splice(optionIndex, 1); renderSurveyPage(); }));
  resultItems.querySelector('[data-survey-add-question]')?.addEventListener('click', () => { surveyDraft.questions.push({ type: 'radio', title: '', required: false, options: ['', ''] }); renderSurveyPage(); });
  resultItems.querySelectorAll('[data-survey-remove-question]').forEach((button) => button.addEventListener('click', () => { if (surveyDraft.questions.length <= 1) return; surveyDraft.questions.splice(Number(button.dataset.surveyRemoveQuestion), 1); renderSurveyPage(); }));
  resultItems.querySelectorAll('[data-survey-up], [data-survey-down]').forEach((button) => button.addEventListener('click', () => { const index = Number(button.dataset.surveyUp ?? button.dataset.surveyDown); const target = button.dataset.surveyUp !== undefined ? index - 1 : index + 1; if (target < 0 || target >= surveyDraft.questions.length) return; [surveyDraft.questions[index], surveyDraft.questions[target]] = [surveyDraft.questions[target], surveyDraft.questions[index]]; renderSurveyPage(); }));
  resultItems.querySelector('[data-survey-preview]')?.addEventListener('click', () => { if (!surveyDraftValid()) { showToast('请填写问卷标题，并完善每道题目'); return; } surveyMode = 'preview'; renderSurveyPage(); });
  resultItems.querySelector('[data-survey-builder]')?.addEventListener('submit', (event) => { event.preventDefault(); if (!surveyDraftValid()) { showToast('请填写问卷标题，并完善每道题目'); return; } surveyMode = 'published'; renderSurveyPage(); });
  resultItems.querySelector('[data-survey-copy]')?.addEventListener('click', async () => { const value = resultItems.querySelector('[aria-label="问卷链接"]').value; try { await navigator.clipboard.writeText(value); showToast('问卷链接已复制'); } catch { showToast('链接已生成，请手动复制'); } });
}

const courseSchedule = [
  { id: 'calculus', day: '周一', time: '08:00–09:40', title: '高等数学（二）', teacher: '李老师', room: '明德楼 201' },
  { id: 'english', day: '周二', time: '10:00–11:40', title: '大学英语（四）', teacher: '王老师', room: '公教楼 305' },
  { id: 'programming', day: '周三', time: '14:00–15:40', title: '程序设计基础', teacher: '陈老师', room: '信息楼 108' },
  { id: 'economics', day: '周四', time: '08:00–09:40', title: '微观经济学', teacher: '赵老师', room: '明德楼 403' },
  { id: 'seminar', day: '周五', time: '16:00–17:40', title: '学术写作讨论', teacher: '许老师', room: '知行楼 201' },
];
let courseWeekIndex = 0;
let courseNotes = {};
try { courseNotes = JSON.parse(localStorage.getItem('zaichang-course-notes') || '{}'); if (!courseNotes || typeof courseNotes !== 'object') courseNotes = {}; } catch { courseNotes = {}; }
function saveCourseNotes() { try { localStorage.setItem('zaichang-course-notes', JSON.stringify(courseNotes)); } catch { /* ignore unavailable storage */ } }
function courseKey(course) { return `${course.id}-week-${courseWeekIndex}`; }

function closeCourseNotes() {
  const layer = resultItems.querySelector('.course-notes-layer');
  if (layer) layer.remove();
}

function renderCourseNotes(course) {
  closeCourseNotes();
  const key = courseKey(course);
  const notes = courseNotes[key] || [];
  const layer = document.createElement('div');
  layer.className = 'course-notes-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', `${course.title}课程备注`);
  layer.innerHTML = `<article class="course-notes-card"><button class="course-notes-close" type="button" aria-label="关闭备注">×</button><span class="campus-eyebrow">${course.day} · ${course.time}</span><h3>${course.title}</h3><p class="course-notes-location">${course.teacher}　·　${course.room}</p><div class="course-notes-list">${notes.length ? notes.map((note, index) => `<div class="course-note-row"><select data-course-note-type="${index}" aria-label="备注类型"><option${note.type === '本节作业' ? ' selected' : ''}>本节作业</option><option${note.type === '复习任务' ? ' selected' : ''}>复习任务</option><option${note.type === '待提交材料' ? ' selected' : ''}>待提交材料</option><option${note.type === '考试提醒' ? ' selected' : ''}>考试提醒</option><option${note.type === '自定义备注' ? ' selected' : ''}>自定义备注</option></select><input data-course-note-text="${index}" value="${escapeVoteText(note.text)}" placeholder="写下备注内容" /><button type="button" data-course-note-delete="${index}" aria-label="删除备注">删除</button></div>`).join('') : '<p class="course-notes-empty">暂无备注，点击下方添加。</p>'}</div><button type="button" class="course-note-add" data-course-note-add>＋ 添加备注</button></article>`;
  resultItems.append(layer);
  const close = () => { closeCourseNotes(); renderCourseTable(); };
  layer.querySelector('.course-notes-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('[data-course-note-add]').addEventListener('click', () => { if (!courseNotes[key]) courseNotes[key] = []; courseNotes[key].push({ type: '自定义备注', text: '' }); saveCourseNotes(); renderCourseNotes(course); });
  layer.querySelectorAll('[data-course-note-text]').forEach((input) => input.addEventListener('input', () => { courseNotes[key][Number(input.dataset.courseNoteText)].text = input.value; saveCourseNotes(); }));
  layer.querySelectorAll('[data-course-note-type]').forEach((select) => select.addEventListener('change', () => { courseNotes[key][Number(select.dataset.courseNoteType)].type = select.value; saveCourseNotes(); }));
  layer.querySelectorAll('[data-course-note-delete]').forEach((button) => button.addEventListener('click', () => { courseNotes[key].splice(Number(button.dataset.courseNoteDelete), 1); if (!courseNotes[key].length) delete courseNotes[key]; saveCourseNotes(); renderCourseNotes(course); }));
  layer.querySelector('.course-notes-close').focus();
}

function renderCourseTable() {
  const notesCount = (course) => (courseNotes[courseKey(course)] || []).length;
  resultItems.innerHTML = `<section class="course-table-page" aria-label="我的课程"><header class="course-table-head"><div><span class="campus-eyebrow">MY COURSES</span><h2>我的课程</h2><p>本周课程安排与每节课的学习备注。</p></div><div class="course-week-switch"><button type="button" data-course-week="prev" aria-label="上一周">‹</button><span>第 ${courseWeekIndex + 1} 周</span><button type="button" data-course-week="next" aria-label="下一周">›</button></div></header><div class="course-grid">${courseSchedule.map((course) => `<article class="course-card" data-course-id="${course.id}" tabindex="0"><div class="course-card-top"><span>${course.day}</span><span>${course.time}</span></div><h3>${course.title}</h3><p>${course.teacher}　·　${course.room}</p><button class="course-note-indicator${notesCount(course) ? ' has-notes' : ''}" type="button" data-course-note-open="${course.id}" aria-label="${notesCount(course) ? `查看 ${notesCount(course)} 条备注` : '添加备注'}">${notesCount(course) ? `📝 ${notesCount(course)}` : '＋ 备注'}</button></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
  resultItems.querySelectorAll('[data-course-week]').forEach((button) => button.addEventListener('click', () => { courseWeekIndex = Math.max(0, Math.min(19, courseWeekIndex + (button.dataset.courseWeek === 'next' ? 1 : -1))); renderCourseTable(); }));
  resultItems.querySelectorAll('[data-course-id]').forEach((card) => { const course = courseSchedule.find((item) => item.id === card.dataset.courseId); card.addEventListener('click', (event) => { if (event.target.closest('[data-course-note-open]')) return; renderCourseNotes(course); }); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); renderCourseNotes(course); } }); });
  resultItems.querySelectorAll('[data-course-note-open]').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); renderCourseNotes(courseSchedule.find((course) => course.id === button.dataset.courseNoteOpen)); }));
}

function openCampusMapPreview() {
  const layer = document.createElement('div');
  layer.className = 'campus-map-preview-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', '校园地图预览');
  layer.innerHTML = `<div class="campus-map-preview-card"><button class="campus-map-preview-close" type="button" aria-label="关闭地图预览">×</button><div class="campus-map-viewport" data-map-viewport><div class="campus-map-canvas" data-map-canvas><img src="./assets/campus-map-preview.jpg" alt="校园地图，可缩放和拖动" draggable="false" /></div></div><div class="campus-map-controls" aria-label="地图缩放控制"><button type="button" data-map-zoom-out aria-label="缩小地图">−</button><button type="button" data-map-reset aria-label="重置地图视图">重置视图</button><button type="button" data-map-zoom-in aria-label="放大地图">＋</button></div></div>`;
  resultItems.append(layer);
  const viewport = layer.querySelector('[data-map-viewport]');
  const canvas = layer.querySelector('[data-map-canvas]');
  const minScale = 1;
  const maxScale = 3;
  let scale = 1;
  let panX = 0;
  let panY = 0;
  const pointers = new Map();
  let pinchDistance = 0;
  let moved = false;
  const clampPan = () => {
    const maxX = Math.max(0, (viewport.clientWidth * scale - viewport.clientWidth) / 2);
    const maxY = Math.max(0, (viewport.clientHeight * scale - viewport.clientHeight) / 2);
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
  };
  const updateView = (animated = true) => { clampPan(); canvas.classList.toggle('is-dragging', !animated); canvas.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${scale})`; };
  const setScale = (nextScale) => { scale = Math.max(minScale, Math.min(maxScale, nextScale)); updateView(); };
  const distance = () => { const points = [...pointers.values()]; if (points.length < 2) return 0; return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y); };
  const onPointerDown = (event) => { if (event.target.closest('button')) return; viewport.setPointerCapture?.(event.pointerId); pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY }); moved = false; if (pointers.size === 2) pinchDistance = distance(); canvas.classList.add('is-dragging'); };
  const onPointerMove = (event) => {
    if (!pointers.has(event.pointerId)) return;
    const point = pointers.get(event.pointerId);
    point.x = event.clientX; point.y = event.clientY;
    if (pointers.size >= 2) { const nextDistance = distance(); if (pinchDistance && nextDistance) setScale(scale * (nextDistance / pinchDistance)); pinchDistance = nextDistance; moved = true; return; }
    const dx = event.clientX - point.lastX; const dy = event.clientY - point.lastY;
    if (Math.abs(dx) + Math.abs(dy) > 1) moved = true;
    panX += dx; panY += dy; point.lastX = event.clientX; point.lastY = event.clientY; updateView(false);
  };
  const onPointerUp = (event) => { pointers.delete(event.pointerId); if (pointers.size < 2) pinchDistance = 0; if (!pointers.size) updateView(); };
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', onPointerUp);
  viewport.addEventListener('wheel', (event) => { event.preventDefault(); setScale(scale * (1 - Math.max(-0.25, Math.min(0.25, (event.deltaY || event.deltaX) * 0.0015)))); }, { passive: false });
  layer.querySelector('[data-map-zoom-in]').addEventListener('click', () => setScale(scale + .25));
  layer.querySelector('[data-map-zoom-out]').addEventListener('click', () => setScale(scale - .25));
  layer.querySelector('[data-map-reset]').addEventListener('click', () => { scale = 1; panX = 0; panY = 0; updateView(); });
  const close = () => { document.removeEventListener('keydown', onKeyDown); layer.remove(); };
  const onKeyDown = (event) => { if (event.key === 'Escape') close(); };
  layer.addEventListener('pointerdown', (event) => { if (!event.target.closest('.campus-map-preview-card')) close(); });
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('.campus-map-preview-close').addEventListener('click', close);
  document.addEventListener('keydown', onKeyDown);
  layer.querySelector('.campus-map-preview-close').focus();
}

function renderCampusMapPage() {
  resultItems.innerHTML = `<section class="campus-map-page" aria-label="校园地图"><button class="campus-map-back" type="button" data-map-back>← 返回工具箱</button><article class="campus-map-card"><span class="campus-eyebrow">CAMPUS MAP</span><h2>校园地图</h2><p>查看校园路线、教学楼与常用地点。</p><div class="campus-map-page-image"><img src="./assets/campus-map-cover.png" alt="校园地图插画" /></div><button class="campus-map-view-button" type="button" data-map-preview>查看地图</button></article></section>`;
  resultItems.hidden = false;
  resultItems.querySelector('[data-map-back]').addEventListener('click', renderToolbox);
  resultItems.querySelectorAll('[data-map-preview]').forEach((button) => button.addEventListener('click', openCampusMapPreview));
}

function renderToolbox() {
  const visibleItems = getToolboxVisibleItems();
  const tabs = [['all', '所有工具'], ['favorites', '我的收藏'], ['history', '我的历史']];
  resultItems.innerHTML = `<section class="toolbox-page" aria-label="工具箱"><header class="toolbox-head"><h2>工具箱</h2><nav class="toolbox-tabs" aria-label="工具箱分类">${tabs.map(([id, label]) => `<button type="button" class="${toolboxActiveTab === id ? 'is-active' : ''}" data-toolbox-tab="${id}" aria-selected="${toolboxActiveTab === id}">${label}</button>`).join('')}</nav></header><div class="toolbox-grid">${visibleItems.map(([name, tone]) => { const coverData = toolboxCoverMap[name]; const coverClass = coverData ? ` ${coverData[1]}` : ''; return `<article class="tool-card ${tone}${coverClass}" aria-label="${name}" role="button" tabindex="0" data-tool="${name}">${coverData ? `<img src="${coverData[0]}" alt="${name}封面插画" decoding="async" />` : ''}<button class="tool-favorite" type="button" aria-label="${toolboxFavorites.includes(name) ? '移出收藏' : '加入收藏'}：${name}" aria-pressed="${toolboxFavorites.includes(name)}">${toolboxFavorites.includes(name) ? '★' : '☆'}</button></article>`; }).join('')}</div></section>`;
  resultItems.hidden = false;
  syncMobileSubnavSelection(toolboxActiveTab);
  resultItems.querySelectorAll('[data-toolbox-tab]').forEach((tab) => tab.addEventListener('click', () => { toolboxActiveTab = tab.dataset.toolboxTab; sidebarState.工具箱 = toolboxActiveTab; saveSidebarState(); renderToolbox(); }));
  resultItems.querySelectorAll('[data-tool]').forEach((card) => {
    card.addEventListener('click', (event) => { if (event.target.closest('.tool-favorite')) return; openToolboxTool(card.dataset.tool); });
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openToolboxTool(card.dataset.tool); } });
  });
  resultItems.querySelectorAll('.tool-favorite').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); toggleToolboxFavorite(button.closest('[data-tool]').dataset.tool); }));
}

const pomodoroDefaults = { focus: 25, short: 5, long: 15 };
const pomodoroModeLabels = { focus: '专注时段', short: '短休息', long: '长休息' };
const pomodoroThemes = {
  black: { label: '黑色', start: '#111111', end: '#111111', border: '#3f3f3f', progress: '#f4f4f4', track: '#303030', ink: '#f4f4f4', muted: '#aaaaaa' },
  white: { label: '白色', start: '#ffffff', end: '#ffffff', border: '#000000', progress: 'transparent', track: 'transparent', ink: '#000000', muted: '#000000' },
  gray: { label: '灰色', start: '#d8d8d8', end: '#d8d8d8', border: '#555555', progress: '#1f1f1f', track: '#b8b8b8', ink: '#171717', muted: '#555555' },
};
const pomodoroNoiseLabels = { rain: '雨声', forest: '森林', cafe: '咖啡馆', waves: '海浪', off: '关闭' };
const pomodoroDisplayLabels = { simple: '简洁数字', 'seven-seg': '数码管', flip: '翻页数字' };
let pomodoroState = {
  mode: 'focus',
  running: false,
  countUp: false,
  autoAdvance: true,
  sound: false,
  noise: 'off',
  theme: 'white',
  display: 'simple',
  rounds: 0,
  durations: { ...pomodoroDefaults },
  remainingSeconds: pomodoroDefaults.focus * 60,
  elapsedSeconds: 0,
  lastTickAt: Date.now(),
};
let pomodoroTicker = 0;
let pomodoroNoiseAudio = null;
let pomodoroFocusActive = false;
window.pomodoroSetNoise = (value) => setPomodoroNoise(value);
window.pomodoroSetTheme = (value) => setPomodoroTheme(value);
window.pomodoroSetDisplay = (value) => setPomodoroDisplay(value);
window.pomodoroSetCountup = (value) => { syncPomodoroClock(); pomodoroState.countUp = value === 'true'; resetPomodoroPhase(); renderPomodoroState(); };

function savePomodoroState() { /* 番茄钟每次退出都回到默认状态，不持久化上次配置。 */ }

function resetPomodoroState() {
  pomodoroState = { mode: 'focus', running: false, countUp: false, autoAdvance: true, sound: false, noise: 'off', theme: 'white', display: 'simple', rounds: 0, durations: { ...pomodoroDefaults }, remainingSeconds: pomodoroDefaults.focus * 60, elapsedSeconds: 0, lastTickAt: Date.now() };
}

function applyPomodoroTheme() {
  const card = document.querySelector('.pomodoro-card');
  const focusInner = document.querySelector('.pomodoro-focus-inner');
  const focusView = document.querySelector('.pomodoro-focus-view');
  const theme = pomodoroThemes[pomodoroState.theme] || pomodoroThemes.white;
  const cardVars = { '--pomodoro-bg-start': theme.start, '--pomodoro-bg-end': theme.end, '--pomodoro-border': theme.border, '--pomodoro-progress': theme.progress, '--pomodoro-track': theme.track, '--pomodoro-ink': theme.ink, '--pomodoro-muted': theme.muted };
  const focusVars = { '--pomodoro-focus-start': theme.start, '--pomodoro-focus-end': theme.end, '--pomodoro-focus-border': theme.border, '--pomodoro-focus-progress': theme.progress, '--pomodoro-focus-track': theme.track, '--pomodoro-focus-ink': theme.ink };
  if (card) Object.entries(cardVars).forEach(([name, value]) => card.style.setProperty(name, value));
  if (focusInner) Object.entries(focusVars).forEach(([name, value]) => focusInner.style.setProperty(name, value));
  if (focusView) Object.entries(focusVars).forEach(([name, value]) => focusView.style.setProperty(name, value));
  [card, focusInner, focusView].forEach((node) => { if (node) node.classList.toggle('pomodoro-theme-white', pomodoroState.theme === 'white'); });
}

function renderPomodoroExtras() {
  const theme = pomodoroThemes[pomodoroState.theme] || pomodoroThemes.white;
  const noiseSummary = document.querySelector('#pomodoroNoiseSummary');
  const themeSummary = document.querySelector('#pomodoroThemeSummary');
  const displaySummary = document.querySelector('#pomodoroDisplaySummary');
  const behaviorSummary = document.querySelector('#pomodoroBehaviorSummary');
  if (noiseSummary) noiseSummary.textContent = pomodoroNoiseLabels[pomodoroState.noise] || '关闭';
  if (themeSummary) themeSummary.textContent = theme.label;
  if (displaySummary) displaySummary.textContent = pomodoroDisplayLabels[pomodoroState.display] || pomodoroDisplayLabels.simple;
  if (behaviorSummary) behaviorSummary.textContent = pomodoroState.countUp ? '正计时' : '倒计时';
  const setActive = (selector, value, dataKey) => document.querySelectorAll(selector).forEach((button) => button.classList.toggle('is-active', button.dataset[dataKey] === value));
  setActive('[data-noise]', pomodoroState.noise, 'noise');
  setActive('[data-pomodoro-theme]', pomodoroState.theme, 'pomodoroTheme');
  setActive('[data-pomodoro-display]', pomodoroState.display, 'pomodoroDisplay');
  setActive('[data-pomodoro-countup]', String(pomodoroState.countUp), 'pomodoroCountup');
  if (pomodoroDialog?.open) document.querySelectorAll('.pomodoro-slider').forEach((slider) => slider.querySelector('button.is-active')?.scrollIntoView({ block: 'nearest', inline: 'center' }));
  const tone = document.querySelector('.pomodoro-card');
  const focusTone = document.querySelector('.pomodoro-focus-inner');
  [tone, focusTone].forEach((node) => { if (node) node.dataset.pomodoroDisplay = pomodoroState.display; });
}

function stopPomodoroNoise() {
  if (!pomodoroNoiseAudio) return;
  const { context, source } = pomodoroNoiseAudio;
  try { source.stop(); } catch { /* already stopped */ }
  context.close().catch(() => {});
  pomodoroNoiseAudio = null;
}

function startPomodoroNoise(type = pomodoroState.noise) {
  stopPomodoroNoise();
  if (type === 'off') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const settings = { rain: ['lowpass', 1800, .025], forest: ['lowpass', 850, .018], cafe: ['bandpass', 1200, .012], waves: ['lowpass', 420, .035] }[type] || ['lowpass', 1200, .02];
    source.buffer = buffer; source.loop = true;
    filter.type = settings[0]; filter.frequency.value = settings[1];
    gain.gain.value = settings[2];
    source.connect(filter).connect(gain).connect(context.destination);
    source.start();
    pomodoroNoiseAudio = { context, source };
  } catch { /* audio is optional */ }
}

function setPomodoroNoise(type) {
  pomodoroState.noise = pomodoroNoiseLabels[type] ? type : 'off';
  if (pomodoroFocusActive) startPomodoroNoise(pomodoroState.noise);
  renderPomodoroExtras();
}

function setPomodoroTheme(themeName) {
  if (!pomodoroThemes[themeName]) return;
  pomodoroState.theme = themeName;
  applyPomodoroTheme(); renderPomodoroExtras();
}

function setPomodoroDisplay(displayName) {
  if (!pomodoroDisplayLabels[displayName]) return;
  pomodoroState.display = displayName;
  renderPomodoroExtras();
}

function formatPomodoroTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

function pomodoroDurationSeconds(mode = pomodoroState.mode) {
  return Math.max(1, Number(pomodoroState.durations[mode]) || pomodoroDefaults[mode]) * 60;
}

function playPomodoroTone() {
  if (!pomodoroState.sound) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.24);
    oscillator.addEventListener('ended', () => context.close(), { once: true });
  } catch { /* ignore unavailable audio */ }
}

function resetPomodoroPhase() {
  pomodoroState.remainingSeconds = pomodoroDurationSeconds();
  pomodoroState.elapsedSeconds = 0;
}

function advancePomodoroPhase() {
  if (pomodoroState.mode === 'focus') pomodoroState.rounds += 1;
  pomodoroState.mode = pomodoroState.mode === 'focus' ? (pomodoroState.rounds % 4 === 0 ? 'long' : 'short') : 'focus';
  resetPomodoroPhase();
  playPomodoroTone();
}

function syncPomodoroClock(now = Date.now()) {
  if (!pomodoroState.running) {
    pomodoroState.lastTickAt = now;
    return false;
  }
  let delta = Math.max(0, Math.floor((now - pomodoroState.lastTickAt) / 1000));
  if (!delta) return false;
  pomodoroState.lastTickAt += delta * 1000;
  if (pomodoroState.countUp) {
    pomodoroState.elapsedSeconds += delta;
    return true;
  }
  while (delta > 0 && pomodoroState.remainingSeconds > 0) {
    const step = Math.min(delta, pomodoroState.remainingSeconds);
    pomodoroState.remainingSeconds -= step;
    pomodoroState.elapsedSeconds += step;
    delta -= step;
    if (pomodoroState.remainingSeconds === 0) {
      if (!pomodoroState.autoAdvance) pomodoroState.running = false;
      else advancePomodoroPhase();
      if (pomodoroFocusActive && !pomodoroState.running) window.setTimeout(finishPomodoroFocus, 350);
    }
  }
  return true;
}

function renderPomodoroState() {
  syncPomodoroClock();
  const duration = pomodoroDurationSeconds();
  const progress = pomodoroState.countUp ? Math.min(1, pomodoroState.elapsedSeconds / duration) : Math.min(1, Math.max(0, 1 - pomodoroState.remainingSeconds / duration));
  const progressNode = document.querySelector('#pomodoroProgress');
  const circumference = 2 * Math.PI * 94;
  if (progressNode) progressNode.style.strokeDashoffset = String(circumference * (1 - progress));
  document.querySelector('#pomodoroModeLabel').textContent = pomodoroModeLabels[pomodoroState.mode];
  document.querySelector('#pomodoroTime').textContent = formatPomodoroTime(pomodoroState.countUp ? pomodoroState.elapsedSeconds : pomodoroState.remainingSeconds);
  document.querySelector('#pomodoroCountupLabel').hidden = !pomodoroState.countUp;
  document.querySelector('#pomodoroRounds').textContent = String(pomodoroState.rounds);
  document.querySelector('#pomodoroAutoAdvance').checked = pomodoroState.autoAdvance;
  document.querySelector('#pomodoroSound').checked = pomodoroState.sound;
  const focusProgress = document.querySelector('#pomodoroFocusProgress');
  if (focusProgress) focusProgress.style.strokeDashoffset = String(circumference * (1 - progress));
  const focusMode = document.querySelector('#pomodoroFocusMode');
  const focusTime = document.querySelector('#pomodoroFocusTime');
  const focusCountup = document.querySelector('#pomodoroFocusCountup');
  const focusRounds = document.querySelector('#pomodoroFocusRounds');
  if (focusMode) focusMode.textContent = pomodoroModeLabels[pomodoroState.mode];
  if (focusTime) focusTime.textContent = formatPomodoroTime(pomodoroState.countUp ? pomodoroState.elapsedSeconds : pomodoroState.remainingSeconds);
  if (focusCountup) focusCountup.hidden = !pomodoroState.countUp;
  if (focusRounds) focusRounds.textContent = String(pomodoroState.rounds);
  const focusPause = document.querySelector('#pomodoroFocusPause');
  if (focusPause) focusPause.textContent = pomodoroState.running ? '暂停' : '继续';
  document.querySelectorAll('[data-pomodoro-mode]').forEach((button) => {
    const active = button.dataset.pomodoroMode === pomodoroState.mode;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  applyPomodoroTheme();
  renderPomodoroExtras();
  savePomodoroState();
}

function startPomodoroTicker() {
  if (pomodoroTicker) return;
  pomodoroState.lastTickAt = Date.now();
  pomodoroTicker = window.setInterval(() => { if (syncPomodoroClock()) renderPomodoroState(); }, 250);
}

function stopPomodoroTicker() {
  window.clearInterval(pomodoroTicker);
  pomodoroTicker = 0;
}

function openPomodoro() {
  resetPomodoroState();
  renderPomodoroState();
  ['focus', 'short', 'long'].forEach((mode) => { document.querySelector(`#pomodoro${mode[0].toUpperCase()}${mode.slice(1)}Minutes`).value = pomodoroState.durations[mode]; });
  if (!pomodoroDialog.open) pomodoroDialog.showModal();
  document.documentElement.classList.add('pomodoro-open');
  renderPomodoroExtras();
}

function closePomodoro(reset = true) {
  syncPomodoroClock();
  savePomodoroState();
  stopPomodoroTicker();
  stopPomodoroNoise();
  document.documentElement.classList.remove('pomodoro-open');
  if (pomodoroDialog.open) pomodoroDialog.close();
  if (reset) resetPomodoroState();
}

function openPomodoroFocus() {
  pomodoroFocusActive = true;
  pomodoroState.running = true;
  pomodoroState.lastTickAt = Date.now();
  renderPomodoroState();
  document.documentElement.classList.add('pomodoro-focus-open');
  pomodoroFocusView.hidden = false;
  startPomodoroNoise(pomodoroState.noise);
  startPomodoroTicker();
}

function finishPomodoroFocus() {
  if (!pomodoroFocusActive) return;
  pomodoroFocusActive = false;
  pomodoroState.running = false;
  savePomodoroState();
  stopPomodoroTicker();
  stopPomodoroNoise();
  document.documentElement.classList.remove('pomodoro-focus-open');
  if (pomodoroFocusView) pomodoroFocusView.hidden = true;
  resetPomodoroState();
  renderToolbox();
}

function requestClosePomodoroFocus() {
  if (window.confirm('确定要结束这次专注并返回工具箱吗？')) finishPomodoroFocus();
}

document.querySelectorAll('[data-pomodoro-mode]').forEach((button) => button.addEventListener('click', () => {
  syncPomodoroClock();
  pomodoroState.mode = button.dataset.pomodoroMode;
  resetPomodoroPhase();
  pomodoroState.lastTickAt = Date.now();
  renderPomodoroState();
}));
document.querySelectorAll('[data-noise]').forEach((button) => button.addEventListener('click', () => setPomodoroNoise(button.dataset.noise)));
document.querySelectorAll('[data-pomodoro-theme]').forEach((button) => button.addEventListener('click', () => setPomodoroTheme(button.dataset.pomodoroTheme)));
document.querySelectorAll('[data-pomodoro-display]').forEach((button) => button.addEventListener('click', () => setPomodoroDisplay(button.dataset.pomodoroDisplay)));
document.querySelectorAll('[data-pomodoro-countup]').forEach((button) => button.addEventListener('click', () => { syncPomodoroClock(); pomodoroState.countUp = button.dataset.pomodoroCountup === 'true'; resetPomodoroPhase(); pomodoroState.lastTickAt = Date.now(); renderPomodoroState(); }));
document.querySelector('#pomodoroAutoAdvance').addEventListener('change', (event) => { pomodoroState.autoAdvance = event.target.checked; renderPomodoroExtras(); });
document.querySelector('#pomodoroSound').addEventListener('change', (event) => { pomodoroState.sound = event.target.checked; renderPomodoroExtras(); });
document.addEventListener('click', (event) => {
  const target = event.target.closest?.('[data-pomodoro-theme], [data-pomodoro-display], [data-noise], [data-pomodoro-countup]');
  if (!target) return;
  if (target.dataset.pomodoroTheme) setPomodoroTheme(target.dataset.pomodoroTheme);
  else if (target.dataset.pomodoroDisplay) setPomodoroDisplay(target.dataset.pomodoroDisplay);
  else if (target.dataset.noise) setPomodoroNoise(target.dataset.noise);
  else if (target.dataset.pomodoroCountup) { syncPomodoroClock(); pomodoroState.countUp = target.dataset.pomodoroCountup === 'true'; resetPomodoroPhase(); renderPomodoroState(); }
});
document.querySelectorAll('.pomodoro-slider').forEach((slider) => {
  let pointerStart = null;
  slider.addEventListener('wheel', (event) => { if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return; event.preventDefault(); const buttons = [...slider.querySelectorAll('button')]; const active = buttons.findIndex((button) => button.classList.contains('is-active')); const next = Math.max(0, Math.min(buttons.length - 1, active + (event.deltaY > 0 ? 1 : -1))); buttons[next]?.click(); }, { passive: false });
  slider.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; slider.setPointerCapture?.(event.pointerId); });
  slider.addEventListener('pointerup', (event) => { if (pointerStart === null) return; const delta = event.clientX - pointerStart; pointerStart = null; if (Math.abs(delta) < 28) return; const buttons = [...slider.querySelectorAll('button')]; const active = buttons.findIndex((button) => button.classList.contains('is-active')); const next = Math.max(0, Math.min(buttons.length - 1, active + (delta < 0 ? 1 : -1))); buttons[next]?.click(); });
  slider.addEventListener('keydown', (event) => { if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return; event.preventDefault(); const buttons = [...slider.querySelectorAll('button')]; const active = buttons.findIndex((button) => button.classList.contains('is-active')); const next = Math.max(0, Math.min(buttons.length - 1, active + (event.key === 'ArrowRight' ? 1 : -1))); buttons[next]?.click(); });
});
document.querySelector('#pomodoroApply').addEventListener('click', () => {
  ['focus', 'short', 'long'].forEach((mode) => { const input = document.querySelector(`#pomodoro${mode[0].toUpperCase()}${mode.slice(1)}Minutes`); pomodoroState.durations[mode] = Math.min(180, Math.max(1, Number(input.value) || pomodoroDefaults[mode])); input.value = pomodoroState.durations[mode]; });
  resetPomodoroPhase();
  pomodoroState.lastTickAt = Date.now();
  closePomodoro(false);
  openPomodoroFocus();
});
document.querySelector('#pomodoroFocusReturn').addEventListener('click', requestClosePomodoroFocus);
document.querySelector('#pomodoroFocusPause').addEventListener('click', () => { syncPomodoroClock(); pomodoroState.running = !pomodoroState.running; pomodoroState.lastTickAt = Date.now(); renderPomodoroState(); if (pomodoroState.running) startPomodoroTicker(); else stopPomodoroTicker(); });
pomodoroDialog.addEventListener('click', (event) => { if (event.target === pomodoroDialog) closePomodoro(); });
pomodoroDialog.addEventListener('cancel', (event) => { event.preventDefault(); closePomodoro(); });
pomodoroDialog.addEventListener('close', () => { document.documentElement.classList.remove('pomodoro-open'); if (!pomodoroFocusActive) { stopPomodoroTicker(); stopPomodoroNoise(); } });
window.addEventListener('beforeunload', () => { syncPomodoroClock(); savePomodoroState(); });

const interestPosts = [
  { id:'p1', avatar:'匿', name:'匿名用户', title:'雨后的校园，适合散步也适合发呆', text:'下课后绕着湖边走了一圈，发现校园在雨里有另一种安静。', topic:'校园生活', tone:'violet', tall:true, likes:24, comments:3 },
  { id:'p2', avatar:'林', name:'林予安', title:'周末一起去拍北区的树影吗？', text:'想找喜欢摄影和慢节奏散步的同学，手机也可以。', topic:'摄影', tone:'green', likes:18, comments:5 },
  { id:'p3', avatar:'陈', name:'陈默', title:'交换一份私藏歌单', text:'最近循环爵士和一点 city pop，欢迎分享你的夜跑路上歌单。', topic:'音乐', tone:'peach', likes:31, comments:8 },
  { id:'p4', avatar:'许', name:'许知夏', title:'图书馆三楼的安静角落', text:'每周三晚固定在这里读书，喜欢历史、散文和不赶时间的聊天。', topic:'读书', tone:'blue', likes:12, comments:2 },
  { id:'p5', avatar:'王', name:'王嘉树', title:'寻找周末羽毛球搭子', text:'水平一般，主要想规律运动，东区体育馆见。', topic:'运动', tone:'olive', likes:9, comments:1 },
  { id:'p6', avatar:'李', name:'李星遥', title:'食堂隐藏菜单分享', text:'二食堂窗口的番茄牛腩盖饭，愿意把我的校园美食地图继续补完。', topic:'美食', tone:'rose', likes:27, comments:6 },
];

const interestImageMap = {
  摄影: ['https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&q=80','https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&q=80'], 旅行: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80','https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=80'], 音乐: ['https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80','https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&q=80'], 运动: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80','https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80'], 美食: ['https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=80','https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80'], 宠物: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&q=80','https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=80'], 校园生活: ['https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80','https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80'], 读书: ['https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900&q=80','https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=80'],
};
function interestImage(topic, index) { const images = interestImageMap[topic] || []; return images[index % images.length] || ''; }
const topicTitles = {
  摄影: ['傍晚的光落在窗台上', '校园里最适合拍照的三个角落'], 旅行: ['周末去郊外看一场日落', '一条适合慢慢走的城市路线'], 音乐: ['给晚自习留一首歌的时间', '最近循环的五首歌'], 运动: ['操场上风很轻，跑两圈吗', '新手也能加入的球局'], 美食: ['二食堂今天的隐藏菜单', '把秋天吃进一碗热汤里'], 宠物: ['湖边遇到的橘猫', '校园里最亲人的小动物'], 校园生活: ['下课后绕湖走一圈', '雨天的校园有另一种安静'], 读书: ['图书馆三楼的下午', '最近读完的一本小书'],
};
const topicList = Object.keys(interestImageMap);
let activeInterestTopic = '全部';
let activeInterestSort = '推荐';
const interestHeadings = { 全部:'找同频的人', 音乐:'喜欢音乐的人', 摄影:'喜欢摄影的人', 旅行:'想去远方的人', 运动:'一起动起来', 美食:'校园里的好味道', 宠物:'喜欢小动物的人', 校园生活:'校园生活里的同路人', 读书:'正在读同一本书的人' };
topicList.forEach((topic, topicIndex) => {
  const existing = interestPosts.filter((post) => post.topic === topic);
  for (let i = existing.length; i < 10; i += 1) {
    const base = interestPosts[(topicIndex + i) % interestPosts.length];
    const titles = topicTitles[topic];
    interestPosts.push({ ...base, id: `${topicIndex}-${i}`, topic, imageKeyword: topic, title: titles[i % titles.length], text: `分享一些关于${topic}的片段，欢迎也留下你的故事和建议。`, tone: ['violet','green','peach','blue','olive','rose'][i % 6] });
  }
});

// 主题专属、固定且不重复的图片资源池；每条帖子会绑定其中一张图片。
const imagePools = {
  摄影: ['photo-1519608487953-e999c86e7455','photo-1452587925148-ce544e77e70d','photo-1493246507139-91e8fad9978e','photo-1444723121867-7a241cacace9','photo-1470770841072-f978cf4d019e','photo-1500534623283-312aade485b7','photo-1518005020951-eccb494ad742','photo-1500530855697-b586d89ba3ee'],
  旅行: ['photo-1500530855697-b586d89ba3ee','photo-1470770841072-f978cf4d019e','photo-1464822759023-fed622ff2c3b','photo-1507525428034-b723cf961d3e','photo-1526778548025-fa2f459cd5c1','photo-1500534314209-a25ddb2bd429','photo-1494783367193-149034c05e8f','photo-1469474968028-56623f02e42e'],
  音乐: ['photo-1516280440614-37939bbacd81','photo-1524368535928-5b5e00ddc76b','photo-1493225457124-a3eb161ffa5f','photo-1511379938547-c1f69419868d','photo-1524650359799-842906ca1c06','photo-1507838153414-b4b713384a76','photo-1514525253161-7a46d19cd819','photo-1516450360452-9312f5e86fc7'],
  运动: ['photo-1461896836934-ffe607ba8211','photo-1517649763962-0c623066013b','photo-1530549387789-4c1017266635','photo-1579952363873-27f3bade9f55','photo-1552674605-db6ffd4facb5','photo-1517836357463-d25dfeac3438','photo-1538805060514-97d9cc17730c','photo-1571019613454-1cb2f99b2d8'],
  美食: ['photo-1498837167922-ddd27525d352','photo-1504674900247-0877df9cc836','photo-1513104890138-7c749659a591','photo-1509440159596-0249088772ff','photo-1513558161293-cdaf765ed2fd','photo-1495474472287-4d71bcdd2085','photo-1547592180-85f173990554','photo-1551218808-94e220e084d2'],
  宠物: ['photo-1518717758536-85ae29035b6d','photo-1543466835-00a7907e9de1','photo-1517849845537-4d257902454a','photo-1552053831-71594a27632d','photo-1537151608828-ea2b11777ee8','photo-1583337130417-3346a1be7dee','photo-1548199973-03cce0bbc87b','photo-1514888286974-6c03e2ca1dba'],
  校园生活: ['photo-1562774053-701939374585','photo-1523050854058-8df90110c9f1','photo-1498243691581-b145c3f54a5a','photo-1564981797816-1043664bf78d','photo-1509062522246-3755977927d7','photo-1497633762265-9d179a990aa6','photo-1541339907198-e08756dedf3f','photo-1523240795612-9a054b0db644'],
  读书: ['photo-1495446815901-a7297e633e8d','photo-1512820790803-83ca734da794','photo-1544947950-fa07a98d237f','photo-1521587760476-6c12a4b040da','photo-1455885666463-3d5e7c5a8f7b','photo-1519682337058-a94d519337bc','photo-1507842217343-583bb7270b66','photo-1524995997946-a1c2e315a42f'],
};
const topicTitleSets = { 摄影:['树影落在教学楼的拐角','胶片里的午后光线','一扇窗和一场风','把校园拍成一部短片','天台上的蓝色时刻','毕业季的人物背影','雨停之后的反光','寻找校园隐藏取景地'], 旅行:['从北站出发的周末','山风吹过来的时候','海边寄来一张明信片','行李箱里装着秋天','一条适合慢走的路','把旅行写进校园记忆','下车后的第一束光','下一站想去哪里'], 音乐:['给晚自习留一首歌','耳机里的城市夜色','排练室的灯亮到很晚','一张唱片的整个下午','想和你交换一份歌单','现场散场后的风','练琴房里反复的一小节','周末一起去听现场'], 运动:['操场第三圈刚刚好','篮球场还差两位队友','一双适合夜跑的鞋','周末一起动起来','东区球场的夕阳','新手羽毛球搭子','跑完步去喝一杯水','运动让校园变近了'], 美食:['食堂窗口的隐藏菜单','一杯咖啡的课间时间','刚出炉的面包香','校园里最好喝的奶茶','把秋天吃进一碗热汤','和朋友分享一张餐桌','晚自习前的小吃地图','今天想吃什么'], 宠物:['湖边遇到的橘猫','校园里散步的小狗','给猫咪拍一张证件照','它在窗台上晒太阳','雨天遇见一只小黑狗','和校园动物打个招呼','猫粮和罐头的分享','这只猫知道哪条路'], 校园生活:['雨后的教学楼很安静','图书馆三楼的下午','宿舍窗外的晚霞','下课后绕湖走一圈','校园里的一棵老树','校园里的风从哪里来','新学期的第一张照片','在熟悉的路上发现新事物'], 读书:['图书馆三楼的安静角落','最近读完的一本小书','给笔记留一点空白','自习桌上的下午','和同一本书相遇','读到喜欢的句子','周末一起去借书','书页翻过夏天'] };
const topicCounters = Object.fromEntries(topicList.map((topic) => [topic, 0]));
interestPosts.forEach((post) => { const idx = topicCounters[post.topic]++; const imageId = `${post.topic}-${idx + 1}`; const imageUrl = `https://images.unsplash.com/${imagePools[post.topic][idx % imagePools[post.topic].length]}?auto=format&fit=crop&w=1000&q=85`; post.id = imageId; post.imageId = imageId; post.imageUrl = imageUrl; post.imageAlt = `${post.topic}：${topicTitleSets[post.topic][idx % topicTitleSets[post.topic].length]}`; post.imageKeyword = post.topic; post.title = topicTitleSets[post.topic][idx % topicTitleSets[post.topic].length]; post.text = `记录${post.topic}里的一个片段，欢迎分享你的感受和故事。`; post.createdAt = `${idx + 1} 小时前`; });

const learningHomePosts = [
  { id: 'learning-1', avatar: '匿', name: '匿名用户', title: '把高等数学极限题拆成三步', text: '先判断趋近方向，再处理无穷小，最后检查定义域。把步骤写在草稿纸边上，复盘时比只看答案更有效。', topic: '课程讨论', tone: 'blue', likes: 42, comments: 8, createdAt: '18 分钟前', imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=85', imageAlt: '数学公式与学习笔记' },
  { id: 'learning-2', avatar: '周', name: '周砚', title: '一页纸整理：公共课论文的论证结构', text: '把论点、证据和反例分别标色，写完后只检查段落之间是否真的在回答同一个问题。', topic: '学习笔记', tone: 'violet', likes: 31, comments: 5, createdAt: '42 分钟前', imageUrl: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=85', imageAlt: '桌面上的学习笔记' },
  { id: 'learning-3', avatar: '许', name: '许知夏', title: '课堂记录：从城市更新看公共空间', text: '老师提到，空间是否被使用不只取决于设计，也取决于抵达成本、停留理由和人与人的偶遇。', topic: '课堂记录', tone: 'green', likes: 28, comments: 4, createdAt: '1 小时前', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85', imageAlt: '课堂与公共空间' },
  { id: 'learning-4', avatar: '陈', name: '陈默', title: '知识图解：文献综述不是资料堆砌', text: '先按观点分组，再比较不同研究的结论和方法，最后指出还没有被解释清楚的部分。', topic: '知识图解', tone: 'peach', likes: 56, comments: 11, createdAt: '2 小时前', imageUrl: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=1000&q=85', imageAlt: '文献与知识整理' },
  { id: 'learning-5', avatar: '赵', name: '赵清禾', title: '资料推荐：这份统计学练习适合考前自测', text: '题目按描述统计、抽样分布和回归分析分组，建议先限时完成，再对照解析找出重复出错的步骤。', topic: '资料推荐', tone: 'olive', likes: 37, comments: 6, createdAt: '3 小时前', imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=85', imageAlt: '统计学习资料' },
  { id: 'learning-6', avatar: '王', name: '王嘉树', title: '问题探讨：小组作业怎样分工才不失衡？', text: '我更倾向于按交付物拆任务，同时保留一次互相检查，而不是只按章节平均分配。大家还有更好的办法吗？', topic: '问题探讨', tone: 'rose', likes: 24, comments: 9, createdAt: '昨天', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=85', imageAlt: '同学讨论学习问题' },
  { id: 'learning-7', avatar: '李', name: '李星遥', title: '英语阅读错题：先看逻辑，再查生词', text: '遇到长难句时先找转折和因果关系，很多题目并不要求认识每个词，而是判断句子在段落里的作用。', topic: '学习方法', tone: 'blue', likes: 45, comments: 7, createdAt: '昨天', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=85', imageAlt: '英语阅读与书籍' },
  { id: 'learning-8', avatar: '苏', name: '苏晚', title: '把一次实验报告改成可复用模板', text: '保留变量定义、误差来源和结论边界三部分，下一次实验只需要替换数据和观察记录。', topic: '课程讨论', tone: 'green', likes: 19, comments: 3, createdAt: '前天', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85', imageAlt: '实验与课程记录' },
];

function renderLearningHome() {
  const posts = activeInterestSort === '最新' ? [...learningHomePosts].reverse() : learningHomePosts;
  resultItems.innerHTML = `<section class="learning-home-feed" aria-label="学习交流与探讨"><header class="learning-home-head"><div><span class="campus-eyebrow">LEARNING EXCHANGE</span><h2>学习交流与探讨</h2><p>把课程中的问题、方法和发现，整理成值得继续讨论的内容。</p></div><div class="interest-sort"><button class="${activeInterestSort === '推荐' ? 'is-active' : ''}" type="button" data-learning-sort="推荐">推荐</button><button class="${activeInterestSort === '最新' ? 'is-active' : ''}" type="button" data-learning-sort="最新">最新</button></div></header><div class="learning-home-grid">${posts.map((post) => `<article class="learning-card" data-learning-post="${post.id}"><div class="learning-card-image ${post.tone}"><img loading="lazy" decoding="async" src="${post.imageUrl}" alt="${post.imageAlt}" /></div><div class="learning-card-body"><span class="learning-card-topic">${post.topic}</span><h3>${post.title}</h3><p>${post.text}</p><div class="learning-card-foot"><button type="button" class="learning-author" data-learning-author="${post.id}"><span class="learning-avatar">${avatarMarkup(post.name, post.avatar)}</span>${post.name}</button><span>${post.createdAt}</span><button type="button" class="learning-card-action" data-learning-action="favorite" aria-label="收藏">♡</button><button type="button" class="learning-card-action" data-learning-action="comment" aria-label="评论">◌ ${post.comments}</button></div></div></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
  resultItems.querySelectorAll('[data-learning-sort]').forEach((button) => button.addEventListener('click', () => { activeInterestSort = button.dataset.learningSort; renderLearningHome(); }));
  resultItems.querySelectorAll('[data-learning-post]').forEach((card) => card.addEventListener('click', (event) => { if (event.target.closest('button')) return; openPostDetail(card.dataset.learningPost); }));
  resultItems.querySelectorAll('[data-learning-author]').forEach((button) => button.addEventListener('click', () => showToast('作者主页将在下一层接入')));
  resultItems.querySelectorAll('[data-learning-action]').forEach((button) => button.addEventListener('click', () => showToast(button.dataset.learningAction === 'favorite' ? '已收藏这条学习内容' : '评论区将在下一层接入')));
}

const resourceTypes = ['全部', '课件', 'PDF', '题库', '笔记', '论文', '链接'];
const resourceItems = [
  { id: 'res-1', title: '高等数学（二）重点公式与典型题', subject: '高等数学（二）', type: '课件', updated: '今天 09:20', summary: '按极限、微分、积分三个单元整理，附 12 道容易混淆的典型题。' },
  { id: 'res-2', title: '大学英语四级阅读训练 2026 春季版', subject: '大学英语（四）', type: '题库', updated: '昨天 18:40', summary: '包含长篇阅读、仔细阅读和选词填空，适合按时间完成一组后复盘。' },
  { id: 'res-3', title: '公共空间研究：从使用者出发', subject: '城市与社会', type: 'PDF', updated: '3 月 12 日', summary: '讨论空间可达性、停留行为与社区参与，适合作为课程论文的入门阅读。', paid: true, price: 49 },
  { id: 'res-4', title: '程序设计基础实验报告写作提纲', subject: '程序设计基础', type: '笔记', updated: '3 月 10 日', summary: '记录变量说明、实验过程、误差分析和结论边界，帮助把实验过程写清楚。' },
  { id: 'res-5', title: '微观经济学：需求弹性案例汇总', subject: '微观经济学', type: '课件', updated: '3 月 08 日', summary: '用交通、餐饮和线上娱乐三个案例解释价格变化与需求量之间的关系。' },
  { id: 'res-6', title: '校园学习空间调研方法参考', subject: '研究方法', type: '论文', updated: '3 月 06 日', summary: '整理访谈提纲、观察记录和问卷设计的基本步骤，适合小组调研前快速浏览。', paid: true, price: 35 },
  { id: 'res-7', title: '教育部国家智慧教育公共服务平台', subject: '跨学科学习', type: '链接', updated: '3 月 03 日', summary: '可按课程和学科检索公开课程资源，适合补充课堂之外的基础内容。', url: 'https://www.smartedu.cn/' },
  { id: 'res-8', title: '学术写作：如何缩小研究问题', subject: '学术写作讨论', type: '笔记', updated: '2 月 28 日', summary: '从研究对象、时间范围和材料边界三个方向，把过大的选题收束成可执行的问题。' },
];
let activeResourceType = '全部';
let resourceFavorites = [];
try { resourceFavorites = JSON.parse(localStorage.getItem('zaichang-resource-favorites') || '[]'); if (!Array.isArray(resourceFavorites)) resourceFavorites = []; } catch { resourceFavorites = []; }
function saveResourceFavorites() { try { localStorage.setItem('zaichang-resource-favorites', JSON.stringify(resourceFavorites)); } catch { /* ignore unavailable storage */ } }
function toggleResourceFavorite(id) { resourceFavorites = resourceFavorites.includes(id) ? resourceFavorites.filter((item) => item !== id) : [...resourceFavorites, id]; saveResourceFavorites(); renderResourceLibrary(); }
function closeResourceDetail() { resultItems.querySelector('.resource-detail-layer')?.remove(); }
function openResourceDetail(resource) {
  closeResourceDetail();
  const layer = document.createElement('div');
  layer.className = 'resource-detail-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', `${resource.title}资料详情`);
  const paidBlock = resource.paid ? `<div class="resource-paid-detail"><span>付费资料</span><b>${resource.price} 积分（演示价格）</b></div><button type="button" class="resource-detail-redeem" data-resource-redeem>使用积分兑换</button><p class="resource-detail-note">当前积分：${pointsBalance}。${pointsBalance < resource.price ? '积分不足，暂不能兑换。' : '兑换仅在本地演示，不会产生真实扣费。'}</p>` : '';
  layer.innerHTML = `<article class="resource-detail-card"><button class="resource-detail-close" type="button" aria-label="关闭资料详情">×</button><div class="resource-detail-labels"><span class="resource-type-label">${resource.type}</span>${resource.paid ? '<span class="resource-paid-label">付费</span>' : ''}</div><h3>${resource.title}</h3><div class="resource-detail-meta"><span>${resource.subject}</span><span>更新于 ${resource.updated}</span></div><p>${resource.summary}</p>${paidBlock}${resource.url ? `<a href="${resource.url}" target="_blank" rel="noreferrer">打开资料链接 ↗</a>` : '<p class="resource-detail-note">这份资料已加入校园资料库，可在当前页面继续查看信息。</p>'}<button type="button" class="resource-detail-favorite" data-resource-detail-favorite>${resourceFavorites.includes(resource.id) ? '★ 已收藏' : '☆ 收藏资料'}</button></article>`;
  resultItems.append(layer);
  const close = () => closeResourceDetail();
  layer.querySelector('.resource-detail-close').addEventListener('click', close);
  layer.addEventListener('click', (event) => { if (event.target === layer) close(); });
  layer.querySelector('[data-resource-redeem]')?.addEventListener('click', () => {
    if (!resource.paid) return;
    if (pointsBalance < resource.price) { showToast('当前积分不足，兑换流程未完成（演示）'); return; }
    pointsBalance -= resource.price;
    pointsTransactions = [{ type: '资料兑换', name: resource.title, points: -resource.price, createdAt: Date.now(), demo: true }, ...pointsTransactions].slice(0, 20);
    savePointsState();
    showToast('兑换流程已完成（本地演示，未产生真实扣费）');
  });
  layer.querySelector('[data-resource-detail-favorite]').addEventListener('click', () => { toggleResourceFavorite(resource.id); close(); });
  layer.querySelector('.resource-detail-close').focus();
}
function setupResourceScroller(scroller) {
  scroller.addEventListener('wheel', (event) => { if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return; event.preventDefault(); scroller.scrollBy({ left: event.deltaY, behavior: 'smooth' }); }, { passive: false });
  let startX = null; let startScroll = 0;
  scroller.addEventListener('pointerdown', (event) => { if (event.target.closest('button')) { startX = null; return; } startX = event.clientX; startScroll = scroller.scrollLeft; scroller.setPointerCapture?.(event.pointerId); });
  scroller.addEventListener('pointermove', (event) => { if (startX === null) return; scroller.scrollLeft = startScroll - (event.clientX - startX); });
  scroller.addEventListener('pointerup', () => { startX = null; });
  scroller.addEventListener('pointercancel', () => { startX = null; });
}
function renderResourceLibrary() {
  const visible = activeResourceType === '全部' ? resourceItems : resourceItems.filter((item) => item.type === activeResourceType);
  resultItems.innerHTML = `<section class="resource-library-page" aria-label="资料库"><header class="resource-library-head"><div><span class="campus-eyebrow">RESOURCE LIBRARY</span><h2>资料库</h2><p>按课程和主题整理的学习资料，方便查找与复习。</p></div></header><nav class="resource-filter-scroller" aria-label="资料类型筛选">${resourceTypes.map((type) => `<button type="button" class="${type === activeResourceType ? 'is-active' : ''}" data-resource-type="${type}">${type}</button>`).join('')}</nav><div class="resource-grid">${visible.map((resource) => `<article class="resource-card${resource.paid ? ' is-paid' : ''}" data-resource-id="${resource.id}" tabindex="0"><div class="resource-card-top"><div class="resource-card-labels"><span class="resource-type-label">${resource.type}</span>${resource.paid ? `<span class="resource-paid-label">付费 · ${resource.price} 积分</span>` : ''}</div><button type="button" class="resource-favorite${resourceFavorites.includes(resource.id) ? ' is-active' : ''}" data-resource-favorite="${resource.id}" aria-label="${resourceFavorites.includes(resource.id) ? '取消收藏' : '收藏'} ${resource.title}">${resourceFavorites.includes(resource.id) ? '★' : '☆'}</button></div><h3>${resource.title}</h3><p>${resource.summary}</p><div class="resource-card-meta"><span>${resource.subject}</span><span>${resource.updated}</span></div></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
  setupResourceScroller(resultItems.querySelector('.resource-filter-scroller'));
  resultItems.querySelectorAll('[data-resource-type]').forEach((button) => button.addEventListener('click', () => { activeResourceType = button.dataset.resourceType; renderResourceLibrary(); }));
  resultItems.querySelectorAll('[data-resource-id]').forEach((card) => { const resource = resourceItems.find((item) => item.id === card.dataset.resourceId); card.addEventListener('click', (event) => { if (event.target.closest('[data-resource-favorite]')) return; openResourceDetail(resource); }); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openResourceDetail(resource); } }); });
  resultItems.querySelectorAll('[data-resource-favorite]').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); toggleResourceFavorite(button.dataset.resourceFavorite); }));
}

function renderInterestFeed() {
  const filtered = activeInterestTopic === '全部' ? [...interestPosts] : interestPosts.filter((post) => post.topic === activeInterestTopic);
  if (activeInterestSort === '最新') filtered.reverse();
  resultItems.innerHTML = `<section class="interest-feed" aria-label="找同频的人兴趣流"><header class="interest-head"><div><span class="campus-eyebrow">CONTENT DISCOVERY</span><h2>${interestHeadings[activeInterestTopic] || '找同频的人'}</h2></div><div class="interest-sort"><button class="${activeInterestSort==='推荐'?'is-active':''}" type="button" data-sort="推荐">推荐</button><button class="${activeInterestSort==='最新'?'is-active':''}" type="button" data-sort="最新">最新</button></div></header><div class="interest-topics"><button class="${activeInterestTopic==='全部'?'is-active':''}" type="button" data-topic="全部">全部</button>${topicList.map(t=>`<button class="${activeInterestTopic===t?'is-active':''}" type="button" data-topic="${t}">${t}</button>`).join('')}</div><div class="interest-grid">${filtered.map((post,index)=>`<article class="interest-card ${post.tall?'is-tall':''}" data-post="${post.id}"><div class="interest-image ${post.tone}"><img loading="lazy" decoding="async" src="${post.imageUrl}" alt="${post.imageAlt || post.topic}"/><span>${post.topic}</span></div><div class="interest-card-body"><h3>${post.title}</h3><p>${post.text}</p><div class="interest-card-foot"><button class="interest-author" type="button" data-author="${post.id}"><span class="interest-avatar">${avatarMarkup(post.name, post.avatar)}</span>${post.name}</button><span>${post.likes} ♡　${post.comments} ◌</span></div></div></article>`).join('')}</div></section>`;
  resultItems.hidden = false;
  resultItems.querySelectorAll('.interest-card').forEach(card=>card.addEventListener('click',(event)=>{ if(event.target.closest('.interest-author')) return; openPostDetail(card.dataset.post); }));
  resultItems.querySelectorAll('.interest-author').forEach(btn=>btn.addEventListener('click',()=>showToast('个人资料卡将在下一层接入')));
  resultItems.querySelectorAll('[data-topic]').forEach(btn=>btn.addEventListener('click',()=>{ activeInterestTopic=btn.dataset.topic; renderInterestFeed(); }));
  resultItems.querySelectorAll('[data-sort]').forEach(btn=>btn.addEventListener('click',()=>{ activeInterestSort=btn.dataset.sort; renderInterestFeed(); }));
}

function openPostDetail(id) {
  const post = interestPosts.find((item) => item.id === id) || learningHomePosts.find((item) => item.id === id);
  if (!post) return;
  postDetailDialog.innerHTML = `<div class="post-detail-layout"><div class="post-detail-media"><img src="${post.imageUrl}" alt="${post.imageAlt || post.topic}"/><span class="post-detail-count">1 / 1</span></div><div class="post-detail-content"><div class="post-detail-top"><div class="post-detail-author"><span class="post-detail-avatar">${avatarMarkup(post.name, post.avatar)}</span><span>${post.name}<small>${post.topic} · ${post.createdAt || '刚刚'}</small></span></div><button class="post-follow" type="button">关注</button><button class="post-detail-close" type="button" aria-label="关闭内容详情">×</button></div><h2>${post.title}</h2><p class="post-detail-text">${post.text}</p><div class="post-detail-tags"><span>${post.topic}</span><span>校园分享</span></div><div class="post-detail-comments"><h3>评论 <small>${post.comments}</small></h3><p>欢迎分享你的想法，和发布者建立连接。</p></div><div class="post-detail-actions"><button type="button">♡ ${post.likes}</button><button type="button">☆ 收藏</button><button type="button">◌ 评论</button><button type="button">↗ 分享</button></div></div></div>`;
  postDetailDialog.showModal();
  document.body.classList.add('detail-open');
  postDetailDialog.querySelector('.post-detail-close').addEventListener('click', closePostDetail);
  postDetailDialog.addEventListener('click', (event) => { if (event.target === postDetailDialog) closePostDetail(); }, { once: true });
  postDetailDialog.querySelectorAll('.post-detail-actions button,.post-follow').forEach((button) => button.addEventListener('click', () => showToast('操作已记录（演示）')));
}

function closePostDetail() { if (postDetailDialog.open) postDetailDialog.close(); document.body.classList.remove('detail-open'); }
postDetailDialog.addEventListener('cancel', (event) => { event.preventDefault(); closePostDetail(); });
postDetailDialog.addEventListener('close', () => document.body.classList.remove('detail-open'));

function renderCampusRadar() {
  resultItems.innerHTML = `<section class="radar-board" aria-label="正在发生 Campus Radar">
    <header class="radar-head"><div><span class="campus-eyebrow">CAMPUS RADAR</span><h2>正在发生</h2></div><div class="radar-range" role="group" aria-label="距离范围"><button class="is-active" type="button">500m</button><button type="button">1km</button><button type="button">全校</button></div></header>
    <div class="radar-grid"><div class="radar-visual"><div class="radar-ring ring-4"></div><div class="radar-ring ring-3"></div><div class="radar-ring ring-2"></div><div class="radar-ring ring-1"></div><span class="radar-sweep"></span><div class="radar-you"><b>你</b><small>当前位置</small></div><span class="radar-connector" aria-hidden="true"></span><button class="radar-node node-a" type="button" data-node="lin" aria-label="匿名用户，约0.3公里"><span>匿</span><i>学习</i></button><button class="radar-node node-b" type="button" data-node="run" aria-label="夜跑组队，约0.4公里"><span>夜</span><i>组队</i></button><button class="radar-node node-c" type="button" data-node="ball" aria-label="球场空位，约0.6公里"><span>球</span><i>活动</i></button><button class="radar-node node-d" type="button" data-node="blue" aria-label="蓝色耳机，约0.2公里"><span>蓝</span><i>失物</i></button><div class="radar-count">附近 <b>12</b> 人正在连接</div></div><aside class="radar-feed"><div class="radar-feed-head"><h3>附近动态</h3><span class="radar-live"><i></i>刚刚更新</span></div><button class="radar-feed-item" data-node="blue" type="button"><b>0.2km</b><span>蓝色耳机</span><small>图书馆南门 · 失物</small></button><button class="radar-feed-item" data-node="run" type="button"><b>0.4km</b><span>夜跑组队</span><small>操场 · 还差 2 人</small></button><button class="radar-feed-item" data-node="ball" type="button"><b>0.6km</b><span>球场空位</span><small>东区球场 · 活动中</small></button><button class="radar-feed-item" data-node="lin" type="button"><b>0.3km</b><span>匿名用户</span><small>图书馆 · 今晚 19:30</small></button></aside></div>
  </section>`;
  resultItems.hidden = false;
  resultItems.querySelectorAll('.radar-range button').forEach((button) => button.addEventListener('click', () => { resultItems.querySelectorAll('.radar-range button').forEach((item) => item.classList.toggle('is-active', item === button)); showToast(`已切换到 ${button.textContent} 范围（演示）`); }));
  resultItems.querySelectorAll('.radar-node, .radar-feed-item').forEach((item) => item.addEventListener('click', () => selectRadarNode(item.dataset.node)));
}

const radarNodes = {
  lin: { name: '匿名用户', avatar: '匿', distance: '0.3km', topic: '学习', title: '四级词汇搭子', detail: '想找 3 个人一起背词', time: '今晚 19:30', location: '图书馆', response: '已有人回应 2 人', online: '刚刚在线' },
  run: { name: '夜跑组队', avatar: '夜', distance: '0.4km', topic: '组队', title: '晚间校园夜跑', detail: '沿北区环线， pace 轻松，欢迎新同学', time: '今晚 20:00', location: '操场北门', response: '还差 2 人', online: '8 分钟前在线' },
  ball: { name: '球场空位', avatar: '球', distance: '0.6km', topic: '活动', title: '篮球场临时约球', detail: '东区场地有空位，缺两位队友', time: '现在', location: '东区球场', response: '已有 6 人参与', online: '刚刚更新' },
  blue: { name: '蓝色耳机', avatar: '蓝', distance: '0.2km', topic: '失物', title: '捡到一副蓝色耳机', detail: '在图书馆南门服务台暂存，等待失主认领', time: '刚刚', location: '图书馆南门', response: '等待认领', online: '刚刚发布' },
};

function selectRadarNode(id) {
  const node = radarNodes[id];
  if (!node) return;
  resultItems.querySelectorAll('.radar-node').forEach((item) => item.classList.toggle('is-selected', item.dataset.node === id));
  const connector = resultItems.querySelector('.radar-connector');
  const connectorAngles = { lin: '-142deg', run: '-28deg', ball: '35deg', blue: '158deg' };
  if (connector) { connector.style.setProperty('--connector-length', '24%'); connector.style.transform = `rotate(${connectorAngles[id] || '0deg'})`; }
  const feed = resultItems.querySelector('.radar-feed');
  if (!feed) return;
  feed.innerHTML = `<div class="radar-detail-head"><button class="radar-detail-close" type="button" aria-label="关闭连接详情">←</button><span class="campus-eyebrow">连接详情</span></div><div class="radar-profile"><div class="radar-profile-avatar">${avatarMarkup(node.name, node.avatar)}</div><div><h3>${node.name}</h3><p>${node.topic} · ${node.distance} · <span class="online-dot"></span>${node.online}</p></div></div><span class="radar-topic">正在发起</span><h4>${node.title}</h4><p class="radar-detail-copy">${node.detail}</p><div class="radar-detail-meta"><span>◷ ${node.time}</span><span>⌖ ${node.location}</span><span>♙ ${node.response}</span></div><span class="radar-topic">最近动态</span><p class="radar-detail-copy">${node.name}的公开动态正在这里展示。</p><div class="radar-detail-actions"><button type="button" class="radar-primary">加入连接</button><button type="button" class="radar-secondary">查看主页</button></div>`;
  feed.querySelector('.radar-detail-close').addEventListener('click', () => renderCampusRadar());
  feed.querySelector('.radar-primary').addEventListener('click', () => showToast('连接申请已记录（演示）'));
  feed.querySelector('.radar-secondary').addEventListener('click', () => showToast('个人主页将在下一层接入'));
}

function renderCampusBoard() {
  resultItems.innerHTML = `<section class="campus-board" aria-label="校园动态编辑部">
    <article class="campus-feature">
      <div class="campus-feature-art"><span>秋日校园<br><b>开放日</b></span></div>
      <div class="campus-feature-copy"><span class="campus-eyebrow">主推活动 · 09.18</span><h2>秋日校园开放日：一起逛展、听讲座</h2><p>校史馆、图书馆与世纪馆将开放夜间参观，现场还有学生社团体验。</p><div class="campus-meta"><span>◷ 9 月 18 日 14:00</span><span>⌖ 世纪馆广场</span><button type="button" class="campus-interest">感兴趣</button></div></div>
    </article>
    <article class="campus-small"><div class="campus-thumb thumb-club">社团<br>招新</div><div><span class="campus-eyebrow">社团消息</span><h3>摄影协会招新开始</h3><p>带上你的相机，认识一起记录校园的人。</p><span class="campus-tag">报名中</span></div></article>
    <article class="campus-small"><div class="campus-thumb thumb-talk">讲座<br>现场</div><div><span class="campus-eyebrow">讲座 · 09.14</span><h3>从城市到社区：公共空间分享会</h3><p>周六 19:00，图书馆报告厅。</p><span class="campus-tag">可预约</span></div></article>
    <article class="campus-recap"><div class="recap-collage"><i></i><i></i><i></i><i></i></div><div><span class="campus-eyebrow">活动回顾</span><h3>上周末的草坪音乐会</h3><p>风、晚霞和刚好在场的同学。</p></div></article>
    <aside class="campus-more"><span class="campus-eyebrow">更多动态</span><h3>校园里还有 24 条新消息</h3><button type="button">查看全部&nbsp; →</button></aside>
  </section>`;
  resultItems.hidden = false;
}

// 首屏读取综合页上次选中的栏目；没有记录时才使用默认的“随便看看”。
setDrawerPreset('综合');
const initialSidebarItem = getRememberedSidebarItem('综合', '综合');
renderSupportResult(initialSidebarItem);
renderMobileSubnav('综合');
