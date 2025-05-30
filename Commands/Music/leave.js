module.exports = new Object({
    name: "leave",
    description: "Disconnect the bot from the VC.",
    category: "Music",
    cooldown: 60,
    usage: '',
    aliases: ["destroy", "disconnect", "dc"],
    examples: ["leave", "destroy", "disconnect", "dc"],
    sub_commands: [],
    args: false,
    permissions: {
        isPremium: false,
        client: [],
        user: [],
        dev: false,
        voteRequired: false
    },
    player: { voice: true, active: false, dj: true, djPerm: null },

    /**
     * 
     * @param {import("../../../Main")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     * @param {String} prefix
     * @param {String} color
     * @param {import('kazagumo').KazagumoPlayer} dispatcher
     */

    async execute(client, message, args, prefix, color, dispatcher) {
        if (dispatcher) dispatcher.destroy();
        else return await client.util.msgReply(message, 'There is no player', color)
        return await client.util.msgReply(message, `Player is now destroyed.`, color);
    }
})