const fs = require('fs');
const path = require('path');

const kanjiFilePath = path.join(__dirname, 'assets', 'kanji-jouyou.json');
const kanjiData = JSON.parse(fs.readFileSync(kanjiFilePath, 'utf-8'));

let kanjiList = [];
let count = 0;
let currentKanji = {};
let errors = {};
let kun = true;
let level = 5;

function loadKanjiList(level, kun) {
  kanjiList = [];
  errors = {};
  
  document.getElementById('kanji').textContent = '';
  document.getElementById('translation').textContent = '';
  document.getElementById('log').textContent = '';

  kanjiList = Object.entries(kanjiData)
    .filter(([_, details]) => details.jlpt_new === level)
    .map(([kanji, details]) => ({
      kanji,
      kana: kun 
        ? (details.readings_kun.length > 0 ? details.readings_kun[0] : details.readings_on[0])
        : (details.readings_on.length > 0 ? details.readings_on[0] : details.readings_kun[0]),
      translation: details.meanings[0],
    }));
}

function loadRandomKanji() {
  const mainPage = document.getElementById('main-page');

  if (count % 3 === 1 && Object.keys(errors).length !== 0) {
    // review mistakes
    const errorKanji = Object.keys(errors).reduce((a, b) =>
      errors[a] > errors[b] ? a : b
    );
    currentKanji = kanjiList.find(kanji => kanji.kanji === errorKanji);

    errors[errorKanji] = Math.max(0, errors[errorKanji] - 1);
    if (errors[errorKanji] === 0) {
      delete errors[errorKanji];
    }
    mainPage.style.backgroundColor = '#fcf3cf';
  } else {
    // load random kanji
    currentKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    mainPage.style.backgroundColor = '#F9F6EE';
  }

  document.getElementById('kanji').textContent = currentKanji.kanji;
  document.getElementById('translation').textContent = `${currentKanji.translation}`;
}

document.getElementById('close').addEventListener('click', () => {
  window.close();
});

document.getElementById('kana-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const userInput = document.getElementById('kana-input').value.trim();

    const cleanedKana = currentKanji.kana.replace(/[-.]/g, '');
    if (
      userInput.localeCompare(
        cleanedKana,
        undefined,
        { sensitivity: 'base' }
      ) === 0
    ) {
      document.getElementById('log').textContent = '';
      loadRandomKanji();

      count++;
      document.getElementById('count').textContent = count;
    } else {
      errors[currentKanji.kanji] = (errors[currentKanji.kanji] || 0) + 3;
      document.getElementById('log').textContent = `Correction: ${currentKanji.kana}`;
    }
    document.getElementById('kana-input').value = '';
  }
});

document.getElementById('settings').addEventListener('click', (event) => {
  const mainPage = document.getElementById('main-page');
  const settingsPage = document.getElementById('settings-page');

  if (mainPage.style.display == 'none') {
    mainPage.style.display = 'flex';
    settingsPage.style.display = 'none';
  } else {
    mainPage.style.display = 'none';
    settingsPage.style.display = 'flex';
  }
});

// settings
document.getElementById('toggle-translation').addEventListener('change', (event) => {
  const translationDiv = document.getElementById('translation');
  translationDiv.style.display = event.target.checked ? 'flex' : 'none';
});
document.getElementById('toggle-kun').addEventListener('change', (event) => {
  kun = !event.target.checked;
  loadKanjiList(level, kun);
  loadRandomKanji();
});
document.getElementById('setting-input').addEventListener('change', (event) => {
  level = parseInt(event.target.value);
  loadKanjiList(level, kun);
  loadRandomKanji();
});

loadKanjiList(5, true);
loadRandomKanji();