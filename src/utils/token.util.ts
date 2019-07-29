import * as vscode from "vscode";
import { STATE_SIGNIN_TOKEN, STATE_WS_TOKEN } from "../constants";
export class TokenUtil {
  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  saveSignToken(token: string): void {
    this.context.globalState.update(STATE_SIGNIN_TOKEN, token);
  }

  getSignToken(): string {
    return this.context.globalState.get<string>(STATE_SIGNIN_TOKEN) as string;
  }

  saveWsToken(WsToken: string): void {
    this.context.globalState.update(STATE_WS_TOKEN, WsToken);
  }

  getWsToken(): string {
    return this.context.globalState.get<string>(STATE_WS_TOKEN) as string;
  }

  clearSingToken(): void {
    this.context.globalState.update(STATE_SIGNIN_TOKEN, null);
  }
  clearWsToken(): void {
    this.context.globalState.update(STATE_WS_TOKEN, null);
  }
}
