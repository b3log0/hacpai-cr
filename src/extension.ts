import * as vscode from "vscode";
import { User } from "./linkstart/user";
import {
  COMMAND_SIGN_OUT,
  COMMADN_SIGN_IN,
  COMMAND_CONNECT,
  COMMAND_SEND,
  VIEW_CHAT_ROOM
} from "./linkstart/constants";
import { ChatRoomClient } from "./linkstart/chatroom.client";
import { ChatRoomMessageProvider } from "./linkstart/chatroom.message.provider";
import { ChatRoomUserProvider } from "./linkstart/chatroom.user.provider";
export function activate(context: vscode.ExtensionContext) {
  const user = new User(context);
  const chatRoomMessageProvider = new ChatRoomMessageProvider();
  const chatRoomUserProvider = new ChatRoomUserProvider();
  const chatRoomClient = new ChatRoomClient(
    context,
    chatRoomMessageProvider,
    chatRoomUserProvider
  );

  vscode.commands.registerCommand(COMMADN_SIGN_IN, async () => {
    await user.sign();
  });

  vscode.commands.registerCommand(COMMAND_SIGN_OUT, async () => {
    await user.signout();
  });

  vscode.commands.registerCommand(COMMAND_CONNECT, async () => {
    await chatRoomClient.connect();
    vscode.window.registerTreeDataProvider(VIEW_CHAT_ROOM,chatRoomMessageProvider);
  });

  vscode.commands.registerCommand(COMMAND_SEND, async () => {
    await chatRoomClient.send();
  });

}
export function deactivate() {}
