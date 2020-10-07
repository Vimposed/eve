import { Listener } from 'discord-akairo';
import { Message, GuildMember, Guild, User, TextChannel } from 'discord.js';

export default class Event extends Listener {
    public constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client'
        });
    }

    public async exec(msg: GuildMember, server: Guild, user: User) {
        const settings = await this.client.db.settings.findOne({ id: msg.guild.id });
        const guild = settings.guild;
        const channel = guild.joinChannel;
        const channels = this.client.channels.cache.get(channel) as TextChannel;

        if(settings.raid.enabled === true) {
             if(settings.raid.newAccount === true) await this.client.serviceManager.getAutomod().raidAccountCheck(msg);
        }

        if(guild.autorole === true) {
            return msg.roles.add(settings.guild.autoroles);
        }

        if(guild.joinLogActive === true) {
            switch(guild.joinLogType) {
                case 'embed':
                    // const embed = new MessageEmbed()
                    const embed = {
                        title: 'test'
                    }
                    if(channel) return channels.send({ embed });
                case 'message':
                    let message = guild.joinMessage.replace(/{member}/g, msg.user)
                    .replace(/{member.name}/g, msg.user.username)
                    .replace(/{member.tag}/g, msg.user.tag)
                    .replace(/{guild}/g, server)
                    .replace(/{guild.id}/g, server.id)
                    .replace(/{guild.count}/g, server.members.cache.filter((m: any) => !m.bot).size);
                    if(channel) return channels.send(message);
            }
        }
    }
}
