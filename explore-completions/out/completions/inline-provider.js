"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineProvider = void 0;
const vscode_1 = require("vscode");
class InlineProvider {
    provideInlineCompletionItems(document, position, context, token) {
        console.log(`providerInlineCompletionItems() line: ${position.line} char: ${position.character}`);
        const parts = document.uri.fsPath.split("/");
        if (parts.length < 2) {
            throw new Error(`Expected a minimum of 2 parts of the path, got ${parts.length}`);
        }
        const relPath = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
        switch (relPath) {
            case 'inline-only/single-line.js':
                return [
                    new vscode_1.InlineCompletionItem("Example inline provider.", new vscode_1.Range(position, position)),
                ];
            case 'inline-only/single-line-fixed.txt':
                return singleLineFixed(document, position);
            case 'inline-only/single-line-moving.txt':
                return singleLineMoving(document, position);
            case 'inline-only/multi-line-fixed.txt':
                return multilineFixed(document, position);
            case 'inline-only/multi-line-moving.txt':
                return multilineMoving(document, position);
            default:
                throw new Error(`Unepxected path: ${relPath}`);
        }
    }
}
exports.InlineProvider = InlineProvider;
function singleLineFixed(document, position) {
    if (position.line !== 0) {
        return [];
    }
    const text = "Example inline provider.";
    const start = new vscode_1.Position(0, 0);
    return [
        new vscode_1.InlineCompletionItem(text, new vscode_1.Range(start, position)),
    ];
}
function multilineFixed(document, position) {
    const text = `Example inline provider.

Hello

World!`;
    const start = new vscode_1.Position(0, 0);
    return [
        new vscode_1.InlineCompletionItem(text, new vscode_1.Range(start, position)),
    ];
}
function singleLineMoving(document, position) {
    if (position.line !== 0) {
        return [];
    }
    const text = "Example inline provider.";
    const start = new vscode_1.Position(0, 0);
    const diff = document.offsetAt(position) - document.offsetAt(start);
    const portion = text.slice(diff);
    return [
        new vscode_1.InlineCompletionItem(portion, new vscode_1.Range(position, position)),
    ];
}
function multilineMoving(document, position) {
    const text = `Example inline provider.

Hello

World!`;
    const start = new vscode_1.Position(0, 0);
    const diff = document.offsetAt(position) - document.offsetAt(start);
    const portion = text.slice(diff);
    return [
        new vscode_1.InlineCompletionItem(portion, new vscode_1.Range(position, position)),
    ];
}
//# sourceMappingURL=inline-provider.js.map