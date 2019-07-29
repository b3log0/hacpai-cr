import * as crypto from "crypto";
export function encryption(str: string): string {
  let hash = crypto
    .createHash("md5")
    .update(str)
    .digest("hex");
  return hash;
}
