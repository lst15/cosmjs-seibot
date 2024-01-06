import { cosm } from "../server";
import { GetTokenBalanceDTO } from "../telegram/dto/GetTokenBalanceDTO";
import { GetTokenInfoDTO } from "../telegram/dto/GetTokenInfoDTO";

export class CallService {

    async getTokenBalance(msg:string){
        const address = GetTokenBalanceDTO(msg);

        const balance = await cosm.getTokenBalance(address);
        return JSON.stringify(balance)
    }

    async getBalance(msg:string){
        const balance = await cosm.getBalance();
        return JSON.stringify(balance)
    }

    async getTokenInfo(msg:string){        
        const address = GetTokenInfoDTO(msg)
        const info = await cosm.getTokenInfo(address);
        
        return info;
    }

}