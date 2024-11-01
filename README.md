# Mermaid Formatter

A VSCode extension to format Mermaid sequence diagrams for better readability.

## Features
- Formats Mermaid sequence diagrams with consistent indentation and spacing.
- Supports sequence diagram components like `par`, `note`, `alt`, etc.

## Usage
- Select the Mermaid diagram text.
- Use the command palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS) and run "Format Mermaid Diagram".

## Installation
- Install from the VSIX package or from the Visual Studio Code Marketplace (when published).


# Developer Commands

* Create a VSIX package for any code changes
```
npm run compile; vsce package  
```

* Import VSIX package