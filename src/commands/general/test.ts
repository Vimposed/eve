import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import dayjs from 'dayjs';
import Utils from '../../modules/utils';
import Embed from '../../modules/embed';
const utils: Utils = new Utils();

export default class PingCommand extends Command {
    public constructor() {
        super('test', {
            aliases: ['test'],
            category: 'general',
            description: {
                content: 'This is what I use to test all of my WIP commands.',
                usage: 'test!!'
            },
            clientPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS', 'SPEAK', 'MANAGE_GUILD', 'MANAGE_ROLES', 'EMBED_LINKS'],
            userPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS'],
            ratelimit: 3
        })
    }

    public async exec(msg: Message) {
        // utils.exportConfig(msg);
        // if(msg.attachments.first()) {
        //     utils.importConfig(msg);
        // }
        const embed = new Embed('hello', 'hey').setAuthor('sir', 'https://file.impd.cc/b9fc79.png');
        this.client.serviceManager.getWebhook().send(msg.guild, embed);
    }
}
