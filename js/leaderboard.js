import { getCountryByCode } from './countries.js';

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

export function getLeaderboardData(scope, playerState) {
  // scope: 'world' | 'country'
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

  // Sort descending by score. If equal score, player comes after existing bots or by name
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
