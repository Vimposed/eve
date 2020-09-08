import { Listener } from 'discord-akairo';

export default class ReadyEvent extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    public exec(): void {
        console.log(`${this.client.user!.tag} is online and ready in ${this.client.guilds.cache.size} serv${this.client.guilds.cache.size > 1 ? 'ers' : 'er'}`);
        this.client.user!.setActivity(`??help | ${this.client.guilds.cache.size} serv${this.client.guilds.cache.size > 1 ? 'ers' : 'er'}`)
        
        // connect to the ws server when connecting to discord.
    }
}
