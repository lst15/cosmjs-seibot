import { env } from "./env-schema";
import { CosmClientStatic } from "./statics/CosmClient";
import { Pool } from "./statics/Pool";
import { TelegramController } from "./telegram/TelegramController";

export let cosm:any;

export function startCosm(){
    cosm = new CosmClientStatic();
}

export const pool = new Pool();

new TelegramController();
