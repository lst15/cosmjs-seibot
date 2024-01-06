import "dotenv/config";

interface envSchema {
  readonly TG_BOT_TOKEN: string;
  ROUTER: string;
  PRIVATE_KEY: string;
  GAS_PRICE: string;
  [p: string]: string;
}

export const env: any = process.env;
