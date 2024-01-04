// Importe os módulos necessários
import { CosmWasmClient } from "@cosmjs/cosmwasm";
import axios from "axios";
import { CosmClientStatic } from "./statics/CosmClient";
import { cosmMessage } from "./statics/cosmMessage";
import { EncodeObject } from "@cosmjs/proto-signing";

// (async () => {
//   // Configure o cliente CosmWasm
//   const client = new CosmWasmClient("https://sei-testnet-rpc.polkachu.com/");
//   const mySeiAmount = 100;

//   // Obtenha o preço USD do SEI
//   const response = await axios.get(
//     "https://api.coingecko.com/api/v3/coins/sei/market_chart/range?start_time=1650000000&end_time=1651234567&interval=1d"
//   );
//   const priceData = response.data.prices;
//   const latestPrice = priceData[priceData.length - 1];
//   const priceInUSD = latestPrice[1];

//   // Exiba os resultados
//   console.log("Você possui", mySeiAmount, "SEI");
//   console.log("O preço do SEI em USD é", priceInUSD);
// })();

const cosm = new CosmClientStatic();

(async () => {
  await cosm.setClient("https://rpc.wallet.pacific-1.sei.io");
  await cosm.initializeSignOfflineClient();
  await cosm.initializeSignOnlineClient();
  cosm.getBalance().then(console.log);
  // const x = await cosm
  //   .getOnlineSignClient()
  //   .queryContractSmart(
  //     "sei17pcj9gjz29d3x5kh4tu5hkl988jfjmzk56rgxa0u84g5rwkcfqdqvp47gu",
  //     cosmMessage
  //   );
  await cosm
    .getOnlineSignClient()
    .execute(
      cosm.getAccount()[0].address,
      "sei1d2r4s2q8kumpmvx6dyj77klhgm5e6fs9njmmz6ye7ukqa77ddtdsu72dc3",
      cosmMessage,
      "auto"
    );
  //console.log(x);
})();
