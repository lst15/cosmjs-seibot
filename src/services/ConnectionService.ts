import { cosm } from "../server";

export class ConnectionService {
    async startClient(msg:any){
        //const [command] = msg.split(" ");

        const mainnet = "https://rpc.wallet.pacific-1.sei.io"
        const testnet = "https://sei-testnet-rpc.polkachu.com/"

        try {
            await cosm.setClient(mainnet);    
        } catch (error) {
            throw error;
        }

        return 200
    }

    async startSignOfflineClient(msg:any){
        try {
            await cosm.initializeSignOfflineClient();
        } catch (error) {
            throw error;
        }

        return 200;
    }

    async startSignOnlineClient(msg:any){
        try {
            await cosm.initializeSignOnlineClient();
        } catch (error) {
            throw error;
        }

        return 200;        
    }

}