import * as vscode from "vscode";
import { STATE_SIGNIN_TOKEN, STATE_WS_TOKEN } from "./constants";
export class TokenUtil {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }
  public saveSignToken(token: string): void {
    this.context.globalState.update(STATE_SIGNIN_TOKEN, token);
  }
  public getSignToken(): string {
    return this.context.globalState.get(STATE_SIGNIN_TOKEN) as string;
  }

  public saveWsToken(token: string): void {
    this.context.globalState.update(STATE_WS_TOKEN, token);
  }
  public getWsToken(): string {
    return this.context.globalState.get(STATE_WS_TOKEN) as string;
  }

  public cleanWsToken(): void {
    this.context.globalState.update(STATE_WS_TOKEN, null);
  }
  public cleanSignToken(): void {
    this.context.globalState.update(STATE_SIGNIN_TOKEN, null);
  }
}
