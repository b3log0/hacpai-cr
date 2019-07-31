import * as vscode from "vscode";

export class ChatRoomMessageProvider implements vscode.TreeDataProvider<ChatRoomMessage> {
  onDidChangeTreeData?:
    | vscode.Event<ChatRoomMessage | null | undefined>
    | undefined;
  getTreeItem(
    element: ChatRoomMessage
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
      return new ChatRoomMessage("这是一条信息");
  }
  getChildren(
    element?: ChatRoomMessage | undefined
  ): vscode.ProviderResult<ChatRoomMessage[]> {
      return Promise.resolve([new ChatRoomMessage("这是一条信息")]);
  }

  getParent?(element: ChatRoomMessage): vscode.ProviderResult<ChatRoomMessage> {
    return element;
  }
}

export class ChatRoomMessage extends vscode.TreeItem {}
