export let cosmMessage = {
    "execute_swap_operations":{
        "max_spread":"0,49",
            "minimum_receive":null,
            "operations":[
            {
                "astro_swap":{
                    "ask_asset_info":{
                        "symbol":{
                            "contract_addr":"<CONTRACT_ADDR>"
                        }
                    },
                    "offer_asset_info":{
                        "native_token":{
                            "denom":"usei"
                        }
                    }
                }
            }
        ],
            "to":"<MY_WALLET_ADDRESS>"
    }
}