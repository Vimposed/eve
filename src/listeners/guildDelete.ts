import { Listener } from 'discord-akairo';

export default class createEvent extends Listener {
    public constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete',
            category: 'client'
        });
    }

    public exec(): void {
        console.log('Updated user activity');
        this.client.user!.setActivity(`>help | ${this.client.guilds.cache.size} serv${this.client.guilds.cache.size > 1 ? 'ers' : 'er'}`)

        // connect to the ws server when connecting to discord.
    }
}
