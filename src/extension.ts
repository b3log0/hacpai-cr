import * as vscode from "vscode";
import { COMMADN_SIGN_IN } from "./constants";
import { User } from "./linkstart/user";
import { COMMAND_SIGN_OUT } from "./linkstart/constants";
export function activate(context: vscode.ExtensionContext) {
  const user = new User(context);

  vscode.commands.registerCommand(COMMADN_SIGN_IN, async () => {
    await user.sign();
  });

  vscode.commands.registerCommand(COMMAND_SIGN_OUT, async () => {
    await user.signout();
  });

  // vscode.commands.registerCommand(COMMAND_CONNECT, async () => {
  //   await stomp.connect();
  // });

  // vscode.commands.registerCommand(COMMAND_SEND, async () => {
  //   await stomp.send();
  // });

  // vscode.commands.registerCommand(COMMAND_SIGN_OUT, async () => {
  //   await oauth.singout();
  // });
}
export function deactivate() {}
