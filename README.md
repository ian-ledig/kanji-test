# Japanese Vocabulary Test

Vocabulary Test is an interactive application designed to help users learn and memorize Japanese vocabulary characters. The app provides a simple, yet effective way to practice vocabulary readings (kana) by displaying random vocabulary words and prompting the user to input the correct kana. It's perfect for beginners and those looking to reinforce their knowledge of vocabulary.

## Features

- **Random Vocabulary Display**: The app shows random vocabulary from a list, making it easy to practice new ones regularly.
- **Kana Input**: Test your knowledge by typing the correct kana for each displayed vocabulary words.
- **Real-time Feedback**: The app will inform you whether your answer is correct or incorrect and help you learn the correct kana if necessary.
- **Automatic Revision**: If you close the application, it will automatically reopen after 10 minutes for effective revision. This ensures that you can continue practicing without forgetting what you've learned.
- **Intelligent Error Correction**: The app features an intelligent system that highlights and revisits specific words you frequently make mistakes on, helping you strengthen your weak points.
- **Show Translation Option**: You can choose to show the translation of words.
- **Show Answer Option**: You can choose to show the answers before entering it.
- **Vocabulary Level Selection**: You can select the level of difficulty from JLPT levels 5 to 1, allowing you to practice vocabulary at your own proficiency level.
- **Custom Words List**: Allow importing custom word list in the application by placing `json` files in `assets/db/custom`.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ian-ledig/kanji-test.git
   cd kanji-test
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Run the app in development mode:

   ```bash
   npm start
   ```

## Building the Executable

1. Build the Executable

   ```bash
   npm run dist
   ```

2. Locate the Executable

   After the build process finishes, you will find the generated installer in the `dist/` directory of your project. For example:

   Windows: You will find an `.exe` installer.  
   macOS: The app will be packaged as a `.dmg` file.  
   Linux: You will find a `.deb` or `.AppImage` file, depending on your system configuration.

## Usage

Once you open the app, you will see a word displayed on the screen. You can type its kana in the input box and press Enter to move to the next word.

If you get the correct answer, the app will load a new word for you to practice. If your answer is incorrect, it will show you the correct kana.

## Author

This project is developed by [Ian LEDIG](https://github.com/ian-ledig). I created this app to help learners practice Japanese vocabulary in a fun and interactive way. Feel free to contribute, suggest improvements, or report issues!

## Contributor

Thanks to [Kei](https://github.com/wkei) and [Julien Fontanier](https://www.youtube.com/@coursdejaponais) for the vocabulary list.

## Screen

Below is a screenshot of the application in action:

![kanjitest0](https://github.com/user-attachments/assets/22ce9675-a9d9-43f8-b6a3-2a8b0441102b)
![kanjitest1](https://github.com/user-attachments/assets/4ec6d636-56b0-400e-8eea-50fc3679fde2)
![kanjitest2](https://github.com/user-attachments/assets/8278994e-78b2-41d3-a125-176bfd6d7be4)

The screen displays a random word with an input box for typing the correct kana. You can see the feedback after entering your answer.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ian-ledig/kanji-test/blob/master/LISENCE) file for details.
