const today = new Date();
today.setHours(0, 0, 0, 0); // Saat bilgisi sıfırlanır

$("#dateInputs")
  .dateRangePicker({
    separator: " to ",
    container: ".dateTimeSearchWrapper",
    language: "tr-short",
    stickyMonths: true,
    autoClose: false,
    showShortcuts: true,
    shortcuts: {
      "next-days": [3, 5, 7],
      next: ["week", "month", "year"],
    },
    startDate: today, // Bugün tarihini sıfırlanmış şekilde ayarla
    selectForward: false, // Sadece ileri tarih seçimine izin ver

    getValue: function () {
      if ($("#checkinInput").val() && $("#checkoutInput").val())
        return $("#checkinInput").val() + " to " + $("#checkoutInput").val();
      else return "";
    },
    setValue: function (s, s1, s2) {
      $("#checkinInput").val(s1);
      $("#checkoutInput").val(s2);
    },
  })
  .bind("datepicker-open", function () {
    $(".reservation-type").removeClass("d-none"); // Açıldığında d-none kaldır
    $("#checkInText, #checkinInput").addClass("selected");

    const targetOffset = $("#dateInputs").offset().top - 150;
    smoothScrollTo(targetOffset, 500); // 500ms animasyon
  })
  .bind("datepicker-close", function (event) {
    // Kapatma işlemini engellemek için koşul kontrolü
    if ($(event.target).closest(".reservation-type").length > 0) {
      event.preventDefault(); // Kapatma işlemini durdur
      return;
    }
  
    if (!event.forcedClose) {
      event.preventDefault(); // Manuel kapama dışındaki olayları engelle
    }
    $(".reservation-type").addClass("d-none");
  });

$(".apply-btn").click(function (evt) {
  evt.stopPropagation();
  console.log("sss");
  $(".dateTimeSearchWrapper").removeClass("active");
  $("#checkoutInput, #checkinInput").removeClass("selected");
});
//Location Dropdown
$(".locationSelect > .current").on("click", function (e) {
  console.log("tıkladım");
  $(".dateTimeSearchWrapper").addClass("active");
  $(".customRangeButton").removeClass("active");
  $("#checkinInput, #checkInText").removeClass("selected");

  // Datepicker açık mı kontrol et
  const isDatepickerOpen = $(".date-picker-wrapper:visible").length > 0;

  if (!isDatepickerOpen) {
    console.log("Datepicker açık değil.");
  }
  // niceSelect (locationSelect) açık mı kontrol et
  const isNiceSelectOpen = $(".locationSelect.open").length > 0;

  if (isNiceSelectOpen) {
    console.log("niceSelect açık değil.");
    $(".dateTimeSearchWrapper").removeClass("active");
    $(".customRangeButton").removeClass("active");
  }
});

//Location Dropdown item
$(".locationSelect").on("click", ".option", function () {
  const value = $(this).data("value"); // Seçili option'ın data-value değeri
  console.log(value);

  $(".dateTimeSearchWrapper").addClass("opened");
  $(".customRangeButton").addClass("active");
  $("#checkinInput, #checkInText").addClass("selected");
  // $('#dateInputs').data('dateRangePicker').close();
  setTimeout(function () {
    $("#dateInputs").data("dateRangePicker").open();
  }, 300); // 300ms bekleme ile tekrar açılıyor
});

//Tarih aralıgı sec butonu .customRangeButton’a tıklayınca şehir dropdown ı acılır ve sınıflar eklenır
$(".customRangeButton").on("click", function (event) {
  event.stopPropagation(); // Tıklamanın document'e yayılmasını engeller
  $(".dateTimeSearchWrapper").addClass("active");
  $(".locationSelect").trigger("click");
});

$(document).on("click", function (e) {
  // Eğer tıklama locationSelect, dateTimeSearchWrapper veya calendarWrapper içinde değilse işlem yap
  if (
    !$(e.target).closest(".locationSelect").length &&
    !$(e.target).closest(".dateTimeSearchWrapper").length &&
    !$(e.target).closest(".calendarWrapper").length
  ) {
    console.log("calendarWrapper dışında bir yere tıkladınız.");
    $(".dateTimeSearchWrapper, .customRangeButton").removeClass("active");
    $("#checkinInput, #checkInText, #checkoutInput, #checkOutText").removeClass("selected");
  }
});


// Akıcı kaydırma fonksiyonu
function smoothScrollTo(target, duration) {
  const start = window.pageYOffset;
  const distance = target - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, start, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}


// .reservation-type’a tıklamayı engelle
$(".reservation-type").on("click", function (event) {
  event.stopPropagation(); // Tıklama olayının yayılmasını durdur
});

// .typeItem’a tıklanınca active class kontrolü
$(".reservation-type .typeItem").on("click", function (event) {
  event.stopPropagation(); // Tıklamanın document'e yayılmasını engeller
  $(".reservation-type .typeItem").removeClass("active");
  $(this).addClass("active");

  // Date inputları temizleyip yeniden gösteriyoruz
  $("#dateInputs input").val("");
  $("#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose").show();
});

// Tekne Kiralama ve Tekne Turları tıklayınca inputları temızler
$(".boatType .typeItem").on("click", function () {
  $(".boatType .typeItem").removeClass("active");
  $(this).addClass("active");
  $("#dateInputs input").val("");
  $("#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose").show();
});
