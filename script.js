// titulo tab script
let title = "feli+guille le escaparon al viento venenoso ";
let i = 0;

// chat script - firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkHNyP95O4BVDwu32A9TMUXovq9Z8w5SE",
    authDomain: "vientovenenoso-chat.firebaseapp.com",
    projectId: "vientovenenoso-chat",
    storageBucket: "vientovenenoso-chat.firebasestorage.app",
    messagingSenderId: "123492397980",
    appId: "1:123492397980:web:0aebf2203294b135124e59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// chat script - a la base de datos

const form = document.getElementById('form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = form.nombre.value;
    const mensaje = form.mensaje.value;

    await addDoc(collection(db, "mensajes"), {
        nombre: nombre,
        mensaje: mensaje,
        creado: serverTimestamp()
    });

    form.reset();
});

// chat script - enter key submits
form.mensaje.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
    }
});

// chat enviados script

const chatMensajes = document.getElementById('chat-mensajes');

const q = query(collection(db, "mensajes"), orderBy("creado"));

onSnapshot(q, function(snapshot) {
    chatMensajes.innerHTML = '';

    snapshot.forEach(function(doc) {
        const data = doc.data();

        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('mensaje');

        const nombreSpan = document.createElement('span');
        nombreSpan.classList.add('mensaje-nombre');
        nombreSpan.textContent = data.nombre;

        const textoSpan = document.createElement('span');
        textoSpan.classList.add('mensaje-texto');
        textoSpan.textContent = data.mensaje;

        mensajeDiv.appendChild(nombreSpan);
        mensajeDiv.appendChild(textoSpan);
        chatMensajes.appendChild(mensajeDiv);
    });

    chatMensajes.scrollTop = chatMensajes.scrollHeight;
});

// typewriter script
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