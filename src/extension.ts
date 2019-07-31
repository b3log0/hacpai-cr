import * as vscode from "vscode";
import { User } from ".//user";
import {
  COMMAND_SIGN_OUT,
  COMMADN_SIGN_IN,
  COMMAND_CONNECT,
  COMMAND_SEND,
  VIEW_CHAT_ROOM,
  VIEW_CHAT_ROOM_USERS
} from ".//constants";
import { ChatRoomClient } from ".//chatroom.client";
import { ChatRoomMessageProvider } from "./chatroom.message.provider";
import { ChatRoomUserProvider } from "./chatroom.user.provider";
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

  vscode.commands.registerCommand(COMMAND_CONNECT, async () => {
    await chatRoomClient.connect();
    vscode.window.registerTreeDataProvider(
      VIEW_CHAT_ROOM,
      chatRoomMessageProvider
    );
    vscode.window.registerTreeDataProvider(
      VIEW_CHAT_ROOM_USERS,
      chatRoomUserProvider
    );
  });

  vscode.commands.registerCommand(COMMAND_SEND, async () => {
    await chatRoomClient.send();
  });

  vscode.commands.registerCommand(COMMAND_SIGN_OUT, async () => {
    await user.signout();
    chatRoomClient.disconnect();
  });
}
export function deactivate() {}
