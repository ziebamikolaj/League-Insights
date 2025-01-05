import { MatchInfo } from "src/db/schema";
import { MatchDto } from "../types/match.dto";
import { ParticipantDto } from "../types/participant.dto";

export function transformMatchData(matchData: MatchDto): MatchInfo {
  return {
    matchId: matchData.metadata.matchId,
    matchDate: new Date(matchData.info.gameStartTimestamp),
    winningTeam:
      matchData.info.teams.find((team) => team.win)?.teamId === 100
        ? "BLUE"
        : "RED",
    blueTeamGold: calculateTeamGold(matchData.info.participants, 100),
    redTeamGold: calculateTeamGold(matchData.info.participants, 200),
    blueTeamKills: calculateTeamKills(matchData.info.participants, 100),
    redTeamKills: calculateTeamKills(matchData.info.participants, 200),
    gameDuration: matchData.info.gameDuration,
  };
}

function calculateTeamGold(
  participants: ParticipantDto[],
  teamId: number,
): number {
  return participants
    .filter((p) => p.teamId === teamId)
    .reduce((sum, p) => sum + (p.goldEarned ?? 0), 0);
}

function calculateTeamKills(
  participants: ParticipantDto[],
  teamId: number,
): number {
  return participants
    .filter((p) => p.teamId === teamId)
    .reduce((sum, p) => sum + p.kills, 0);
}
