// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import {  UserService } from "./user";
export function activate(context: vscode.ExtensionContext) {
  // gnerate user service
  const userService = new UserService(context);

  // welcom
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

  // login command
  let login = vscode.commands.registerCommand("extension.hacpicr.login", () => {
    userService.inputUser(() => {
      userService.connect();
    });
  });

  // logout
  let logout = vscode.commands.registerCommand(
    "extension.hacpicr.logout",
    () => {
      userService.logoutUser();
    }
  );

  if (userService.checkUserLogin) {
    userService.connect();
  } else {
    vscode.commands.executeCommand("extension.hacpicr.welcom");
  }
}
export function deactivate() {}
