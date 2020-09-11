import { MongoClient, collection } from 'mongodb';

export default class Database {
  url: string;
  client: MongoClient;
  guilds: collection;
  users: collection;
  guildusers: collection;
  constructor(url: string) {
    this.url = url;
    this.client = new MongoClient(this.url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  async connect() {
    if (this.client.isConnected()) {
      return console.log(
        '[ERROR]: There is a connection already open to the database.'
      );
    }

    await this.client.connect();
    this.guilds = this.client.db('nesquik').collection('guilds');
    this.users = this.client.db('nesquik').collection('users');
    this.guildusers = this.client.db('nesquik').collection('guildusers');
    return console.log(`Connected to MongoDB`);
  }

  async addGuild(id: string) {
    const guild = await this.guilds.findOne({ id: id });
    if (!guild) {
      const obj = {
        id: id,
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
      return await this.guilds.insertOne(obj);
    }
  }

  async addUser(id: string) {
    const user = await this.users.findOne({ id: id });
    if (!user) {
      const obj = {
        id: id,
        permissions: ['default'],
        // list of possible permissions ['blacklisted', 'default', 'premium', 'support', 'developer', 'admin']
        raid: {
          global: {
            infractions: [{}],
            participated: false,
          },
        },
      };
      return await this.users.insertOne(obj);
    }
  }

  async addGuildUser(id: string, guild: string) {
    const g = await this.guildusers.findOne({ id: `${id}-${guild}` });
    if (!g) {
      const obj = {
        id: `${id}-${guild}`,
          muted: new Date(),
          raid: {
            infractions: {},
            participated: false
          }
      };
      return await this.guildusers.insertOne(obj);
    }
  }

  async initAll(id: string, guild: string) {
      await this.addGuild(guild);
      await this.addUser(id);
      await this.addGuildUser(id, guild);
      return this;
  }
}

module.exports = Database;
