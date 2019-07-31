import * as vscode from "vscode";

export class ChatRoomMessageProvider implements vscode.TreeDataProvider<ChatRoomMessage> {
  onDidChangeTreeData?:
    | vscode.Event<ChatRoomMessage | null | undefined>
    | undefined;
  getTreeItem(
    element: ChatRoomMessage
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(
    element?: ChatRoomMessage | undefined
  ): vscode.ProviderResult<ChatRoomMessage[]> {
      return Promise.resolve([new ChatRoomMessage("这是一条信息1")]);
  }

  getParent?(element: ChatRoomMessage): vscode.ProviderResult<ChatRoomMessage> {
    return element;
  }
}

export class ChatRoomMessage extends vscode.TreeItem {}
