import * as vscode from "vscode";
export class ChatRoomUserProvider
  implements vscode.TreeDataProvider<ChatRoomUser>, vscode.Disposable {
  private users: Array<ChatRoomUser> = [];
  private _onDidChangeTreeData: vscode.EventEmitter<
    ChatRoomUser | undefined
  > = new vscode.EventEmitter<ChatRoomUser | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ChatRoomUser | undefined> = this
    ._onDidChangeTreeData.event;

  getTreeItem(
    element: ChatRoomUser
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(
    element?: ChatRoomUser | undefined
  ): vscode.ProviderResult<ChatRoomUser[]> {
    return Promise.resolve(this.users);
  }
  dispose() {
    this.users = [];
    this._onDidChangeTreeData.dispose();
  }

  setUsers(users: ChatRoomUser[]) {
    this.users = users;
    this.refresh();
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  clean() {
    this.users = [];
    this.refresh();
  }
}
export class ChatRoomUser extends vscode.TreeItem {}
