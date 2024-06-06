function toggleAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

    checkboxes.forEach(checkbox => {
        checkbox.checked = !allChecked;
    });

    const button = document.getElementById('toggle-checkboxes');
    button.textContent = allChecked ? 'Select All' : 'Deselect All';
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const errorMessageContainer = document.getElementById('error-message-container');
    const errorMessage = document.getElementById('error-message');


    const firstNameInput = document.querySelector('input[name="firstName"]');
    const zipCodeContainer = document.querySelector('.zipCode');

    function toggleZipCodeVisibility() {
        if (firstNameInput.value.trim() !== '') {
            zipCodeContainer.style.display = 'none';
        } else {
            zipCodeContainer.style.display = 'block';
        }
    }

    firstNameInput.addEventListener('input', toggleZipCodeVisibility);
    toggleZipCodeVisibility();


    form.addEventListener('submit', function(event) {
        if (!validateRequiredFields()) {
            event.preventDefault(); // Stop the form from submitting
        }
    });


    function validateRequiredFields() {
        let hasErrors = false;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(element => {
            element.parentNode.removeChild(element);
        });
        document.querySelectorAll('.error').forEach(element => {
            element.classList.remove('error');
        });
        document.querySelectorAll('label.error').forEach(label => {
            label.classList.remove('error');
        });

        // Validate each field marked as required
        const fields = form.querySelectorAll('.required');
        fields.forEach(field => {
            if (!field.value.trim()) {
                const error = document.createElement('div');
                error.textContent = 'This field is required.';
                error.className = 'error-message';
                field.classList.add('error');
                field.parentNode.insertBefore(error, field.nextSibling);

                const label = form.querySelector(`label[for="${field.id}"]`);
                if (label) {
                    label.classList.add('error');
                }
                hasErrors = true;
            }
        });

        if (hasErrors) {
            errorMessageContainer.style.display = 'block';
            errorMessage.textContent = 'There was a problem with your submission. Please review the fields below.';
        } else {
            errorMessageContainer.style.display = 'none';
        }

        return !hasErrors;
    }
});
