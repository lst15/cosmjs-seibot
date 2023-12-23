import telebot from "telebot";
import {envUpdate} from "../../utils/env-update";
import {cosm} from "../../server";

export function getBalance(telegram_bot: telebot) {
    telegram_bot.on("/bal", async (msg, props) => {

        const {denom, amount} = await cosm.getBalance()
        const message = "balance is `" + amount + "` SEI"
        console.log(cosm.getOnlineSignClient())
        await telegram_bot.sendMessage(msg.from.id, message as any, {
            replyToMessage: msg.message_id,
            parseMode: "markdown",
        });

    })
}
