const AppStateKey = {
  LANGUAGE: 'flutter.language',
  COUNTRY: 'flutter.country',
  NICKNAME: 'flutter.nickname',
  AVATAR: 'flutter.avatar',
  COINS: 'flutter.coins',
  RATING: 'flutter.rating',
  IS_INITIALIZED: 'flutter.is_initialized',
  SOUND: 'flutter.sound_enabled',
  HAPTICS: 'flutter.haptics_enabled',
};

class StateManager {
  constructor() {
    this.listeners = [];
    this.language = localStorage.getItem(AppStateKey.LANGUAGE) || 'RU';
    this.country = localStorage.getItem(AppStateKey.COUNTRY) || 'KZ';
    this.nickname = localStorage.getItem(AppStateKey.NICKNAME) || '';
    this.avatar = localStorage.getItem(AppStateKey.AVATAR) || '👑';
    this.coins = parseInt(localStorage.getItem(AppStateKey.COINS), 10);
    if (isNaN(this.coins)) this.coins = 100;
    this.rating = parseInt(localStorage.getItem(AppStateKey.RATING), 10);
    if (isNaN(this.rating)) this.rating = 0;
    this.isInitialized = localStorage.getItem(AppStateKey.IS_INITIALIZED) === 'true';
    this.soundEnabled = localStorage.getItem(AppStateKey.SOUND) !== 'false';
    this.hapticsEnabled = localStorage.getItem(AppStateKey.HAPTICS) !== 'false';
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this));
  }

  setLanguage(lang) {
    this.language = lang;
    localStorage.setItem(AppStateKey.LANGUAGE, lang);
    this.notify();
  }

  setCountry(country) {
    this.country = country;
    localStorage.setItem(AppStateKey.COUNTRY, country);
    this.notify();
  }

  setProfile(nickname, country, language, avatar) {
    this.nickname = nickname;
    this.country = country;
    this.language = language;
    this.avatar = avatar;
    this.isInitialized = true;
    localStorage.setItem(AppStateKey.NICKNAME, nickname);
    localStorage.setItem(AppStateKey.COUNTRY, country);
    localStorage.setItem(AppStateKey.LANGUAGE, language);
    localStorage.setItem(AppStateKey.AVATAR, avatar);
    localStorage.setItem(AppStateKey.IS_INITIALIZED, 'true');
    this.notify();
  }

  setAvatar(avatar) {
    this.avatar = avatar;
    localStorage.setItem(AppStateKey.AVATAR, avatar);
    this.notify();
  }

  spendCoin(quote) {
    if (this.coins > 0) {
      this.coins -= 1;
      this.rating += 1;
      localStorage.setItem(AppStateKey.COINS, this.coins.toString());
      localStorage.setItem(AppStateKey.RATING, this.rating.toString());
      this.notify();
      return true;
    }
    return false;
  }

  addCoins(amount) {
    this.coins += amount;
    localStorage.setItem(AppStateKey.COINS, this.coins.toString());
    this.notify();
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem(AppStateKey.SOUND, this.soundEnabled.toString());
    this.notify();
    return this.soundEnabled;
  }

  toggleHaptics() {
    this.hapticsEnabled = !this.hapticsEnabled;
    localStorage.setItem(AppStateKey.HAPTICS, this.hapticsEnabled.toString());
    this.notify();
    return this.hapticsEnabled;
  }

  reset() {
    this.coins = 100;
    this.rating = 0;
    this.nickname = '';
    this.avatar = '👑';
    this.isInitialized = false;
    localStorage.removeItem(AppStateKey.NICKNAME);
    localStorage.removeItem(AppStateKey.AVATAR);
    localStorage.removeItem(AppStateKey.IS_INITIALIZED);
    localStorage.setItem(AppStateKey.COINS, '100');
    localStorage.setItem(AppStateKey.RATING, '0');
    this.notify();
  }
}

const state = new StateManager();
