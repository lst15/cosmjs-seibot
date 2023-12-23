import {GasPrice, SigningStargateClient, StargateClient} from "@cosmjs/stargate";
import {AccountData, DirectSecp256k1Wallet, OfflineDirectSigner} from "@cosmjs/proto-signing";
import {env} from "../env-schema";
import {msg} from "./cosmMessage";
export class CosmClientStatic {
    private client:StargateClient;
    private signOfflineClient:DirectSecp256k1Wallet;
    private signOnlineClient:SigningStargateClient;
    private rpc:string;
    private account:readonly AccountData[];
    private gasPrice = GasPrice.fromString("0.025usei");

    async setClient(rpc:string){
        this.rpc = rpc;
        this.client = await StargateClient.connect(rpc);
        return this.client
    }

    getClient(): StargateClient {
        return this.client;
    }

    async initializeSignOfflineClient()  {
        this.signOfflineClient = await DirectSecp256k1Wallet.fromKey(Buffer.from(env.PRIVATE_KEY, "hex"),"sei");

        this.account = await this.signOfflineClient.getAccounts()
        msg.execute_swap_operations.to = this.account[0].address;
        return this.signOfflineClient;
    }

    async initializeSignOnlineClient()  {
        this.signOnlineClient = await SigningStargateClient.connectWithSigner(this.rpc, this.signOfflineClient, {gasPrice:this.gasPrice});
        return this.signOnlineClient;
    }

    getOfflineSignClient(): DirectSecp256k1Wallet{
        return this.signOfflineClient;
    }

    getOnlineSignClient(){
        return this.signOnlineClient
    }

    getAccount(): readonly AccountData[]{
        return this.account;
    }

    async getBalance()   {
        return await this.client.getBalance(this.account[0].address,"usei");
    }

    async swap(){
        const msg = {

        }
    }

}