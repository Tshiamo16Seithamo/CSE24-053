 document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const messageBox = document.getElementById('feedbackMsg');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate successful submission
    form.reset();
    messageBox.classList.remove('hidden');
  });
});