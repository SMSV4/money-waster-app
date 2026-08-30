class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLimitWarning() {
    if (typeof state !== 'undefined' && !state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playRatingImpact() {
    if (typeof state !== 'undefined' && !state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  playTopUpSuccess() {
    if (typeof state !== 'undefined' && !state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + index * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + index * 0.08);
        osc.stop(this.ctx.currentTime + index * 0.08 + 0.15);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEffects();

const _tma = typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback
  ? window.Telegram.WebApp.HapticFeedback
  : null;

const haptics = {
  buttonClick() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    try {
      if (_tma && typeof _tma.impactOccurred === 'function') {
        _tma.impactOccurred('medium');
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    } catch (e) {}
  },

  coinImpact() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    try {
      if (_tma && typeof _tma.impactOccurred === 'function') {
        _tma.impactOccurred('light');
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(6);
      }
    } catch (e) {}
  },

  light() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    try {
      if (_tma && typeof _tma.selectionChanged === 'function') {
        _tma.selectionChanged();
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(8);
      }
    } catch (e) {}
  },

  medium() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    try {
      if (_tma && typeof _tma.impactOccurred === 'function') {
        _tma.impactOccurred('medium');
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch (e) {}
  },

  heavy() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    try {
      if (_tma && typeof _tma.impactOccurred === 'function') {
        _tma.impactOccurred('heavy');
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([20, 25, 20]);
      }
    } catch (e) {}
  },

  warning() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    try {
      if (_tma && typeof _tma.notificationOccurred === 'function') {
        _tma.notificationOccurred('warning');
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([30, 40, 30]);
      }
    } catch (e) {}
  }
};
