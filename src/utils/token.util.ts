import * as vscode from "vscode";
import { STATE_SIGNIN_TOKEN, STATE_JESSION_ID } from "../constants";
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

  saveJessionId(jessionid: string): void {
    this.context.globalState.update(STATE_JESSION_ID, jessionid);
  }

  getJessionId(): string {
    return this.context.globalState.get<string>(STATE_JESSION_ID) as string;
  }

  clearSingToken(): void {
    this.context.globalState.update(STATE_SIGNIN_TOKEN, null);
  }
  clearJessionId(): void {
    this.context.globalState.update(STATE_JESSION_ID, null);
  }
}
