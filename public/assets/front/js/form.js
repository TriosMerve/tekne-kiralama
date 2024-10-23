$('.emailMask').on('input', function () {
    checkValidity($(this), /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
});
// Telefon numarası maskı: 0 (000) 000-0000
$('.phoneMask').mask('0 (000) 000-0000').on('input', function () {
    var inputValue = $(this).val();

    // Başında 0 yoksa otomatik olarak ekle
    if (inputValue.length > 2 && inputValue.charAt(2) !== '0') {
        inputValue = '0 ' + inputValue.substring(2);
        $(this).val(inputValue);
    }

    // Doğrulama işlemi
    checkValidity($(this), /^0 \([0-9]{3}\) [0-9]{3}-[0-9]{4}$/);
});
$('.textMask').mask('A', {
    translation: {
        'A': {
            pattern: /[A-Za-zÇçĞğİıÖöŞşÜü ]/,
            recursive: true
        }
    }
});

function checkValidity(inputElement, mask) {
    var inputValue = inputElement.val();
    var isValid = mask.test(inputValue);

    if (!isValid) {
        inputElement.addClass('error');
    } else {
        inputElement.removeClass('error');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const inputs = form.querySelectorAll('.textMask, .emailMask, .phoneMask');
            const checkbox = form.querySelector('input[type="checkbox"]');
            const textarea = form.querySelector('textarea');

            // Remove previous validation classes
            inputs.forEach(input => {
                input.classList.remove('is-invalid');
            });

            // Remove previous validation class for checkbox
            checkbox.classList.remove('is-invalid');
            textarea.classList.remove('is-invalid');


            if (form.checkValidity()) {
                // Bootstrap form validation
                if (!form.classList.contains('was-validated')) {
                    form.classList.add('was-validated');
                }

                const formData = new FormData(form);

                $.ajax({
                    type: 'POST',
                    url: form.action,
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        if (response === 'ok') {
                            alert("success ok")
                        } else {
                            alert("success not ok")
                        }
                    },
                    error: function () {
                        alert("error message")
                    }
                });
            } else {
                // Bootstrap form validation
                if (!form.classList.contains('was-validated')) {
                    form.classList.add('was-validated');
                }

                // Add error class to invalid inputs
                inputs.forEach(input => {
                    if (!input.checkValidity()) {
                        input.classList.add('is-invalid');
                    }
                });

                    // Add error class to checkbox if not checked
                if (!checkbox.checked) {
                    checkbox.classList.add('is-invalid');
                }

                if (!textarea.checkValidity()) {
                    textarea.classList.add('is-invalid');
                }
                
            }
        });
    }
});
