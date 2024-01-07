import { env } from "./env-schema";
import { CosmClientStatic } from "./statics/CosmClient";
import { TelegramPool } from "./statics/TelegramPool";
import { TelegramController } from "./telegram/TelegramController";

export let cosm:any;

export function startCosm(){
    cosm = new CosmClientStatic();
}


new TelegramController();
