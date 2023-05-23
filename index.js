// FUNCIONES DEDICADAS AL CSS MODO LIGHT / DARK

const toggle = document.getElementById('cont-toggle');
const img = document.getElementById('img-toggle')
const logo = document.getElementById('logo-nav')
const bkground = document.getElementById('sky-blue')
const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const dobby = document.getElementById('cont-toggle');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (localStorage.getItem('theme') === 'dark') {
        img.src = ("./img/moon.png")
        logo.src = ("./img/logonew2.png")
        bkground.src = ("./img/35329.jpg")
    } else {
        img.src = ("./img/cloudy.png")
        logo.src = ("./img/logonew.png")
        bkground.src = ("./img/4122410.jpg")
    }
}

dobby.addEventListener('click', () => {
    let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(switchToTheme);
})

setTheme(localStorage.getItem('theme') || preferedColorScheme);

toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
});


// FUNCION PARA CAMBIAR TEXTO PARA EL MEDIQUERY MAS CHICO

let titulo = document.getElementById('span-title');
let originalText = titulo.textContent;

function cambiarTextoSegunDispositivo(mobileQuery) {
    if (mobileQuery.matches) {
        titulo.textContent = 'Encriptador CH. ALURA LATAM'; // Cambiar por el nuevo texto deseado para móvil
    } else {
        titulo.textContent = originalText;
    }
}

let mobileQuery = window.matchMedia('(max-width: 600px)'); // Cambiar el ancho máximo según tu definición de móvil
cambiarTextoSegunDispositivo(mobileQuery); // Ejecutar función al cargar la página
mobileQuery.addEventListener('change', function (event) {
    cambiarTextoSegunDispositivo(event.target); // Ejecutar función cuando cambia el estado del media query
});


// FUNCIONES DEDICADAS AL ESCRIPTADO


function soloLetras(event) {
    var codigoTecla = event.which || event.keyCode;
    var tecla = String.fromCharCode(codigoTecla);
    var expresion = /^[a-z\s]+$/;

    if (!expresion.test(tecla)) {
        event.preventDefault();
        return false;
    }
}

function encriptar() {
    let textUser = document.getElementById("texto");
    let titleMsg = document.getElementById("titulo-mensaje");
    let parrafo = document.getElementById("parrafo");
    let munieco = document.getElementById("img-home");

    var expresion = /^[a-z\s]+$/;

    if (!expresion.test(textUser.value) && textUser.value.length != 0) {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, ingresa solo letras minusculas!',
            timer: 1500,
            timerProgressBar: true,
        })
        textUser.value = ""
        return;
    }

    let encryptText = textUser.value
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    if (textUser.value.trim().length != 0){
        Swal.fire({
            title: 'Encriptando texto!',
            timer: 750,
            didOpen: () => {
                Swal.showLoading() 
            },
            willClose: () => {     
                Swal.fire({
                    icon: 'success',
                    title: 'Texto encriptado!',
                    timer: 1500,
                })
            }
        })
        textUser.value = encryptText;
        titleMsg.textContent = "Texto encriptado con exito ✅";
        parrafo.textContent = "Ahora puedes copiarlo 😊"
        parrafo.style.fontSize = "22px"
        munieco.src = "./img/encryptt.png"
    } else {
        textUser.value = '';
        munieco.src = "./img/Muñeco.png"
        titleMsg.textContent = "Ningun mensaje encontrado";
        parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar"
        Swal.fire({
            icon: 'warning',
            title: 'Debes ingresar algun texto!',
            timer: 1500,
            timerProgressBar: true,
        })
    }
}

function desencriptar() {
    let textUser = document.getElementById("texto");
    let titleMsg = document.getElementById("titulo-mensaje");
    let parrafo = document.getElementById("parrafo");
    let munieco = document.getElementById("img-home");

    var expresion = /^[a-z\s]+$/i;

    if (!expresion.test(textUser.value) && textUser.value.length != 0) {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, ingresa solo letras minusculas!',
            timer: 1500,
            timerProgressBar: true,
        })
        textUser.value = ""
        return;
    }

    let decryptText = textUser.value
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    if (textUser.value.length != 0) {
        Swal.fire({
            title: 'Desencriptando texto!',
            timer: 750,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Texto desencriptado!',
                    timer: 1250,
                })
            }
        })
        textUser.value = decryptText;
        titleMsg.textContent = "Texto desencriptado con exito ✅";
        parrafo.textContent = "Ahora puedes copiarlo 😊";
        parrafo.style.fontSize = "22px"
        munieco.src = "./img/encryptt.png"
    } else {
        munieco.src = "./img/Muñeco.png"
        titleMsg.textContent = "Ningun mensaje encontrado";
        parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar"
        Swal.fire({
            icon: 'warning',
            title: 'Debes ingresar algun texto!',
            timer: 1500,
            timerProgressBar: true,
        })
    }
}

function copyClipboard() {
    const textarea = document.getElementById('texto');
    const text = textarea.value;

    navigator.clipboard.writeText(text)
        .then(() => {
            if (text.length != 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Texto copiado al portapapeles',
                    timer: 1500,
                    timerProgressBar: true,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No hay ningun texto para copiar',
                    timer: 1500,
                    timerProgressBar: true,
                })
            }
        })
        .catch((err) => {
            console.error('Error al copiar el texto: ', err);
        });
}

function clearTextArea() {
    const textarea = document.getElementById('texto');
    const text = textarea.value;
    let munieco = document.getElementById("img-home");
    let titleMsg = document.getElementById("titulo-mensaje");
    let parrafo = document.getElementById("parrafo");

    if (text.length === 0) {
        Swal.fire({
            imageUrl: 'https://i.imgflip.com/7mfyz6.jpg',
            imageWidth: '100%',
            imageAlt: 'Texto meme',
            timer: 4000,
            timerProgressBar: true
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Texto limpiado!',
            timer: 1500,
            timerProgressBar: true,
        })
        textarea.value = "";
        titleMsg.textContent = "Ningun mensaje encontrado";
        parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar"
        munieco.src = "./img/Muñeco.png"
    }
}


// FUNCIONES PARA LA ANIMACION DEL H1 

const span = document.getElementById('span-title')
const path = window.location.pathname;
let title = document.getElementById('title-rep')
let activeTimeouts = [];
let isMediaQueryActive = false;


function handleMediaQueryChange() {
    if (window.matchMedia('(min-width: 1470px)').matches) {
        if (!isMediaQueryActive) { // Verifica si el media query se activa por primera vez
            animate();
            isMediaQueryActive = true; // Actualiza la bandera
        }
    } else {
        if (isMediaQueryActive) { // Verifica si el media query se desactiva
            clearAllTimeouts();
            isMediaQueryActive = false; // Actualiza la bandera
        }
    }
}

function animate() {
    if (path === "/Proyecto-Encriptador-G5/") {
        title.classList.add('index');

        if (window.innerWidth >= 1470) {
            span.classList.add('typing-blink');
            let timeoutId = setTimeout(() => {
                console.log("Repit")
                span.classList.remove('typing-blink');
                let index = activeTimeouts.indexOf(timeoutId);
                if (index !== -1) {
                    activeTimeouts.splice(index, 1);
                }
                setTimeout(animate, 100);
            }, 10000);
            activeTimeouts.push(timeoutId);
        }
    }
}

function clearAllTimeouts() {
    activeTimeouts.forEach(function (timeoutId) {
        clearTimeout(timeoutId);
    });
    activeTimeouts = [];
}

window.addEventListener('resize', handleMediaQueryChange);

if (window.matchMedia('(min-width: 1470px)').matches) {
    handleMediaQueryChange();
}

window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width:481px) and (max-width:1470px)').matches || window.matchMedia('(max-width:480px)').matches) {
        span.classList.remove('typing-blink')

    }
});

let miInput = document.getElementById('texto')
miInput.addEventListener('keypress', function (event) {
    if (event.getModifierState('CapsLock')) {
        Swal.fire({
            icon: 'warning',
            title: 'MAYUSCULAS ACTIVADAS',
            timer: 1500,
            timerProgressBar: true,
        })
    }
})

// FUNCIONES PARA EL TOGGLE SWITCH ENCRP-DSCRP

window.addEventListener('DOMContentLoaded', function () {
    let openButton = document.getElementById('dec');
    let closedButton = document.getElementById('enc');
    let toggleSwitch = document.getElementById('arrowSwitch');
    let imgToggle = document.getElementById('img-togglex')
    let isSwitchOn = false;
    let isInitialLoad = true;

    function updateButtons() {
        if (isSwitchOn) {
            imgToggle.src = ("./img/open2.png")
            openButton.classList.add('show-open');
            closedButton.classList.remove('show-closed');
            openButton.onclick = desencriptar;
            closedButton.onclick = null;
        } else {
            imgToggle.src = ("./img/closed1.png")
            openButton.classList.remove('show-open');
            closedButton.classList.add('show-closed');
            openButton.onclick = null;
            closedButton.onclick = encriptar;
        }

        if (!isInitialLoad) {
            openButton.classList.add('flip-animation');
            closedButton.classList.add('flip-animation');
        }

        isInitialLoad = false;
    }

    toggleSwitch.addEventListener('click', function () {
        toggleSwitch.classList.toggle("active");
        isSwitchOn = !isSwitchOn;
        updateButtons();
    });

    updateButtons();
});
