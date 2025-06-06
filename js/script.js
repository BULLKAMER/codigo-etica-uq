// Navegación suave para todos los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizar clase activa en navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Desplazamiento suave
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar navegación al hacer scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Efecto parallax para imágenes de fondo
const civilSection = document.getElementById('civil-section');
const electronicSection = document.getElementById('electronic-section');

if (civilSection && electronicSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        civilSection.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
        electronicSection.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
    });
}

// Animación de elementos al aparecer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .principle-card, .case-study');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Resto de tus funciones existentes (showBranch, goBack, showTab, etc.)
// ... (mantén todas las funciones que ya tenías para la interactividad)
function showBranch(branch) {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('comparison-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('commitment-section').style.display = 'none';
    document.getElementById('references-section').style.display = 'none';
    
    if (branch === 'civil') {
        document.getElementById('civil-section').style.display = 'block';
        document.getElementById('electronic-section').style.display = 'none';
    } else {
        document.getElementById('civil-section').style.display = 'none';
        document.getElementById('electronic-section').style.display = 'block';
    }
}

function goBack() {
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('civil-section').style.display = 'none';
    document.getElementById('electronic-section').style.display = 'none';
    document.getElementById('comparison-section').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('commitment-section').style.display = 'block';
    document.getElementById('references-section').style.display = 'block';
}

function showTab(branch, tab) {
    // Hide all tab contents for this branch
    const tabContents = document.querySelectorAll(`#${branch}-section .tab-content`);
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(`${branch}-${tab}`).classList.add('active');
    
    // Update tab styling
    const tabs = document.querySelectorAll(`#${branch}-section .tab`);
    tabs.forEach(tabElement => {
        tabElement.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
}

// Case evaluation functions
function evaluateCase(caseId, answer) {
    const feedback = document.getElementById(`${caseId}-feedback`);
    const buttons = document.querySelectorAll(`#${caseId}-feedback`).parentNode.querySelectorAll('.case-button');
    
    // Remove selected class from all buttons
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    event.currentTarget.classList.add('selected');
    
    // Set feedback based on answer
    if (caseId === 'civil-case-1') {
        if (answer === 'b' || answer === 'c') {
            feedback.textContent = '¡Correcto! Ambas opciones muestran responsabilidad profesional. La opción B es la más firme en defensa de la seguridad, mientras que la C busca un equilibrio sin comprometer principios éticos.';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = 'Incorrecto. Aceptar comprometer la seguridad estructural por presión del cliente viola el principio de integridad profesional y puede tener graves consecuencias.';
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }
    } else if (caseId === 'civil-case-2') {
        if (answer === 'b' || answer === 'c') {
            feedback.textContent = '¡Correcto! Ambas opciones priorizan la protección ambiental. La opción B permite evaluar completamente el impacto, mientras que la C busca una solución definitiva aunque más costosa.';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = 'Incorrecto. Continuar sin evaluar adecuadamente el impacto en un ecosistema frágil viola el principio de sustentabilidad y responsabilidad ambiental.';
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }
    } else if (caseId === 'electronic-case-1') {
        if (answer === 'b') {
            feedback.textContent = '¡Correcto! En dispositivos médicos, la seguridad del paciente debe ser prioridad absoluta. Reportar a autoridades si es necesario cumple con el principio de responsabilidad.';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else if (answer === 'c') {
            feedback.textContent = 'Parcialmente correcto. Hacer público podría acelerar la solución, pero primero debe agotar los canales internos y regulatorios formales para proteger a los usuarios.';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = 'Incorrecto. Priorizar los costos sobre la seguridad en un dispositivo médico es una grave violación ética que podría costar vidas.';
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }
    } else if (caseId === 'electronic-case-2') {
        if (answer === 'b' || answer === 'c') {
            feedback.textContent = '¡Correcto! Ambas opciones rechazan la práctica no ética. La B busca una solución equilibrada, mientras que la C toma una postura firme si no hay alternativa ética.';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = 'Incorrecto. Implementar obsolescencia programada engaña a los consumidores y genera daño ambiental, violando principios de honestidad y sustentabilidad.';
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }
    }
}

// Quiz functions
let quizAnswers = {};
let quizCorrectAnswers = {
    1: 'c',
    2: 'd',
    3: 'd'
};

function selectAnswer(question, answer) {
    quizAnswers[question] = answer;
    
    // Remove selected class from all options for this question
    const options = document.querySelectorAll(`#quiz-question-${question} .quiz-option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.currentTarget.classList.add('selected');
    
    // Hide feedback if it was shown
    document.getElementById(`quiz-feedback-${question}`).style.display = 'none';
}

function checkQuiz() {
    let score = 0;
    
    for (let question in quizAnswers) {
        const feedback = document.getElementById(`quiz-feedback-${question}`);
        
        if (quizAnswers[question] === quizCorrectAnswers[question]) {
            score++;
            feedback.textContent = '¡Respuesta correcta!';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = 'Respuesta incorrecta. Revisa los principios éticos relacionados.';
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }
        
        feedback.style.display = 'block';
    }
    
    document.getElementById('score').textContent = score;
}

function resetQuiz() {
    quizAnswers = {};
    document.getElementById('score').textContent = '0';
    
    // Clear all selections and feedback
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    const feedbacks = document.querySelectorAll('.quiz-feedback');
    feedbacks.forEach(feedback => {
        feedback.style.display = 'none';
    });
}


// Variables globales
let commitmentCount = 0;
let signatures = [];

// Función para inicializar la zona de compromiso
function initCommitmentSection() {
    loadSignatures();
    
    // Asignar evento al botón de firmar
    const signButton = document.querySelector('.commitment-form button');
    if (signButton) {
        signButton.addEventListener('click', signCommitment);
    }
}

// Cargar firmas desde LocalStorage
function loadSignatures() {
    const savedData = localStorage.getItem('engineeringEthicsCommitments');
    if (savedData) {
        const data = JSON.parse(savedData);
        signatures = data.signatures || [];
        commitmentCount = data.count || signatures.length;
        updateSignatureDisplay();
    }
}

// Guardar firmas en LocalStorage
function saveSignatures() {
    const data = {
        count: commitmentCount,
        signatures: signatures,
        lastUpdate: new Date().toISOString()
    };
    localStorage.setItem('engineeringEthicsCommitments', JSON.stringify(data));
}

// Actualizar el display de firmas
function updateSignatureDisplay() {
    const countElement = document.getElementById('commitment-count');
    const wallElement = document.getElementById('signature-wall');
    
    if (countElement) {
        countElement.textContent = commitmentCount;
    }
    
    if (wallElement) {
        wallElement.innerHTML = '';
        signatures.forEach(signature => {
            const signatureElement = document.createElement('div');
            signatureElement.className = 'signature';
            signatureElement.textContent = signature;
            wallElement.appendChild(signatureElement);
        });
    }
}

// Función para firmar
function signCommitment() {
    const nameInput = document.getElementById('signer-name');
    const name = nameInput ? nameInput.value.trim() : '';
    
    // Validación básica
    if (name === '' && !confirm('¿Deseas firmar de forma anónima?')) {
        return;
    }
    
    const signatureName = name || 'Anónimo';
    signatures.push(signatureName);
    commitmentCount++;
    
    saveSignatures();
    updateSignatureDisplay();
    
    // Limpiar el input
    if (nameInput) {
        nameInput.value = '';
    }
    
    // Mostrar feedback
    showFeedback('¡Gracias por tu compromiso!', 'success');
    
    // Efecto de confeti (opcional)
    showConfetti();
}

// Mostrar mensaje de feedback
function showFeedback(message, type) {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `feedback ${type}`;
    feedbackElement.textContent = message;
    
    const form = document.querySelector('.commitment-form');
    if (form) {
        form.appendChild(feedbackElement);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            feedbackElement.remove();
        }, 3000);
    }
}

// Efecto de confeti (opcional)
function showConfetti() {
    const colors = ['#f3b229', '#005883', '#e67e22', '#9b59b6', '#27ae60'];
    const container = document.querySelector('.commitment-form');
    
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}



// Función opcional de confeti (para celebrar la firma)
function showConfetti() {
    const colors = ['#f3b229', '#005883', '#e67e22', '#9b59b6', '#27ae60'];
    const container = document.querySelector('.commitment-form');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(confetti);
        
        // Eliminar después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Initialize sections
window.onload = function() {
    document.getElementById('civil-section').style.display = 'none';
    document.getElementById('electronic-section').style.display = 'none';
};
// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Ocultar secciones de ramas al cargar
    document.getElementById('civil-section').style.display = 'none';
    document.getElementById('electronic-section').style.display = 'none';
    
    // Configurar fondos para las secciones
    civilSection.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://bullkamer.github.io/codigo-etica-uq/images/civil-bg.jpg)';
    civilSection.style.backgroundSize = 'cover';
    civilSection.style.backgroundAttachment = 'fixed';
    
    electronicSection.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://bullkamer.github.io/codigo-etica-uq/images/electronic-bg.jpg)';
    electronicSection.style.backgroundSize = 'cover';
    electronicSection.style.backgroundAttachment = 'fixed';
});