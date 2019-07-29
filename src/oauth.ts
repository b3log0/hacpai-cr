import * as vscode from "vscode";
import { SigninDto } from "./dto/signin.dto";
import { STATE_SIGNIN_TOKEN } from "./constants";
import { encryption } from "./utils/encryption";
import axios from "axios";
export class Oauth {
  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public input(): Promise<SigninDto> {
    return new Promise<SigninDto>((resolve, reject) => {
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
              resolve({
                userName: username,
                userPassword: encryption(password as string)
              } as SigninDto);
            });
        });
    });
  }

  public async auth() {
    await this.input().then((signindto: SigninDto) => {
      axios
        .post("https://hacpai.com/api/v2/login", signindto)
        .then((response: any) => {
          if (response && response.status === 200) {
            if (response.data.sc && response.data.sc === 1) {
              vscode.window.showErrorMessage(response.data.msg);
            }
            if (response.data.sc && response.data.sc === 0) {
              vscode.window.showErrorMessage("sign in successed!");
              this.context.globalState.update(
                STATE_SIGNIN_TOKEN,
                response.data.token
              );
            }
          } else {
            vscode.window.showErrorMessage("unkonw error!");
          }
        });
    });
  }
}
