import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    public constructor() {
        super('eval', {
            aliases: ['eval'],
            args: [
                {
                    id: 'evaluated',
                    type: 'string',
                    match: 'content',
                    prompt: {
                        start: "Please provide content to evaluate"
                    }
                }
            ],
            category: 'owner',
            description: {
                content: 'Evaluate code :3',
                usage: '>eval <shit>'
            },
            ownerOnly: true
        })
    }

    public async exec(msg: Message, { evaluated }: { evaluated: string }) {
        try {
            let toEval = await eval(evaluated);
            if(typeof(toEval) !== 'string') toEval = require('util').inspect(toEval);
                return msg.util?.send(`${toEval}`);
            } catch(err) {
                return msg.util?.send(`${err}`);
            }
        }
    }
