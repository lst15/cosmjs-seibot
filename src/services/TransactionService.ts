import { Coin } from "@cosmjs/amino";
import { cosm, pool } from "../server";
import { cosmMessage } from "../statics/cosmMessage";
import { env } from "../env-schema";
import { ExecuteSwapOperationsDTO } from "../telegram/dto/ExecuteSwapOperationsDTO";
import { executeBruteForceBuyDTO } from "../telegram/dto/executeBruteForceBuyDTO";
import telebot from "telebot";
import { executeBuy_buildMessage } from "../telegram/builders-response/executeSwapOperationsBuilderResponse";

export class TransactionService {
    async executeSwapOperations(msg:any,telegram_bot:telebot,loading_message:any){
        const [address,quantity] = ExecuteSwapOperationsDTO(msg.text);
        
        cosmMessage.execute_swap_operations.operations[0].
            astro_swap.ask_asset_info.
            token.contract_addr = address;

        const val: readonly Coin[] = [{ amount: quantity, denom: "usei" }];
        
        const transaction = await cosm.getOnlineSignClient().execute(
            cosm.getAccount()[0].address,
            env.ROUTER,
            cosmMessage,
            "auto",
            undefined,
            val,
        )
        
        return transaction
    }

    async executeBruteForceBuy(msg:any,telegram_bot:telebot,loading_message:any){
        const [address,quantity] = ExecuteSwapOperationsDTO(msg.text);
        let transaction = {};
        pool.addBfBuyPool(msg.message_id)

        while(pool.isActivedBfByPool(msg.message_id)){            
            
            try {
                transaction = await this.executeSwapOperations(msg,telegram_bot,loading_message)
                await telegram_bot.sendMessage(
                    msg.from.id,
                    executeBuy_buildMessage(transaction),
                    { replyToMessage: msg.message_id,parseMode:"markdown" }
                  );                
                break;                
            } catch (error) {}

            await new Promise(r => setTimeout(r, 500));
        }

        pool.rmBfBuyPool(msg.message_id)
        
        
    }

}