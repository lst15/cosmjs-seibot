import telebot from "telebot";
import { env } from "../env-schema";
import { CommandRouter, telegram_bot } from "./CommandRouter";

import { ConfigurationService } from "../services/ConfigurationService";
import { TransactionService } from "../services/TransactionService";
import { executeBuy_buildMessage } from "./builders-response/executeSwapOperationsBuilderResponse";
import { CallService } from "../services/CallService";
import { tokeInfo_BuilderResponse } from "./builders-response/tokeInfoBuilderResponse";
import { NeedsDefinedConfig } from "../rules/NeedsDefinedConfig";
import { cosm } from "../server";
import { ConnectionService } from "../services/ConnectionService";

const callService = new CallService();
const configurationService = new ConfigurationService();
const transactionService = new TransactionService();
const connectionService = new ConnectionService();

export class TelegramController{

    constructor(){
        telegram_bot.start()
    }

    @CommandRouter("baltoken")
    async getBalance(msg:string){
        const balance = await callService.getTokenBalance(msg)
        return balance
    }
    
    @CommandRouter("bal")
    @NeedsDefinedConfig("PRIVATE_KEY")
    async myBalance(msg:string){
        return await callService.getBalance(msg)
    }

    @CommandRouter("pvkey")
    setPrivateKey(msg:string){
        return configurationService.setPrivateKey(msg);
    }

    @CommandRouter("buy")
    @NeedsDefinedConfig("PRIVATE_KEY")
    @NeedsDefinedConfig("ROUTER")
    async executeBuy(msg:string){
        const transaction = await transactionService.executeSwapOperations(msg)
        return executeBuy_buildMessage(transaction)
    }

    @CommandRouter("setrouter")
    setRouter(msg:string){
        return configurationService.setRouterSwap(msg);
    }

    @CommandRouter("tokeinfo")
    async tokenInfo(msg:string){
        const call = await callService.getTokenInfo(msg);
        return tokeInfo_BuilderResponse(call);
    }

    @CommandRouter("gas")
    async gasPrice(msg:string){
        return configurationService.getGasPrice(msg)
    }


    @CommandRouter("setgas")
    async setGasPrice(msg:string){
        return configurationService.setGasPrice(msg)
    }

    @CommandRouter("router")
    async getRouter(msg:string){
        return configurationService.getRouterSwap(msg);
    }

    @CommandRouter("start")
    @NeedsDefinedConfig("PRIVATE_KEY")
    async start(msg:string){
        const start_Client = await connectionService.startClient(msg);
        const start_signOffline = await connectionService.startSignOfflineClient(msg);
        const start_signOnline = await connectionService.startSignOnlineClient(msg);

        return 200
    }

}