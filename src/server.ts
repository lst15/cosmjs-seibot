import { env } from "./env-schema";
import { CosmClientStatic } from "./statics/CosmClient";
import { TelegramPool } from "./statics/TelegramPool";
import { TelegramController } from "./telegram/TelegramController";

export const cosm = new CosmClientStatic();
export const telegramPool = new TelegramPool();

(async () => {

  const mainnet = "https://rpc.wallet.pacific-1.sei.io"
  const testnet = "https://sei-testnet-rpc.polkachu.com/"

  // await cosm.setClient(mainnet);
  // await cosm.initializeSignOfflineClient();
  // await cosm.initializeSignOnlineClient();
  // await cosm.getBalance()

  new TelegramController();
})();

