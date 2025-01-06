const spellLetters = ["_Passive", "Q", "W", "E", "R"];

export default function getChampionSkillImages(championName: string) {
  const basePath = `/images/championSpells/${championName}`;
  return spellLetters.map((spell) => `${basePath}/${championName}${spell}.png`);
}
