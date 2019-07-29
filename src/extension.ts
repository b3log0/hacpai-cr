import * as vscode from "vscode";
import { COMMADN_SIGN_IN } from "./constants";
import { Oauth } from "./oauth";
export function activate(context: vscode.ExtensionContext) {
  let oauth = new Oauth(context);
  vscode.commands.registerCommand(COMMADN_SIGN_IN, async () => {
    await oauth.auth();
  });
}
export function deactivate() {}
