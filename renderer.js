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

let count = 0;
let currentKanji = {};
let errors = {};

function loadRandomKanji() {
  if(count % 3 === 1 && errors.length !== 0){
    // review previous mistakes
    const errorKanji = Object.keys(errors).reduce((a, b) => errors[a] > errors[b] ? a : b);
    currentKanji = kanjiList.find(kanji => kanji.kanji === errorKanji);

    errors[errorKanji] = Math.max(0, errors[errorKanji] - 1);
    if (errors[errorKanji] === 0) {
      delete errors[errorKanji];
    }

    const mainPage = document.getElementById('main-page');
    mainPage.style.backgroundColor = '#fcf3cf';
  } else {
    // load random kanji
    currentKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];

    const mainPage = document.getElementById('main-page');
    mainPage.style.backgroundColor = '#F9F6EE';
  }

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

      count++;
      document.getElementById('count').textContent = count;
    } else {
      errors[currentKanji.kanji] = errors[currentKanji.kanji] + 3;
      document.getElementById('log').textContent = `Correction: ${currentKanji.kana}`;
    }
    document.getElementById('input').value = '';
  }
});

document.getElementById('settings').addEventListener('click', (event) => {
  const mainPage = document.getElementById('main-page');
  const SettingsPage = document.getElementById('settings-page');

  if(mainPage.style.display == 'none'){
    mainPage.style.display = 'flex';
    SettingsPage.style.display = 'none';
  } else {
    mainPage.style.display = 'none';
    SettingsPage.style.display = 'flex';
  }
});

document.getElementById('toggle-translation').addEventListener('change', (event) => {
  const translationDiv = document.getElementById('translation');
  translationDiv.style.display = event.target.checked ? 'flex' : 'none';
});

loadRandomKanji();