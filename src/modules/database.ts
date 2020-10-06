import { Collection } from 'discord.js';
import { MongoClient, collection } from 'mongodb';

export default class Database {
  private url: string;
  public client: MongoClient;
  public guilds: collection;
  public users: collection;
  public guildusers: collection;
  public settings: collection;
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
    this.guilds = this.client.db('eve').collection('guilds');
    this.users = this.client.db('eve').collection('users');
    this.guildusers = this.client.db('eve').collection('guildusers');
    this.settings = this.client.db('eve').collection('settings');
    return console.log(`Connected to MongoDB`);
  }

  async addSettings(id: string) {
    const settings = await this.settings.findOne({ id: id });
    if(!settings) {
      const obj = {
        id: id,
        raid: {
          enabled: false,
          channel: '',
          period: '',
          flagged_role: '',
          flagged_channel: '',
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
      return this.settings.insertOne(obj);
    }
  }

  async addGuild(id: string) {
    const guild = await this.guilds.findOne({ id: id });
    if (!guild) {
      const obj = {
        id: id,
        prefix: '++',
        blacklisted: false
      };
      await this.addSettings(id);
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
          muted: new Date().toISOString(),
          automod: {
            infractions: [{}],
          },
          raid: {
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

