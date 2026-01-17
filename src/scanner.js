import { Html5Qrcode } from "html5-qrcode";

let html5QrCode;
let isScanning = false;

export function initScanner() {
    if (isScanning) return;

    const resultCard = document.getElementById('scan-result');
    const resultText = document.getElementById('result-text');
    const scanAgainBtn = document.getElementById('scan-again-btn');
    const copyBtn = document.getElementById('copy-btn');
    const openBtn = document.getElementById('open-btn');

    // Hide result card initially
    resultCard.classList.add('hidden');

    // Initialize
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        stopScanner(); // Stop scanning on success

        // Show Result
        resultText.textContent = decodedText;
        resultCard.classList.remove('hidden');

        // Handle Actions
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(decodedText);
            copyBtn.textContent = "Copied!";
            setTimeout(() => copyBtn.textContent = "Copy", 2000);
        };

        if (isValidUrl(decodedText)) {
            openBtn.style.display = 'block';
            openBtn.onclick = () => window.open(decodedText, '_blank');
        } else {
            openBtn.style.display = 'none';
        }
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .then(() => {
            isScanning = true;
        })
        .catch(err => {
            console.error("Error starting scanner", err);
            // Handle permission errors etc.
            document.querySelector('.scan-instructions').textContent = "Camera access denied or error.";
        });

    scanAgainBtn.onclick = () => {
        resultCard.classList.add('hidden');
        initScanner();
    };
}

export function stopScanner() {
    if (html5QrCode && isScanning) {
        html5QrCode.stop().then(() => {
            isScanning = false;
        }).catch(err => console.error("Failed to stop", err));
    }
}

function isValidUrl(string) {
    try { return Boolean(new URL(string)); } catch (e) { return false; }
}
