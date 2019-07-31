import * as vscode from "vscode";
export class ChatRoomUserProvider
  implements vscode.TreeDataProvider<ChatRoomUser> {
  onDidChangeTreeData?: vscode.Event<ChatRoomUser>;
  getTreeItem(
    element: ChatRoomUser
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return new ChatRoomUser("用户列表");
  }
  getChildren(element?: ChatRoomUser): vscode.ProviderResult<ChatRoomUser[]> {
    return Promise.resolve([
      new ChatRoomUser("这是一个人"),
    ]);
  }
  getParent?(element: ChatRoomUser): vscode.ProviderResult<ChatRoomUser> {
    return element;
  }
}

export class ChatRoomUser extends vscode.TreeItem {}
