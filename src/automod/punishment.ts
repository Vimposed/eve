import { User, Message, GuildMember, TextChannel, MessageEmbed } from 'discord.js';
import AkarioClient from '../client';
import client from '../bot';
import dayjs from 'dayjs';
import { GuildSettings, Punishment, PunishmentType } from '../modules/types';
import { prefix } from '../config';

export default class PunishmentHandler {
    public client: AkarioClient;
    constructor() {
        this.client = client;
    }

    public async punishment(moderator: User, member: GuildMember, msg: Message, type: PunishmentType, reason?: string, time?: string): Promise<void> {
       const settings: GuildSettings = await client.db.settings.findOne({ id: msg.guild.id });
       if(!settings) return;
       const channel = client.channels.cache.get(settings.guild.automodChannel) as TextChannel;
       const prefix = await client.serviceManager.getUtils().getPrefix(msg.guild.id);

       let cases = settings.automod.infractions.length;
       cases = cases++;

       const long = `No reason was provided. You're able to provide one at any given time by executing \`${prefix}reason <number> <reason>\``;

       const infractions = {
           id: cases,
           moderator: moderator.id,
           user: member.id,
           reason: reason ? reason : long,
           type: type,
           // time: `${dayjs().date()}/${dayjs().day()}/${dayjs().year()}}`
           // time: dayjs().format('HH:mm:ss')
       }

       // if(channel) {}
       return await client.db.settings.updateOne({ id: msg.guild.id }, { $push: { "automod.infractions": infractions } });
   }
}
