import * as vscode from "vscode";

export class ChatRoomMessageProvider
  implements vscode.TreeDataProvider<ChatRoomMessage>, vscode.Disposable {
  private history: Array<ChatRoomMessage> = [];
  private _onDidChangeTreeData: vscode.EventEmitter<
    ChatRoomMessage | undefined
  > = new vscode.EventEmitter<ChatRoomMessage | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ChatRoomMessage | undefined> = this
    ._onDidChangeTreeData.event;

  constructor() {}

  getTreeItem(
    element: ChatRoomMessage
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: ChatRoomMessage | undefined
  ): vscode.ProviderResult<ChatRoomMessage[]> {
    return Promise.all(this.history);
  }

  getParent?(element: ChatRoomMessage): vscode.ProviderResult<ChatRoomMessage> {
    return element;
  }

  sendMessage(msg: string) {
    this.history.push(new ChatRoomMessage(msg));
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  dispose(): void {
    this.history = [];
    this._onDidChangeTreeData.dispose();
  }
}

export class ChatRoomMessage extends vscode.TreeItem {}
