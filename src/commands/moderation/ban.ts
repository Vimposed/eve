import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class BanCommand extends Command {
    public constructor() {
        super('ban', {
            aliases: ['ban'],
            category: 'moderation',
            description: {
                content: 'Someone acting up in your server? Just ban them 4Head',
                usage: 'ban'
            },
            args: [
                {
                    id: 'user',
                    type: 'member',
                    match: 'rest'
                }
            ],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            ratelimit: 2
        })
    }

    public async exec(msg: Message, { user }) {
        if(!user) return msg.channel.send('Invalid arguments were provided: Please specify a user.');

    }
}
