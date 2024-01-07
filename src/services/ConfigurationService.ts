import telebot from "telebot";
import { env } from "../env-schema";
import { SetMainnetRpcDTO } from "../telegram/dto/SetMainnetRpcDTO";
import { SetPrivateKeyDTO } from "../telegram/dto/SetPrivateKeyDTO";
import { SetRouterDTO } from "../telegram/dto/SetRouterDTO";
import { SetTestnetRpcDTO } from "../telegram/dto/SetTestnetRpcDTO";
import { SetGasPriceDTO } from "../telegram/dto/setGasPriceDTO";
import { envUpdate } from "../utils/env-update";

export class ConfigurationService {
    async setPrivateKey(msg:any,telegram_bot:telebot,loading_message:any){        
        const privateKey = SetPrivateKeyDTO(msg);

        envUpdate([{
            key:"PRIVATE_KEY",
            value:privateKey
        }])
        env.PRIVATE_KEY = privateKey;

        return 200
    }

    async setRouterSwap(msg:any,telegram_bot:telebot,loading_message:any){        
        const address = SetRouterDTO(msg)

        envUpdate([{
            key:"ROUTER",
            value:address
        }])
        env.ROUTER = address;
        
        return 200
    }

    setTestnetRpc(msg:any,telegram_bot:telebot,loading_message:any){        
        const rpc = SetTestnetRpcDTO(msg)

        envUpdate([{
            key:"TESTNET_RPC",
            value:rpc
        }])
        env.TESTNET_RPC = rpc;
        
        return 200
    }

    setMainnetRpc(msg:any,telegram_bot:telebot,loading_message:any){        
        const rpc = SetMainnetRpcDTO(msg)

        envUpdate([{
            key:"MAINNET_RPC",
            value:rpc
        }])
        env.MAINNET_RPC = rpc;
        
        return 200
    }

    async getRouterSwap(msg:any,telegram_bot:telebot,loading_message:any){
        return env.ROUTER;
    }

    async getGasPrice(msg:any,telegram_bot:telebot,loading_message:any){
        await new Promise(r => setTimeout(r, 5000));
        return env.GAS_PRICE
    }

    async setGasPrice(msg:any,telegram_bot:telebot,loading_message:any){
        const gas = SetGasPriceDTO(msg);
        
        envUpdate([{
            key:"GAS_PRICE",
            value:gas
        }])
        env.GAS_PRICE = gas;
        
        return 200        
    }
}