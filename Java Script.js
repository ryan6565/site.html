// Fonction pour afficher les horaires en fonction du jour
function showDay(day) {
    const tableBody = document.querySelector('#hours-table tbody');
    tableBody.innerHTML = ''; // Vide le tableau avant d'ajouter les nouvelles données

    const entries = schedule[day];
    if (entries) {
        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.time}</td>
                <td>${entry.course}</td>
                <td>${entry.teacher}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="3">Aucun horaire disponible pour ce jour.</td></tr>';
    }
}

// Afficher les horaires du lundi par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    showDay('lundi');
});
