import { createExpressApp } from '../server';

let appInstance: any;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  try {
    if (!appInstance) {
      appInstance = await createExpressApp();
    }
    return appInstance(req, res);
  } catch (err: any) {
    console.error("Vercel API handler failed to initialize Express App:", err);
    res.status(500).json({
      error: "Initialization Error",
      details: err?.message || String(err),
      stack: err?.stack
    });
  }
}
