const frase = "¿cómo harás para escapar del viento venenoso y poder soñar?";
const segundos = 12;

const tp = document.querySelector(".frase textPath");
tp.textContent = frase.repeat(18);

document.fonts.ready.then(() => {
    const largo = tp.getSubStringLength(0, frase.length);
    let inicio = null;

    function mover(t) {
    if (inicio === null) inicio = t;
    const avance = ((t - inicio) / 1000 / segundos) % 1;
    tp.setAttribute("startOffset", (avance - 1) * largo);
    requestAnimationFrame(mover);
    }

    requestAnimationFrame(mover);
});