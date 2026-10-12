const fs = require('fs');
const path = require('path');

const srcPath = "C:/Users/Hp/.gemini/antigravity-ide/brain/8e5dcdea-81bd-47c0-989b-e048d86f29d1/.user_uploaded/media_1789629123858.png";
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.copyFileSync(srcPath, path.join(publicDir, 'hero-boutique.png'));
fs.copyFileSync(srcPath, path.join(assetsDir, 'hero-boutique.png'));

// Also create a base64 module in src/data/heroBg.js for instant zero-latency loading
const base64Data = fs.readFileSync(srcPath).toString('base64');
const jsContent = `/* Auto-generated luxury boutique hero background */\nexport const HERO_BOUTIQUE_BG = "data:image/png;base64,${base64Data}";\n`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'heroBg.js'), jsContent, 'utf8');

console.log('HERO_BG_SUCCESSFULLY_COPIED');
