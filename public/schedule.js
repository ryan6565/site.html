// Données des horaires pour chaque jour
const schedule = {
    lundi: [
        { time: '08:00 - 09:15', course: 'Informatique', teacher: 'M. Carrera' },
        { time: '09:15 - 10:05', course: 'Informatique', teacher: 'M. Carrera' },
        { time: '10:20 - 11:10', course: 'E. Informatique', teacher: 'Mme. Richy' },
        { time: '11:10 - 12:00', course: 'Math', teacher: 'Mme Ghysens' },
        { time: '12:50 - 13:45', course: 'Francais', teacher: 'Mme Buscemie' },
        { time: '13:45 - 14:35', course: 'Anglais', teacher: 'Mme Boljesic' },
        { time: '14:35 - 15:40', course: 'EPS (Fille)', teacher: 'M. Ramirez' },
        { time: '15:40 - 16:30', course: 'EPS (Fille)', teacher: 'M. Ramirez' }
    ],
    mardi: [
        { time: '08:00 - 09:15', course: 'EPS (Garcons)', teacher: 'M. Parrot' },
        { time: '09:15 - 10:05', course: 'EPS (Garcons)', teacher: 'M. Parrot' },
        { time: '10:20 - 11:10', course: 'Anglais', teacher: 'Mme Boljesic' },
        { time: '11:10 - 12:00', course: 'Francais', teacher: 'Mme Buscemie' },
        { time: '12:50 - 13:45', course: 'Math', teacher: 'Mme Ghysens' },
        { time: '13:45 - 14:35', course: 'Religion', teacher: 'Mme Buscemie' },
        { time: '14:35 - 15:40', course: 'E.Informatique', teacher: 'Mme Richy' },
        { time: '15:40 - 16:30', course: 'Informatique', teacher: 'M. Carrera' }
    ],
    mercredi: [
        { time: '08:00 - 09:15', course: 'Science', teacher: 'M. Boljesic' },
        { time: '09:15 - 10:05', course: 'Histoire', teacher: 'Mme Boulaiche' },
        { time: '10:20 - 11:10', course: 'Anglais', teacher: 'Mme Boljesic' },
        { time: '11:10 - 12:00', course: 'Math', teacher: 'Mme Ghysens' },
        { time: '12:00 - 12:50', course: 'Geographie', teacher: 'Mme Boulaiche' },
    ],
    jeudi: [
        { time: '08:00 - 09:15', course: 'Francais', teacher: 'Mme Buscemie' },
        { time: '09:15 - 10:05', course: 'Francais', teacher: 'Mme Buscemie' },
        { time: '10:20 - 11:10', course: 'Religion', teacher: 'Mme Buscemie' },
        { time: '11:10 - 12:00', course: 'Math', teacher: 'M. Ghysens' },
        { time: '12:50 - 13:45', course: 'Sciences', teacher: 'M. Boljesic' },
        { time: '13:45 - 14:35', course: 'Math', teacher: 'M. Ghysens' },
        { time: '14:35 - 15:40', course: 'Histoire', teacher: 'Mme Boulaiche' },
        { time: '15:40 - 16:30', course: 'Geographie', teacher: 'Mme Boulaiche' }
    ],
    vendredi: [
        { time: '08:00 - 09:15', course: 'E. Informatique', teacher: 'Mme Richy' },
        { time: '09:15 - 10:05', course: 'E. Informatique', teacher: 'Mme Richy' },
        { time: '10:20 - 11:10', course: 'Informatique', teacher: 'M. Carrera' },
        { time: '11:10 - 12:00', course: 'Francais', teacher: 'Mme Buscemie' },
        { time: '12:50 - 13:45', course: 'Science', teacher: 'M. Boljesic' },
        { time: '13:45 - 14:35', course: 'Anglais', teacher: 'Mme Boljesic' },
    ]
};

function showDay(day) {
    const tableBody = document.querySelector('#hours-table tbody');
    tableBody.innerHTML = '';

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

document.addEventListener('DOMContentLoaded', () => {
    showDay('lundi');
});
