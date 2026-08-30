const fs = require('fs');
const path = require('path');

const jsFiles = [
  'countries.js',
  'i18n.js',
  'leaderboard.js',
  'audio.js',
  'state.js',
  'app.js'
];

let bundleContent = "(function() {\n'use strict';\n\n";

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, 'js', file), 'utf-8');
  bundleContent += // --- Module: js/ + file +  ---\n;
  bundleContent += content + '\n\n';
});

bundleContent += "})();\n";

fs.writeFileSync(path.join(__dirname, 'js', 'bundle.js'), bundleContent);
console.log('js/bundle.js generated.');

const indexHtmlPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const startTag = '<script>';
const endTag = '</script>';

const startIndex = indexHtml.indexOf(startTag);
const endIndex = indexHtml.lastIndexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  const before = indexHtml.substring(0, startIndex + startTag.length);
  const after = indexHtml.substring(endIndex);
  const newIndexHtml = before + '\n' + bundleContent + after;
  fs.writeFileSync(indexHtmlPath, newIndexHtml);
  console.log('index.html updated with bundled js.');
} else {
  console.error('Could not find script tags in index.html');
}
