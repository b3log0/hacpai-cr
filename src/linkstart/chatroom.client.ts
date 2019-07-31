import * as vscode from "vscode";
import { ChatRoomMessageProvider } from "./chatroom.message.provider";
import { ChatRoomUserProvider } from "./chatroom.user.provider";
import * as WebSocket from "websocket";
import { HeaderUtil } from "./header.util";
import { $HACPI_ORIGIN, $HACPI_HOST, $SEND_URL } from "./constants";
import axios from "axios";
export class ChatRoomClient {
  private context: vscode.ExtensionContext;
  private messageDataProvider: ChatRoomMessageProvider;
  private userDataProvider: ChatRoomUserProvider;
  private client: WebSocket.client;
  private headerUtil: HeaderUtil;
  constructor(
    context: vscode.ExtensionContext,
    messageDataProvider: ChatRoomMessageProvider,
    userDataProvider: ChatRoomUserProvider
  ) {
    this.context = context;
    this.messageDataProvider = messageDataProvider;
    this.userDataProvider = userDataProvider;
    this.headerUtil = new HeaderUtil(context);
    this.client = new WebSocket.client();
  }

  connect() {
    let headers = {
      Host: $HACPI_HOST,
      Cookie: this.headerUtil.cookie,
      "User-Agent": this.headerUtil.cookie,
      Upgrade: "websocket"
    };
    this.client.on("connect", (connection: WebSocket.connection) => {
      connection.on("error", error => {
        vscode.window.showErrorMessage(error.message);
      });
      connection.on("close", (code, desc) => {
        vscode.window.showErrorMessage(`${code}:${desc}`);
      });
      connection.on("message", data => {
        console.log(data);
      });
    });
    this.client.on("connectFailed", error => {
      vscode.window.showErrorMessage(error.message);
    });
    this.client.connect(this.headerUtil.wsuri, [], $HACPI_ORIGIN, headers, {
      headers: headers
    });
  }

  async disconnect() {}

  send() {
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
            $SEND_URL,
            { content: msg },
            {
              headers: this.headerUtil.headers
            }
          )
          .catch(error => {
            vscode.window.showErrorMessage(error);
          })
          .then();
      });
  }
}
