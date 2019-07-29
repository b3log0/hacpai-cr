import * as vscode from "vscode";
import * as WebSocket from "websocket";
import { STATE_WS_TOKEN, STATE_SIGNIN_TOKEN } from "./constants";
import { TokenUtil } from "./utils/token.util";
import axios from "axios";
export class Stomp {
  private context: vscode.ExtensionContext;
  private token: TokenUtil;
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.token = new TokenUtil(context);
  }

  connect(): void {
    // let ws = new WebSocket(
    //   `wss://hacpai.com/chat-room-channel?wsToken=${this.context.globalState.get(
    //     STATE_WS_TOKEN
    //   )}`,
    //   { headers: { cookie: `symphony=${this.token.getSignToken()}` } }
    // );
    // ws.pong("123", false);
    // ws.on("pong", (data: any) => {
    //   console.log(data);
    // });
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
              headers: { cookie: `symphony=${this.token.getSignToken()}` }
            }
          )
          .then();
      });
  }
}
