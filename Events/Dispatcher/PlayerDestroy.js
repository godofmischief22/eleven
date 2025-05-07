const db = require("../../Models/247");
const db2 = require("../../Models/247");
module.exports = new Object({
    name: "playerDestroy",
    /**
     * @param {import("../../Main")} client
     * @param {import("kazagumo").KazagumoPlayer} dispatcher
     */
    async execute(client, dispatcher) {
        console.log("playerDestroy");
        const guild = client.guilds.cache.get(dispatcher.guildId);
        if (!guild) return;
        const maindata = await db2.find();
        for (const data of maindata) {
            const index = maindata.indexOf(data);
            setTimeout(async () => {
                const text = client.channels.cache.get(data.textChannel);
                const guild = client.guilds.cache.get(data._id);
                const voice = client.channels.cache.get(data.voiceChannel);
                if (!guild || !text || !voice) return data.delete();
                const player = client.dispatcher.createPlayer({
                    guildId: guild.id,
                    textId: text.id,
                    voiceId: voice.id,
                    deaf: true,
                    shardId: guild.shardId,
                });
            }),
                index * 100;
        }
        const color = client.color ? client.color : "#f50a83";
        const data = await db.findOne({ _id: guild.id });
        if (!data) return;
        const channel = guild.channels.cache.get(data.channel);
        if (!channel) return;
        let message;
        try {
            message = await channel.messages.fetch(data.message, {
                cache: true,
            });
        } catch (error) {}
        if (!message) return;

        const embed1 = client
            .embed()
            .setColor(color)
            .setTitle("Nothing playing right now")
            .setDescription(
                `• [Invite](${client.config.links.invite}) • [Vote](${client.config.links.vote}) • [Support Server](${client.config.links.support})`,
            )
            .setFooter({
                text: `Thanks for using ${client.user.username}`,
                iconURL: client.user.displayAvatarURL(),
            })
            .setImage(client.config.links.bg);
        const pausebut = client
            .button()
            .setCustomId("pause_but")
            .setEmoji("<:supremepause:1366015098673561692>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const lowvolumebut = client
            .button()
            .setCustomId("lowvolume_but")
            .setEmoji("<:stolen_emoji:1366010164272037981>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const highvolumebut = client
            .button()
            .setCustomId("highvolume_but")
            .setEmoji("<:stolen_emoji:1366010164272037981>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const previousbut = client
            .button()
            .setCustomId("previous_but")
            .setEmoji("<:supremeback:1366015538106728551>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const skipbut = client
            .button()
            .setCustomId("skipbut_but")
            .setEmoji("<:stolen_emoji:1366010164272037981>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const rewindbut = client
            .button()
            .setCustomId("rewindbut_but")
            .setEmoji("<:supremereplay:1366015723394306070>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const forwardbut = client
            .button()
            .setCustomId("forward_but")
            .setEmoji("<:supremenext:1366015854256590849>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const autoplaybut = client
            .button()
            .setCustomId("autoplay_but")
            .setEmoji("<:stolen_emoji:1366010164272037981>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const loopmodesbut = client
            .button()
            .setCustomId("loopmodesbut_but")
            .setEmoji("<:supremeloop:1366016024528289893>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);
        const stopbut = client
            .button()
            .setCustomId("stop_but")
            .setEmoji("<:stolen_emoji:1366010164272037981>")
            .setStyle(client.config.button.grey)
            .setDisabled(true);

        const row1 = client
            .row()
            .addComponents([
                lowvolumebut,
                previousbut,
                pausebut,
                skipbut,
                highvolumebut,
            ]);
        const row2 = client
            .row()
            .addComponents([
                rewindbut,
                autoplaybut,
                stopbut,
                loopmodesbut,
                forwardbut,
            ]);

        await message
            .edit({
                content:
                    "__**Join a voice channel and queue songs by name/url**__\n\n",
                embeds: [embed1],
                components: [row1, row2],
            })
            .catch(() => {});
    },
});
