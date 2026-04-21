const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const stack = [];
  const tags = content.match(/<(?:\/\w+|\w+)[^>]*>/g) || [];

  for (const tag of tags) {
    if (tag.startsWith('<!--') || tag.endsWith('/>')) continue;
    
    // Extract tag name
    const match = tag.match(/<\/?(\w+)/);
    if (!match) continue;
    const tagName = match[1].toLowerCase();

    if (tag.startsWith('</')) {
      if (stack.length === 0) {
        console.log(`[ERROR] Extra closing tag </${tagName}> in ${filePath}`);
        return;
      }
      const last = stack.pop();
      if (last !== tagName) {
        console.log(`[ERROR] Mismatched tag: expected </${last}> but found </${tagName}> in ${filePath}`);
        return;
      }
    } else {
      // Self-closing tag check (not perfect for HTML but good for Vue components used as such)
      if (tag.endsWith('/>')) continue;
      stack.push(tagName);
    }
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.vue')) {
      checkFile(fullPath);
    }
  }
}

walk('./src');
