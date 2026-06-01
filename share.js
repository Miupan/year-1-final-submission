const original = localStorage.getItem('original');
const final = localStorage.getItem('final');

document.getElementById('card-original').textContent = original;
document.getElementById('card-result').textContent = final;

// download button functionality
const dlBtn = document.getElementById('dl-btn');

dlBtn.addEventListener('click', async function() {
    const card = document.getElementById('card');
    const canvas = await html2canvas(card);

    const link = document.createElement('a');
    link.download = 'translation_telephone.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    document.getElementById('status').textContent = 'Image downloaded successfully!';
});