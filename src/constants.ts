const obj = {
  id: '',
  prefix: '++',
  blacklisted: false,
  settings: {
    logs: {
      enabled: false,
      channel: '',
      type: 'embed',
    },
    moderation: {
      enabled: false,
      channel: '',
      type: 'embed',
      cases: [{}],
      automod: {
        raid: {
          enabled: false,
          channel: '',
          period: null,
          flagged_role: [],
          flagged_channel: '',
          flagged_message: '',
          verify: false,
        },
        roles: [],
        perms: {},
      },
      muted: '',
    },
    autoRole: {
      enabled: false,
      role: [],
    },
    selfAssign: {
      enabled: false,
      roles: [],
    },
    starboard: {
      enabled: false,
      channel: '',
      starsNeeded: 4,
      reaction: '⭐',
      type: 'embed',
    },
  },
  setup: false,
  tags: {},
};