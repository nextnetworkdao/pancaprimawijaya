import { createExpressApp } from '../server';

let appInstance: any;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  if (!appInstance) {
    appInstance = await createExpressApp();
  }
  return appInstance(req, res);
}
