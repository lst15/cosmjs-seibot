import {CosmJS} from "../cosmjs";
import {cosmClient} from "../../statics/CosmClient";
import {SigningStargateClient} from "@cosmjs/stargate";

export class CosmJSImplementation implements CosmJS{
    async getMyAddress(): Promise<any> {
         return await cosmClient.getSignClient()
    }

    getMyBalances(): Promise<any> {
        return Promise.resolve(undefined);
    }

}