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