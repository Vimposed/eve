import { User, Message, GuildMember, TextChannel, MessageEmbed } from 'discord.js';
import AkarioClient from '../client';
import client from '../bot';
import dayjs from 'dayjs';
import { GuildSettings, Punishment } from '../modules/types';

export default class PunishmentHandler {
    public client: AkarioClient;
    constructor() {
        this.client = client;
    }

    /*public async newPunishment(case: string, moderator: GuildMember, member: GuildMember,
                               reason?: string, time?: string): Promise<Message> {

    }
    */

   //  this.client.services.automod.punishmentHandler.punishment()

   public async punishment(moderator: GuildMember, member: GuildMember reason?: string, time?: string, msg: Message): Promise<void> {
       const settings: GuildSettings = await client.db.settings.findOne({ id: msg.guild.id });
       if(!settings) return;
       // if(settings.guild.automodChannel)
       // const channel = client.channels.cache.get(settings.guild.automodChannel) as TextChannel;
       const cases = settings.automod.infractions[member.id].cases += 1;
       const data: Punishment = {
        case: cases,

       }
   }
}
