const { app, BrowserWindow, screen } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 200,
        height: 200,
        x: width - 205,
        y: 5,
        alwaysOnTop: true,
        frame: false,
        show: true,
        skipTaskbar: true,
        webPreferences: {
            preload: `${__dirname}/renderer.js`,
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });

    setInterval(() => {
        if (!mainWindow.isVisible()) {
            const bounds = mainWindow.getBounds();
            mainWindow.setBounds({
                x: bounds.x,
                y: bounds.y,
                width: bounds.width,
                height: bounds.height,
            });
            mainWindow.showInactive();
        }
    }, 600000);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    } else {
        mainWindow.show();
    }
});