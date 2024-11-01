import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Register the command
  let disposable = vscode.commands.registerCommand('mermaidFormatter.format', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }

    // Get the selected text
    const document = editor.document;
    const selection = editor.selection;
    const text = document.getText(selection);

    try {
      const formattedText = formatMermaidSequenceDiagram(text);
      editor.edit(editBuilder => {
        editBuilder.replace(selection, formattedText);
      });
      vscode.window.showInformationMessage('Mermaid diagram formatted successfully!');
    } catch (error) {
      vscode.window.showErrorMessage('Error formatting Mermaid diagram: ' + error);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

// Function to format Mermaid sequence diagram
function formatMermaidSequenceDiagram(input: string): string {
	const lines = input.split('\n');
	let formattedLines: string[] = [];
	let indentationLevel = 0;
  
	// Helper function to generate the current indentation string
	function getIndentation(): string {
	  return '    '.repeat(indentationLevel); // Using 4 spaces for each level
	}
  
	lines.forEach(line => {
	  line = line.trim(); // Remove extra whitespace around the line
  
	  // Check for constructs that change indentation
	  if (line.startsWith('alt') || line.startsWith('opt') || line.startsWith('par') || line.startsWith('loop')) {
		// Start of a new block: add line with current indentation and increase level
		formattedLines.push(getIndentation() + line);
		indentationLevel++;
	  } else if (line.startsWith('else')) {
		// 'else' should be at the same level as the opening block
		indentationLevel = Math.max(indentationLevel - 1, 0); // Decrease before 'else'
		formattedLines.push(getIndentation() + line);
		indentationLevel++; // Increase back for the nested content
	  } else if (line.startsWith('end')) {
		// End of a block: decrease indentation level
		indentationLevel = Math.max(indentationLevel - 1, 0);
		formattedLines.push(getIndentation() + line);
	  } else {
		// General content: add line with current indentation
		formattedLines.push(getIndentation() + line);
	  }
	});
  
	return formattedLines.join('\n');
  }
  