import { Listener, Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';

export default class PermissionListener extends Listener {
    constructor() {
        super('listener-permssion', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }


    public exec(msg: Message, cmd: Command, type: string, permissions: string | string[]) {
        switch(permissions) {
            case 'guildOwner':
                return msg.util?.send('<:eFail:758310391809572877> You must be the guild owner to use this command');
        }

        switch(type) {
            case 'client':
                return msg.util?.send(`<:eFail:758310391809572877> I am unable to proceed with this command because I am missing ${this.reqPermissions(msg.member, permissions as [])}`);
            case 'user':
                return msg.util?.send(`<:eFail:758310391809572877> I am unable to proceed with this command because I am missing ${this.reqPermissions(msg.member, permissions as [])}`);
             }
        }

        private reqPermissions(user: GuildMember, permissions:[]) {
            const result = user.permissions.missing(permissions)/*.map(str =>
            `\`${str.replace(/_/g, '')
                .toLowerCase()
                .replace(/\b(\w)/g, char => char.toUpperCase())}\``);
                */
        return result.length > 1 ? `${result.slice(0, -1).join(' ')} and ${result.slice(-1)[0]}` : result[0];
    }
}
