import { state } from './state.js';

class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCoinClick() {
    try {
      if (typeof state !== 'undefined' && !state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio playback silently ignored if blocked by browser policy
    }
  }

  playRatingImpact() {
    try {
      if (typeof state !== 'undefined' && !state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime); // E6
      osc.frequency.exponentialRampToValueAtTime(1760.00, this.ctx.currentTime + 0.05); // A6

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  playTopUp() {
    try {
      if (typeof state !== 'undefined' && !state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.25, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
      });
    } catch {}
  }

  playLimitWarning() {
    try {
      if (typeof state !== 'undefined' && !state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }
}

export const sounds = new SoundEffects();

export const haptics = {
  _tma(type, style) {
    try {
      const tma = typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback;
      if (tma) {
        if (type === 'impact' && tma.impactOccurred) {
          tma.impactOccurred(style);
          return true;
        }
        if (type === 'notification' && tma.notificationOccurred) {
          tma.notificationOccurred(style);
          return true;
        }
        if (type === 'selection' && tma.selectionChanged) {
          tma.selectionChanged();
          return true;
        }
      }
    } catch {}
    return false;
  },

  _vibrate(pattern) {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {}
  },

  // Two-stage mechanical switch tactile profile
  mechPress() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    // Downstroke actuation: light semi-click going down
    if (!this._tma('impact', 'light')) {
      this._vibrate(5);
    }
  },

  mechRelease() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    // Upstroke reset: medium solid click on release
    if (!this._tma('impact', 'medium')) {
      this._vibrate(10);
    }
  },

  buttonClick() {
    this.mechPress();
  },

  light() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    if (!this._tma('selection')) {
      this._vibrate(8);
    }
  },

  medium() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    if (!this._tma('impact', 'medium')) {
      this._vibrate(16);
    }
  },

  heavy() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    if (!this._tma('impact', 'heavy')) {
      this._vibrate([20, 30, 25]);
    }
  },

  success() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    if (!this._tma('notification', 'success')) {
      this._vibrate([10, 20, 15]);
    }
  },

  warning() {
    if (typeof state !== 'undefined' && !state.hapticsEnabled) return;
    if (!this._tma('notification', 'warning')) {
      this._vibrate([25, 40, 25, 40, 50]);
    }
  }
};

