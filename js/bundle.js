(function() {
'use strict';

// --- Module: js/countries.js ---
const COUNTRIES = [
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czechia', flag: '🇨🇿' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'UZ', name: 'Uzbekistan', flag: 'UZ' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' }
];

function getCountryByCode(code) {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
}

// --- Module: js/i18n.js ---
const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'RU', name: 'Русский' },
  { code: 'KZ', name: 'Қазақша' },
  { code: 'ES', name: 'Español' },
  { code: 'PT', name: 'Português' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'FR', name: 'Français' },
  { code: 'TR', name: 'Türkçe' },
  { code: 'ZH', name: '简体中文' },
  { code: 'ID', name: 'Bahasa Indonesia' }
];

const TRANSLATIONS = {
  EN: {
    profileTitle: 'Create your player profile',
    nick: 'Player name',
    nickHint: 'For example: ClickLord',
    country: 'Player country',
    language: 'App language',
    avatar: 'Choose an avatar',
    start: 'START GAME',
    setupHint: 'Every click costs 1 coin. The more you waste, the higher your rating.',
    nickEmpty: 'Enter a player name',
    nickShort: 'Player name must be at least 3 characters',
    rating: 'Waste rating',
    world: 'WORLD',
    countryTab: 'COUNTRY',
    leader: 'You are the leader',
    moreTo: 'more to',
    appLanguage: 'App language',
    resetProfile: 'Reset profile',
    changeAvatar: 'Change avatar',
    initialMessage: 'Ready to prove you are not like everyone else?',
    balanceAdded: 'Balance refilled. The road to the top is open.',
    topUpTitle: 'Top up balance',
    topUpBody: 'Payments will be connected here later. For now, add test coins.',
    cancel: 'Cancel',
    add100Coins: '+100 coins',
    paywallTitle: '🚫 You reached the limit',
    paywallBody: '95% of players stop here.\nAre you different?',
    coins100: '100 coins',
    coins500: '500 coins',
    popular: '🔥 Popular',
    valueDeal: '💎 Best value',
    ratingTitle: 'RATING',
    search: 'Search',
    quotes: [
      'Most people would not do it.',
      'That is how the ranking moves.',
      'The leaderboard noticed that.',
      'You are already ahead of those who stopped.',
      'Status is built one decision at a time.',
      'While someone doubted, you moved.',
      'The momentum belongs to the one who keeps going.',
      'The gap just got smaller.',
      'One more reason to defend your place.',
      'You are making that number your own.'
    ]
  },
  RU: {
    profileTitle: 'Создай профиль игрока',
    nick: 'Игровой ник',
    nickHint: 'Например: ClickLord',
    country: 'Страна игрока',
    language: 'Язык приложения',
    avatar: 'Выбери аватарку',
    start: 'НАЧАТЬ ИГРУ',
    setupHint: 'Каждый клик стоит 1 монету. Чем больше тратишь — тем выше рейтинг.',
    nickEmpty: 'Введите игровой ник',
    nickShort: 'Ник должен быть минимум 3 символа',
    rating: 'Waste рейтинг',
    world: 'WORLD',
    countryTab: 'COUNTRY',
    leader: 'Ты лидер',
    moreTo: 'ещё',
    appLanguage: 'Язык приложения',
    resetProfile: 'Сбросить профиль',
    changeAvatar: 'Сменить аватар',
    initialMessage: 'Готов доказать, что ты не как все?',
    balanceAdded: 'Баланс пополнен. Путь к вершине открыт.',
    topUpTitle: 'Пополнение баланса',
    topUpBody: 'Позже здесь подключим оплату. Пока добавим тестовые монеты.',
    cancel: 'Отмена',
    add100Coins: '+100 монет',
    paywallTitle: '🚫 Ты дошёл до границы',
    paywallBody: '95% игроков останавливаются здесь.\nТы другой?',
    coins100: '100 монет',
    coins500: '500 монет',
    popular: '🔥 Популярно',
    valueDeal: '💎 Выгодно',
    ratingTitle: 'РЕЙТИНГ',
    search: 'Поиск',
    quotes: [
      'Большинство бы не нажало.',
      'Именно так двигается рейтинг.',
      'Таблица лидеров это заметила.',
      'Ты уже впереди тех, кто остановился.',
      'Статус строится по одному решению за раз.',
      'Пока кто-то сомневался, ты двигался.',
      'Темп принадлежит тому, кто продолжает.',
      'Разрыв только что стал меньше.',
      'Ещё одна причина удерживать своё место.',
      'Ты делаешь это число своим.'
    ]
  },
  KZ: {
    profileTitle: 'Ойыншы профилін жаса',
    nick: 'Ойын аты',
    nickHint: 'Мысалы: ClickLord',
    country: 'Ойыншы елі',
    language: 'Қолданба тілі',
    avatar: 'Аватарды таңда',
    start: 'ОЙЫНДЫ БАСТАУ',
    setupHint: 'Әр басу 1 монета тұрады. Неғұрлым көп жұмсасаң, рейтингің соғұрлым жоғары.',
    nickEmpty: 'Ойын атын енгізіңіз',
    nickShort: 'Ойын аты кемінде 3 таңбадан тұруы керек',
    rating: 'Waste рейтингі',
    world: 'ӘЛЕМ',
    countryTab: 'ЕЛ',
    leader: 'Сен көшбасшысың',
    moreTo: 'қалды',
    appLanguage: 'Қолданба тілі',
    resetProfile: 'Профильді тазарту',
    changeAvatar: 'Аватарды өзгерту',
    initialMessage: 'Басқалардан ерекше екеніңді дәлелдеуге дайынсың ба?',
    balanceAdded: 'Баланс толтырылды. Шыңға апарар жол ашық.',
    topUpTitle: 'Балансты толтыру',
    topUpBody: 'Төлемді кейін осында қосамыз. Әзірге сынақ монеталарын қосайық.',
    cancel: 'Бас тарту',
    add100Coins: '+100 монета',
    paywallTitle: '🚫 Сен шегіне жеттің',
    paywallBody: 'Ойыншылардың 95%-ы осы жерде тоқтайды.\nАл сен ше?',
    coins100: '100 монета',
    coins500: '500 монета',
    popular: '🔥 Танымал',
    valueDeal: '💎 Тиімді',
    ratingTitle: 'РЕЙТИНГ',
    search: 'Іздеу',
    quotes: [
      'Көпшілік баспас еді.',
      'Рейтинг дәл осылай қозғалады.',
      'Көшбасшылар кестесі мұны байқады.',
      'Тоқтағандардан сен әлдеқашан алдасың.',
      'Мәртебе әр шешіммен құрылады.',
      'Біреу күмәнданғанда, сен қозғалып кеттің.',
      'Қарқын жалғастырған адамға тиесілі.',
      'Ара қашықтық азайды.',
      'Орныңды ұстап қалуға тағы бір себеп.',
      'Бұл сан енді сенікі болып келеді.'
    ]
  },
  ES: {
    profileTitle: 'Crea tu perfil de jugador',
    nick: 'Nombre de jugador',
    nickHint: 'Por ejemplo: ClickLord',
    country: 'País del jugador',
    language: 'Idioma de la app',
    avatar: 'Elige un avatar',
    start: 'EMPEZAR',
    setupHint: 'Cada toque cuesta 1 moneda. Cuanto más gastas, más sube tu ranking.',
    nickEmpty: 'Introduce un nombre',
    nickShort: 'El nombre debe tener al menos 3 caracteres',
    rating: 'Ranking Waste',
    world: 'MUNDO',
    countryTab: 'PAÍS',
    leader: 'Eres el líder',
    moreTo: 'más para',
    appLanguage: 'Idioma de la app',
    resetProfile: 'Restablecer perfil',
    changeAvatar: 'Cambiar avatar',
    initialMessage: '¿Listo para demostrar que no eres como los demás?',
    balanceAdded: 'Saldo recargado. El camino a la cima está abierto.',
    topUpTitle: 'Recargar saldo',
    topUpBody: 'Más adelante conectaremos los pagos. Por ahora, añade monedas de prueba.',
    cancel: 'Cancelar',
    add100Coins: '+100 monedas',
    paywallTitle: '🚫 Llegaste al límite',
    paywallBody: 'El 95% de los jugadores se detiene aquí.\n¿Tú eres diferente?',
    coins100: '100 monedas',
    coins500: '500 monedas',
    popular: '🔥 Popular',
    valueDeal: '💎 Mejor valor',
    ratingTitle: 'CLASIFICACIÓN',
    search: 'Buscar',
    quotes: [
      'La mayoría no lo haría.',
      'Así es como sube el ranking.',
      'La clasificación lo ha notado.',
      'Ya vas por delante de quienes se pararon.',
      'El estatus se construye decisión a decisión.',
      'Alguien dudó mientras tú avanzabas.',
      'El impulso es de quien continúa.',
      'La distancia acaba de reducirse.',
      'Una razón más para defender tu puesto.',
      'Estás haciendo tuyo ese número.'
    ]
  },
  PT: {
    profileTitle: 'Crie seu perfil de jogador',
    nick: 'Nome do jogador',
    nickHint: 'Por exemplo: ClickLord',
    country: 'País do jogador',
    language: 'Idioma do app',
    avatar: 'Escolha um avatar',
    start: 'COMEÇAR',
    setupHint: 'Cada toque custa 1 moeda. Quanto mais você gasta, maior fica seu ranking.',
    nickEmpty: 'Digite um nome',
    nickShort: 'O nome deve ter pelo menos 3 caracteres',
    rating: 'Ranking Waste',
    world: 'MUNDO',
    countryTab: 'PAÍS',
    leader: 'Você é o líder',
    moreTo: 'a mais para',
    appLanguage: 'Idioma do app',
    resetProfile: 'Redefinir perfil',
    changeAvatar: 'Alterar avatar',
    initialMessage: 'Pronto para provar que você não é como todo mundo?',
    balanceAdded: 'Saldo recarregado. O caminho para o topo está aberto.',
    topUpTitle: 'Adicionar saldo',
    topUpBody: 'Depois conectaremos os pagamentos. Por enquanto, adicione moedas de teste.',
    cancel: 'Cancelar',
    add100Coins: '+100 moedas',
    paywallTitle: '🚫 Você chegou ao limite',
    paywallBody: '95% dos jogadores param aqui.\nVocê é diferente?',
    coins100: '100 moedas',
    coins500: '500 moedas',
    popular: '🔥 Popular',
    valueDeal: '💎 Melhor valor',
    ratingTitle: 'RANKING',
    search: 'Pesquisar',
    quotes: [
      'A maioria não faria.',
      'É assim que o ranking se move.',
      'A classificação percebeu.',
      'Você já está à frente de quem parou.',
      'Status se constrói uma decisão por vez.',
      'Alguém hesitou enquanto você avançou.',
      'O ritmo pertence a quem continua.',
      'A distância acabou de diminuir.',
      'Mais um motivo para segurar sua posição.',
      'Você está fazendo esse número ser seu.'
    ]
  },
  DE: {
    profileTitle: 'Erstelle dein Spielerprofil',
    nick: 'Spielername',
    nickHint: 'Zum Beispiel: ClickLord',
    country: 'Land des Spielers',
    language: 'App-Sprache',
    avatar: 'Avatar auswählen',
    start: 'SPIEL STARTEN',
    setupHint: 'Jeder Klick kostet 1 Münze. Je mehr du verschwendest, desto höher dein Rang.',
    nickEmpty: 'Spielernamen eingeben',
    nickShort: 'Der Name muss mindestens 3 Zeichen lang sein',
    rating: 'Waste-Rang',
    world: 'WELT',
    countryTab: 'LAND',
    leader: 'Du bist der Spitzenreiter',
    moreTo: 'mehr bis',
    appLanguage: 'App-Sprache',
    resetProfile: 'Profil zurücksetzen',
    changeAvatar: 'Avatar ändern',
    initialMessage: 'Bereit zu beweisen, dass du nicht wie alle anderen bist?',
    balanceAdded: 'Guthaben aufgefüllt. Der Weg nach oben ist frei.',
    topUpTitle: 'Guthaben aufladen',
    topUpBody: 'Zahlungen kommen später. Vorerst gibt es Testmünzen.',
    cancel: 'Abbrechen',
    add100Coins: '+100 Münzen',
    paywallTitle: '🚫 Du hast das Limit erreicht',
    paywallBody: '95 % der Spieler hören hier auf.\nBist du anders?',
    coins100: '100 Münzen',
    coins500: '500 Münzen',
    popular: '🔥 Beliebt',
    valueDeal: '💎 Bester Wert',
    ratingTitle: 'RANGLISTE',
    search: 'Suchen',
    quotes: [
      'Die meisten würden es nicht tun.',
      'So bewegt sich die Rangliste.',
      'Das Leaderboard hat es bemerkt.',
      'Du bist schon vor denen, die aufgehört haben.',
      'Status entsteht Entscheidung für Entscheidung.',
      'Während jemand zögerte, bist du weiter.',
      'Momentum gehört dem, der weitermacht.',
      'Der Abstand ist gerade kleiner geworden.',
      'Noch ein Grund, deinen Platz zu halten.',
      'Du machst diese Zahl zu deiner.'
    ]
  },
  FR: {
    profileTitle: 'Crée ton profil de joueur',
    nick: 'Nom du joueur',
    nickHint: 'Par exemple : ClickLord',
    country: 'Pays du joueur',
    language: 'Langue de l’app',
    avatar: 'Choisis un avatar',
    start: 'COMMENCER',
    setupHint: 'Chaque clic coûte 1 pièce. Plus tu dépenses, plus ton classement monte.',
    nickEmpty: 'Entre un nom de joueur',
    nickShort: 'Le nom doit contenir au moins 3 caractères',
    rating: 'Classement Waste',
    world: 'MONDE',
    countryTab: 'PAYS',
    leader: 'Tu es en tête',
    moreTo: 'de plus pour',
    appLanguage: 'Langue de l’app',
    resetProfile: 'Réinitialiser le profil',
    changeAvatar: 'Changer l’avatar',
    initialMessage: 'Prêt à prouver que tu n’es pas comme les autres ?',
    balanceAdded: 'Solde rechargé. La route vers le sommet est ouverte.',
    topUpTitle: 'Recharger le solde',
    topUpBody: 'Les paiements seront ajoutés plus tard. Pour l’instant, ajoute des pièces de test.',
    cancel: 'Annuler',
    add100Coins: '+100 pièces',
    paywallTitle: '🚫 Tu as atteint la limite',
    paywallBody: '95 % des joueurs s’arrêtent ici.\nEt toi ?',
    coins100: '100 pièces',
    coins500: '500 pièces',
    popular: '🔥 Populaire',
    valueDeal: '💎 Bon plan',
    ratingTitle: 'CLASSEMENT',
    search: 'Rechercher',
    quotes: [
      'La plupart ne l’auraient pas fait.',
      'C’est comme ça qu’un classement bouge.',
      'Le classement l’a remarqué.',
      'Tu es déjà devant ceux qui se sont arrêtés.',
      'Le statut se construit décision après décision.',
      'Quelqu’un a hésité pendant que tu avançais.',
      'L’élan appartient à celui qui continue.',
      'L’écart vient de diminuer.',
      'Une raison de plus de garder ta place.',
      'Tu es en train de t’approprier ce nombre.'
    ]
  },
  TR: {
    profileTitle: 'Oyuncu profilini oluştur',
    nick: 'Oyuncu adı',
    nickHint: 'Örneğin: ClickLord',
    country: 'Oyuncu ülkesi',
    language: 'Uygulama dili',
    avatar: 'Avatar seç',
    start: 'OYUNU BAŞLAT',
    setupHint: 'Her dokunuş 1 jeton. Ne kadar çok harcarsan sıralaman o kadar yükselir.',
    nickEmpty: 'Oyuncu adı gir',
    nickShort: 'Oyuncu adı en az 3 karakter olmalı',
    rating: 'Waste sıralaması',
    world: 'DÜNYA',
    countryTab: 'ÜLKE',
    leader: 'Lidersin',
    moreTo: 'daha',
    appLanguage: 'Uygulama dili',
    resetProfile: 'Profili sıfırla',
    changeAvatar: 'Avatarı değiştir',
    initialMessage: 'Herkes gibi olmadığını kanıtlamaya hazır mısın?',
    balanceAdded: 'Bakiye yüklendi. Zirveye giden yol açık.',
    topUpTitle: 'Bakiye yükle',
    topUpBody: 'Ödemeleri daha sonra bağlayacağız. Şimdilik test jetonları ekle.',
    cancel: 'İptal',
    add100Coins: '+100 jeton',
    paywallTitle: '🚫 Sınıra ulaştın',
    paywallBody: 'Oyuncuların %95’i burada duruyor.\nSen farklı mısın?',
    coins100: '100 jeton',
    coins500: '500 jeton',
    popular: '🔥 Popüler',
    valueDeal: '💎 Avantajlı',
    ratingTitle: 'SIRALAMA',
    search: 'Ara',
    quotes: [
      'Çoğu kişi basmazdı.',
      'Sıralama böyle yükselir.',
      'Liderlik tablosu bunu fark etti.',
      'Duranların önündesin.',
      'Statü karar karar inşa edilir.',
      'Biri tereddüt ederken sen ilerledin.',
      'Momentum devam edenindir.',
      'Aradaki fark azaldı.',
      'Yerini korumak için bir neden daha.',
      'Bu sayıyı kendinin yapıyorsun.'
    ]
  },
  ZH: {
    profileTitle: '创建玩家资料',
    nick: '玩家昵称',
    nickHint: '例如：ClickLord',
    country: '玩家国家/地区',
    language: '应用语言',
    avatar: '选择头像',
    start: '开始游戏',
    setupHint: '每次点击消耗 1 枚金币。花得越多，排名越高。',
    nickEmpty: '请输入玩家昵称',
    nickShort: '昵称至少需要 3 个字符',
    rating: 'Waste 排名',
    world: '全球',
    countryTab: '国家',
    leader: '你是第一名',
    moreTo: '还差',
    appLanguage: '应用语言',
    resetProfile: '重置资料',
    changeAvatar: '更换头像',
    initialMessage: '准备好证明你和别人不一样了吗？',
    balanceAdded: '余额已补充。通往榜首的路已经打开。',
    topUpTitle: '充值余额',
    topUpBody: '之后会接入支付。现在先添加测试金币。',
    cancel: '取消',
    add100Coins: '+100 金币',
    paywallTitle: '🚫 你已到达极限',
    paywallBody: '95%的玩家会停在这里。\n你会不一样吗？',
    coins100: '100 金币',
    coins500: '500 金币',
    popular: '🔥 热门',
    valueDeal: '💎 超值',
    ratingTitle: '排行榜',
    search: '搜索',
    quotes: [
      '大多数人不会这么做。',
      '排名就是这样往上走的。',
      '排行榜已经注意到了。',
      '你已经超过那些停下来的人。',
      '地位就是这样一次次决定出来的。',
      '别人犹豫时，你已经前进了。',
      '势头属于一直前进的人。',
      '差距刚刚又缩小了。',
      '这又多了一个守住位置的理由。',
      '这个数字正在变成你的。'
    ]
  },
  ID: {
    profileTitle: 'Buat profil pemainmu',
    nick: 'Nama pemain',
    nickHint: 'Contoh: ClickLord',
    country: 'Negara pemain',
    language: 'Bahasa aplikasi',
    avatar: 'Pilih avatar',
    start: 'MULAI GAME',
    setupHint: 'Setiap tap menghabiskan 1 koin. Semakin banyak kamu buang, semakin tinggi peringkatmu.',
    nickEmpty: 'Masukkan nama pemain',
    nickShort: 'Nama pemain minimal 3 karakter',
    rating: 'Peringkat Waste',
    world: 'DUNIA',
    countryTab: 'NEGARA',
    leader: 'Kamu pemimpin',
    moreTo: 'lagi ke',
    appLanguage: 'Bahasa aplikasi',
    resetProfile: 'Reset profil',
    changeAvatar: 'Ganti avatar',
    initialMessage: 'Siap membuktikan bahwa kamu tidak sama seperti yang lain?',
    balanceAdded: 'Saldo terisi. Jalan menuju puncak terbuka.',
    topUpTitle: 'Isi saldo',
    topUpBody: 'Pembayaran akan disambungkan nanti. Untuk sekarang, tambahkan koin tes.',
    cancel: 'Batal',
    add100Coins: '+100 koin',
    paywallTitle: '🚫 Kamu mencapai batas',
    paywallBody: '95% pemain berhenti di sini.\nKamu berbeda?',
    coins100: '100 koin',
    coins500: '500 koin',
    popular: '🔥 Populer',
    valueDeal: '💎 Paling untung',
    ratingTitle: 'PERINGKAT',
    search: 'Cari',
    quotes: [
      'Kebanyakan orang tidak akan melakukannya.',
      'Begitulah peringkat bergerak naik.',
      'Leaderboard memperhatikannya.',
      'Kamu sudah di depan mereka yang berhenti.',
      'Status dibangun satu keputusan demi satu.',
      'Saat orang lain ragu, kamu bergerak.',
      'Momentum milik orang yang terus maju.',
      'Jaraknya baru saja mengecil.',
      'Satu alasan lagi untuk menjaga posisimu.',
      'Kamu sedang membuat angka itu jadi milikmu.'
    ]
  }
};

function t(lang, key) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.EN;
  return dict[key] || TRANSLATIONS.EN[key] || key;
}

function getRandomQuote(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.EN;
  const quotes = dict.quotes || TRANSLATIONS.EN.quotes;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// --- Module: js/leaderboard.js ---
const TOP_BOTS = [
  { name: 'GoldenTap', country: 'US', avatar: '👑', score: 145286 },
  { name: 'ClickLord', country: 'KZ', avatar: '🔥', score: 139369 },
  { name: 'MoneyKing', country: 'AE', avatar: '💎', score: 128400 },
  { name: 'WasteBaron', country: 'RU', avatar: '🦁', score: 98420 },
  { name: 'TapStorm', country: 'TR', avatar: '⚡', score: 87210 },
  { name: 'CoinBurner', country: 'DE', avatar: '🚀', score: 76350 },
  { name: 'FastFinger', country: 'US', avatar: '🤑', score: 64100 },
  { name: 'BigWaste', country: 'KZ', avatar: '🤑', score: 41200 },
  { name: 'GoldRush', country: 'AE', avatar: '💎', score: 28900 },
  { name: 'PulseTap', country: 'TR', avatar: '⚡', score: 18720 },
  { name: 'AshHeap', country: 'KZ', avatar: '🚀', score: 12840 },
  { name: 'DustRich', country: 'DE', avatar: '💎', score: 9900 },
  { name: 'ThinWallet', country: 'RU', avatar: '🦁', score: 7200 },
  { name: 'SoftTap', country: 'TR', avatar: '⚡', score: 5400 },
  { name: 'NearZero', country: 'US', avatar: '🐉', score: 3100 },
  { name: 'FirstCoin', country: 'KZ', avatar: '🤑', score: 1200 },
  { name: 'WarmUp', country: 'AE', avatar: '👑', score: 640 },
  { name: 'RookieBurn', country: 'DE', avatar: '🔥', score: 280 },
  { name: 'TinyWaste', country: 'RU', avatar: '🚀', score: 90 },
  { name: 'Spark', country: 'TR', avatar: '⚡', score: 25 }
];

function generateProceduralBots() {
  const bots = [];
  for (let s = 0; s <= 30; s++) {
    const numStr = s.toString().padStart(2, '0');
    const country = (s % 2 === 0) ? 'KZ' : 'US';
    const avatar = (s % 3 === 0) ? '⚡' : (s % 3 === 1 ? '🔥' : '💎');
    bots.push({
      name: 'TestWaste' + numStr,
      country,
      avatar,
      score: s,
      isPlayer: false
    });
  }
  return bots;
}

function getLeaderboardData(scope, playerState) {
  const procedural = generateProceduralBots();
  const allBots = [
    ...TOP_BOTS.map(b => ({ ...b, isPlayer: false })),
    ...procedural
  ];

  let list = allBots.filter(b => b.name !== playerState.nick);

  if (scope === 'country') {
    list = list.filter(b => b.country === playerState.country);
  }

  const playerItem = {
    name: playerState.nick || 'Player',
    country: playerState.country,
    avatar: playerState.avatar,
    score: playerState.rating,
    isPlayer: true
  };

  list.push(playerItem);

  list.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.isPlayer) return 1;
    if (b.isPlayer) return -1;
    return a.name.localeCompare(b.name);
  });

  const playerRankIndex = list.findIndex(item => item.isPlayer);
  const playerRank = playerRankIndex >= 0 ? playerRankIndex + 1 : list.length;

  let moreNeeded = 0;
  let targetRank = playerRank;

  if (playerRankIndex > 0) {
    const playerAhead = list[playerRankIndex - 1];
    moreNeeded = Math.max(0, (playerAhead.score + 1) - playerState.rating);
    targetRank = playerRankIndex;
  }

  const maxScore = list.length > 0 ? Math.max(list[0].score, 1) : 1;

  const items = list.map((item, idx) => {
    const countryObj = getCountryByCode(item.country);
    return {
      rank: idx + 1,
      name: item.name,
      avatar: item.avatar,
      countryCode: item.country,
      flag: countryObj.flag,
      score: item.score,
      isPlayer: item.isPlayer,
      progressPercent: Math.min(100, Math.max(4, (item.score / maxScore) * 100))
    };
  });

  return {
    items,
    playerRank,
    moreNeeded,
    targetRank,
    isLeader: playerRank === 1,
    totalPlayers: list.length
  };
}

// --- Module: js/audio.js ---
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
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  playTopUp() {
    try {
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

const sounds = new SoundEffects();

const haptics = {
  light: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(12);
      }
    } catch {}
  },
  medium: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(28);
      }
    } catch {}
  },
  heavy: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([35, 30, 45]);
      }
    } catch {}
  },
  warning: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([40, 40, 40, 40, 70]);
      }
    } catch {}
  }
};

// --- Module: js/state.js ---
const STORAGE_KEYS = {
  NICK: 'flutter.nick',
  COUNTRY: 'flutter.country',
  LANGUAGE: 'flutter.language',
  AVATAR: 'flutter.avatar',
  COINS: 'flutter.coins',
  RATING: 'flutter.rating',
  RANK_WORLD: 'flutter.last_seen_rank_world',
  RANK_COUNTRY: 'flutter.last_seen_rank_country_'
};

class AppState {
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

  spendCoin(newQuote) {
    if (this.coins > 0) {
      this.coins -= 1;
      this.rating += 1;
      if (newQuote) {
        this.bannerText = newQuote;
      }
      this.notify();
      return true;
    }
    return false;
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
    this.isInitialized = false;
    this.bannerText = t(this.language, 'initialMessage');
    this.notify();
  }
}

const state = new AppState();

// --- Module: js/app.js ---
const AVATARS = ['👑', '🔥', '💎', '🚀', '🦁', '🐉', '🤑', '⚡'];

class App {
  constructor() {
    this.currentLeaderboardTab = 'world';
    this.selectedSetupAvatar = state.avatar || '👑';
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
      this.wasteBtn.addEventListener('click', (e) => this.handleWasteClick(e));
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

  handleWasteClick(event) {
    if (state.coins > 0) {
      sounds.playCoinClick();
      haptics.medium();
      const quote = getRandomQuote(state.language);
      state.spendCoin(quote);

      if (this.wasteBtnRing) {
        this.wasteBtnRing.classList.remove('clicked');
        void this.wasteBtnRing.offsetWidth;
        this.wasteBtnRing.classList.add('clicked');
      }

      this.spawnParticle(event);
    } else {
      sounds.playLimitWarning();
      haptics.warning();
      this.openPaywallModal();
    }
  }

  spawnParticle(event) {
    try {
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
    } catch (e) {}
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

})();