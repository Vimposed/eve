import { GuildMember } from "discord.js";

export const responses = {
  INVALID_USER: 'Unable to find the specified user.',
  ACTION_SELF: (action: string) => `Sorry, but you're unable to ${action} yourself.`,
  ACTION_USER: (action: string) => `I am unable to ${action} that user. Please check that I have the correct permissions, or my role is higher than that user!`,
  INVALID_ACTION: (action: string) => `You don't have permissions to ${action} that user.`
}