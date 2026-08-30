const AVATARS = ['👑', '🔥', '💎', '🚀', '🦁', '🐉', '🤑', '⚡'];

class App {
  constructor() {
    this.currentLeaderboardTab = 'world';
    this.selectedSetupAvatar = state.avatar || '👑';
    this.lastClickTime = 0;
    this.comboStreak = 0;
    this.speedGlowTimer = null;
    this.initElements();
    this.bindEvents();
    this.render();
    state.subscribe(() => this.render());
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }
  }

  initElements() {
    this.setupScreen = document.getElementById('setup-screen');
    this.gameScreen = document.getElementById('game-screen');

    this.appTitle = document.getElementById('app-title');
    this.setupSubtitle = document.getElementById('setup-subtitle');
    this.nickInput = document.getElementById('nick-input');
    this.charCount = document.getElementById('char-count');
    this.setupCountryBtn = document.getElementById('setup-country-btn');
    this.setupCountryText = document.getElementById('setup-country-text');
    this.setupLangBtn = document.getElementById('setup-lang-btn');
    this.setupLangText = document.getElementById('setup-lang-text');
    this.avatarLabel = document.getElementById('avatar-label');
    this.avatarsGrid = document.getElementById('avatars-grid');
    this.startGameBtn = document.getElementById('start-game-btn');
    this.setupFooterHint = document.getElementById('setup-footer-hint');

    this.menuBtn = document.getElementById('menu-btn');
    this.ratingPill = document.getElementById('rating-pill');
    this.ratingPillText = document.getElementById('rating-pill-text');
    this.coinsPill = document.getElementById('coins-pill');
    this.coinsPillText = document.getElementById('coins-pill-text');
    this.motivationalQuote = document.getElementById('motivational-quote');
    this.wasteBtnRing = document.getElementById('waste-btn-ring');
    this.wasteBtn = document.getElementById('waste-btn');
    this.wasteBtnText = document.getElementById('waste-btn-text');

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

    this.drawerOverlay = document.getElementById('drawer-overlay');
    this.drawerAvatar = document.getElementById('drawer-avatar');
    this.drawerNick = document.getElementById('drawer-nick');
    this.drawerMeta = document.getElementById('drawer-meta');
    this.drawerSoundBtn = document.getElementById('drawer-sound-btn');
    this.drawerSoundText = document.getElementById('drawer-sound-text');
    this.drawerSoundStatus = document.getElementById('drawer-sound-status');
    this.drawerHapticsBtn = document.getElementById('drawer-haptics-btn');
    this.drawerHapticsText = document.getElementById('drawer-haptics-text');
    this.drawerHapticsStatus = document.getElementById('drawer-haptics-status');
    this.drawerRatingBtn = document.getElementById('drawer-rating-btn');
    this.drawerTopUpBtn = document.getElementById('drawer-topup-btn');
    this.drawerLangBtn = document.getElementById('drawer-lang-btn');
    this.drawerCountryBtn = document.getElementById('drawer-country-btn');
    this.drawerAvatarBtn = document.getElementById('drawer-avatar-btn');
    this.drawerResetBtn = document.getElementById('drawer-reset-btn');
  }

  bindEvents() {
    if (this.nickInput) {
      this.nickInput.addEventListener('input', () => {
        const val = this.nickInput.value;
        const remaining = 16 - val.length;
        if (this.charCount) {
          this.charCount.textContent = `${Math.max(0, remaining)} characters remaining`;
        }
        if (this.startGameBtn) {
          this.startGameBtn.disabled = val.trim().length < 3;
        }
      });
      this.nickInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !this.startGameBtn.disabled) {
          this.startGameBtn.click();
        }
      });
    }

    if (this.setupCountryBtn) {
      this.setupCountryBtn.addEventListener('click', () => {
        haptics.light();
        this.openCountryModal();
      });
    }
    if (this.setupLangBtn) {
      this.setupLangBtn.addEventListener('click', () => {
        haptics.light();
        this.openLangModal();
      });
    }
    if (this.startGameBtn) {
      this.startGameBtn.addEventListener('click', () => {
        haptics.light();
        const nick = this.nickInput ? this.nickInput.value.trim() : '';
        if (nick.length >= 3) {
          state.setProfile(nick, state.country, state.language, this.selectedSetupAvatar);
        }
      });
    }

    if (this.wasteBtn) {
      let pointerHandled = false;
      this.isWasteBtnPressed = false;

      this.wasteBtn.addEventListener('pointerdown', (e) => {
        pointerHandled = true;
        this.isWasteBtnPressed = true;
        if (this.wasteBtnRing) this.wasteBtnRing.classList.add('pressed');
        this.handleWastePress(e);
      });

      const handleRelease = () => {
        if (this.isWasteBtnPressed) {
          this.isWasteBtnPressed = false;
          if (this.wasteBtnRing) this.wasteBtnRing.classList.remove('pressed');
          haptics.mechRelease();
        }
      };

      this.wasteBtn.addEventListener('pointerup', handleRelease);
      this.wasteBtn.addEventListener('pointercancel', handleRelease);
      this.wasteBtn.addEventListener('pointerleave', handleRelease);

      this.wasteBtn.addEventListener('click', (e) => {
        if (pointerHandled) {
          pointerHandled = false;
          return;
        }
        this.handleWastePress(e);
      });
    }
    if (this.ratingPill) {
      this.ratingPill.addEventListener('click', () => {
        haptics.light();
        this.openLeaderboardModal();
      });
    }
    if (this.coinsPill) {
      this.coinsPill.addEventListener('click', () => {
        haptics.light();
        this.openTopUpModal();
      });
    }
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => {
        haptics.light();
        this.openDrawer();
      });
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', (e) => {
        if (e.target === this.drawerOverlay) this.closeDrawer();
      });
    }
    if (this.drawerSoundBtn) {
      this.drawerSoundBtn.addEventListener('click', () => {
        haptics.light();
        state.toggleSound();
      });
    }
    if (this.drawerHapticsBtn) {
      this.drawerHapticsBtn.addEventListener('click', () => {
        state.toggleHaptics();
        haptics.light();
      });
    }
    if (this.drawerRatingBtn) {
      this.drawerRatingBtn.addEventListener('click', () => {
        haptics.light();
        this.closeDrawer();
        this.openLeaderboardModal();
      });
    }
    if (this.drawerTopUpBtn) {
      this.drawerTopUpBtn.addEventListener('click', () => {
        haptics.light();
        this.closeDrawer();
        this.openTopUpModal();
      });
    }
    if (this.drawerLangBtn) {
      this.drawerLangBtn.addEventListener('click', () => {
        haptics.light();
        this.closeDrawer();
        this.openLangModal();
      });
    }
    if (this.drawerCountryBtn) {
      this.drawerCountryBtn.addEventListener('click', () => {
        haptics.light();
        this.closeDrawer();
        this.openCountryModal();
      });
    }
    if (this.drawerAvatarBtn) {
      this.drawerAvatarBtn.addEventListener('click', () => {
        haptics.light();
        this.closeDrawer();
        this.openAvatarModal();
      });
    }
    if (this.drawerResetBtn) {
      this.drawerResetBtn.addEventListener('click', () => {
        haptics.warning();
        this.closeDrawer();
        state.resetProfile();
        if (this.nickInput) this.nickInput.value = '';
        this.selectedSetupAvatar = '👑';
        this.renderAvatarsGrid();
      });
    }

    if (this.leaderboardClose) {
      this.leaderboardClose.addEventListener('click', () => this.closeModal(this.leaderboardModal));
    }
    if (this.tabWorld) {
      this.tabWorld.addEventListener('click', () => {
        haptics.light();
        this.currentLeaderboardTab = 'world';
        this.renderLeaderboard();
      });
    }
    if (this.tabCountry) {
      this.tabCountry.addEventListener('click', () => {
        haptics.light();
        this.currentLeaderboardTab = 'country';
        this.renderLeaderboard();
      });
    }

    if (this.paywallClose) {
      this.paywallClose.addEventListener('click', () => this.closeModal(this.paywallModal));
    }
    if (this.paywall100Btn) {
      this.paywall100Btn.addEventListener('click', () => {
        haptics.heavy();
        sounds.playTopUp();
        state.addCoins(100);
        this.closeModal(this.paywallModal);
      });
    }
    if (this.paywall500Btn) {
      this.paywall500Btn.addEventListener('click', () => {
        haptics.heavy();
        sounds.playTopUp();
        state.addCoins(500);
        this.closeModal(this.paywallModal);
      });
    }

    if (this.topUpClose) {
      this.topUpClose.addEventListener('click', () => this.closeModal(this.topUpModal));
    }
    if (this.topUpCancelBtn) {
      this.topUpCancelBtn.addEventListener('click', () => this.closeModal(this.topUpModal));
    }
    if (this.topUpAddBtn) {
      this.topUpAddBtn.addEventListener('click', () => {
        haptics.heavy();
        sounds.playTopUp();
        state.addCoins(100);
        this.closeModal(this.topUpModal);
      });
    }

    if (this.countryClose) {
      this.countryClose.addEventListener('click', () => this.closeModal(this.countryModal));
    }
    if (this.countrySearch) {
      this.countrySearch.addEventListener('input', (e) => this.renderCountryList(e.target.value));
    }

    if (this.langClose) {
      this.langClose.addEventListener('click', () => this.closeModal(this.langModal));
    }
    if (this.langSearch) {
      this.langSearch.addEventListener('input', (e) => this.renderLangList(e.target.value));
    }

    if (this.avatarModalClose) {
      this.avatarModalClose.addEventListener('click', () => this.closeModal(this.avatarModal));
    }

    [this.leaderboardModal, this.paywallModal, this.topUpModal, this.countryModal, this.langModal, this.avatarModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeModal(modal);
        });
      }
    });
  }

  handleWastePress(event) {
    if (state.coins > 0) {
      const now = performance.now();
      const delta = now - this.lastClickTime;
      if (delta < 600) {
        this.comboStreak = Math.min(10, this.comboStreak + 1);
      } else {
        this.comboStreak = 1;
      }
      this.lastClickTime = now;

      // Speed glow effect on rating pill during fast tapping
      if (this.ratingPill) {
        if (this.comboStreak >= 2) {
          this.ratingPill.classList.add('speed-glow');
          clearTimeout(this.speedGlowTimer);
          this.speedGlowTimer = setTimeout(() => {
            if (this.ratingPill) this.ratingPill.classList.remove('speed-glow');
            this.comboStreak = 0;
          }, 700);
        }
      }

      haptics.mechPress();
      const quote = getRandomQuote(state.language);
      state.spendCoin(quote);

      if (this.wasteBtnRing) {
        this.wasteBtnRing.classList.remove('clicked');
        void this.wasteBtnRing.offsetWidth;
        this.wasteBtnRing.classList.add('clicked');
      }

      this.spawnClickEffects(event);
    } else {
      sounds.playLimitWarning();
      haptics.warning();
      this.openPaywallModal();
    }
  }

  handleWasteClick(event) {
    this.handleWastePress(event);
  }

  spawnClickEffects(event) {
    try {
      const rect = this.wasteBtn ? this.wasteBtn.getBoundingClientRect() : { left: window.innerWidth / 2 - 40, top: window.innerHeight / 2 - 40, width: 80, height: 80 };
      const touchX = event && event.touches && event.touches[0] ? event.touches[0].clientX : null;
      const touchY = event && event.touches && event.touches[0] ? event.touches[0].clientY : null;
      const changedX = event && event.changedTouches && event.changedTouches[0] ? event.changedTouches[0].clientX : null;
      const changedY = event && event.changedTouches && event.changedTouches[0] ? event.changedTouches[0].clientY : null;

      const rawX = event && event.clientX ? event.clientX : (touchX || changedX);
      const rawY = event && event.clientY ? event.clientY : (touchY || changedY);

      const startX = rawX || (rect.left + rect.width / 2);
      const startY = rawY || (rect.top + rect.height / 2);

      // 1. Spawn +1 floating text
      this.spawnFloatingText(startX, startY);

      // 2. Spawn tossed 3D coin to rating pill
      this.spawnFlyingCoin(startX, startY);
    } catch (e) {
      console.error('Error spawning click effects:', e);
    }
  }

  spawnFloatingText(startX, startY) {
    try {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.textContent = '+1';
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      document.body.appendChild(particle);

      const randX = (Math.random() - 0.5) * 36;
      const anim = particle.animate([
        { transform: 'translate3d(-50%, -50%, 0) scale(0.6)', opacity: 0 },
        { transform: 'translate3d(-50%, calc(-50% - 20px), 0) scale(1.3)', opacity: 1, offset: 0.2 },
        { transform: `translate3d(calc(-50% + ${randX}px), calc(-50% - 75px), 0) scale(1)`, opacity: 0, offset: 1.0 }
      ], {
        duration: 580,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      });

      anim.onfinish = () => particle.remove();
    } catch (e) {}
  }

  spawnFlyingCoin(startX, startY) {
    try {
      if (!this.ratingPill) return;
      const targetRect = this.ratingPill.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      const isCombo = this.comboStreak >= 2;
      // Slower initial float (800ms) with smooth acceleration down to 260ms on spam
      const duration = Math.max(260, 800 - (this.comboStreak - 1) * 60);

      const coinEl = document.createElement('div');
      coinEl.className = `flying-coin-wrapper ${isCombo ? 'combo-streak' : ''}`;
      coinEl.innerHTML = `
        <div class="flying-coin-inner">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#141418" stroke="#f59e0b" stroke-width="9"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-dasharray="4,4"/>
            <text x="50" y="65" font-size="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#f59e0b" text-anchor="middle">W</text>
          </svg>
        </div>
      `;

      document.body.appendChild(coinEl);

      const tossApexY = Math.min(startY - 85, (startY + targetY) / 2 - 25);
      const tossScatterX = startX + (Math.random() - 0.5) * 36;

      const midX = (tossScatterX + targetX) / 2 + (Math.random() - 0.5) * 16;
      const midY = (tossApexY + targetY) / 2 - 12;

      const fullSpins = 2 + Math.floor(Math.random() * 2);
      const totalDegY = fullSpins * 360;
      const wobbleZ = (Math.random() - 0.5) * 18;

      const anim = coinEl.animate([
        {
          transform: `translate3d(${startX - 19}px, ${startY - 19}px, 0) scale(0.65) rotateY(0deg) rotateZ(0deg)`,
          opacity: 0
        },
        {
          transform: `translate3d(${tossScatterX * 0.35 + startX * 0.65 - 19}px, ${startY - 22}px, 0) scale(1.0) rotateY(90deg) rotateZ(${wobbleZ * 0.5}deg)`,
          opacity: 1,
          offset: 0.14
        },
        {
          transform: `translate3d(${tossScatterX - 19}px, ${tossApexY - 19}px, 0) scale(1.25) rotateY(220deg) rotateZ(${wobbleZ}deg)`,
          opacity: 1,
          offset: 0.36
        },
        {
          transform: `translate3d(${midX - 19}px, ${midY - 19}px, 0) scale(1.05) rotateY(${totalDegY * 0.68}deg) rotateZ(${wobbleZ * 0.4}deg)`,
          opacity: 1,
          offset: 0.68
        },
        {
          transform: `translate3d(${targetX * 0.98 + startX * 0.02 - 19}px, ${targetY * 0.98 + startY * 0.02 - 19}px, 0) scale(0.65) rotateY(${totalDegY * 0.94}deg) rotateZ(0deg)`,
          opacity: 0.95,
          offset: 0.94
        },
        {
          transform: `translate3d(${targetX - 19}px, ${targetY - 19}px, 0) scale(0.15) rotateY(${totalDegY}deg) rotateZ(0deg)`,
          opacity: 0,
          offset: 1.0
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
        fill: 'forwards'
      });

      anim.onfinish = () => {
        coinEl.remove();
        state.incrementRating();
        this.triggerRatingImpact(targetX, targetY);
      };
    } catch (e) {}
  }

  triggerRatingImpact(targetX, targetY) {
    if (!this.ratingPill) return;

    sounds.playRatingImpact();
    haptics.coinImpact();

    // Instant snappy pulse bounce and prolonged golden glow on rating pill
    this.ratingPill.classList.remove('rating-pill-impact');
    void this.ratingPill.offsetWidth;
    this.ratingPill.classList.add('rating-pill-impact');

    // Spawn 4 fast micro sparkles around target with silky smooth decay
    for (let i = 0; i < 4; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'rating-sparkle';
      sparkle.style.left = `${targetX}px`;
      sparkle.style.top = `${targetY}px`;
      document.body.appendChild(sparkle);

      const angle = (i / 4) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist = 14 + Math.random() * 16;
      const sparkX = Math.cos(angle) * dist;
      const sparkY = Math.sin(angle) * dist;

      const sparkAnim = sparkle.animate([
        { transform: 'translate3d(-50%, -50%, 0) scale(0.5)', opacity: 1 },
        { transform: `translate3d(calc(-50% + ${sparkX}px), calc(-50% + ${sparkY}px), 0) scale(1.2)`, opacity: 0.9, offset: 0.3 },
        { transform: `translate3d(calc(-50% + ${sparkX * 1.25}px), calc(-50% + ${sparkY * 1.25}px), 0) scale(0)`, opacity: 0, offset: 1.0 }
      ], {
        duration: 320,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      });

      sparkAnim.onfinish = () => sparkle.remove();
    }
  }

  render() {
    const lang = state.language;
    const country = getCountryByCode(state.country);

    if (!state.isInitialized) {
      if (this.setupScreen) this.setupScreen.classList.add('active');
      if (this.gameScreen) this.gameScreen.classList.remove('active');
    } else {
      if (this.setupScreen) this.setupScreen.classList.remove('active');
      if (this.gameScreen) this.gameScreen.classList.add('active');
    }

    if (this.appTitle) this.appTitle.textContent = 'MONEY WASTER';
    if (this.setupSubtitle) this.setupSubtitle.textContent = t(lang, 'profileTitle');
    if (this.nickInput) this.nickInput.placeholder = t(lang, 'nickHint');
    if (this.setupCountryText) this.setupCountryText.textContent = `${t(lang, 'country')}: ${country.flag} ${country.name}`;
    if (this.setupLangText) {
      const langObj = LANGUAGES.find(l => l.code === lang);
      this.setupLangText.textContent = `${t(lang, 'language')}: ${langObj ? langObj.name : lang}`;
    }
    if (this.avatarLabel) this.avatarLabel.textContent = t(lang, 'avatar');
    if (this.startGameBtn) this.startGameBtn.textContent = t(lang, 'start');
    if (this.setupFooterHint) this.setupFooterHint.textContent = t(lang, 'setupHint');
    if (this.charCount && this.nickInput) {
      const remaining = 16 - this.nickInput.value.length;
      this.charCount.textContent = `${Math.max(0, remaining)} characters remaining`;
    }

    this.renderAvatarsGrid();

    if (this.ratingPillText) this.ratingPillText.textContent = `${t(lang, 'rating')}: ${state.rating}`;
    if (this.coinsPillText) this.coinsPillText.textContent = state.coins.toString();
    if (this.motivationalQuote) this.motivationalQuote.textContent = state.bannerText;

    if (this.drawerAvatar) this.drawerAvatar.textContent = state.avatar;
    if (this.drawerNick) this.drawerNick.textContent = state.nick || 'Player';
    if (this.drawerMeta) this.drawerMeta.textContent = `${state.country} · ${state.language}`;
    if (this.drawerSoundText) this.drawerSoundText.textContent = t(lang, 'sound');
    if (this.drawerSoundStatus) this.drawerSoundStatus.classList.toggle('active', Boolean(state.soundEnabled));
    if (this.drawerHapticsText) this.drawerHapticsText.textContent = t(lang, 'haptics');
    if (this.drawerHapticsStatus) this.drawerHapticsStatus.classList.toggle('active', Boolean(state.hapticsEnabled));
    if (this.drawerRatingBtn) this.drawerRatingBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'rating');
    if (this.drawerTopUpBtn) this.drawerTopUpBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'topUpTitle');
    if (this.drawerLangBtn) this.drawerLangBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'appLanguage');
    if (this.drawerCountryBtn) this.drawerCountryBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'country');
    if (this.drawerAvatarBtn) this.drawerAvatarBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'changeAvatar');
    if (this.drawerResetBtn) this.drawerResetBtn.querySelector('.drawer-menu-text').textContent = t(lang, 'resetProfile');

    if (this.leaderboardTitle) this.leaderboardTitle.textContent = t(lang, 'ratingTitle');
    if (this.tabWorld) this.tabWorld.textContent = t(lang, 'world');
    if (this.tabCountry) this.tabCountry.textContent = `${t(lang, 'countryTab')} · ${state.country}`;

    if (this.paywallTitle) {
      const titleSpan = this.paywallTitle.querySelector('span');
      if (titleSpan) titleSpan.textContent = t(lang, 'paywallTitle').replace('🚫 ', '');
      else this.paywallTitle.textContent = t(lang, 'paywallTitle').replace('🚫 ', '');
    }
    if (this.paywallBody) this.paywallBody.textContent = t(lang, 'paywallBody');
    if (this.paywall100Btn) {
      const amtSpan = this.paywall100Btn.querySelector('.package-amount span');
      if (amtSpan) amtSpan.textContent = t(lang, 'coins100');
    }
    if (this.paywall100Tag) {
      const tagSpan = this.paywall100Tag.querySelector('span');
      if (tagSpan) tagSpan.textContent = t(lang, 'popular').replace('🔥 ', '');
    }
    if (this.paywall500Btn) {
      const amtSpan = this.paywall500Btn.querySelector('.package-amount span');
      if (amtSpan) amtSpan.textContent = t(lang, 'coins500');
    }
    if (this.paywall500Tag) {
      const tagSpan = this.paywall500Tag.querySelector('span');
      if (tagSpan) tagSpan.textContent = t(lang, 'valueDeal').replace('💎 ', '');
    }

    if (this.topUpTitle) this.topUpTitle.textContent = t(lang, 'topUpTitle');
    if (this.topUpBody) this.topUpBody.textContent = t(lang, 'topUpBody');
    if (this.topUpCancelBtn) this.topUpCancelBtn.textContent = t(lang, 'cancel');
    if (this.topUpAddBtn) {
      const addSpan = this.topUpAddBtn.querySelector('span');
      if (addSpan) addSpan.textContent = t(lang, 'add100Coins');
      else this.topUpAddBtn.textContent = t(lang, 'add100Coins');
    }

    if (this.avatarModalTitle) this.avatarModalTitle.textContent = t(lang, 'avatar');
  }

  renderAvatarsGrid() {
    if (!this.avatarsGrid) return;
    this.avatarsGrid.innerHTML = '';
    AVATARS.forEach((av) => {
      const btn = document.createElement('button');
      btn.className = `avatar-choice ${this.selectedSetupAvatar === av ? 'selected' : ''}`;
      btn.textContent = av;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        haptics.light();
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

    if (this.tabWorld) this.tabWorld.classList.toggle('active', this.currentLeaderboardTab === 'world');
    if (this.tabCountry) this.tabCountry.classList.toggle('active', this.currentLeaderboardTab === 'country');

    if (this.leaderboardSubhead) {
      if (data.isLeader) {
        this.leaderboardSubhead.textContent = t(lang, 'leader');
      } else {
        this.leaderboardSubhead.textContent = `${t(lang, 'moreTo')} ${data.moreNeeded} → #${data.targetRank}`;
      }
    }

    if (!this.leaderboardList) return;
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
    if (this.countrySearch) {
      this.countrySearch.value = '';
      this.countrySearch.placeholder = t(state.language, 'search');
    }
    this.renderCountryList('');
    this.openModal(this.countryModal);
  }

  renderCountryList(query) {
    if (!this.countryList) return;
    const q = query.toLowerCase().trim();
    const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));

    this.countryList.innerHTML = '';
    filtered.forEach(c => {
      const btn = document.createElement('button');
      btn.className = `option-item ${state.country === c.code ? 'selected' : ''}`;
      btn.innerHTML = `<span>${c.flag} ${c.name}</span> <span style="opacity: 0.6">${c.code}</span>`;
      btn.addEventListener('click', () => {
        haptics.light();
        state.setCountry(c.code);
        this.closeModal(this.countryModal);
      });
      this.countryList.appendChild(btn);
    });
  }

  openLangModal() {
    if (this.langSearch) {
      this.langSearch.value = '';
      this.langSearch.placeholder = t(state.language, 'search');
    }
    this.renderLangList('');
    this.openModal(this.langModal);
  }

  renderLangList(query) {
    if (!this.langList) return;
    const q = query.toLowerCase().trim();
    const filtered = LANGUAGES.filter(l => l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));

    this.langList.innerHTML = '';
    filtered.forEach(l => {
      const btn = document.createElement('button');
      btn.className = `option-item ${state.language === l.code ? 'selected' : ''}`;
      btn.innerHTML = `<span>${l.name}</span> <span style="opacity: 0.6">${l.code}</span>`;
      btn.addEventListener('click', () => {
        haptics.light();
        state.setLanguage(l.code);
        this.closeModal(this.langModal);
      });
      this.langList.appendChild(btn);
    });
  }

  openAvatarModal() {
    if (!this.avatarModalGrid) return;
    this.avatarModalGrid.innerHTML = '';
    AVATARS.forEach(av => {
      const btn = document.createElement('button');
      btn.className = `avatar-choice ${state.avatar === av ? 'selected' : ''}`;
      btn.textContent = av;
      btn.addEventListener('click', () => {
        haptics.light();
        state.setAvatar(av);
        this.closeModal(this.avatarModal);
      });
      this.avatarModalGrid.appendChild(btn);
    });
    this.openModal(this.avatarModal);
  }

  openDrawer() {
    if (this.drawerOverlay) this.drawerOverlay.classList.add('active');
  }

  closeDrawer() {
    if (this.drawerOverlay) this.drawerOverlay.classList.remove('active');
  }

  openModal(modalEl) {
    if (modalEl) modalEl.classList.add('active');
  }

  closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('active');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
