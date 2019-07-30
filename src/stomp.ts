import * as vscode from "vscode";
import { TokenUtil } from "./utils/token.util";
import axios from "axios";
import * as WebSocket from "websocket";
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
    let url =
      "wss://hacpai.com/chat-room-channel?wsToken=" +
      this.context.globalState.get(STATE_WS_TOKEN);
    let client = new WebSocket.client({ webSocketVersion: 13 });
    client.on("connect", (connection: WebSocket.connection) => {
      connection.on("error", (error: Error) => {
        vscode.window.showErrorMessage(error.message);
      });
      connection.on("message", (data: WebSocket.IMessage) => {
        console.log(data);
      });
      connection.on("close", (code, desc) => {
        console.log(code + ":" + desc);
      });
    });
    client.on("connectFailed", (error: Error) => {
      vscode.window.showErrorMessage(error.message);
    });
    client.connect(
      url,
      [],
      "https://hacpai.com",
      { cookie: cookie, "User-Agent": USER_AGENT },
      { headers: { cookie: cookie, "User-Agent": USER_AGENT } }
    );
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
                "User-Agent": USER_AGENT
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
