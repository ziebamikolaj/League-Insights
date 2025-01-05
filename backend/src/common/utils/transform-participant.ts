import { MatchPlayersInfo } from "src/db/schema";
import { ParticipantDto } from "../types/participant.dto";

export function transformParticipantData(
  participant: ParticipantDto,
  matchId: string,
): Omit<MatchPlayersInfo, "matchPlayerId"> {
  return {
    matchId: matchId,
    puuid: participant.puuid,
    summonerId: participant.summonerId,
    summonerName: participant.summonerName,
    team: participant.teamId === 100 ? "BLUE" : "RED",
    championId: participant.championId,
    championName: participant.championName,
    teamPosition: participant.teamPosition as
      | "TOP"
      | "JUNGLE"
      | "MIDDLE"
      | "BOTTOM"
      | "UTILITY"
      | "Invalid"
      | "",

    kills: participant.kills,
    deaths: participant.deaths,
    assists: participant.assists,
    win: participant.win,

    magicDamageDealt: participant.magicDamageDealt,
    magicDamageDealtToChampions: participant.magicDamageDealtToChampions,
    magicDamageTaken: participant.magicDamageTaken,

    physicalDamageDealt: participant.physicalDamageDealt,
    physicalDamageDealtToChampions: participant.physicalDamageDealtToChampions,
    physicalDamageTaken: participant.physicalDamageTaken,

    trueDamageDealt: participant.trueDamageDealt,
    trueDamageDealtToChampions: participant.trueDamageDealtToChampions,
    trueDamageTaken: participant.trueDamageTaken,

    damageDealtToBuildings: participant.damageDealtToBuildings,
    damageDealtToObjectives: participant.damageDealtToObjectives,
    damageDealtToTurrets: participant.damageDealtToTurrets,

    totalDamageDealt: participant.totalDamageDealt,
    totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
    totalDamageTaken: participant.totalDamageTaken,
    damageSelfMitigated: participant.damageSelfMitigated,

    champLevel: participant.champLevel,
    neutralMinionsKilled: participant.neutralMinionsKilled,
    totalMinionsKilled: participant.totalMinionsKilled,

    killParticipation:
      participant.challenges?.killParticipation?.toString() ?? null,
    skillshotsDodged: participant.challenges?.skillshotsDodged ?? null,
    skillshotsHit: participant.challenges?.skillshotsHit ?? null,
    soloKills: participant.challenges?.soloKills ?? null,
    stealthWardsPlaced: participant.stealthWardsPlaced ?? null,
    firstTurretKilled: participant.firstTurretKill ? 1 : 0,

    takedowns: participant.challenges?.takedowns ?? null,
    teamBaronKills: participant.challenges?.teamBaronKills ?? null,
    teamRiftHeraldKills: participant.challenges?.teamRiftHeraldKills ?? null,
    teamElderDragonKills: participant.challenges?.teamElderDragonKills ?? null,

    wardTakedownsBefore20M:
      participant.challenges?.wardTakedownsBefore20M ?? null,
    killingSprees: participant.killingSprees ?? null,
    longestTimeSpentLiving: participant.longestTimeSpentLiving ?? null,
    largestCriticalStrike: participant.largestCriticalStrike ?? null,
    largestKillingSpree: participant.largestKillingSpree ?? null,
    largestMultikill: participant.largestMultiKill ?? null,
    timeCcingOthers: participant.timeCCingOthers ?? null,
    spell1Casts: participant.spell1Casts ?? null,
    spell2Casts: participant.spell2Casts ?? null,
    spell3Casts: participant.spell3Casts ?? null,
    spell4Casts: participant.spell4Casts ?? null,
    totalTimeSpentDead: participant.totalTimeSpentDead ?? null,
    timePlayed: participant.timePlayed ?? null,
    controlWardsPlaced: participant.visionWardsBoughtInGame ?? null,
    killsNearEnemyTurret: participant.challenges?.killsNearEnemyTurret ?? null,
    killsUnderOwnTurret: participant.challenges?.killsUnderOwnTurret ?? null,
    laneMinionsFirst10Minutes:
      participant.challenges?.laneMinionsFirst10Minutes ?? null,
    mmaxCsAdvantageOnLaneOpponent:
      participant.challenges?.maxCsAdvantageOnLaneOpponent?.toString() ?? null,
    maxLevelLeadLaneOpponent:
      participant.challenges?.maxLevelLeadLaneOpponent ?? null,
    outnumberedKills: participant.challenges?.killsWhileOutnumbered ?? null,
    soloBaronKills: participant.challenges?.soloBaronKills ?? null,
    goldSpent: participant.goldSpent ?? null,
    goldEarned: participant.goldEarned ?? null,
    perks: participant.perks ?? null,
    styles: participant.perks?.styles ?? null,
    killAfterHiddenWithAlly:
      participant.challenges?.killsAfterHiddenWithAlly ?? null,
    gameEndedInSurrender: participant.gameEndedInSurrender ?? null,
    gameEndedInEarlySurrender: participant.gameEndedInEarlySurrender ?? null,
    enemyChampionImmobilizations:
      participant.enemyChampionImmobilizations ?? null,

    doubleKills: participant.doubleKills ?? null,
    tripleKills: participant.tripleKills ?? null,
    quadraKills: participant.quadraKills ?? null,
    pentaKills: participant.pentaKills ?? null,
  };
}
