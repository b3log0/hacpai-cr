import * as vscode from "vscode";
import { STATE_SIGNIN_TOKEN } from "../constants";
export function SignToken(context: vscode.ExtensionContext) {
  return context.globalState.get<string>(STATE_SIGNIN_TOKEN);
}
