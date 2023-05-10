declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      PUBLIC_KEY: string;
      APP_ID: string;
      DISCORD_TOKEN: string;
    }
  }
}

export {};
