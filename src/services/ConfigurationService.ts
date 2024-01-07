import { env } from "../env-schema";
import { SetMainnetRpcDTO } from "../telegram/dto/SetMainnetRpcDTO";
import { SetPrivateKeyDTO } from "../telegram/dto/SetPrivateKeyDTO";
import { SetRouterDTO } from "../telegram/dto/SetRouterDTO";
import { SetTestnetRpcDTO } from "../telegram/dto/SetTestnetRpcDTO";
import { SetGasPriceDTO } from "../telegram/dto/setGasPriceDTO";
import { envUpdate } from "../utils/env-update";

export class ConfigurationService {
    setPrivateKey(msg:string){        
        const privateKey = SetPrivateKeyDTO(msg);

        envUpdate([{
            key:"PRIVATE_KEY",
            value:privateKey
        }])
        env.PRIVATE_KEY = privateKey;

        return 200
    }

    setRouterSwap(msg:string){        
        const address = SetRouterDTO(msg)

        envUpdate([{
            key:"ROUTER",
            value:address
        }])
        env.ROUTER = address;
        
        return 200
    }

    setTestnetRpc(msg:string){        
        const rpc = SetTestnetRpcDTO(msg)

        envUpdate([{
            key:"TESTNET_RPC",
            value:rpc
        }])
        env.TESTNET_RPC = rpc;
        
        return 200
    }

    setMainnetRpc(msg:string){        
        const rpc = SetMainnetRpcDTO(msg)

        envUpdate([{
            key:"MAINNET_RPC",
            value:rpc
        }])
        env.MAINNET_RPC = rpc;
        
        return 200
    }

    getRouterSwap(msg:string){
        return env.ROUTER;
    }

    getGasPrice(msg:string){
        return env.GAS_PRICE;
    }

    setGasPrice(msg:string){
        const gas = SetGasPriceDTO(msg);
        
        envUpdate([{
            key:"GAS_PRICE",
            value:gas
        }])
        env.GAS_PRICE = gas;
        
        return 200        
    }
}