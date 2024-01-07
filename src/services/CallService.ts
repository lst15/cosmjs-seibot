import telebot from "telebot";
import { cosm } from "../server";
import { GetTokenBalanceDTO } from "../telegram/dto/GetTokenBalanceDTO";
import { GetTokenInfoDTO } from "../telegram/dto/GetTokenInfoDTO";

export class CallService {

    async getTokenBalance(msg:any,telegram_bot:telebot,loading_message:any){
        const address = GetTokenBalanceDTO(msg.text);

        const balance = await cosm.getTokenBalance(address);
        return JSON.stringify(balance)
    }

    async getBalance(msg:any,telegram_bot:telebot,loading_message:any){
        const balance = await cosm.getBalance();
        return JSON.stringify(balance)
    }

    async getTokenInfo(msg:any,telegram_bot:telebot,loading_message:any){        
        const address = GetTokenInfoDTO(msg)
        const info = await cosm.getTokenInfo(address);
        
        return info;
    }

}