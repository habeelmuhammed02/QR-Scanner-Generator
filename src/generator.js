import QRCode from 'qrcode';

export function initGenerator() {
    const generateBtn = document.getElementById('generate-btn');
    const input = document.getElementById('qr-input');
    const outputDiv = document.getElementById('qr-output');
    const canvas = document.getElementById('qr-canvas');
    const downloadBtn = document.getElementById('download-btn');

    generateBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        QRCode.toCanvas(canvas, text, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function (error) {
            if (error) console.error(error);
            outputDiv.classList.remove('hidden');
        });
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
