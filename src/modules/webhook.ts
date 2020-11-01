import AkarioClient from '../client'
import client from '../bot';
import { TextChannel, Guild } from 'discord.js';
import Embed from './embed';

export default class Webhook {
    public client: AkarioClient
    constructor() {
        this.client = client;
    }

    public create(channel: TextChannel, name: string, avatar: string, reason: string) {
      channel.createWebhook(name, {
        avatar: avatar,
        reason: reason ? reason : 'Webhook created for logging.'
      });
    }

    public async send(msg: Guild, embed: any) {
      const webhooks = await msg.fetchWebhooks();
      const webhook = webhooks.first();
      await webhook.send({
        embeds: [embed]
      });
    }

}