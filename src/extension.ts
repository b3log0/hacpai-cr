// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let hacpicr = vscode.commands.registerCommand('extension.hacpicr', () => {
		vscode.window.showInformationMessage("hacpiLogin");
	});

	let window = vscode.commands.registerCommand('hacpi-cr', () => {
		console.log('1111');
	});
	
	context.subscriptions.push(hacpicr);
	context.subscriptions.push(window);

}
export function deactivate() { }
