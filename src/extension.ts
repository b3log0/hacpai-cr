// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import { User } from "./user";

export function activate(context: vscode.ExtensionContext) {
  let welcom = vscode.commands.registerCommand(
    "extension.hacpicr.welcom",
    () => {
      vscode.window
        .showInformationMessage(
          "Welcom to the Hacpi's char room" +
            "input your username and password to login by command hacpiLogin",
          "Login"
        )
        .then(select => {
          vscode.commands.executeCommand("extension.hacpicr.login");
        });
    }
  );

  let login = vscode.commands.registerCommand("extension.hacpicr.login", () => {
    const currentUser: User = new User(context);
    Promise.all([
      currentUser.inputUsername(),
      currentUser.inputPassword()
    ]).then(() => {
      currentUser.storeUser();
    });
  });

  context.subscriptions.push(login);
  context.subscriptions.push(welcom);

  vscode.commands.executeCommand("extension.hacpicr.welcom");
}
export function deactivate() {}
