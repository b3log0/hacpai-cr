import * as vscode from "vscode";
import axios from "axios";
import { encryption } from "./encryption";
import { $SIGN_URL, $SIGNOUT_URL, $INDEX_URL } from "./constants";
import { TokenUtil } from "./token.util";
import { HeaderUtil } from "./header.util";
export class User {
  private userName!: string;
  private userPassword!: string;
  private headerUtil: HeaderUtil;
  private tokenUtil: TokenUtil;

  constructor(context: vscode.ExtensionContext) {
    this.headerUtil = new HeaderUtil(context);
    this.tokenUtil = new TokenUtil(context);
  }

  async sign() {
    await this.inputUserName();
    await this.inputPassword();
    if (!this.userName || !this.userPassword) {
      vscode.window.showErrorMessage("you must input the username or password");
      return;
    }
    await this.auth();
    await this.wsAuth();
  }

  async inputUserName() {
    await vscode.window
      .showInputBox({
        password: false,
        ignoreFocusOut: true,
        placeHolder: "input your username",
        prompt: "use enter to the next steup"
      })
      .then(async username => await (this.userName = username as string));
  }

  async inputPassword() {
    await vscode.window
      .showInputBox({
        password: true,
        ignoreFocusOut: true,
        placeHolder: "input your password",
        prompt: "use enter to signin"
      })
      .then(
        async passoword =>
          await (this.userPassword = encryption(passoword as string))
      );
  }

  async auth() {
    await axios
      .post(
        $SIGN_URL,
        {
          userName: this.userName,
          userPassword: this.userPassword
        },
        { headers: { "User-Agent": this.headerUtil.agent } }
      )
      .catch(async error => await vscode.window.showErrorMessage(error.message))
      .then(async (response: any) => {
        if (response.status === 200) {
          if (response.data.sc === 0) {
            await this.tokenUtil.saveSignToken(response.data.token);
          } else {
            await vscode.window.showErrorMessage(response.data.msg);
          }
        } else {
          await vscode.window.showErrorMessage("Server Status 500");
        }
      });
  }

  async wsAuth() {
    await axios
      .get($INDEX_URL, {
        headers: this.headerUtil.headers
      })
      .catch(async error => {
        await vscode.window.showErrorMessage(error);
      })
      .then(async (response: any) => {
        let regex: RegExp = /(?<=wsToken=)[0-9a-zA-Z]+/;
        let wsToken = (regex.exec(response.data) as RegExpExecArray)[0];
        await this.tokenUtil.saveWsToken(wsToken);
        await vscode.window.showInformationMessage("sign in successed!");
      });
  }

  async signout() {
    await axios
      .post($SIGNOUT_URL, null, {
        headers: this.headerUtil.headers
      })
      .catch(async (error: Error) => {
        await vscode.window.showErrorMessage(error.message);
      })
      .then(async response => {
        delete this.userName;
        delete this.userPassword;
        this.tokenUtil.cleanSignToken();
        this.tokenUtil.cleanWsToken();
        await vscode.window.showInformationMessage("Signout Successed");
      });
  }
}
