import telebot from "telebot";
import {envUpdate} from "../../utils/env-update";
import {cosm} from "../../server";
import {cosmMessage} from "../../statics/cosmMessage";

export function setContract(telegram_bot: telebot) {
    telegram_bot.on(/^\/ca (.+)$/, async (msg, props) => {
        const address = props.match[1];
        cosmMessage.execute_swap_operations.operations[0].astro_swap.ask_asset_info.symbol.contract_addr = address;

        await telegram_bot.sendMessage(msg.from.id, "Target was defined to" + address as any, {
            replyToMessage: msg.message_id,
            parseMode: "markdown",
        });

    })
}
