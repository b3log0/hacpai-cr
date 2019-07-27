import * as vscode from "vscode";
export class User {
  private context: vscode.ExtensionContext;
  private username: string | undefined;
  private password: string | undefined;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public storeUser() {
    this.context.globalState.update("hacpi.username", this.username);
    this.context.globalState.update("hacpi.password", this.password);
  }

  public getUsername(): any {
    this.context.globalState.get("hacpi.username");
  }
  public getPassword(): any {
    this.context.globalState.get("hacpi.password");
  }

  public inputUsername(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      vscode.window
        .showInputBox({
          password: false,
          ignoreFocusOut: true,
          placeHolder: "input your username",
          prompt: "use enter to next steup"
        })
        .then(username => {
          if (username) {
            this.username = username;
            resolve(true);
          } else {
            vscode.window.showErrorMessage("YOU MUST INPUT THE USER NAME!");
            reject(false);
          }
        });
    });
  }

  public inputPassword(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      vscode.window
        .showInputBox({
          password: true,
          ignoreFocusOut: true,
          placeHolder: "input your password",
          prompt: "use enter to login"
        })
        .then(password => {
          if (password) {
            this.password = password;
            resolve(true);
          } else {
            vscode.window.showErrorMessage("YOU MUST INPUT THE USER PASSWORD!");
            reject(false);
          }
        });
    });
  }
}
