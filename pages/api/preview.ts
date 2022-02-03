import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_TOKEN || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Based on the given endpoint in the slug decide where to redirect
  const endpoint = (req.query.slug as string).split("/")[1];
  let to = "/";
  switch (endpoint) {
    case "charity-overview-page":
      to = "/charities";
      break;
    case "about-us-page":
      to = "/about-us";
      break;
    case "homepage":
    default:
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(to);
}
