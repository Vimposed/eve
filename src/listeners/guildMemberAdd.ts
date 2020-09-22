import { Listener } from 'discord-akairo';
import { Message, GuildMember, Guild } from 'discord.js';

export default class Event extends Listener {
    public constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client'
        });
    }

    public async exec(msg: GuildMember, server: Guild) {
        const settings = await this.client.db.settings.findOne({ id: msg.guild.id });
        const guild = settings.guild;
        const channel = guild.joinChannel;
        const channels = this.client.channels.cache;

        if(guild.autorole === true) {
            return msg.roles.add(settings.guild.autoroles);
        }

        if(guild.joinLogActive === true && guild.joinChannel) {
            switch(guild.joinLogType) {
                case 'embed':
                    // const embed = new MessageEmbed()
                    const embed = {
                        title: 'test'
                    }
                    // @ts-ignore
                    return channels.get(channel).send(embed);
                case 'message':
                    let message = guild.joinMessage.replace('{member}', msg.user)
                    .replace('{member.name}', msg.user.username)
                    .replace('{member.tag}', msg.user.tag)
                    .replace('{guild}', server);
                    // .replace('{guild.id}', server.id);
                    // .replace('{guild.count}', server.members.cache.filter(m => m !== m.bot).size);
                    // @ts-ignore
                    return channels.get(channel).send(message);
            }
        }
    }
}
