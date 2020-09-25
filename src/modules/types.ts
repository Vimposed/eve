export type GuildSettings = {
_id: string,
id: string,
raid: {
  enabled: boolean,
  channel: string,
  period: string,
  flagged_role: string,
  flagged_channel: string,
  verify: boolean,
  newAccount: boolean
},
automod: {
  copypastaStrikes: number,
  dehoist: boolean,
  dupeDeleteThresh: number,
  dupeStrikes: number,
  dupeStrikeThresh: number,
  mentionStrikes: number,
  maxMentions: number,
  resolveLinks: boolean,
  flagMessage: string,
  badWords: string[],
  badWordsEnabled: boolean
},
guild: {
  automod: false,
  autoroles: string[],
  joinLogActive: string,
  joinChannel: string,
  joinLogType: string,
  ignoredChannels: string[]
  }
}

