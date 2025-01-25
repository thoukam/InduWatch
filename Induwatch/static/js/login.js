
// Cache les messages d'alerte après 5 secondes
setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.style.transition = 'opacity 0.5s ease-out';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 500); // Retire complètement l'élément après la transition
    });
}, 5000);

