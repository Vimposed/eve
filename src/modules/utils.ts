import { User, Message, GuildMember, TextChannel, MessageAttachment } from 'discord.js';
import AkarioClient from '../client';
import client from '../bot';
import fs from 'fs';
import { GuildSettings } from './types';
import { prefix } from '../config';

export default class Utils {
    public client: AkarioClient;
    constructor() {
        this.client = client;
    }

    public async exportConfig(msg: Message): Promise<void> {
      const settings: GuildSettings = await client.db.settings.findOne({ id: msg.guild.id });
      delete settings._id;
      const data = JSON.stringify(settings);
      const file = fs.writeFileSync('config.json', data);
      const channel = client.channels.cache.get(msg.channel.id) as TextChannel;
      channel.send({ files: ['config.json']});
      // fs.unlinkSync(file);
    }

    public async importConfig(msg: Message): Promise<void> {
      const conf = msg.attachments.first();
      const file = fs.readFileSync(Buffer.from(conf));
      console.log(file)
    }

    public async getPrefix(id) {
      const g = await client.db.guilds.findOne({ id: id });
      if(!g) return prefix;
      return g.prefix;
    }
}
