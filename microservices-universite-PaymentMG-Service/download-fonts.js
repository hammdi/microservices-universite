const fs = require('fs');
const path = require('path');
const https = require('https');

const fonts = {
    'Roboto-Regular.ttf': 'https://github.com/google/fonts/blob/main/apache/roboto/static/Roboto-Regular.ttf?raw=true',
    'Roboto-Bold.ttf': 'https://github.com/google/fonts/blob/main/apache/roboto/static/Roboto-Bold.ttf?raw=true',
    'Roboto-Italic.ttf': 'https://github.com/google/fonts/blob/main/apache/roboto/static/Roboto-Italic.ttf?raw=true',
    'Roboto-BoldItalic.ttf': 'https://github.com/google/fonts/blob/main/apache/roboto/static/Roboto-BoldItalic.ttf?raw=true'
};

const fontsDir = path.join(__dirname, 'fonts');

// Create fonts directory if it doesn't exist
if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir);
}

// Download each font
Object.entries(fonts).forEach(([filename, url]) => {
    const filePath = path.join(fontsDir, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`Downloading ${filename}...`);
        
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`${filename} downloaded successfully`);
            });
        });
    } else {
        console.log(`${filename} already exists`);
    }
});
