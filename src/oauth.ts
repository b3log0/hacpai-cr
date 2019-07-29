import * as vscode from "vscode";
import { SigninDto } from "./dto/signin.dto";
import { STATE_SIGNIN_TOKEN } from "./constants";
import { encryption } from "./utils/encryption";
import axios from "axios";
import { TokenUtil } from "./utils/token.util";
export class Oauth {
  context: vscode.ExtensionContext;
  token: TokenUtil;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.token = new TokenUtil(this.context);
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
    return this.input().then((signindto: SigninDto) => {
      axios
        .post("https://hacpai.com/api/v2/login", signindto)
        .then((response: any) => {
          if (response && response.status === 200) {
            if (response.data.sc && response.data.sc === 1) {
              vscode.window.showErrorMessage(response.data.msg);
            } else if (response.data.sc === 0) {
              this.token.saveSignToken(response.data.token);
              this.token.saveJessionId(
                response.headers["set-cookie"][0].split(".")[0].split("=")[1]
              );
              vscode.window.showInformationMessage("sign in successed!");
            }
          } else {
            vscode.window.showErrorMessage("unkonw error!");
          }
        });
    });
  }
}
