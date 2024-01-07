import { Coin } from "@cosmjs/amino";
import { cosm } from "../server";
import { cosmMessage } from "../statics/cosmMessage";
import { env } from "../env-schema";
import { ExecuteSwapOperationsDTO } from "../telegram/dto/ExecuteSwapOperationsDTO";
import { executeBruteForceBuyDTO } from "../telegram/dto/executeBruteForceBuyDTO";

export class TransactionService {
    async executeSwapOperations(msg:string){
        const [address,quantity] = ExecuteSwapOperationsDTO(msg);
        
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

    async executeBruteForceBuy(msg:string){
        const [address,quantity,tries] = executeBruteForceBuyDTO(msg);
        let count = 0;
        const formatTries = Number(tries)
        let transaction = {};

        while(count < formatTries) {
            console.log("tentativa n:",count)
            try {
                transaction = await this.executeSwapOperations(msg)
                break;                
            } catch (error) {
                console.log(error)
                if(String(error).includes("execute wasm contract failed"))
                {
                    count += 1
                } else {
                    throw error;
                }

            }

            
        }

        return transaction
    }

}