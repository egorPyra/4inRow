// types/next.d.ts
import { JwtPayload } from "jsonwebtoken";

declare module "next" {
  interface NextApiRequest {
    user: {
      email: string;
    };
  }
}
