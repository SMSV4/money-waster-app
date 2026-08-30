import { COUNTRIES, getCountryByCode } from './countries.js';
import { LANGUAGES, TRANSLATIONS, t, getRandomQuote } from './i18n.js';
import { state } from './state.js';
import { getLeaderboardData } from './leaderboard.js';
import { sounds } from './audio.js';

const AVATARS = ['👑', '🔥', '💎', '🚀', '🦁', '🐉', '🤑', '⚡'];

class App {
  constructor() {
    this.currentLeaderboardTab = 'world';
    this.selectedSetupAvatar = state.avatar || '👑';
    this.initElements();
    this.bindEvents();
    this.render();
    state.subscribe(() => this.render());
  }

  initElements() {
    // Screens
    this.setupScreen = document.getElementById('setup-screen');
    this.gameScreen = document.getElementById('game-screen');

    // Setup elements
    this.appTitle = document.getElementById('app-title');
    this.setupSubtitle = document.getElementById('setup-subtitle');
    this.nickInput = document.getElementById('nick-input');
    this.nickHint = document.getElementById('nick-hint');
    this.charCount = document.getElementById('char-count');
    this.setupCountryBtn = document.getElementById('setup-country-btn');
    this.setupCountryText = document.getElementById('setup-country-text');
    this.setupLangBtn = document.getElementById('setup-lang-btn');
    this.setupLangText = document.getElementById('setup-lang-text');
    this.avatarLabel = document.getElementById('avatar-label');
    this.avatarsGrid = document.getElementById('avatars-grid');
    this.startGameBtn = document.getElementById('start-game-btn');
    this.setupFooterHint = document.getElementById('setup-footer-hint');

    // Game elements
    this.menuBtn = document.getElementById('menu-btn');
    this.ratingPill = document.getElementById('rating-pill');
    this.ratingPillText = document.getElementById('rating-pill-text');
    this.coinsPill = document.getElementById('coins-pill');
    this.coinsPillText = document.getElementById('coins-pill-text');
    this.motivationalQuote = document.getElementById('motivational-quote');
    this.wasteBtnRing = document.getElementById('waste-btn-ring');
    this.wasteBtn = document.getElementById('waste-btn');
    this.wasteBtnText = document.getElementById('waste-btn-text');

    // Modals
    this.leaderboardModal = document.getElementById('leaderboard-modal');
    this.leaderboardTitle = document.getElementById('leaderboard-title');
    this.leaderboardClose = document.getElementById('leaderboard-close');
    this.tabWorld = document.getElementById('tab-world');
    this.tabCountry = document.getElementById('tab-country');
    this.leaderboardSubhead = document.getElementById('leaderboard-subhead');
    this.leaderboardList = document.getElementById('leaderboard-list');

    this.paywallModal = document.getElementById('paywall-modal');
    this.paywallClose = document.getElementById('paywall-close');
    this.paywallTitle = document.getElementById('paywall-title');
    this.paywallBody = document.getElementById('paywall-body');
    this.paywall100Btn = document.getElementById('paywall-100-btn');
    this.paywall100Tag = document.getElementById('paywall-100-tag');
    this.paywall500Btn = document.getElementById('paywall-500-btn');
    this.paywall500Tag = document.getElementById('paywall-500-tag');

    this.topUpModal = document.getElementById('topup-modal');
    this.topUpClose = document.getElementById('topup-close');
    this.topUpTitle = document.getElementById('topup-title');
    this.topUpBody = document.getElementById('topup-body');
    this.topUpCancelBtn = document.getElementById('topup-cancel-btn');
    this.topUpAddBtn = document.getElementById('topup-add-btn');

    this.countryModal = document.getElementById('country-modal');
    this.countryClose = document.getElementById('country-close');
    this.countrySearch = document.getElementById('country-search');
    this.countryList = document.getElementById('country-list');

    this.langModal = document.getElementById('lang-modal');
    this.langClose = document.getElementById('lang-close');
    this.langSearch = document.getElementById('lang-search');
    this.langList = document.getElementById('lang-list');

    this.avatarModal = document.getElementById('avatar-modal');
    this.avatarModalClose = document.getElementById('avatar-modal-close');
    this.avatarModalTitle = document.getElementById('avatar-modal-title');
    this.avatarModalGrid = document.getElementById('avatar-modal-grid');

    // Drawer
    this.drawerOverlay = document.getElementById('drawer-overlay');
    this.drawerAvatar = document.getElementById('drawer-avatar');
    this.drawerNick = document.getElementById('drawer-nick');
    this.drawerMeta = document.getElementById('drawer-meta');
    this.drawerRatingBtn = document.getElementById('drawer-rating-btn');
    this.drawerTopUpBtn = document.getElementById('drawer-topup-btn');
    this.drawerLangBtn = document.getElementById('drawer-lang-btn');
    this.drawerCountryBtn = document.getElementById('drawer-country-btn');
    this.drawerAvatarBtn = document.getElementById('drawer-avatar-btn');
    this.drawerResetBtn = document.getElementById('drawer-reset-btn');
  }

  bindEvents() {
    // Setup Screen Events
    this.nickInput.addEventListener('input', () => {
      const val = this.nickInput.value;
      const remaining = 16 - val.length;
      this.charCount.textContent = `${Math.max(0, remaining)} characters remaining`;
      this.startGameBtn.disabled = val.trim().length < 3;
    });

    this.setupCountryBtn.addEventListener('click', () => this.openCountryModal());
    this.setupLangBtn.addEventListener('click', () => this.openLangModal());

    this.startGameBtn.addEventListener('click', () => {
      const nick = this.nickInput.value.trim();
      if (nick.length >= 3) {
        state.setProfile(nick, state.country, state.language, this.selectedSetupAvatar);
      }
    });

    // Game Screen Events
    this.wasteBtn.addEventListener('click', (e) => this.handleWasteClick(e));
    this.ratingPill.addEventListener('click', () => this.openLeaderboardModal());
    this.coinsPill.addEventListener('click', () => this.openTopUpModal());
    this.menuBtn.addEventListener('click', () => this.openDrawer());

    // Drawer Events
    this.drawerOverlay.addEventListener('click', (e) => {
      if (e.target === this.drawerOverlay) this.closeDrawer();
    });
    this.drawerRatingBtn.addEventListener('click', () => {
      this.closeDrawer();
      this.openLeaderboardModal();
    });
    this.drawerTopUpBtn.addEventListener('click', () => {
      this.closeDrawer();
      this.openTopUpModal();
    });
    this.drawerLangBtn.addEventListener('click', () => {
      this.closeDrawer();
      this.openLangModal();
    });
    this.drawerCountryBtn.addEventListener('click', () => {
      this.closeDrawer();
      this.openCountryModal();
    });
    this.drawerAvatarBtn.addEventListener('click', () => {
      this.closeDrawer();
      this.openAvatarModal();
    });
    this.drawerResetBtn.addEventListener('click', () => {
      this.closeDrawer();
      state.resetProfile();
      this.nickInput.value = '';
    });

    // Leaderboard Modal Events
    this.leaderboardClose.addEventListener('click', () => this.closeModal(this.leaderboardModal));
    this.tabWorld.addEventListener('click', () => {
      this.currentLeaderboardTab = 'world';
      this.renderLeaderboard();
    });
    this.tabCountry.addEventListener('click', () => {
      this.currentLeaderboardTab = 'country';
      this.renderLeaderboard();
    });

    // Paywall Modal Events
    this.paywallClose.addEventListener('click', () => this.closeModal(this.paywallModal));
    this.paywall100Btn.addEventListener('click', () => {
      state.addCoins(100);
      sounds.playTopUp();
      this.closeModal(this.paywallModal);
    });
    this.paywall500Btn.addEventListener('click', () => {
      state.addCoins(500);
      sounds.playTopUp();
      this.closeModal(this.paywallModal);
    });

    // TopUp Modal Events
    this.topUpClose.addEventListener('click', () => this.closeModal(this.topUpModal));
    this.topUpCancelBtn.addEventListener('click', () => this.closeModal(this.topUpModal));
    this.topUpAddBtn.addEventListener('click', () => {
      state.addCoins(100);
      sounds.playTopUp();
      this.closeModal(this.topUpModal);
    });

    // Country Search
    this.countryClose.addEventListener('click', () => this.closeModal(this.countryModal));
    this.countrySearch.addEventListener('input', (e) => this.renderCountryList(e.target.value));

    // Language Search
    this.langClose.addEventListener('click', () => this.closeModal(this.langModal));
    this.langSearch.addEventListener('input', (e) => this.renderLangList(e.target.value));

    // Avatar Modal
    this.avatarModalClose.addEventListener('click', () => this.closeModal(this.avatarModal));
  }

  handleWasteClick(event) {
    if (state.coins > 0) {
      sounds.playCoinClick();
      const quote = getRandomQuote(state.language);
      state.spendCoin(quote);

      // Button animation
      this.wasteBtnRing.classList.remove('clicked');
      void this.wasteBtnRing.offsetWidth;
      this.wasteBtnRing.classList.add('clicked');

      // Spawn Particle
      this.spawnParticle(event);
    } else {
      sounds.playLimitWarning();
      this.openPaywallModal();
    }
  }

  spawnParticle(event) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.textContent = '+1 WASTE';
    const randX = (Math.random() - 0.5) * 60;
    particle.style.setProperty('--rand-x', randX);

    const rect = this.wasteBtn.getBoundingClientRect();
    const x = event ? (event.clientX || rect.left + rect.width / 2) : rect.left + rect.width / 2;
    const y = event ? (event.clientY || rect.top + rect.height / 2) : rect.top + rect.height / 2;

    particle.style.left = `${x - 40}px`;
    particle.style.top = `${y - 30}px`;
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
  }

  render() {
    const lang = state.language;
    const country = getCountryByCode(state.country);

    if (!state.isInitialized) {
      this.setupScreen.classList.add('active');
      this.gameScreen.classList.remove('active');
    } else {
      this.setupScreen.classList.remove('active');
      this.gameScreen.classList.add('active');
    }

    // Setup texts
    this.appTitle.textContent = 'MONEY WASTER';
    this.setupSubtitle.textContent = t(lang, 'profileTitle');
    this.nickInput.placeholder = t(lang, 'nickHint');
    this.setupCountryText.textContent = `${t(lang, 'country')}: ${country.flag} ${country.name}`;
    this.setupLangText.textContent = `${t(lang, 'language')}: ${LANGUAGES.find(l => l.code === lang)?.name || lang}`;
    this.avatarLabel.textContent = t(lang, 'avatar');
    this.startGameBtn.textContent = t(lang, 'start');
    this.setupFooterHint.textContent = t(lang, 'setupHint');
    this.renderAvatarsGrid();

    // Game texts
    this.ratingPillText.textContent = `${t(lang, 'rating')}: ${state.rating}`;
    this.coinsPillText.textContent = `🪙 ${state.coins}`;
    this.motivationalQuote.textContent = state.bannerText;

    // Drawer texts
    this.drawerAvatar.textContent = state.avatar;
    this.drawerNick.textContent = state.nick || 'Player';
    this.drawerMeta.textContent = `${state.country} · ${state.language}`;
    this.drawerRatingBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'rating');
    this.drawerTopUpBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'topUpTitle');
    this.drawerLangBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'appLanguage');
    this.drawerCountryBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'country');
    this.drawerAvatarBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'changeAvatar');
    this.drawerResetBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'resetProfile');

    // Modals translations
    this.leaderboardTitle.textContent = t(lang, 'ratingTitle');
    this.tabWorld.textContent = t(lang, 'world');
    this.tabCountry.textContent = `${t(lang, 'countryTab')} · ${state.country}`;

    this.paywallTitle.textContent = t(lang, 'paywallTitle');
    this.paywallBody.textContent = t(lang, 'paywallBody');
    this.paywall100Btn.querySelector('.package-amount').textContent = t(lang, 'coins100');
    this.paywall100Tag.textContent = t(lang, 'popular');
    this.paywall500Btn.querySelector('.package-amount').textContent = t(lang, 'coins500');
    this.paywall500Tag.textContent = t(lang, 'valueDeal');

    this.topUpTitle.textContent = t(lang, 'topUpTitle');
    this.topUpBody.textContent = t(lang, 'topUpBody');
    this.topUpCancelBtn.textContent = t(lang, 'cancel');
    this.topUpAddBtn.textContent = t(lang, 'add100Coins');

    this.avatarModalTitle.textContent = t(lang, 'avatar');
  }

  renderAvatarsGrid() {
    this.avatarsGrid.innerHTML = '';
    AVATARS.forEach((av) => {
      const btn = document.createElement('button');
      btn.className = `avatar-choice ${this.selectedSetupAvatar === av ? 'selected' : ''}`;
      btn.textContent = av;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        this.selectedSetupAvatar = av;
        this.renderAvatarsGrid();
      });
      this.avatarsGrid.appendChild(btn);
    });
  }

  openLeaderboardModal() {
    this.renderLeaderboard();
    this.openModal(this.leaderboardModal);
  }

  renderLeaderboard() {
    const lang = state.language;
    const data = getLeaderboardData(this.currentLeaderboardTab, state);

    this.tabWorld.classList.toggle('active', this.currentLeaderboardTab === 'world');
    this.tabCountry.classList.toggle('active', this.currentLeaderboardTab === 'country');

    if (data.isLeader) {
      this.leaderboardSubhead.textContent = t(lang, 'leader');
    } else {
      this.leaderboardSubhead.textContent = `${t(lang, 'moreTo')} ${data.moreNeeded} → #${data.targetRank}`;
    }

    this.leaderboardList.innerHTML = '';
    data.items.forEach((item) => {
      const row = document.createElement('div');
      row.className = `leaderboard-row ${item.isPlayer ? 'is-player' : ''}`;
      row.innerHTML = `
        <div class="leaderboard-row-content">
          <div class="leaderboard-left">
            <span class="rank-badge">#${item.rank}</span>
            <span class="avatar-icon">${item.avatar}</span>
            <span class="leaderboard-name">${item.name} <span>${item.flag}</span></span>
          </div>
          <span class="leaderboard-score">${item.score} WASTE</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar" style="width: ${item.progressPercent}%"></div>
        </div>
      `;
      this.leaderboardList.appendChild(row);
    });
  }

  openTopUpModal() {
    this.openModal(this.topUpModal);
  }

  openPaywallModal() {
    this.openModal(this.paywallModal);
  }

  openCountryModal() {
    this.countrySearch.value = '';
    this.countrySearch.placeholder = t(state.language, 'search');
    this.renderCountryList('');
    this.openModal(this.countryModal);
  }

  renderCountryList(query) {
    const q = query.toLowerCase().trim();
    const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));

    this.countryList.innerHTML = '';
    filtered.forEach(c => {
      const btn = document.createElement('button');
      btn.className = `option-item ${state.country === c.code ? 'selected' : ''}`;
      btn.innerHTML = `<span>${c.flag} ${c.name}</span> <span style="opacity: 0.6">${c.code}</span>`;
      btn.addEventListener('click', () => {
        state.setCountry(c.code);
        this.closeModal(this.countryModal);
      });
      this.countryList.appendChild(btn);
    });
  }

  openLangModal() {
    this.langSearch.value = '';
    this.langSearch.placeholder = t(state.language, 'search');
    this.renderLangList('');
    this.openModal(this.langModal);
  }

  renderLangList(query) {
    const q = query.toLowerCase().trim();
    const filtered = LANGUAGES.filter(l => l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));

    this.langList.innerHTML = '';
    filtered.forEach(l => {
      const btn = document.createElement('button');
      btn.className = `option-item ${state.language === l.code ? 'selected' : ''}`;
      btn.innerHTML = `<span>${l.name}</span> <span style="opacity: 0.6">${l.code}</span>`;
      btn.addEventListener('click', () => {
        state.setLanguage(l.code);
        this.closeModal(this.langModal);
      });
      this.langList.appendChild(btn);
    });
  }

  openAvatarModal() {
    this.avatarModalGrid.innerHTML = '';
    AVATARS.forEach(av => {
      const btn = document.createElement('button');
      btn.className = `avatar-choice ${state.avatar === av ? 'selected' : ''}`;
      btn.textContent = av;
      btn.addEventListener('click', () => {
        state.setAvatar(av);
        this.closeModal(this.avatarModal);
      });
      this.avatarModalGrid.appendChild(btn);
    });
    this.openModal(this.avatarModal);
  }

  openDrawer() {
    this.drawerOverlay.classList.add('active');
  }

  closeDrawer() {
    this.drawerOverlay.classList.remove('active');
  }

  openModal(modalEl) {
    modalEl.classList.add('active');
  }

  closeModal(modalEl) {
    modalEl.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
