import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';

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
                    match: 'rest'
                }
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            ratelimit: 2
        })
    }

    public async exec(msg: Message, { user }: { user: GuildMember }) {
        if(!user) return msg.channel.send('Invalid arguments were provided: Please specify a user.');
        if(user) return msg.util?.send(`${user}`);
    }
}
