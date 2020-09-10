import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class HelpCommand extends Command {
    public constructor() {
        super('help', {
            aliases: ['help'],
            category: 'general',
            args: [
                {
                    id: 'content',
                    match: 'content'
                }
            ],
            description: {
                content: 'Displays this message',
                usage: 'help'
            },
            ratelimit: 3
        })
    }

    public async exec(msg: Message, args) {
        let commands = this.client.commandHandler.modules.map(c => c.aliases[0])
        if(!args.content || args.content === null) return msg.channel.send(this.client.commandHandler.modules.map(c => c.aliases[0]));

        if(args.content === commands[0]) {
            return msg.channel.send(this.client.commandHandler.modules.map(c => c.description.content));
        }
    }
}