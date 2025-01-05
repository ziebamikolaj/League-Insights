import { z } from "zod";

export const ParticipantDtoSchema = z.object({
  puuid: z.string(),
  summonerId: z.string(),
  summonerName: z.string(),
  teamId: z.number(),
  championId: z.number(),
  championName: z.string(),
  teamPosition: z.string(),

  win: z.boolean(),

  kills: z.number(),
  deaths: z.number(),
  assists: z.number(),

  magicDamageDealt: z.number(),
  magicDamageDealtToChampions: z.number(),
  magicDamageTaken: z.number(),

  physicalDamageDealt: z.number(),
  physicalDamageDealtToChampions: z.number(),
  physicalDamageTaken: z.number(),

  trueDamageDealt: z.number(),
  trueDamageDealtToChampions: z.number(),
  trueDamageTaken: z.number(),

  damageDealtToBuildings: z.number(),
  damageDealtToObjectives: z.number(),
  damageDealtToTurrets: z.number(),

  totalDamageDealt: z.number(),
  totalDamageDealtToChampions: z.number(),
  totalDamageTaken: z.number(),
  damageSelfMitigated: z.number(),

  champLevel: z.number(),
  neutralMinionsKilled: z.number(),
  totalMinionsKilled: z.number(),

  challenges: z
    .object({
      killParticipation: z.number().optional(),
      skillshotsDodged: z.number().optional(),
      skillshotsHit: z.number().optional(),
      soloKills: z.number().optional(),
      takedowns: z.number().optional(),
      teamBaronKills: z.number().optional(),
      teamRiftHeraldKills: z.number().optional(),
      teamElderDragonKills: z.number().optional(),
      wardTakedownsBefore20M: z.number().optional(),
      killsNearEnemyTurret: z.number().optional(),
      killsUnderOwnTurret: z.number().optional(),
      laneMinionsFirst10Minutes: z.number().optional(),
      maxCsAdvantageOnLaneOpponent: z.number().optional(),
      maxLevelLeadLaneOpponent: z.number().optional(),
      killsWhileOutnumbered: z.number().optional(),
      soloBaronKills: z.number().optional(),
      killsAfterHiddenWithAlly: z.number().optional(),
    })
    .optional(),

  killingSprees: z.number().optional(),
  longestTimeSpentLiving: z.number().optional(),
  largestCriticalStrike: z.number().optional(),
  largestKillingSpree: z.number().optional(),
  largestMultiKill: z.number().optional(),
  timeCCingOthers: z.number().optional(),
  spell1Casts: z.number().optional(),
  spell2Casts: z.number().optional(),
  spell3Casts: z.number().optional(),
  spell4Casts: z.number().optional(),
  totalTimeSpentDead: z.number().optional(),
  timePlayed: z.number().optional(),
  visionWardsBoughtInGame: z.number().optional(),
  stealthWardsPlaced: z.number().optional(),
  firstTurretKill: z.boolean().optional(),
  gameEndedInSurrender: z.boolean().optional(),
  gameEndedInEarlySurrender: z.boolean().optional(),
  enemyChampionImmobilizations: z.number().optional(),
  goldSpent: z.number().optional(),
  goldEarned: z.number().optional(),
  perks: z
    .object({
      styles: z.any().optional(),
    })
    .optional(),

  doubleKills: z.number().optional(),
  tripleKills: z.number().optional(),
  quadraKills: z.number().optional(),
  pentaKills: z.number().optional(),

  totalHeal: z.number(),
  totalHealsOnTeammates: z.number(),
  visionScore: z.number(),
  wardsPlaced: z.number(),
  wardsKilled: z.number(),

  item0: z.number(),
  item1: z.number(),
  item2: z.number(),
  item3: z.number(),
  item4: z.number(),
  item5: z.number(),
  item6: z.number(),
});

export type ParticipantDto = z.infer<typeof ParticipantDtoSchema>;
