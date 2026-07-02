// Website of the API used: https://deadlock-api.com/
const BASE_URL = "https://api.deadlock-api.com";

export async function getHero(heroName) {
  const res = await fetch(`${BASE_URL}/v1/assets/heroes/by-name/${heroName}`);
  if (!res.ok) throw new Error(`Could not find ${heroName}`);
  return res.json();
}

export async function getAllHeroes() {
  const res = await fetch(`${BASE_URL}/v1/assets/heroes`);
  if (!res.ok) throw new Error(`Could not get heroes`);
  return res.json();
}

export async function getPlayerHistory(accountId) {
  const res = await fetch(`${BASE_URL}/v1/players/${accountId}/match-history`);
  if (!res.ok) throw new Error(`Could not get player history ${accountId}`);
  return res.json();
}
