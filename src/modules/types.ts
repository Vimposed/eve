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
  infractions: any,
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
  automodChannel: string,
  ignoredChannels: string[]
  }
}

export type GuildType = {
  _id: string,
  id: string,
  prefix: string,
  blacklisted: boolean
}

export type GuildUser = {
  _id: string,
  id: string,
  muted: string,
  automod: {
    infractions: [{}],
  },
  raid: {
    participated: boolean
  }
}

export type BotUser = {
 _id: string,
 id: string,
 permissions: string[],
 automod: {
  infractions: [{}],
 },
 raid: {
  participated: boolean
 }
}

export type Punishment = {
  case: number,
  moderator: string,
  member: string,
  reason?: string,
  time?: string
}

