import * as vscode from "vscode";
export class ChatRoomMessageProvider
  implements vscode.TreeDataProvider<ChatRoomMessage>, vscode.Disposable {
  private history: Array<ChatRoomMessage> = [];

  private _onDidChangeTreeData: vscode.EventEmitter<
    ChatRoomMessage | undefined
  > = new vscode.EventEmitter<ChatRoomMessage | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ChatRoomMessage | undefined> = this
    ._onDidChangeTreeData.event;

  getTreeItem(
    element: ChatRoomMessage
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(
    element?: ChatRoomMessage | undefined
  ): vscode.ProviderResult<ChatRoomMessage[]> {
    return Promise.resolve(this.history);
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  add(chatRoomMessage: ChatRoomMessage) {
    this.history.unshift(chatRoomMessage);
    this.refresh();
  }

  dispose() {
    this.history = [];
    this._onDidChangeTreeData.dispose();
  }

  clear() {
    this.history = [];
    this.refresh();
  }

}

export class ChatRoomMessage extends vscode.TreeItem {}
