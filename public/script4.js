// Fonction pour mettre à jour la sûreté
function updateSafety(className, status) {
    var safetyMessageElement = document.querySelector(`#level${className} .safety-message`);
    var descriptionElement = document.querySelector(`#level${className} .description`);
    var newDescription = descriptionElement.textContent;

    fetch('http://localhost:3000/update-safety', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ className, status, description: newDescription }),
    }).then(response => {
        if (response.ok) {
            safetyMessageElement.textContent = status === 'negative' ?
                "La sûreté de cette information n'est pas confirmée." :
                "La sûreté de cette information a été vérifiée par un éducateur.";
            safetyMessageElement.className = status === 'negative' ?
                'safety-message safety-negative' :
                'safety-message safety-positive';
        }
    }).catch(error => {
        console.error('Erreur lors de la mise à jour de la sûreté:', error);
    });
}

// Fonction pour charger les messages de sûreté au démarrage
function loadSafetyMessages() {
    ['3TB', '4TB', '5TB', '6TB'].forEach(className => {
        fetch(`http://localhost:3000/get-safety/${className}`)
            .then(response => response.json())
            .then(data => {
                var safetyMessageElement = document.querySelector(`#level${className} .safety-message`);
                var descriptionElement = document.querySelector(`#level${className} .description`);

                if (data) {
                    safetyMessageElement.textContent = data.status === 'negative' ?
                        "La surete de cette information n'est pas confirmee." :
                        "La surete de cette information a ete verifiee par un educateur.";
                    safetyMessageElement.className = data.status === 'negative' ?
                        'safety-message safety-negative' :
                        'safety-message safety-positive';
                    descriptionElement.textContent = data.description;
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement de la surete:', error);
            });
    });
}

// Charger les messages de sûreté au démarrage
document.addEventListener('DOMContentLoaded', function () {
    loadSafetyMessages();
});

// Fonction pour gérer les boutons
document.querySelectorAll('.btn-safety').forEach(button => {
    button.addEventListener('click', function () {
        var className = this.getAttribute('data-class');
        var status = this.getAttribute('data-status');
        updateSafety(className, status);
    });
});

// Fonction pour afficher le panneau de modification
function showPanel() {
    var password = prompt("Veuillez entrer le mot de passe :");
    if (password === "RM") {
        var className = prompt("Entrez le nom de la classe (3TB, 4TB, 5TB, 6TB) :");
        var status = prompt("Entrez 'positive' ou 'negative' pour la surete :");
        if (['3TB', '4TB', '5TB', '6TB'].includes(className) && (status === 'positive' || 'negative')) {
            updateSafety(className, status);
        } else {
            alert("Entrée invalide.");
        }
    } else {
        alert("Mot de passe incorrect.");
    }
}

// Code pour le pied de page qui descend lors du défilement
let lastScrollTop = 0;
const footer = document.querySelector('footer');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Si on défile vers le bas, cacher le pied de page
        footer.style.transform = 'translateY(100%)';
    } else {
        // Si on défile vers le haut, montrer le pied de page
        footer.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Évite les valeurs négatives
});

// Ajoute une transition au pied de page
footer.style.transition = 'transform 0.3s ease';
