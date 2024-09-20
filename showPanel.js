// Fonction pour afficher le panneau de modification
function showPanel() {
    var password = prompt("Veuillez entrer le mot de passe :");
    if (password === "RM") {
        var className = prompt("Entrez le nom de la classe (3TB, 4TB, 5TB, 6TB) :");
        var status = prompt("Entrez 'positive' ou 'negative' pour la surete :");
        if (['3TB', '4TB', '5TB', '6TB'].includes(className) && (status === 'positive' || status === 'negative')) {
            updateSafety(className, status);
        } else {
            alert("Entrée invalide.");
        }
    } else {
        alert("Mot de passe incorrect.");
    }
}
