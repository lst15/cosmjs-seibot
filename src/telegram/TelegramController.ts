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
import { StaticService } from "../services/StaticService";

const callService = new CallService();
const configurationService = new ConfigurationService();
const transactionService = new TransactionService();
const connectionService = new ConnectionService();
const staticService = new StaticService();

export class TelegramController{

    constructor(){
        //this.start("/start mainnet")
        telegram_bot.start()
    }

    @TelegramRouterDeco("baltoken")
    async getBalance(msg:any,telegram_bot:telebot,loading_message:any){
        callService.getTokenBalance(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                response,
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }
    
    @TelegramRouterDeco("bal")
    async myBalance(msg:any,telegram_bot:telebot,loading_message:any){
        callService.getBalance(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                response,
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }

    @TelegramRouterDeco("pvkey")
    setPrivateKey(msg:any,telegram_bot:telebot,loading_message:any){
        configurationService.setPrivateKey(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                "OK",
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }

    @TelegramRouterDeco("buy") 
    async executeBuy(msg:any,telegram_bot:telebot,loading_message:any){
        transactionService.executeSwapOperations(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                executeBuy_buildMessage(response),
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)

    }

    @TelegramRouterDeco("bfbuy")
    async executeBfBuy(msg:any,telegram_bot:telebot,loading_message:any){
        transactionService.executeBruteForceBuy(msg,telegram_bot,loading_message).then((response) => {}).catch(console.log)
    }

    @TelegramRouterDeco("setrouter")
    setRouter(msg:any,telegram_bot:telebot,loading_message:any){
        configurationService.setRouterSwap(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                "OK",
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }

    @TelegramRouterDeco("tokeinfo")
    async tokenInfo(msg:any,telegram_bot:telebot,loading_message:any){
        callService.getTokenInfo(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                tokeInfo_BuilderResponse(response),
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)

    }

    @TelegramRouterDeco("gas")
    gasPrice(msg:any,telegram_bot:telebot,loading_message:any){        

        configurationService.getGasPrice(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                response,
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }


    @TelegramRouterDeco("setgas")
    async setGasPrice(msg:any,telegram_bot:telebot,loading_message:any){
        configurationService.setGasPrice(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                "OK",
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }

    @TelegramRouterDeco("router")
    async getRouter(msg:any,telegram_bot:telebot,loading_message:any){
        configurationService.getRouterSwap(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                response,
                {parseMode:"markdown"}
              ); 
        }).catch(console.log)
    }

    @TelegramRouterDeco("start")
    async start(msg:any,telegram_bot:telebot,loading_message:any){
        startCosm()
        const start_Client = await connectionService.startClient(msg,telegram_bot,loading_message);
        const start_signOffline = await connectionService.startSignOfflineClient(msg,telegram_bot,loading_message);
        const start_signOnline = await connectionService.startSignOnlineClient(msg,telegram_bot,loading_message);

        telegram_bot.editMessageText(
            {
              chatId: loading_message.chat.id,
              messageId: loading_message.message_id,
            },
            "Conectado",
            {parseMode:"markdown"}
          );    
    }

    @TelegramRouterDeco("bfstop")
    async bfStop(msg:any,telegram_bot:telebot,loading_message:any){
        staticService.bfStop(msg,telegram_bot,loading_message).then((response) => {
            telegram_bot.editMessageText(
                {
                  chatId: loading_message.chat.id,
                  messageId: loading_message.message_id,
                },
                response,
                {parseMode:"markdown"}
              );            
        }).catch(console.log)
    }
}