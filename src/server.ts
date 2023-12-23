// import telebot from "telebot";
// import {env} from "./env-schema";
// import {setPrivateKey} from "./telegram/commands/setPrivateKey";
// import {DirectSecp256k1HdWallet, DirectSecp256k1Wallet, OfflineDirectSigner} from "@cosmjs/proto-signing"
// import {CosmClientStatic} from "./statics/CosmClient"
// import {getBalance} from "./telegram/commands/getBalance";
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = String(0);
//
// export const cosm = new CosmClientStatic();
//
// (async () => {
//     await cosm.setClient("https://sei-testnet-rpc.polkachu.com/");
//     await cosm.initializeSignOfflineClient();
//     await cosm.initializeSignOnlineClient();
//
//     const telegram_bot = new telebot({
//         token: env.TG_BOT_TOKEN,
//     });
//
//     setPrivateKey(telegram_bot);
//     getBalance(telegram_bot)
//     telegram_bot.start()
//     cosm.getClient()
// })()
import {CosmWasmClient} from "@cosmjs/cosmwasm";

const client = new CosmWasmClient("https://sei-testnet-rpc.polkachu.com/");
const result = await client.call("cosmos1234567890abcdefghijklmnopqrstuvwzyz", "get_price", []);

//
// export const telegram_bot = new telebot({
//     token: env.TG_BOT_TOKEN,
// });
//
// setPrivateKey(telegram_bot);
// console.log(env.TG_BOT_TOKEN)
//