import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

export default class createEvent extends Listener {
    public constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate',
            category: 'client'
        });
    }

    private goodByeShittyServers(guild: Guild) {
       if(this.client.ownerID.includes(guild.ownerID)) return;
       const server = this.client.db.guilds.findOne({ id: guild.id });
       // if(server) return;
       const bots = guild.members.cache.map(m => m.user).filter(m => m.bot).length;
       const humans = guild.members.cache.map(m => m.user).filter(m => !m.bot).length;
       // const humans = guild.memberCount;
       const humancount = humans - bots;
       if(humancount < 200 || bots > humancount) {
           this.client.users.cache.get(guild.ownerID).send(`Sorry, your server **${guild.name}** doesn't meet the minimum requirements, to use Eve.
You can find the needed requirements on our github <https://github.com/Vimposed/eve/tree/master/docs>.
If you are looking for a bot that is designed for your server, I recommend you looking for public bots here <https://discord.bots.gg>.`);
        setTimeout(() => guild.leave(), 500);
       }
    }

    public exec(guild: Guild): void {
        this.goodByeShittyServers(guild);
        console.log('Updated user activity');
        this.client.user?.setActivity(`++help | ${this.client.guilds.cache.size} serv${this.client.guilds.cache.size > 1 ? 'ers' : 'er'}`)
    }
}
