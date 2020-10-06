import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Automod from '../automod/automod';

export default class TestCommand extends Command {
    public constructor() {
        super('test', {
            aliases: ['test'],
            category: 'general',
            args: [
                {
                    id: 'content',
                    match: 'content'
                }
            ],
            description: {
                content: 'Displays this message',
                usage: 'test'
            },
            ratelimit: 3
        })
    }

    public async exec(msg: Message, args) {
    }
}

