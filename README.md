# Kanji Test

Kanji Test is an interactive application designed to help users learn and memorize Japanese kanji characters. The app provides a simple, yet effective way to practice kanji readings (kana) by displaying random kanji and prompting the user to input the correct kana. It's perfect for beginners and those looking to reinforce their knowledge of kanji.

## Features

- **Random Kanji Display**: The app shows random kanji characters from a list, making it easy to practice new ones regularly.
- **Kana Input**: Test your knowledge by typing the correct kana for each displayed kanji.
- **Real-time Feedback**: The app will inform you whether your answer is correct or incorrect and help you learn the correct kana if necessary.
- **Automatic Revision**: If you close the application, it will automatically reopen after 10 minutes for effective revision. This ensures that you can continue practicing without forgetting what you've learned.
- **Translation Option**: You can choose to enable or disable the translation feature, tailoring the experience to your preference or learning needs.
- **Intelligent Error Correction**: The app features an intelligent system that highlights and revisits specific kanji or kana you frequently make mistakes on, helping you strengthen your weak points.
- **Simple and Intuitive Interface**: The app has a clean, user-friendly interface to focus solely on learning kanji.
- **Select Kanji Readings**: You can choose whether to focus on Sino-Japanese (音読み, on'yomi) readings or native Japanese (訓読み, kun'yomi) readings, tailoring the experience to your learning preferences.
- **Kanji Level Selection**: You can select the level of kanji from JLPT levels 5 to 1, allowing you to practice kanji at your own proficiency level.

Random Kanji Display: The app shows random kanji characters from a list, making it easy to practice new ones regularly.
Kana Input: Test your knowledge by typing the correct kana for each displayed kanji.
Real-time Feedback: The app will inform you whether your answer is correct or incorrect and help you learn the correct kana if necessary.
Automatic Revision: If you close the application, it will automatically reopen after 10 minutes for effective revision. This ensures that you can continue practicing without forgetting what you've learned.
Translation Option: You can choose to enable or disable the translation feature, tailoring the experience to your preference or learning needs.
Intelligent Error Correction: The app features an intelligent system that highlights and revisits specific kanji or kana you frequently make mistakes on, helping you strengthen your weak points.
Simple and Intuitive Interface: The app has a clean, user-friendly interface to focus solely on learning kanji.

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

## Edit words

You can easily edit the word list by applying changes to the `assets/kanji.txt` file.

## Usage

Once you open the app, you will see a kanji character displayed on the screen. You can type its kana (hiragana or katakana) in the input box and press Enter to move to the next kanji.

If you get the correct answer, the app will load a new kanji for you to practice. If your answer is incorrect, it will show you the correct kana.

## Author

This project is developed by Ian LEDIG. I created this app to help learners practice Japanese kanji in a fun and interactive way. Feel free to contribute, suggest improvements, or report issues!

## Screen

Below is a screenshot of the application in action:

![kanjitest0](https://github.com/user-attachments/assets/a0e41fb7-b08a-4d98-bafe-4f69d70e39b9)
![kanjitest1](https://github.com/user-attachments/assets/0a53c660-5e96-412f-872c-f6b62d79743b)

The screen displays a random kanji character with an input box for typing the correct kana. You can see the feedback after entering your answer.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ian-ledig/kanji-test/blob/master/LISENCE) file for details.

