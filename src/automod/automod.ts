import { User, Message, GuildMember, TextChannel } from 'discord.js';
import AkarioClient from '../client';
import client from '../bot';
import dayjs from 'dayjs';
import { GuildSettings, GuildAutomod } from '../modules/types';

export default class Automod {
    public client: AkarioClient;
    constructor() {
        this.client = client;
    }

    public async getSettings(msg: any): Promise<GuildSettings> {
        const settings: GuildSettings = await client.db.settings.findOne({ id: msg.guild?.id });
        return settings;
    }

    public async enableRaidMode(msg: Message, reason?: string, time?: string): Promise<void> {
        const settings = await this.getSettings(msg);
        if(!settings) return;
        if(settings) await client.db.settings.updateOne({ id: msg.guild?.id }, { $set: { "raid.enabled": true }});
    }

    public async disableRaidMode(msg: Message, reason?: string, time?: string): Promise<void> {
        const settings = await this.getSettings(msg);
        if(!settings) return;
        if(settings.raid.enabled === true) await client.db.settings.updateOne({ id: msg.guild?.id }, { $set: { "raid.enabled": false }});
    }

    public async raidAccountCheck(msg: GuildMember): Promise<Message> {
        // const settings = await client.db.settings.findOne({ id: msg.guild?.id });
        const settings = await this.getSettings(msg);
        if(!settings) return;
        if(settings) {
            // default time is 6.048e+8
            if(Date.now() - msg.user.createdAt.getTime() <= 6.048e+8) {
                const autoChannel = settings.guild.joinChannel;
                const channel = client.channels.cache.get(autoChannel) as TextChannel;
                const message = settings.automod.flagMessage.replace(/{member}/g, msg.user as any)
                    .replace(/{member.name}/g, msg.user.username)
                    .replace(/{member.tag}/g, msg.user.tag)
                    .replace(/({time})/g, dayjs().format('HH:mm:ss'));
                return channel.send(message);
                // TODO: create a new punishment with punishment handler
            }
        }
    }

    public async mentionThreshold(msg: Message, user?: GuildMember): Promise<void> {
        const settings = await this.getSettings(msg);
        if(!settings) return;
        const automod = settings.automod.maxMentions;
        const userMentions = msg.mentions.users/*.filter(m => !m.bot)*/.size;
        const roleMentions = msg.mentions.roles.size;
        let maxMentions: number;
        if(userMentions) maxMentions = userMentions;
        if(userMentions && roleMentions) maxMentions = userMentions + roleMentions;
        else maxMentions = roleMentions;
        if(settings) {
            if(maxMentions >= automod) {
                // TODO: create a new punishment with punishment handler
                console.log("Mention threshhold is working baby!");
            }
        }
    }
}

