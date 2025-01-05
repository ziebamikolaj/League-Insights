import { PlayerInfo, RegionEnumType } from "src/db/schema";
import { PlayerAccountInfo } from "src/common/types/player-account-info";
import { PlayerRankInfo } from "src/common/types/player-ranks-info";

export function transformPlayerData(
  summonerId: string,
  playerRanksInfo: PlayerRankInfo[],
  playerAccountInfo: PlayerAccountInfo,
  region: string,
): PlayerInfo {
  const transformedPlayer: PlayerInfo = {
    summonerId: summonerId,
    puuid: playerAccountInfo.puuid,
    region: region as RegionEnumType,
    profileIconId: playerAccountInfo.profileIconId,
    summonerLevel: playerAccountInfo.summonerLevel,
    analyzedOn: new Date(),
    // Initialize queue properties to null
    soloQueueTier: null,
    soloQueueRank: null,
    soloQueueLeaguePoints: null,
    soloQueueWins: null,
    soloQueueLoses: null,
    soloQueueInActive: null,
    soloQueueFreshBlood: null,
    soloQueueHotStreak: null,
    flexQueueTier: null,
    flexQueueRank: null,
    flexQueueLeaguePoints: null,
    flexQueueWins: null,
    flexQueueLoses: null,
    flexQueueInActive: null,
    flexQueueFreshBlood: null,
    flexQueueHotStreak: null,
  };

  playerRanksInfo.forEach((queue) => {
    const isSoloQueue = queue.queueType === "RANKED_SOLO_5x5";
    const isFlexQueue = queue.queueType === "RANKED_FLEX_SR";
    if (isSoloQueue) {
      transformedPlayer.soloQueueTier = queue.tier;
      transformedPlayer.soloQueueRank = queue.rank;
      transformedPlayer.soloQueueLeaguePoints = queue.leaguePoints;
      transformedPlayer.soloQueueWins = queue.wins;
      transformedPlayer.soloQueueLoses = queue.losses;
      transformedPlayer.soloQueueInActive = queue.inactive;
      transformedPlayer.soloQueueFreshBlood = queue.freshBlood;
      transformedPlayer.soloQueueHotStreak = queue.hotStreak;
    }
    if (isFlexQueue) {
      transformedPlayer.flexQueueTier = queue.tier;
      transformedPlayer.flexQueueRank = queue.rank;
      transformedPlayer.flexQueueLeaguePoints = queue.leaguePoints;
      transformedPlayer.flexQueueWins = queue.wins;
      transformedPlayer.flexQueueLoses = queue.losses;
      transformedPlayer.flexQueueInActive = queue.inactive;
      transformedPlayer.flexQueueFreshBlood = queue.freshBlood;
      transformedPlayer.flexQueueHotStreak = queue.hotStreak;
    }
  });

  return transformedPlayer;
}
