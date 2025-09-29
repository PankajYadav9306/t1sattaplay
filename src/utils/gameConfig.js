
export const GAMES = [
  {
    key: "disawar",
    name: "DISAWAR",
    time: "05:20 AM",
    order: 10,
  },
  {
    key: "shirdi_dham",
    name: "SHIRDI DHAM",
    time: "01:00 PM",
    order: 1,
  },
  {
    key: "kaliyar",
    name: "KALIYAR",
    time: "02:00 PM",
    order: 2,
  },
  {
    key: "delhi_bazar",
    name: "DELHI BAZAR",
    time: "03:00 PM",
    order: 3,
  },
  {
    key: "shri_ganesh",
    name: "SHRI GANESH",
    time: "04:40 PM",
    order: 4,
  },
  {
    key: "faridabad",
    name: "FARIDABAD",
    time: "06:00 PM",
    order: 5,
  },
  {
    key: "shakti_peeth",
    name: "SHAKTI PEETH",
    time: "07:30 PM",
    order: 6,
  },
  {
    key: "ghaziabad",
    name: "GHAZIABAD",
    time: "09:30 PM",
    order: 7,
  },
  {
    key: "mathura",
    name: "MATHURA",
    time: "10:05 PM",
    order: 8,
  },
  {
    key: "gali",
    name: "GALI",
    time: "11:30 PM",
    order: 9,
  },
];

// Get game by key
export const getGameByKey = (key) => {
  return GAMES.find(game => game.key === key);
};

// Get game by name
export const getGameByName = (name) => {
  return GAMES.find(game => game.name === name);
};

// Get all game keys for queries
export const GAME_KEYS = GAMES.map(game => game.key);

// Get all game names for display
export const GAME_NAMES = GAMES.map(game => game.name);

// Create options for Sanity schema
export const GAME_OPTIONS = GAMES.map(game => ({
  title: game.name,
  value: game.key
}));

// Game mapping for backward compatibility
export const GAME_MAPPING = GAMES.reduce((acc, game) => {
  acc[game.key] = {
    displayName: game.name,
    time: game.time
  };
  return acc;
}, {});