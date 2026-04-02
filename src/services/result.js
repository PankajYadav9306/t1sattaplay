import { GAMES } from "@/utils/gameConfig";
import { getChartYears } from "@/utils/chartYears";

// API Base URL - use environment variable or default to current domain
const API_BASE = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

// ==================== SETTINGS ====================
export async function getSettings() {
  try {
    const response = await fetch(`${API_BASE}/api/settings`);
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

function getISTDate(daysOffset = 0) {
  const date = new Date();
  // Add IST offset (5.5 hours)
  date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000));
  // Add/subtract days if needed
  if (daysOffset !== 0) {
    date.setDate(date.getDate() + daysOffset);
  }
  // Format as YYYY-MM-DD
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function updateSettings(settings) {
  try {
    const response = await fetch(`${API_BASE}/api/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error('Failed to update settings');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

// ==================== RESULTS QUERIES ====================
export async function getTodayResult() {
  try {
    const response = await fetch(`${API_BASE}/api/results?type=today`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch today\'s results');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching today's results:", error);
    return [];
  }
}

export async function getYesterdayResults() {
  try {
    const response = await fetch(`${API_BASE}/api/results?type=yesterday`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch yesterday\'s results');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching yesterday's results:", error);
    return [];
  }
}

export async function getLastResult() {
  try {
    const response = await fetch(`${API_BASE}/api/results?type=last`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch last result');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching last result:", error);
    return null;
  }
}

export async function getDisawarData() {
  try {
    const response = await fetch(`${API_BASE}/api/results?type=disawar`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch DISAWAR data');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching DISAWAR data:", error);
    return { today: null, yesterday: null };
  }
}

export async function getMonthlyResults(month, year) {
  try {
    const response = await fetch(`${API_BASE}/api/results?month=${month}&year=${year}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch monthly results');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching monthly results:", error);
    return [];
  }
}

export async function getYearlyResults(gameKey, year) {
  try {
    const response = await fetch(`${API_BASE}/api/results?game=${gameKey}&year=${year}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch yearly results');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching yearly results:", error);
    return [];
  }
}

// ==================== ADMIN FUNCTIONS ====================
export async function getAllResultsWithMeta() {
  try {
    const response = await fetch(`${API_BASE}/api/results`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch all results');
    }
    const results = await response.json();

    // Add metadata
    return results.map(result => ({
      ...result,
      _id: result._id,
      gameName: GAMES.find(g => g.key === result.game)?.name || result.game,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }));
  } catch (error) {
    console.error("Error fetching all results:", error);
    return [];
  }
}

export async function createResult(data) {
  try {
    const response = await fetch(`${API_BASE}/api/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create result');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating result:', error);
    throw error;
  }
}

export async function updateResult(id, data) {
  try {
    const response = await fetch(`${API_BASE}/api/results/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update result');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
}

export async function deleteResult(id) {
  try {
    const response = await fetch(`${API_BASE}/api/results/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete result');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
}

export function validateResultData(data) {
  const errors = [];

  if (!data.game) {
    errors.push('Game is required');
  }

  if (!data.resultNumber) {
    errors.push('Result number is required');
  }

  if (!data.waitingGame) {
    errors.push('Waiting game is required');
  }

  if (data.game === data.waitingGame) {
    errors.push('Waiting game must be different from the selected game');
  }

  if (!data.date) {
    errors.push('Date is required');
  }

  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }

  if (data.resultNumber && !/^\d+$/.test(data.resultNumber)) {
    errors.push('Result number should contain only numbers');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ==================== CHART MAPPINGS ====================
const chartYears = getChartYears();

// Dynamic game slug mapping using GAMES config
export const gameSlugMapping = {};
GAMES.forEach(game => {
  chartYears.forEach(year => {
    gameSlugMapping[`${game.key.replace('_', '-')}-yearly-chart-${year}`] = game.key;
  });
});

// Dynamic parse slug data function
export function parseSlugData(slug) {
  const gameDisplayNames = {};

  GAMES.forEach(game => {
    chartYears.forEach(year => {
      gameDisplayNames[`${game.key.replace('_', '-')}-yearly-chart-${year}`] = {
        name: game.name,
        year: String(year)
      };
    });
  });

  return gameDisplayNames[slug] || null;
}

// ==================== TRANSFORM FUNCTIONS ====================
export function transformYearlyData(results) {
  const months = {
    JAN: {}, FEB: {}, MAR: {}, APR: {}, MAY: {}, JUN: {},
    JUL: {}, AUG: {}, SEP: {}, OCT: {}, NOV: {}, DEC: {}
  };

  results.forEach(result => {
    const date = new Date(result.date);
    const monthName = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();

    if (months[monthName]) {
      months[monthName][day] = result.resultNumber;
    }
  });

  return months;
}