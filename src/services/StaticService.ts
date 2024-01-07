import telebot from "telebot";
import { pool } from "../server";

export class StaticService {

    async bfStop(msg:any,telegram_bot:telebot,loading_message:any){
        if(msg.reply_to_message){
            if(pool.isActivedBfByPool(msg.reply_to_message.message_id)){
                pool.rmBfBuyPool(msg.reply_to_message.message_id);
                console.log(msg.reply_to_message.message_id)
                return "BF Buy foi encontrado e desativado"
            } else {
                return "BF Buy não foi encontrado"
            }
        } else {
            return "Selecione um BF Buy"
        }
    }

}