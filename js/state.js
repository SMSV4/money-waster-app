import { t } from './i18n.js';

const STORAGE_KEYS = {
  NICK: 'flutter.nick',
  COUNTRY: 'flutter.country',
  LANGUAGE: 'flutter.language',
  AVATAR: 'flutter.avatar',
  COINS: 'flutter.coins',
  RATING: 'flutter.rating',
  RANK_WORLD: 'flutter.last_seen_rank_world',
  RANK_COUNTRY: 'flutter.last_seen_rank_country_',
  SOUND: 'flutter.sound_enabled',
  HAPTICS: 'flutter.haptics_enabled'
};

export class AppState {
  constructor() {
    this.listeners = new Set();
    this.loadState();
  }

  loadState() {
    try {
      const rawNick = localStorage.getItem(STORAGE_KEYS.NICK);
      this.nick = rawNick ? JSON.parse(rawNick) : '';
    } catch {
      this.nick = localStorage.getItem(STORAGE_KEYS.NICK) || '';
    }

    try {
      const rawCountry = localStorage.getItem(STORAGE_KEYS.COUNTRY);
      this.country = rawCountry ? JSON.parse(rawCountry) : 'KZ';
    } catch {
      this.country = localStorage.getItem(STORAGE_KEYS.COUNTRY) || 'KZ';
    }

    try {
      const rawLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      this.language = rawLang ? JSON.parse(rawLang) : 'RU';
    } catch {
      this.language = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'RU';
    }

    try {
      const rawAvatar = localStorage.getItem(STORAGE_KEYS.AVATAR);
      this.avatar = rawAvatar ? JSON.parse(rawAvatar) : '👑';
    } catch {
      this.avatar = localStorage.getItem(STORAGE_KEYS.AVATAR) || '👑';
    }

    const rawCoins = localStorage.getItem(STORAGE_KEYS.COINS);
    this.coins = rawCoins !== null ? parseInt(rawCoins, 10) : 5;

    const rawRating = localStorage.getItem(STORAGE_KEYS.RATING);
    this.rating = rawRating !== null ? parseInt(rawRating, 10) : 0;

    const rawSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    this.soundEnabled = rawSound !== null ? rawSound === 'true' : true;

    const rawHaptics = localStorage.getItem(STORAGE_KEYS.HAPTICS);
    this.hapticsEnabled = rawHaptics !== null ? rawHaptics === 'true' : true;

    this.isInitialized = Boolean(this.nick && this.nick.trim().length >= 3);
    this.bannerText = t(this.language, 'initialMessage');
  }

  saveState() {
    localStorage.setItem(STORAGE_KEYS.NICK, JSON.stringify(this.nick));
    localStorage.setItem(STORAGE_KEYS.COUNTRY, JSON.stringify(this.country));
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, JSON.stringify(this.language));
    localStorage.setItem(STORAGE_KEYS.AVATAR, JSON.stringify(this.avatar));
    localStorage.setItem(STORAGE_KEYS.COINS, this.coins.toString());
    localStorage.setItem(STORAGE_KEYS.RATING, this.rating.toString());
    localStorage.setItem(STORAGE_KEYS.SOUND, this.soundEnabled.toString());
    localStorage.setItem(STORAGE_KEYS.HAPTICS, this.hapticsEnabled.toString());
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveState();
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  setProfile(nick, country, language, avatar) {
    this.nick = nick.trim();
    this.country = country;
    this.language = language;
    this.avatar = avatar;
    this.isInitialized = true;
    this.bannerText = t(this.language, 'initialMessage');
    this.notify();
  }

  setLanguage(lang) {
    this.language = lang;
    this.notify();
  }

  setCountry(country) {
    this.country = country;
    this.notify();
  }

  setAvatar(avatar) {
    this.avatar = avatar;
    this.notify();
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.notify();
  }

  toggleHaptics() {
    this.hapticsEnabled = !this.hapticsEnabled;
    this.notify();
  }

  spendCoin(newQuote) {
    if (this.coins > 0) {
      this.coins -= 1;
      if (newQuote) {
        this.bannerText = newQuote;
      }
      this.notify();
      return true;
    }
    return false;
  }

  incrementRating() {
    this.rating += 1;
    this.notify();
  }

  addCoins(amount) {
    this.coins += amount;
    this.bannerText = t(this.language, 'balanceAdded');
    this.notify();
  }

  resetProfile() {
    localStorage.clear();
    this.nick = '';
    this.country = 'KZ';
    this.language = 'RU';
    this.avatar = '👑';
    this.coins = 5;
    this.rating = 0;
    this.soundEnabled = true;
    this.hapticsEnabled = true;
    this.isInitialized = false;
    this.bannerText = t(this.language, 'initialMessage');
    this.notify();
  }
}

export const state = new AppState();
