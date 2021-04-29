import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): void {
  res.clearPreviewData();
  res.end(
    "<div><div>Preview ended.</div><a href='/'>Go back to homepage</a></div>"
  );
}
