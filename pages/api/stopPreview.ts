import { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse): void {
  res.clearPreviewData();
  res.end("preview mode disabled");
}
