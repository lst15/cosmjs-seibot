import telebot from "telebot";
import {envUpdate} from "../../utils/env-update";

export function setPrivateKey(telegram_bot: telebot) {
    telegram_bot.on(/^\/pvkey (.+)$/, async (msg, props) => {
        const privateKey = props.match[1];
        envUpdate([{
            key:"PRIVATE_KEY",
            value:privateKey
        }])

        await telegram_bot.sendMessage(msg.from.id, "OK !!" as any, {
            replyToMessage: msg.message_id,
            parseMode: "markdown",
        });

    })
}
