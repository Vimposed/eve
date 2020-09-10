import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'general',
            description: {
                content: 'Check the latency of the bot from the Discord API',
                usage: 'ping'
            },
            ratelimit: 3
        })
    }

    public async exec(msg: Message) {
        const timestamp = await msg.util!.send("Pinging...") as Message;
        return msg.util!.send(`Pong!\nBOT: ${timestamp.createdTimestamp - msg.createdTimestamp}ms \nWS: ${this.client.ws.ping} ms`);
    }
}