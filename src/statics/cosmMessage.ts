export let cosmMessage = {
  execute_swap_operation: {
    operation: {
      astro_swap: {
        offer_asset_info: {
          native_token: {
            denom: "usei",
          },
        },
        ask_asset_info: {
          token: {
            contract_addr:
              "sei1hrndqntlvtmx2kepr0zsfgr7nzjptcc72cr4ppk4yav58vvy7v3s4er8ed",
          },
        },
      },
    },
    max_spread: "1000000",
    single: false,
  },
};
