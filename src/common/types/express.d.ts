declare global {
  namespace Express {
    interface Request {
      user: any;
      isAuthenticated: () => boolean;
    }
    interface Response {
      redirect(url: string): void;
    }
  }
}

export {};
