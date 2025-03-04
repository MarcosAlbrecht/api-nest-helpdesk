import 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Define a propriedade `user` na Request
  }
}
