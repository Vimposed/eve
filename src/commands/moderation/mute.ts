import { Command } from 'discord-akairo';
import { Message, GuildMember, TextChannel } from 'discord.js';
import { Punishment, GuildSettings } from '../../modules/types'

export default class BanCommand extends Command {
    public constructor() {
        super('mute', {
            aliases: ['mute'],
            category: 'moderation',
            description: {
                content: 'Someone acting up in your server, but you don\'t want to get rid of them forever? Just kick them. 4Head',
                usage: 'kick <member> [reason]'
            },
            args: [
                {
                    id: 'user',
                    type: 'member',
                    // match: 'rest'
                },
                {
                    id: "reason",
                    match: "rest",
                    type: "string",
                },
            ],
            clientPermissions: ["MANAGE_ROLES"],
            userPermissions: ["MANAGE_MESSAGES"],
            ratelimit: 2
        })
    }

    public async exec(msg: Message, { user, reason }: { user: GuildMember, reason?: string }) {
        const settings: GuildSettings = await this.client.db.settings.findOne({ id: msg.guild.id });
        if(!user) return msg.channel.send('Invalid arguments were provided: Please specify a user.');
        return this.client.serviceManager.getPunishment().punishment(msg.author, user, msg, 'mute', reason);
    }
}
