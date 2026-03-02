// ===== DOM Elements =====
const form = document.getElementById('encrypt-form');
const inputText = document.getElementById('texto');
const outputText = document.getElementById('textopronto');
const submitBtn = document.getElementById('submit-btn');
const copyBtn = document.getElementById('copy-btn');
const inputCount = document.getElementById('input-count');
const outputCount = document.getElementById('output-count');

// ===== Character Mapping (Homoglyphs) =====
const homoglyphs = {
    // Lowercase
    'a': 'а', // Cyrillic
    'c': 'с',
    'e': 'е',
    'i': 'і',
    'o': 'о',
    'p': 'р',
    's': 'ѕ',

    // Uppercase
    'A': 'А',
    'B': 'В',
    'C': 'С',
    'E': 'Е',
    'H': 'Н',
    'I': 'І',
    'J': 'Ј',
    'K': 'К',
    'M': 'М',
    'O': 'О',
    'P': 'Р',
    'S': 'Ѕ',
    'T': 'Т',
    'X': 'Х',
    'Y': 'Ү'
};

// Zero-width character
const ZERO_WIDTH = '\u200B';

// ===== Helper Functions =====
function updateCharCount(text, element) {
    const count = text.length;
    const label = count === 1 ? 'caractere' : 'caracteres';
    element.textContent = `${count} ${label}`;
}

function splitIntoChars(str) {
    return [...str];
}

function encrypt(text) {
    // Replace characters with homoglyphs
    let encrypted = text.replace(/[a-zA-Z]/g, char => homoglyphs[char] || char);

    // Insert zero-width characters between each character
    return splitIntoChars(encrypted).join(ZERO_WIDTH);
}

// ===== Event Handlers =====
function handleEncrypt(event) {
    event.preventDefault();

    const text = inputText.value;

    if (!text.trim()) {
        inputText.focus();
        return;
    }

    // Add loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="btn-icon" style="animation: spin 1s linear infinite" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.4 31.4" stroke-linecap="round"/>
        </svg>
        <span>Processando...</span>
    `;

    // Small delay for visual feedback
    setTimeout(() => {
        const encrypted = encrypt(text);
        outputText.value = encrypted;
        updateCharCount(encrypted, outputCount);

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
            </svg>
            <span>Criptografado!</span>
        `;

        // Reset to original after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                </svg>
                <span>Criptografar Texto</span>
            `;
        }, 2000);

    }, 300);
}

function controlc() {
    const text = outputText.value;

    if (!text) return;

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        copyBtn.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        outputText.select();
        outputText.setSelectionRange(0, 99999);
        document.execCommand('copy');

        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
    });
}

// ===== Event Listeners =====
form.addEventListener('submit', handleEncrypt);

inputText.addEventListener('input', (e) => {
    updateCharCount(e.target.value, inputCount);
});

outputText.addEventListener('input', (e) => {
    updateCharCount(e.target.value, outputCount);
});

// Keyboard shortcut: Ctrl+Enter to encrypt
inputText.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        handleEncrypt(e);
    }
});

// ===== CSS for spinner animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
updateCharCount('', inputCount);
updateCharCount('', outputCount);
