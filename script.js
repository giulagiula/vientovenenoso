let title = "feli+guille le escaparon al viento venenoso ";
let i = 0;

setInterval(function() {
    document.title = title.slice(i) + title.slice(0, i);
    i = (i + 1) % title.length;
}, 200);

document.querySelectorAll('.typewriter').forEach(function(el) {
    const pieces = Array.from(el.childNodes);
    el.innerHTML = ''; // clear immediately, before anything is visible

    let pieceIndex = 0;
    let charIndex = 0;

    function revealStep() {
        if (pieceIndex >= pieces.length) {
            setTimeout(function() {
                el.style.display = 'none';

                setTimeout(function() {
                    el.innerHTML = '';
                    pieceIndex = 0;
                    charIndex = 0;
                    el.style.display = '';
                    setTimeout(revealStep, startDelay); // reapply the stagger here too
                }, 1000);
            }, 5000);
            return;
        }

        const piece = pieces[pieceIndex];

        if (piece.nodeType === Node.TEXT_NODE) {
            const fullText = piece.textContent;
            if (charIndex < fullText.length) {
                el.appendChild(document.createTextNode(fullText[charIndex]));
                charIndex++;
            } else {
                pieceIndex++;
                charIndex = 0;
            }
        } else {
            el.appendChild(piece.cloneNode(true));
            pieceIndex++;
            charIndex = 0;
        }

        setTimeout(revealStep, 100);
    }

    const startDelay = Number(el.dataset.delay) || 0;
    setTimeout(revealStep, startDelay);
});