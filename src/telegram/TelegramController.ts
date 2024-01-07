import telebot from "telebot";
import { env } from "../env-schema";
import {  TelegramRouterDeco, telegram_bot } from "../decos/telegram/TelegramRouterDeco";

import { ConfigurationService } from "../services/ConfigurationService";
import { TransactionService } from "../services/TransactionService";
import { executeBuy_buildMessage } from "./builders-response/executeSwapOperationsBuilderResponse";
import { CallService } from "../services/CallService";
import { tokeInfo_BuilderResponse } from "./builders-response/tokeInfoBuilderResponse";
import { RuleDefinedConfigDeco } from "../decos/rules/RuleDefinedConfigDeco";
import { cosm, startCosm } from "../server";
import { ConnectionService } from "../services/ConnectionService";
import { TelegramExceptionsDeco } from "../decos/telegram/TelegramExceptionsDeco";

const callService = new CallService();
const configurationService = new ConfigurationService();
const transactionService = new TransactionService();
const connectionService = new ConnectionService();

export class TelegramController{

    constructor(){
        //this.start("/start mainnet")
        telegram_bot.start()
    }

    @TelegramRouterDeco("baltoken")
    async getBalance(msg:string){
        const balance = await callService.getTokenBalance(msg)
        return balance
    }
    
    @TelegramRouterDeco("bal")
    async myBalance(msg:string){
        return await callService.getBalance(msg)
    }

    @TelegramRouterDeco("pvkey")
    setPrivateKey(msg:string){
        return configurationService.setPrivateKey(msg);
    }

    @TelegramRouterDeco("buy") 
    async executeBuy(msg:string){
        const transaction = await transactionService.executeSwapOperations(msg)
        return executeBuy_buildMessage(transaction)
    }

    @TelegramRouterDeco("bfbuy")
    async executeBfBuy(msg:string,telegram_bot:telebot,loading_message:any){
        transactionService.executeBruteForceBuy(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                "jatoba do carai",
                {parseMode:"markdown"}
              );            
        })
    }

    @TelegramRouterDeco("setrouter")
    setRouter(msg:string){
        return configurationService.setRouterSwap(msg);
    }

    @TelegramRouterDeco("tokeinfo")
    async tokenInfo(msg:string){
        const call = await callService.getTokenInfo(msg);
        return tokeInfo_BuilderResponse(call);
    }

    @TelegramRouterDeco("gas")
    gasPrice(msg:string,telegram_bot:telebot,loading_message:any){        

        configurationService.getGasPrice(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                response,
                {parseMode:"markdown"}
              );
        })
    }


    @TelegramRouterDeco("setgas")
    async setGasPrice(msg:string){
        return configurationService.setGasPrice(msg)        
    }

    @TelegramRouterDeco("router")
    async getRouter(msg:string){
        return configurationService.getRouterSwap(msg);
    }

    @TelegramRouterDeco("start")
    async start(msg:string){
        startCosm()
        const start_Client = await connectionService.startClient(msg);
        const start_signOffline = await connectionService.startSignOfflineClient(msg);
        const start_signOnline = await connectionService.startSignOnlineClient(msg);

        return 200
    }

}