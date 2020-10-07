import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import dayjs from 'dayjs';
import Utils from '../../modules/utils';
const utils: Utils = new Utils();

export default class PingCommand extends Command {
    public constructor() {
        super('test', {
            aliases: ['test'],
            category: 'general',
            description: {
                content: 'Check the latency of the bot from the Discord API',
                usage: 'ping'
            },
            clientPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS', 'SPEAK', 'MANAGE_GUILD', 'MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS'],
            ratelimit: 3
        })
    }

    private formatMessage(msg: string, other: string): string {
        return '\`' + msg + '\`' + ' ' + other;
    }

    public async exec(msg: Message) {
        // return msg.util!.send(this.formatMessage('[' + dayjs().format('HH:mm:ss') + ']', 'Automod beep boop'));
        // utils.exportConfig(msg);
        if(msg.attachments.first()) {
            utils.importConfig(msg);
        }
    }
}
