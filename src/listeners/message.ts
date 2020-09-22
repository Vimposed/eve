import { Listener } from 'discord-akairo';
import { Message, Guild, GuildMember } from 'discord.js';
import Automod from '../automod/automod';

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
        console.log(`[DATABASE] || Inserted data for guild ${msg.guild!.id}`);
        if(!guild) return await this.client.db.addGuild(msg.guild!.id);
        console.log(`[DATABASE] || Inserted data for user ${msg.author.id}`);
        const users = await this.client.db.users.findOne({ id: msg.author.id });
        if(!users) return await this.client.db.addUser(msg.author.id);
        console.log(`[DATABASE] || Inserted data for user ${msg.author.id}`);
        const guilduser = await this.client.db.guildusers.findOne({ id: `${msg.author.id}-${msg.guild!.id}` });
        console.log(`[DATABASE] || Inserted data for user ${msg.author.id}`);
        if(!guilduser) return await this.client.db.addGuildUser(msg.author.id, msg.guild!.id);
        console.log(`[DATABASE] || Inserted data for user ${msg.author.id}`);
    }

    public async exec(msg: Message, guild: Guild, member: GuildMember): Promise<void> {
        const AutoMod: Automod = new Automod();
        AutoMod.enableRaidMode(guild, member);
        await this.insertGuilds(msg);

    }
}
