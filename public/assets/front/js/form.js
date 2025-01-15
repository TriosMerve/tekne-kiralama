$(".stepHead span").first().addClass("active"); // İlk span'ı aktif yap
// .backStep butonuna tıklanınca
$(".backStep").on("click", function (e) {
  e.preventDefault(); // Sayfanın yenilenmesini engelle

  // .stepHead içindeki span'leri al
  var activeStep = $(".stepHead span.active");
  var currentIndex = $(".stepHead span").index(activeStep); // Aktif olan span'ın index'ini al

  // Eğer .backStep butonu disabled ise tıklama işlemini engelle
  if ($(this).hasClass("disabled")) {
    return; // Eğer disabled sınıfı varsa, hiçbir şey yapma (butona tıklanamaz)
  }

  // Eğer mevcut adım birinci step değilse, bir öncekine geçiş yap
  if (currentIndex > 0) {
    $(".stepHead span").removeClass("active"); // Tüm aktif sınıflarını kaldır

    // Bir önceki step'ı aktif yap
    $(".stepHead span")
      .eq(currentIndex - 1)
      .addClass("active");

    // .signupFormSteps içindeki tüm adımlara d-none ekle
    $(".signupFormSteps > div").addClass("d-none");

    // .signupFormSteps içindeki ilgili adımı aktif yap
    $(".signupFormSteps > div")
      .eq(currentIndex - 1)
      .removeClass("d-none"); // Aktif step'i görünür yap
  }

  // Eğer 1. adım aktifse .backStep butonuna disabled sınıfını ekle
  if (currentIndex === 1) {
    $(".backStep").addClass("disabled"); // .backStep butonuna disabled sınıfını ekle
  } else {
    $(".backStep").removeClass("disabled"); // Diğer durumlarda disabled sınıfını kaldır
  }
});

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Email doğrulama işlemi
  // $(".emailMask").each(function () {
  //   $(this).attr("pattern", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/);
  // });

  $(".emailMask").on("input", function () {
    const inputValue = $(this).val().trim();
    // const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue);
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/.test(
      inputValue
    );

    if (inputValue && !isValid) {
      $(this).addClass("is-invalid").removeClass("is-valid");
      $(this).get(0).setCustomValidity("Invalid email address");
    } else if (inputValue && isValid) {
      $(this).addClass("is-valid").removeClass("is-invalid");
      $(this).get(0).setCustomValidity("");
    } else {
      $(this).removeClass("is-valid is-invalid");
      $(this).get(0).setCustomValidity("");
    }
  });
  // Number Mask doğrulama işlemi
  $(".numberMask")
    .mask("0000000000", { placeholder: "__________" }) // 10 hane sınırı ve placeholder
    .on("input", function () {
      var inputValue = $(this).val();

      // İlk karakterin 0 olmasını engelle
      if (inputValue.charAt(0) === "0") {
        $(this).addClass("is-invalid");
        $(this).val(""); // Yanlış girişte input'u sıfırla
      } else if (inputValue.length > 0 && inputValue.length < 10) {
        $(this).addClass("is-invalid").removeClass("is-valid"); // Eksik hanelerde geçersiz yap
      } else if (inputValue.length === 10) {
        $(this).addClass("is-valid").removeClass("is-invalid"); // Tam 10 hane ise geçerli yap
      } else {
        $(this).removeClass("is-invalid is-valid"); // Boş girişte sınıfları kaldır
      }

      // Validasyonu kontrol et
      checkValidity($(this), /^[1-9][0-9]{9}$/); // Sadece 1-9 ile başlayan ve toplam 10 hane içeren bir sayı
    });
  // Phone Mask doğrulama işlemi
  $(".phoneMask")
    .mask("(000) 000-0000", { placeholder: "(000) 000-0000" })
    .on("input", function () {
      var inputValue = $(this).val();

      if (inputValue.charAt(0) === "0") {
        $(this).addClass("is-invalid");
        $(this).val("");
      } else {
        $(this).removeClass("is-invalid");
      }

      checkValidity($(this), /^[1-9][0-9]{9}$/);
    });

  // Text Mask doğrulama işlemi
  $(".textMask")
    .mask("A", {
      translation: {
        A: {
          pattern: /[A-Za-zÇçĞğİıÖöŞşÜü ]/,
          recursive: true,
        },
      },
    })
    .on("input", function () {
      var inputValue = $(this).val();
      checkValidity($(this), /^[A-Za-zÇçĞğİıÖöŞşÜü ]+$/);
    });
  $(".numberMask2")
    .mask("0", {
      translation: {
        0: {
          pattern: /\d/,
          recursive: true,
        },
      },
    })
    .on("input", function () {
      var inputValue = $(this).val();
      checkValidity($(this), /^[0-9]+$/);
    });

  // Step 1 formu için özel doğrulama
  $(".stepOne form").on("submit", function (e) {
    e.preventDefault(); // Formun normal gönderilmesini engelle

    var form = $(this);
    var emailValue = form.find("#email").val().trim(); // E-posta alanının değerini al
    $(".stepTwo").find("#email2").val(emailValue);

    if (form[0].checkValidity() === false) {
      form.addClass("was-validated"); // Form geçerli değilse, bootstrap invalid-feedback gösterilecek
    } else {
      // Form geçerli ise email alanındaki değeri al

      // Değeri email2 alanına ata

      // Form geçerli ise, step 1'den step 2'ye geçiş yapılır
      $(".stepOne").addClass("d-none"); // Step 1'i gizle
      $(".stepTwo").removeClass("d-none"); // Step 2'yi göster

      $(".backStep").removeClass("disabled");
      // Step Head'deki aktif sınıfı değiştirme
      $(".stepHead span").removeClass("active"); // Önce tüm aktifleri kaldır
      $(".stepHead span").eq(1).addClass("active"); // Step 2 için index 1'de aktif yap
    }
  });

  // Bootstrap doğrulaması ve diğer işlemler
  const divs = document.querySelectorAll(".needs-validation");
  if (divs.length > 0) {
    Array.from(divs).forEach((div) => {
      const submitButtonID = div.getAttribute("data-submit");
      const btnSubmit = document.getElementById(submitButtonID);
      if (submitButtonID) {
        btnSubmit.addEventListener(
          "click",
          function (event) {
            //if (!div.checkValidity()) {
            //    event.preventDefault();
            //    event.stopPropagation();
            //}
            const inputs = div.querySelectorAll(
              ".emailMask, .phoneMask, .textMask"
            );
            const selects = div.querySelectorAll(".customSelect");

            let isDivValid = true;

            inputs.forEach((input) => {
              if (!input.checkValidity()) {
                isDivValid = false;
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
              } else {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
              }
            });

            // Nice Select öğelerinde seçim değiştiğinde tetiklenecek olay
            document.querySelectorAll('.customSelect').forEach(niceSelect => {
              niceSelect.addEventListener('click', function (event) {
                // Eğer tıklanan element bir option değilse, fonksiyonu durdur
                if (!event.target.classList.contains('option')) return;

                const select = niceSelect.previousElementSibling; // Gerçek select öğesi
                const invalidFeedback = niceSelect.parentElement.querySelector('.invalid-feedback');
                const selectedOption = event.target; // Tıklanan option öğesi
                const selectedValue = selectedOption.getAttribute('data-value');
                
                // Seçilen değeri kontrol et
                if (selectedValue && selectedValue !== '') {
                  console.log("Geçerli Seçim Yapıldı:", selectedValue); // Konsola geçerli seçimi yazdır

                  // Gerçek select öğesinin değerini güncelle
                  select.value = selectedValue;

                  // Stil sınıflarını güncelle
                  select.classList.add('is-valid');
                  select.classList.remove('is-invalid');
                  niceSelect.classList.add('is-valid');
                  niceSelect.classList.remove('is-invalid');

                  // Hata mesajını gizle
                  if (invalidFeedback) invalidFeedback.style.display = 'none';
                } else {
                  console.log("Geçersiz veya Boş Seçim Yapıldı:", selectedValue); // Konsola geçersiz seçimi yazdır

                  // Stil sınıflarını güncelle
                  select.classList.add('is-invalid');
                  select.classList.remove('is-valid');
                  niceSelect.classList.add('is-invalid');
                  niceSelect.classList.remove('is-valid');

                  // Hata mesajını göster
                  if (invalidFeedback) invalidFeedback.style.display = 'block';
                }
              });
            });




            if (!isDivValid) {
              event.preventDefault();
              event.stopPropagation();
            }

            inputs.forEach((input) => {
              if (input.classList.contains("emailMask")) {
                const value = input.value.trim();
                const isValid =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/.test(value);

                if (value && !isValid) {
                  input.classList.add("is-invalid");
                  input.classList.remove("is-valid");
                  input.setCustomValidity("Invalid email address");
                } else if (value && isValid) {
                  input.classList.add("is-valid");
                  input.classList.remove("is-invalid");
                  input.setCustomValidity("");
                } else {
                  input.classList.remove("is-valid", "is-invalid");
                  input.setCustomValidity("");
                }
              }
            });

            //if (div.checkValidity()) {
            //    event.preventDefault();
            //}
            if (isDivValid) {
              event.preventDefault();
            }

            div.classList.add("was-validated");
          },
          false
        );
      } else {
        console.warn("data-submit attribute'u eksik");
      }
    });
  } else {
    console.warn(".needs-validation sınıfına sahip bir öğe bulunamadı.");
  }
});

// Price Mask doğrulama işlemi
$(".priceMask")
  .mask("000.000.000", { reverse: true })
  .on("input", function () {
    var inputValue = $(this).val().replace(/\./g, ""); // Noktaları kaldırarak saf sayıyı al
    var numericValue = parseInt(inputValue, 10); // Sayıya çevir

    // Değerin geçerli olup olmadığını kontrol et
    if (isNaN(numericValue) || numericValue <= 0) {
      $(this).addClass("is-invalid").removeClass("is-valid");
    } else {
      $(this).addClass("is-valid").removeClass("is-invalid");
    }
  });

// Phone mask doğrulama fonksiyonu
function checkValidity(inputElement, mask) {
  var inputValue = inputElement.val();
  var isValid = mask.test(inputValue);

  if (!isValid) {
    inputElement.addClass("is-invalid").removeClass("is-valid");
  } else {
    inputElement.addClass("is-valid").removeClass("is-invalid");
  }
}

var input = document.querySelector("#telephone");
var phoneInput = document.querySelector("#phone");

var iti = window.intlTelInput(input, {
  initialCountry: "tr", // Türkiye'yi varsayılan yapar
  separateDialCode: true, // Bayrak ile telefon kodunu ayırır
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js", // Formatlama ve doğrulama için
  geoIpLookup: function (callback) {
    fetch("https://ipinfo.io?token=YOUR_TOKEN")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var countryCode = data && data.country ? data.country : "us";
        callback(countryCode);
      });
  },
});

// Sadece ülke kodu seçimlerine izin vermek için 'readonly' yapıyoruz
input.addEventListener("focus", function () {
  input.readOnly = true; // Odaklandığında readonly yapar
});

input.addEventListener("blur", function () {
  input.readOnly = false; // Odak dışı olduğunda readonly kaldırır
});

// Ülke kodu değiştiğinde #phone inputuna odaklanma
input.addEventListener("change", function () {
  phoneInput.focus();
});
