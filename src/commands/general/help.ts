import { name } from 'dayjs/locale/*';
import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
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
        /*let commands = this.client.commandHandler.modules.map(c => c.aliases[0])
        if(!args.content || args.content === null) return msg.channel.send(this.client.commandHandler.modules.map(c => c.aliases[0]));

        if(args.content === commands[0]) {
            return msg.channel.send(this.client.commandHandler.modules.map(c => c.description.content));
        }
        */

        //TODO: make this a for loop lmao
        // ! Probably something like -> for(const category of this.client.commandHandler.categories) {} 
        // ! Then filter it and Object.values()

        const embed = new MessageEmbed()
        .setDescription('For a better documentated help command please click [here](https://google.com)')
        .addField('General', this.client.commandHandler.modules.filter(c => c.categoryID === 'general').map(c => `\`${c.aliases[0]}\``).join(', '))
        .addField('Moderation', this.client.commandHandler.modules.filter(c => c.categoryID === 'moderation').map(c => `\`${c.aliases[0]}\``).join(', '))
        .setColor('#6285F5')
        .setFooter('For additional info run >help [command]')

       const commands = this.client.commandHandler.modules.filter(c => !c.ownerOnly).map(c => c.aliases[0]);
       if(!args.content || args.content === null) return msg.channel.send({ embed });

       if(commands.includes(args.content)) {
           const embed = new MessageEmbed()
           .addField('Aliases', this.client.commandHandler.modules.filter(c => c.aliases[0] === args.content).map(c => `\`${c.aliases}\``))
           .addField('Description', this.client.commandHandler.modules.filter(c => c.aliases[0] === args.content).map(c => `\`${c.description.content}\``))
           .addField('Usage', this.client.commandHandler.modules.filter(c => c.aliases[0] === args.content).map(c => `\`${c.description.usage}\``))
           .addField('Ratelimit', this.client.commandHandler.modules.filter(c => c.aliases[0] === args.content).map(c => `\`${c.ratelimit}\``))
           .setColor('#6285F5')
           return msg.channel.send({ embed });
       }

    }
}
