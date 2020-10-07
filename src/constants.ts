export const GuildSettings = {
  id: '{id}',
  raid: {
    enabled: false,
    channel: '',
    period: '',
    flaggedRole: '',
    flaggedChannel: '',
    verify: false,
    newAccount: false
    },
    automod: {
    copypastaStrikes: 0,
    dehoist: false,
    dupeDeleteThresh: 0,
    dupeStrikeThresh: 0,
    dupeStrikes: 0,
    mentionStrikes: 0,
    maxMentions: 4,
    resolveLinks: false,
    flagMessage: '`[{time}]` <:eFail:758310391809572877> {member.tag} was flagged. Their account is no older than a week.',
    badWords: [],
    badWordsEnabled: false,
    infractions: [{}],
    },
    guild: {
    autorole: false,
    autoroles: [],
    joinLogActive: false,
    joinChannel: '',
    joinMessage: '',
    joinLogType: 'message',
    automodChannel: '',
    ignoredChannels: []
  }
}
