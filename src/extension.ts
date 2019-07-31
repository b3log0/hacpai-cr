import * as vscode from "vscode";
import {
  COMMADN_SIGN_IN,
  COMMAND_CONNECT,
  COMMAND_SEND,
  COMMAND_SIGN_OUT,
  VIEW_CHAT_ROOM_USERS,
  VIEW_CHAT_ROOM
} from "./constants";
import { Oauth } from "./oauth";
import { Stomp } from "./stomp";
import { ChatRoomMessageProvider } from "./chatroom.message";
import { ChatRoomUserProvider } from "./chatroom.user";
export function activate(context: vscode.ExtensionContext) {
  let oauth = new Oauth(context);
  let stomp = new Stomp(context);

  const chatRoomMessageProvider = new ChatRoomMessageProvider();
  const chatRoomUserProvider = new ChatRoomUserProvider();
  vscode.window.registerTreeDataProvider(VIEW_CHAT_ROOM, chatRoomMessageProvider);
  vscode.window.registerTreeDataProvider(VIEW_CHAT_ROOM_USERS,chatRoomUserProvider);

  vscode.commands.registerCommand(COMMADN_SIGN_IN, async () => {
    await oauth.auth();
  });

  vscode.commands.registerCommand(COMMAND_CONNECT, async () => {
    await stomp.connect();
  });

  vscode.commands.registerCommand(COMMAND_SEND, async () => {
    await stomp.send();
  });

  vscode.commands.registerCommand(COMMAND_SIGN_OUT, async () => {
    await oauth.singout();
  });
}
export function deactivate() {}
