
import { MessageEmbed, EmbedFieldData } from 'discord.js';
import { PunishmentType } from './types';

export default class Embed extends MessageEmbed {
  constructor(title: string | null, description?: string | null, fields?: EmbedFieldData[], color?: string) {
    super();
    if(title) super.setTitle(title);
    if(description) super.setDescription(description);
    if(fields && fields.length > 0) super.addFields(fields);
    if(color) super.setColor(color);
  }
}