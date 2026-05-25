document.addEventListener('DOMContentLoaded', () => {
    const rsvpButton = document.getElementById('rsvp-button');
    const infoText = document.getElementById('info-text');

    if (rsvpButton && infoText) {
        rsvpButton.addEventListener('click', () => {
            infoText.classList.toggle('show');
            
            // Toggle button text based on visibility state
            if (infoText.classList.contains('show')) {
                rsvpButton.textContent = 'Close';
            } else {
                rsvpButton.textContent = 'Learn More';
            }
        });
    }
});
