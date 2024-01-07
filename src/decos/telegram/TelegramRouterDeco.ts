// decorator.ts

import telebot from "telebot";
import { env } from "../../env-schema";

export const telegram_bot = new telebot({
  token: env.TG_BOT_TOKEN,
});


telegram_bot.on('sticker', (msg) => {
  return telegram_bot.sendMessage(
    msg.from.id,
    "Executando ação, aguarde! (aguarde esta mensagem ser atualizada)" as any,
    { replyToMessage: msg.message_id }
    
  );});

export function TelegramRouterDeco(command: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (msg: any) {
      return await originalMethod.call(this,msg);
    };

    telegram_bot.on(`/${command}`, async (msg, props) => {
      console.log(msg.text)
      let response;

      const loading_message = await telegram_bot.sendMessage(
        msg.from.id,
        "Executando ação, aguarde! (aguarde esta mensagem ser atualizada)" as any,
        { replyToMessage: msg.message_id }
      );

      response = await descriptor.value.call(null, msg.text);        

      await telegram_bot.editMessageText(
        {
          chatId: loading_message.chat.id,
          messageId: loading_message.message_id,
        },
        response,
        {parseMode:"markdown"}
      );

      return response;
    });
  };
}