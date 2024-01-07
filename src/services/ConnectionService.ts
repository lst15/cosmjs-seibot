import telebot from "telebot";
import { env } from "../env-schema";
import { cosm } from "../server";
import { StartDTO } from "../telegram/dto/StartDTO";

export class ConnectionService {
    async startClient(msg:any,telegram_bot:telebot,loading_message:any){        
        const ambient = StartDTO(msg.text);

        try {
            await cosm.setClient(ambient == "mainnet" ? env.MAINNET_RPC : env.TESTNET_RPC);
        } catch (error) {
            throw error;
        }

        return 200
    }

    async startSignOfflineClient(msg:any,telegram_bot:telebot,loading_message:any){
        try {
            await cosm.initializeSignOfflineClient();
        } catch (error) {
            throw error;
        }

        return 200;
    }

    async startSignOnlineClient(msg:any,telegram_bot:telebot,loading_message:any){
        try {
            await cosm.initializeSignOnlineClient();
        } catch (error) {
            throw error;
        }

        return 200;        
    }

}