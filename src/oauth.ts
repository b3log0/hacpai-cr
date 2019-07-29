import * as vscode from "vscode";
import { SigninDto } from "./dto/signin.dto";
import { STATE_SIGNIN_INFO } from "./constants";
import { encryption } from "./utils/encryption";

export class Oauth {
  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public input(): void {
    vscode.window
      .showInputBox({
        password: false,
        ignoreFocusOut: true,
        placeHolder: "input your username",
        prompt: "use enter to the next steup"
      })
      .then(username => {
        vscode.window
          .showInputBox({
            password: true,
            ignoreFocusOut: true,
            placeHolder: "input your password",
            prompt: "use enter to signin"
          })
          .then(password => {
            this.context.globalState.update(STATE_SIGNIN_INFO, {
              userName: username,
              userPassword: encryption(password as string)
            } as SigninDto);
          });
      });
  }

  public auth(): void {
    if (this.context.globalState.get<SigninDto>(STATE_SIGNIN_INFO)) {
      const signinInfo: any = this.context.globalState.get<SigninDto>(
        STATE_SIGNIN_INFO
      );
      console.log(signinInfo);
    }
  }
}
