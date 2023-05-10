declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      PUBLIC_KEY: string;
    }
  }
}

export {};
