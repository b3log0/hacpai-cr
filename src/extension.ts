import * as vscode from "vscode";
import { COMMADN_SIGN_IN, COMMAND_CONNECT, COMMAND_SEND } from "./constants";
import { Oauth } from "./oauth";
import { Stomp } from "./stomp";
export function activate(context: vscode.ExtensionContext) {
  let oauth = new Oauth(context);
  let stomp = new Stomp(context);
  vscode.commands.registerCommand(COMMADN_SIGN_IN, async () => {
    await oauth.auth();
  });

  vscode.commands.registerCommand(COMMAND_CONNECT, async () => {
    await stomp.connect();
  });

  vscode.commands.registerCommand(COMMAND_SEND, async () => {
    await stomp.send();
  });
}
export function deactivate() {}
