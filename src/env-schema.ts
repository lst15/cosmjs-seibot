import "dotenv/config";

interface envSchema {
  readonly TG_BOT_TOKEN: string;
  readonly PRIVATE_KEY: string;

  [p: string]: string;
}

export const env: any = process.env;
