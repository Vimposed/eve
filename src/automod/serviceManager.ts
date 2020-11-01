import AkarioClient from '../client';
import client from '../bot';
import Automod from './automod';
import PunishmentHandler from './punishment';
import Utils from '../modules/utils';
import Webhook from '../modules/webhook';

export default class ServiceManager {
    public client: AkarioClient;
    private automod: Automod;
    private punishment: PunishmentHandler;
    private webhook: Webhook;
    private utils: Utils;
    constructor() {
        this.client = client;
        this.automod = new Automod();
        this.punishment = new PunishmentHandler();
        this.utils = new Utils();
        this.webhook = new Webhook();
    }

    public getAutomod() {
        return this.automod;
    }

    public getPunishment() {
        return this.punishment;
    }

    public getWebhook() {
        return this.webhook;
    }

    public getUtils() {
        return this.utils;
    }
}

