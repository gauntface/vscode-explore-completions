import { CancellationToken, InlineCompletionContext, InlineCompletionItem, InlineCompletionItemProvider, InlineCompletionList, Position, ProviderResult, Range, TextDocument } from "vscode";

export class InlineProvider implements InlineCompletionItemProvider {
  provideInlineCompletionItems(document: TextDocument, position: Position, context: InlineCompletionContext, token: CancellationToken): ProviderResult<InlineCompletionItem[] | InlineCompletionList> {
    console.log(`providerInlineCompletionItems() line: ${position.line} char: ${position.character}`);
    const parts = document.uri.fsPath.split("/");
    if (parts.length < 2) {
      throw new Error(`Expected a minimum of 2 parts of the path, got ${parts.length}`);
    }

    const relPath = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
    switch(relPath) {
      case 'inline-only/single-line.js':
        return [
          new InlineCompletionItem("Example inline provider.", new Range(position, position)),
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

function singleLineFixed(document: TextDocument, position: Position): InlineCompletionItem[] {
  if (position.line !== 0) {
    return [];
  }

  const text = "Example inline provider.";
  const start = new Position(0, 0);
  return [
    new InlineCompletionItem(text, new Range(start, position)),
  ];
}

function multilineFixed(document: TextDocument, position: Position): InlineCompletionItem[] {
  const text = `Example inline provider.

Hello

World!`;
  const start = new Position(0, 0);
  return [
    new InlineCompletionItem(text, new Range(start, position)),
  ];
}

function singleLineMoving(document: TextDocument, position: Position): InlineCompletionItem[] {
  if (position.line !== 0) {
    return [];
  }

  const text = "Example inline provider.";
  const start = new Position(0, 0);
  const diff = document.offsetAt(position) - document.offsetAt(start);
  const portion = text.slice(diff);
  return [
    new InlineCompletionItem(portion, new Range(position, position)),
  ];
}

function multilineMoving(document: TextDocument, position: Position): InlineCompletionItem[] {
  const text = `Example inline provider.

Hello

World!`;
  const start = new Position(0, 0);
  const diff = document.offsetAt(position) - document.offsetAt(start);
  const portion = text.slice(diff);
  return [
    new InlineCompletionItem(portion, new Range(position, position)),
  ];
}
