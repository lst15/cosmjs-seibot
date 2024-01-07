import "dotenv/config";

interface envSchema {
  readonly TG_BOT_TOKEN: string;
  ROUTER: string;
  PRIVATE_KEY: string;
  GAS_PRICE: string;
  DEFAULT_TESTNET_RPC: string;
  DEFAULT_MAINNET_RPC: string;
  [p: string]: string;
}

export const env: any = process.env;
