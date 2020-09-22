import { User, Message } from 'discord.js';
import AkarioClient from '../client';
import client from '../bot';

export default class Automod {
    public client: AkarioClient;
    constructor() {
        this.client = client;
    }

    public async enableRaidMode(msg: Message, reason?: string, time?: string): Promise<void> {
        const settings = await client.db.settings.findOne({ id: msg.guild!.id });
        if(!settings) return;
        if(settings) await client.db.settings.updateOne({ id: msg.guild!.id }, { $set: { "raid.enabled": true }});
        console.log('[AUTOMOD RAIDMODE] || ENABLED');
    }

    public async raidAccountCheck(msg: Message, user: User): Promise<void> {
        const settings = await client.db.settings.findOne({ id: msg.guild!.id });
        if(!settings) return;
        if(settings) {
            // default time is 604800
            if(user.createdAt.getTime() <= 604800) {

            }
        }
    }
}
