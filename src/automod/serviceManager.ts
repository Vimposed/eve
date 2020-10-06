import AkarioClient from '../client';
import client from '../bot';
import Automod from './automod';
import PunishmentHandler from './punishment';

export default class ServiceManager {
    public client: AkarioClient;
    private automod: Automod;
    // private punishment = PunishmentHandler;
    constructor() {
        this.client = client;
        this.automod = new Automod();
        // this.punishment = new PunishmentHandler(); // TODO: fix type error
    }

    public getAutomod() {
        return this.automod;
    }

    /*public getPunishment() {
        return this.punishment;
    }*/

}

