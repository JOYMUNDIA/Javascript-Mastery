// app.js

// Get DOM elements
const saveButton = document.getElementById('saveEntry');
const journalText = document.getElementById('journalText');
const moodSlider = document.getElementById('mood');
const insightsContent = document.getElementById('insightsContent');

// Function to save journal entry
saveButton.addEventListener('click', () => {
    const mood = moodSlider.value;
    const entryText = journalText.value;

    if (entryText.trim() === '') {
        alert('Please write something!');
        return;
    }

    // Display the insights dynamically
    insightsContent.innerHTML = `
        <p><strong>Your mood today:</strong> ${mood} out of 5</p>
        <p><strong>Your reflection:</strong> ${entryText}</p>
    `;

    // Clear journal textarea after saving
    journalText.value = '';
});
