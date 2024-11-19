const fs = require('fs');
const path = require('path');

const kanjiFilePath = path.join(__dirname, 'assets', 'kanji.txt');
const kanjiList = fs.readFileSync(kanjiFilePath, 'utf-8')
  .split('\n')
  .filter(line => line.trim())
  .map(line => {
    const [kanji, kana, translation] = line.split('　');
    return { kanji, kana, translation };
  });

let currentKanji = {};

function loadRandomKanji() {
  currentKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
  document.getElementById('kanji').textContent = currentKanji.kanji;
  document.getElementById('translation').textContent = `${currentKanji.translation}`;
}

document.getElementById('close').addEventListener('click', () => {
  window.close();
});

document.getElementById('input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const userInput = document.getElementById('input').value.trim();
    
    if (userInput.localeCompare(currentKanji.kana, undefined, { sensitivity: 'base' }) === 0) {
      document.getElementById('log').textContent = '';
      loadRandomKanji();
    } else {
      document.getElementById('log').textContent = `Correction: ${currentKanji.kana}`;
    }
    document.getElementById('input').value = '';
  }
});

loadRandomKanji();