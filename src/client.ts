import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { User, Message } from 'discord.js';
// import * as config from './config';
import { prefix, owners, token, mongo } from './config';
import { join } from 'path';
import Database from './modules/database';
import { collection } from 'mongodb';
import ServiceManager from './automod/serviceManager';

    declare module 'discord-akairo' {
        interface AkairoClient {
            commandHandler: CommandHandler;
            listenerHandler: ListenerHandler;
            db: Database;
            serviceHandler: ServiceManager;
        }
    }

    interface options {
        token: string;
        owners: string[] | string;
    }

    export default class Client extends AkairoClient {
        public db!: Database;
        public serviceHandler!: ServiceManager;
        public data: collection;
        public config: options;
        public listenerHandler: ListenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, './', 'listeners')
        });

        public async getPrefix(id) {
            let g = await this.db.guilds.findOne({ id: id });
            if(!g) return prefix;
            return g.prefix;
        }

        public commandHandler: CommandHandler = new CommandHandler(this, {
            directory: join(__dirname, './', 'commands'),
            prefix: (msg: Message) => this.getPrefix(msg.guild!.id),
            allowMention: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            defaultCooldown: 6e4,
            handleEdits: true,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command`,
                    modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command`,
                    timeout: 'The command has been canceled due to command timeout',
                    ended: 'You have exceeded the maximum amount of retries, command has now been canceled',
                    retries: 3,
                    time: 3e4
                },
                otherwise: ''
            },
            ignorePermissions: owners
        });

        public constructor(config: options) {
            super({
                ownerID: config.owners
            });
            this.config = config;
        }

        private async _init(): Promise<void> {
            this.commandHandler.useListenerHandler(this.listenerHandler);
            this.listenerHandler.setEmitters({
                commandHandler: this.commandHandler,
                listenerHandler: this.listenerHandler,
                process
            });

            this.commandHandler.loadAll();
            this.listenerHandler.loadAll();
            this.serviceHandler = new ServiceManager();
            this.db = new Database(mongo);
            await this.db.connect();
        }

        public async start(): Promise<string> {
            await this._init();
            return this.login(this.config.token);
        }
    }

