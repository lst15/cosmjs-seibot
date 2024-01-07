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
        this.start("/start mainnet")
        telegram_bot.start()
    }

    @TelegramRouterDeco("baltoken")
    async getBalance(msg:string){
        const balance = await callService.getTokenBalance(msg)
        return balance
    }
    
    @TelegramRouterDeco("bal")
    @TelegramExceptionsDeco()
    @RuleDefinedConfigDeco(["PRIVATE_KEY"])
    async myBalance(msg:string){
        return await callService.getBalance(msg)
    }

    @TelegramRouterDeco("pvkey")
    @TelegramExceptionsDeco()
    setPrivateKey(msg:string){
        return configurationService.setPrivateKey(msg);
    }

    @TelegramRouterDeco("buy")
    @TelegramExceptionsDeco()
    @RuleDefinedConfigDeco(["PRIVATE_KEY","ROUTER"])    
    async executeBuy(msg:string){
        const transaction = await transactionService.executeSwapOperations(msg)
        return executeBuy_buildMessage(transaction)
    }

    @TelegramRouterDeco("bfbuy")
    @TelegramExceptionsDeco()
    @RuleDefinedConfigDeco(["PRIVATE_KEY","ROUTER"])    
    async executeBfBuy(msg:string){
        const transaction = await transactionService.executeBruteForceBuy(msg)
        return executeBuy_buildMessage(transaction)
    }

    @TelegramRouterDeco("setrouter")
    @TelegramExceptionsDeco()
    setRouter(msg:string){
        return configurationService.setRouterSwap(msg);
    }

    @TelegramRouterDeco("tokeinfo")
    @TelegramExceptionsDeco()
    async tokenInfo(msg:string){
        const call = await callService.getTokenInfo(msg);
        return tokeInfo_BuilderResponse(call);
    }

    @TelegramRouterDeco("gas")
    @TelegramExceptionsDeco()
    async gasPrice(msg:string){
        return configurationService.getGasPrice(msg)
    }


    @TelegramRouterDeco("setgas")
    @TelegramExceptionsDeco()
    async setGasPrice(msg:string){
        return configurationService.setGasPrice(msg)        
    }

    @TelegramRouterDeco("router")
    @TelegramExceptionsDeco()
    async getRouter(msg:string){
        return configurationService.getRouterSwap(msg);
    }

    @TelegramRouterDeco("start")
    @TelegramExceptionsDeco()
    @RuleDefinedConfigDeco(["PRIVATE_KEY","TESTNET_RPC","MAINNET_RPC","GAS_PRICE","ROUTER"])
    async start(msg:string){
        startCosm()
        const start_Client = await connectionService.startClient(msg);
        const start_signOffline = await connectionService.startSignOfflineClient(msg);
        const start_signOnline = await connectionService.startSignOnlineClient(msg);

        return 200
    }

}