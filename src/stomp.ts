import * as vscode from "vscode";
import * as WebSocket from "ws";
import { STATE_WS_TOKEN } from "./constants";
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
    let ws = new WebSocket(`wss://hacpai.com/user-channel?url=https://hacpai.com/cr&wsToken=${this.context.globalState.get(STATE_WS_TOKEN)}`);
    ws.on("message", data => {
      console.log(data);
    });
  }

  send(): void {
    vscode.window.showInputBox({
      password: false,
      ignoreFocusOut: true,
      placeHolder: "input your message",
      prompt: "use enter to send the message"
    }).then(msg=>{
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
