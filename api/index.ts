import { startServer } from '../server.js';

let app: any;

export default async function handler(req: any, res: any) {
  if (!app) {
    app = await startServer();
  }
  return app(req, res);
}
