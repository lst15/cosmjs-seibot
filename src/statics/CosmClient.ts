import { GasPrice, StargateClient } from "@cosmjs/stargate";
import {
  AccountData,
  DirectSecp256k1Wallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { env } from "../env-schema";
import { cosmMessage, cosmMessageX } from "./cosmMessage";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export class CosmClientStatic {
  private client!: StargateClient;
  private signOfflineClient!: DirectSecp256k1Wallet;
  private signOnlineClient!: SigningCosmWasmClient;
  private rpc!: string;
  private account!: readonly AccountData[];
  private gasPrice = GasPrice.fromString(`${env.GAS_PRICE}usei`);
  private testCli!: any;

  async setClient(rpc: string) {
    this.rpc = rpc;
    this.client = await StargateClient.connect(rpc);
    return this.client;
  }

  getGasPrice(){
    return this.gasPrice;
  }

  getClient(): StargateClient {
    return this.client;
  }

  async initializeSignOfflineClient() {
    console.log(this.rpc, env.PRIVATE_KEY);
    this.signOfflineClient = await DirectSecp256k1Wallet.fromKey(
      Buffer.from(env.PRIVATE_KEY, "hex"),
      "sei"
    );

    this.account = await this.signOfflineClient.getAccounts();
    // cosmMessage.execute_swap_operations.to = this.account[0].address;
    return this.signOfflineClient;
  }

  async initializeSignOnlineClient() {
    this.signOnlineClient = await SigningCosmWasmClient.connectWithSigner(
      this.rpc,
      this.signOfflineClient,
      { gasPrice: this.gasPrice }
    );

    return this.signOnlineClient;
  }

  getOfflineSignClient(): DirectSecp256k1Wallet {
    return this.signOfflineClient;
  }

  getOnlineSignClient() {
    return this.signOnlineClient;
  }

  getAccount(): readonly AccountData[] {
    return this.account;
  }

  async getBalance() {    
    //while(true){
      //this.signOnlineClient.simulate(this.account[0].address,cosmMessageX,undefined).then(console.log)
   // }

    return await this.client.getBalance(this.account[0].address, "usei");
  }

  async getTokenInfo(contractAddress:string):Promise<{
    name:string,symbol:string,decimals:number,total_supply:string
  }>{
    return await this.signOnlineClient.queryContractSmart(contractAddress,{token_info:{}})
  }

  async getTokenBalance(contractAddress:string):Promise<{balance:string}> {
    return await this.signOnlineClient.queryContractSmart(contractAddress,{
      balance:{
          address:this.account[0].address
      }
    })
  }
}
