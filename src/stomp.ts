import * as vscode from "vscode";
import { TokenUtil } from "./utils/token.util";
import axios from "axios";
import * as WebSocket from "ws";
import { STATE_WS_TOKEN, USER_AGENT } from "./constants";
export class Stomp {
  private context: vscode.ExtensionContext;
  private token: TokenUtil;
  pingTimeout: any;
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.token = new TokenUtil(context);
  }

   connect(): void {
    let cookie = `symphony=${this.token.getSignToken()}`;
    let url ="wss://hacpai.com/chat-room-channel?wsToken="+this.context.globalState.get(STATE_WS_TOKEN);
    const client = new WebSocket(url, {
      host: "hacpai.com",
      origin: "https://hacpai.com",
      headers: {
        cookie: cookie,
        "User-Agent": USER_AGENT,
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Connection: "Upgrade",
        Pragma: "no-cache"
      }
    });
    client.on("message",(data)=>{
      console.log(data);
    });
  }

  send(): void {
    vscode.window
      .showInputBox({
        password: false,
        ignoreFocusOut: true,
        placeHolder: "input your message",
        prompt: "use enter to send the message"
      })
      .then(msg => {
        axios
          .post(
            "https://hacpai.com/cr/send",
            { content: msg },
            {
              headers: {
                cookie: `symphony=${this.token.getSignToken()}`,
                "User-Agent": "hacpicr/vscode"
              }
            }
          )
          .catch(error => {
            vscode.window.showErrorMessage(error);
          })
          .then();
      });
  }
}
