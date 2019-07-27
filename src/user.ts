import * as vscode from "vscode";
const HACKPI_USER = "hacpi.user";
import * as request from "request";
export interface User {
  username: string;
  password: string;
}
export class UserService {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public get User(): User | undefined {
    return this.context.globalState.get<User>(HACKPI_USER);
  }

  public checkUserLogin(): boolean {
    return this.User ? true : false;
  }

  public inputUser(callback: () => void): void {
    vscode.window
      .showInputBox({
        password: false,
        ignoreFocusOut: true,
        placeHolder: "input your username",
        prompt: "use enter to next steup"
      })
      .then(username => {
        vscode.window
          .showInputBox({
            password: true,
            ignoreFocusOut: true,
            placeHolder: "input your password",
            prompt: "use enter to login"
          })
          .then(password => {
            this.context.globalState
              .update(HACKPI_USER, {
                username: username,
                password: password
              })
              .then(() => {
                callback();
              });
          });
      });
  }

  public logoutUser(): void {
    this.context.globalState.update(HACKPI_USER, null);
  }

  // TODO: sent request to server
  public connect(): void {
    
  }
}
