const btn = document.getElementById('go');

btn.addEventListener('click', function() {

    //set trim() to avoid the problem of users inputting only spaces
    const input = document.getElementById('input-text').value.trim();

    if (!input) {
        alert('Please enter some text to translate!');
        return;
    }   

    console.log('Input text:', input);

});


// Function to send translation request to the server
async function translate(text, from, to) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}
    &langpair=${from}|${to}`;

    //wait for the response from the translation API and extract the translated text
    const response = await fetch(url);
    const data = await response.json();
    return data.responseData.translatedText;
}

const LANGUAGES = [
    {code: 'ja', name: 'Japanese'},
    {code: 'fr', name: 'French'},
    {code: 'en', name: 'English'},
];

btn.addEventListener('click', async function() {
    const input = document.getElementById('input-text').value.trim();

    if (!input) {
        alert('Please enter some text to translate!');
        return;
    }

    let currentText = input;
    let from = 'en'; // Start with English
    
    for (let i = 0; i < LANGUAGES.length; i++) {
        const lang = LANGUAGES[i];
        currentText = await translate(currentText, from, lang.code);
        from = lang.code; // Set the source language for the next translation
        console.log(lang.name + ':', currentText);
        document.getElementById('translation-status').textContent = `Translated to ${lang.name}...`;
    } 
    
    document.getElementById('translation-status').textContent = 'Translation complete!';

    document.getElementById('final-text').textContent = currentText;
    document.getElementById('original-text').textContent = input;
    document.getElementById('result-box').style.display = 'block';

});

// Reset button functionality
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function() {
    document.getElementById('input-text').value = '';
    document.getElementById('result-box').style.display = 'none';
    document.getElementById('original-text').textContent = '';
    document.getElementById('final-text').textContent = '';
});

const shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', function() {
    const original = document.getElementById('original-text').textContent;
    const final = document.getElementById('final-text').textContent;

    // Store the original and final texts in localStorage
    localStorage.setItem('original', original);
    localStorage.setItem('final', final);

    // Redirect to the share page
    window.location.href = 'share.html';
});