import * as vscode from "vscode";
import { TokenUtil } from "./token.util";
import { USER_AGENT } from "./constants";
export class HeaderUtil {
  private tokenUtil: TokenUtil;
  constructor(context: vscode.ExtensionContext) {
    this.tokenUtil = new TokenUtil(context);
  }

  get cookie() {
    return `symphony=${this.tokenUtil.getSignToken()}`;
  }

  get agent() {
    return USER_AGENT;
  }

  get headers() {
    return { Cookie: this.cookie, "User-Agent": this.agent };
  }
}
