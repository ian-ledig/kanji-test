const fs = require('fs');
const path = require('path');

const kanjiFilePath = path.join(__dirname, 'assets', 'db', 'all.json');
const kanjiData = JSON.parse(fs.readFileSync(kanjiFilePath, 'utf-8'));

let kanjiList = [];
let count = 0;
let currentKanji = {};
let errors = {};
let level = 5;
let showAnswer = false;

function loadKanjiList(level) {
  kanjiList = [];
  errors = {};
  
  document.getElementById('kanji').textContent = '';
  document.getElementById('translation').textContent = '';
  document.getElementById('answer').textContent = '';

  kanjiList = kanjiData
  .filter(item => item.level === level)
  .filter(item => item.furigana && item.furigana.trim() !== "")
  .map(item => ({
    kanji: item.word,
    kana: item.furigana,
    translation: item.meaning
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
  if(showAnswer){
    document.getElementById('answer').textContent = `${currentKanji.kana}`;
  }
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
      loadRandomKanji();
      count++;
      document.getElementById('count').textContent = count;
    } else {
      errors[currentKanji.kanji] = (errors[currentKanji.kanji] || 0) + 3;
      document.getElementById('answer').textContent = `${currentKanji.kana}`;
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
document.getElementById('toggle-answer').addEventListener('change', (event) => {
  showAnswer = event.target.checked;
  const answerDiv = document.getElementById('answer');

  if(showAnswer){
    answerDiv.textContent = `${currentKanji.kana}`;
  }
  else{
    answerDiv.textContent = '';
  }
});
document.getElementById('setting-input').addEventListener('change', (event) => {
  level = parseInt(event.target.value);
  loadKanjiList(level);
  loadRandomKanji();
});

loadKanjiList(5);
loadRandomKanji();