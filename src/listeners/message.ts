import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class MessageEvent extends Listener {
    public constructor() {
        super('message', {
            emitter: 'client',
            event: 'message',
            category: 'client'
        });
    }

    public async exec(msg: Message): Promise<void> {
        if(msg.author.bot) return;
        const guild = await this.client.db.guilds.findOne({ id: msg.guild!.id });
        if(!guild) return await this.client.db.addGuild(msg.guild!.id);
        const users = await this.client.db.users.findOne({ id: msg.author.id });
        if(!users) return await this.client.db.addUser(msg.author.id);
        const guilduser = await this.client.db.guildusers.findOne({ id: `${msg.author.id}-${msg.guild!.id}` });
        if(!guilduser) return await this.client.db.addGuildUser(msg.author.id, msg.guild!.id); 
    }
}
