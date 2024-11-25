const fs = require('fs');
const path = require('path');
const { shell } = require('electron');

const kanjiFilePath = path.join(__dirname, 'assets', 'db', 'all.json');
const customFolderPath = path.join(__dirname, 'assets', 'db', 'custom');

let kanjiList = [];
let count = 0;
let currentKanji = {};
let errors = {};
let level = 5;
let showAnswer = false;
let wordsCustom = false;

function loadKanjiList() { 
  kanjiList = [];
  errors = {};

  document.getElementById('kanji').textContent = '';
  document.getElementById('translation').textContent = '';
  document.getElementById('answer').textContent = '';

  if (wordsCustom) {
    const checkedFiles = Array.from(document.querySelectorAll('#words-list-page input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.dataset.file);

    if (checkedFiles.length > 0) {
      checkedFiles.forEach(file => {
        const filePath = path.join(customFolderPath, file);
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        kanjiList.push(
          ...fileContent.content.map(item => ({
            kanji: item.word,
            kana: item.furigana,
            translation: item.meaning,
          }))
        );
      });
    }
  } else {
    kanjiList = JSON.parse(fs.readFileSync(kanjiFilePath, 'utf-8'))
    .filter(item => item.level === level)
    .filter(item => item.furigana && item.furigana.trim() !== "")
    .map(item => ({
      kanji: item.word,
      kana: item.furigana,
      translation: item.meaning
    }));
  }

  loadRandomKanji();
}

function loadCustomFiles() {
  const categoryDiv = document.getElementById('words-list-category');

  fs.readdir(customFolderPath, (err, files) => {
    if (err) {
      console.error("Can't find custom folder:", err);
      return;
    }

    const jsonFiles = files.filter(file => file.endsWith('.json'));

    jsonFiles.forEach(file => {
      const filePath = path.join(customFolderPath, file);
      const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const fileName = fileContent.name || file.replace('.json', '');

      const checkboxWrapper = document.createElement('div');
      checkboxWrapper.classList.add('checkbox-wrapper');

      const inputCheckbox = document.createElement('input');
      inputCheckbox.type = 'checkbox';
      inputCheckbox.id = `toggle-${fileName}`;
      inputCheckbox.dataset.file = file;
      inputCheckbox.checked = false;
      inputCheckbox.addEventListener('change', handleCheckboxChange);

      const label = document.createElement('label');
      label.setAttribute('for', `toggle-${fileName}`);
      label.classList.add('toggle');
      label.innerHTML = '<span></span>';

      const divName = document.createElement('div');
      divName.textContent = fileName;

      checkboxWrapper.appendChild(inputCheckbox);
      checkboxWrapper.appendChild(label);
      checkboxWrapper.appendChild(divName);
      categoryDiv.appendChild(checkboxWrapper);
    });
  });
}

function handleCheckboxChange(event) {
  loadKanjiList();
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
  document.getElementById('translation').textContent = currentKanji.translation;
  document.getElementById('answer').style.color = '#196f3d';
  if(showAnswer){
    document.getElementById('answer').textContent = currentKanji.kana;
  }
  else{
    document.getElementById('answer').textContent = '';
  }
}

document.getElementById('kana-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const userInput = document.getElementById('kana-input').value.trim();

    // if there is multiple kana options, we accept any of them
    const kanaOptions = currentKanji.kana.split('/').map(k => k.trim());
    const isCorrect = kanaOptions.some(kana => 
      userInput.localeCompare(
        kana.replace(/[-.]/g, ''),
        undefined,
        { sensitivity: 'base' }
      ) === 0
    );

    if (isCorrect) {
      loadRandomKanji();
      count++;
      document.getElementById('count').textContent = count;
    } else {
      errors[currentKanji.kanji] = (errors[currentKanji.kanji] || 0) + 3;
      document.getElementById('answer').style.color = '#7b241c';
      document.getElementById('answer').textContent = `${currentKanji.kana}`;
    }
    document.getElementById('kana-input').value = '';
  }
});

document.getElementById('settings').addEventListener('click', (event) => {
  const mainPage = document.getElementById('main-page');
  const settingsPage = document.getElementById('settings-page');
  const wordsListPage = document.getElementById('words-list-page');
  const backDiv = document.getElementById('back');

  if (mainPage.style.display == 'none') {
    mainPage.style.display = 'flex';
    settingsPage.style.display = 'none';
    wordsListPage.style.display = 'none';
  } else {
    mainPage.style.display = 'none';
    settingsPage.style.display = 'flex';
  }
  backDiv.style.display = 'none';
});

document.getElementById('back').addEventListener('click', (event) => {
  const settingsPage = document.getElementById('settings-page');
  const wordsListPage = document.getElementById('words-list-page');
  const backDiv = document.getElementById('back');

  wordsListPage.style.display = 'none';
  settingsPage.style.display = 'flex';
  backDiv.style.display = 'none';
});

document.getElementById('words-list-button').addEventListener('click', (event) => {
  const settingsPage = document.getElementById('settings-page');
  const wordsListPage = document.getElementById('words-list-page');
  const BackDiv = document.getElementById('back');

  settingsPage.style.display = 'none';
  wordsListPage.style.display = 'flex';
  BackDiv.style.display = 'flex';

  loadKanjiList();
});

document.getElementById('close').addEventListener('click', () => {
  window.close();
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
document.getElementById('words-list').addEventListener('change', (event) => {
  wordsCustom = event.target.checked;
  loadKanjiList();
});
document.getElementById('language-level').addEventListener('change', (event) => {
  wordsCustom = !event.target.checked;
  loadKanjiList();
});
document.getElementById('setting-input').addEventListener('change', (event) => {
  level = parseInt(event.target.value);
  loadKanjiList();
  loadRandomKanji();
});
document.getElementById('version').addEventListener('click', (event) => {
  event.preventDefault();
  shell.openExternal(event.target.href);
});

loadCustomFiles();
loadKanjiList();