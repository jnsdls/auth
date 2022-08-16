import { NextApiRequestWithUser, ThirdwebAuthContext } from "../types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: ThirdwebAuthContext
) {
  const { sdk, domain } = ctx;
  let user: NextApiRequestWithUser["user"] = null;
  const token = req.cookies.thirdweb_auth_token;

  if (token) {
    try {
      const address = await sdk.auth.authenticate(domain, token);
      user = { address };
    } catch {
      // No-op
    }
  }

  return res.status(200).json(user);
}
