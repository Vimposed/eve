import { Listener } from 'discord-akairo';
import { Message, Guild, GuildMember } from 'discord.js';
import Automod from '../automod/automod';
const AutoMod: Automod = new Automod();

export default class MessageEvent extends Listener {
    public constructor() {
        super('message', {
            emitter: 'client',
            event: 'message',
            category: 'client'
        });
    }

    private async insertGuilds(msg: Message) {
        if(msg.author.bot) return;
        const guild = await this.client.db.guilds.findOne({ id: msg.guild!.id });
        if(!guild) {
            console.log(`[DATABASE] || Inserted data for guild ${msg.guild!.id}`);
            return await this.client.db.addGuild(msg.guild!.id);
        }
        const users = await this.client.db.users.findOne({ id: msg.author.id });
        if(!users) {
            console.log(`[DATABASE] || Inserted data for user ${msg.author.id}`);
            return await this.client.db.addUser(msg.author.id);
        }
        const guilduser = await this.client.db.guildusers.findOne({ id: `${msg.author.id}-${msg.guild!.id}` });
        if(!guilduser) {
            console.log(`[DATABASE] || Inserted data for user ${msg.author.id}`);
            return await this.client.db.addGuildUser(msg.author.id, msg.guild!.id);
        }
    }

    public async exec(msg: Message): Promise<void | Message> {
        await this.insertGuilds(msg);
        const settings = await this.client.db.settings.findOne({ id: msg.guild!.id });
        /*
        if(this.client.service.automod.enabled) {

        }
        */
        // if(settings.guild.ignoredChannels.includes(msg.channel.id)) return;
    }
}

