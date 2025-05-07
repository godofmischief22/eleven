const Premium = require("../Models/Premium");
const cron = require("node-cron");

module.exports =
    /**
     *
     * @param {import('../Base/Client').Savaan} client
     */
    async (client) => {
        cron.schedule("*/60 * * * * *", async () => {
            await Premium.find({ isPremium: false }, async (err, users) => {
                if (users && users.length) {
                    for (let user of users) {
                        if (Date.now() >= user.premium.expiresAt) {
                            user.isPremium = false;
                            user.premium.redeemedBy = [];
                            user.premium.redeemedAt = null;
                            user.premium.expiresAt = null;
                            user.premium.plan = null;

                            const newUser = await user
                                .save({ new: true })
                                .catch(() => {});
                            client.premiums.set(newUser.Id, newUser);
                        }
                    }
                }
            });
        });
    };
