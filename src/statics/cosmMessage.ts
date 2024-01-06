import { EncodeObject } from "@cosmjs/proto-signing"
import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate"

export let cosmMessage = {
  "execute_swap_operations": {
    "max_spread": null,
    "minimum_receive": null,
    "operations": [
      {
        "astro_swap": {
          "offer_asset_info": {
            "native_token": {
              "denom": "usei"
            }
          },
          "ask_asset_info": {
            "token": {
              "contract_addr": "sei1vl6falzhe44xzwng6q7eusy333laye4nj6lzjrpc4dshddll7sfs2k6plj"
            }
          }
        }
      }
    ]
  },
}

export let cosmMessageX:MsgExecuteContractEncodeObject[] = [{
     
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: {
      sender: "sei1kgfdr0rekv4crepxlt2vdj6waw2xq4anjue6ae",
      contract: "sei1d2r4s2q8kumpmvx6dyj77klhgm5e6fs9njmmz6ye7ukqa77ddtdsu72dc3",
      funds: [
        { denom: "usei", amount: "100000" }
      ],
      msg:new Uint8Array(new TextEncoder().encode(JSON.stringify(cosmMessage)))
    }
  
}]
