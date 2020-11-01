import { User, Message, GuildMember, TextChannel, MessageEmbed } from 'discord.js';

export type GuildSettings = {
_id: string,
id: string,
raid: {
  enabled: boolean,
  channel: string,
  period: string,
  flaggedRole: string,
  flaggedChannel: string,
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

export interface GuildAutomod {
  infractions: any;
  copypastaStrikes: number;
  dehoist: boolean;
  dupeDeleteThresh: number;
  dupeStrikes: number;
  dupeStrikeThresh: number;
  mentionStrikes: number;
  maxMentions: number;
  resolveLinks: boolean;
  flagMessage: string;
  badWords: string[];
  badWordsEnabled: boolean;
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

export type PunishmentType = 'kick' | 'ban' | 'mute' | 'unmute' | 'unban' | 'warn';
export type Punishment = {
  case: number,
  moderator: User,
  member: GuildMember,
  message: Message,
  reason?: string,
  time?: string
  type: PunishmentType
}