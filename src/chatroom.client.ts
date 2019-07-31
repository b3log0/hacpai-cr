import * as vscode from "vscode";
import {
  ChatRoomMessageProvider,
  ChatRoomMessage
} from "./chatroom.message.provider";
import { ChatRoomUserProvider, ChatRoomUser } from "./chatroom.user.provider";
import * as WebSocket from "websocket";
import { HeaderUtil } from "./header.util";
import { $HACPAI_ORIGIN, $HACPAI_HOST, $SEND_URL } from "./constants";
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
      Host: $HACPAI_HOST,
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
        if (data.type === "utf8") {
          let msg = JSON.parse(data.utf8Data as string);
          console.log(msg);
          switch (msg.type) {
            case "online":
              let users: Array<ChatRoomUser> = [];
              msg.users.forEach((user: any) => {
                users.push(new ChatRoomUser(user.userName));
              });
              this.userDataProvider.setUsers(users);
              break;
            case "msg":
              this.messageDataProvider.add(new ChatRoomMessage(msg.content));
              break;
          }
        }
      });
    });
    this.client.on("connectFailed", error => {
      vscode.window.showErrorMessage(error.message);
    });
    this.client.connect(this.headerUtil.wsuri, [], $HACPAI_ORIGIN, headers, {
      headers: headers
    });
  }

  async disconnect() {
  }

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
