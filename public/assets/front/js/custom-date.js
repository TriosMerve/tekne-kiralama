let isDateRangePickerOpen = false; // DatePicker'ın açık olup olmadığını kontrol etmek için değişken

const today = new Date();
today.setHours(0, 0, 0, 0); // Saat bilgisi sıfırlanır
if ($("#dateInputs").length > 0) {
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
        // Tarihleri .dateResult içine ekleyelim
        if (s1 && s2) {
          var startDate = new Date(s1);
          var endDate = new Date(s2);

          // Gün ve ay formatında tarihi elde etme
          var startFormatted =
            startDate.getDate() +
            " " +
            startDate.toLocaleString("default", { month: "short" });
          var endFormatted =
            endDate.getDate() +
            " " +
            endDate.toLocaleString("default", { month: "short" });

          $(".dateResult").text(startFormatted + " - " + endFormatted); // Seçilen tarihleri yaz
          $(".dateResult").show(); // .dateResult'i görünür yap
        }
      },
    })
    .bind("datepicker-open", function () {
      isDateRangePickerOpen = true; // DatePicker açıldığında durumu güncelle
      $(".reservation-type").removeClass("d-none"); // Açıldığında d-none kaldır
      $("#checkInText, #checkinInput").addClass("selected");
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
      isDateRangePickerOpen = false; // DatePicker kapandığında durumu güncelle
      $(".reservation-type").addClass("d-none");
    });
}

$(".calendarMobilButton.home").on("click", function () {
  $(".calendarWrapper").addClass("opened");
  $("html").addClass("overflow-hidden");
});
$(".dateInfo").on("click", function () {
  $(".calendarWrapper").addClass("opened");
  $("html").addClass("overflow-hidden");
});
$(".closeCalendarButton").on("click", function () {
  $(".calendarWrapper").removeClass("opened");
  $("html").removeClass("overflow-hidden");
});

$(".apply-btn").click(function (evt) {
  evt.stopPropagation();
  console.log("sss");
  $(".dateTimeSearchWrapper").removeClass("active");
  $("#checkoutInput, #checkinInput").removeClass("selected");
});

function smoothScrollToTarget() {
  const targetOffset = $(".calendarWrapper").offset().top - 150;
  smoothScrollTo(targetOffset, 500); // 500ms animasyon
}

function resetDateInputs() {
  $(".customRangeButton").show();
  $("#dateInputs").data("dateRangePicker").clear();
  $("#checkinInput, #checkInText").removeClass("selected");
  $(".dateSearchButton").removeClass("active");

}

// Location Select durum kontrolü
$(".locationSelect").on("click", function () {
  if ($(this).closest(".nice-select").hasClass("scrollTop")) {
    smoothScrollToTarget();
  }
  if ($(this).closest(".nice-select").hasClass("open")) {
    // dateRangePicker'da tarihleri sıfırlama
    console.log("Location select kapandı");

    // Eğer dateRangePicker açık değilse .active sınıfını kaldır
    if (!isDateRangePickerOpen) {
      $(".dateTimeSearchWrapper").removeClass("active");
      console.log("Date picker kapalı, active sınıfı kaldırıldı.");
    }
  } else {
    $(".nice-select .list .option").first().hide();
    resetDateInputs();
    $(
      "#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose"
    ).show();

    console.log("Location select açıldı");

    $(".dateTimeSearchWrapper").addClass("active");
  }
});

// Location Select Option öğelerine tıklanma kontrolü
$(".locationSelect").on("change", function () {
  var selectedText = $(this).find("option:selected").text(); // Seçilen option'ın metni

  console.log("Bir option seçildi:", selectedText);

  // .locationName içine seçilen option'ın metnini yazalım
  $("#locationName").text(selectedText);
  console.log("loc text : " + $("#locationName").text());

  $(".customRangeButton").hide();

  $(".dateTimeSearchWrapper").addClass("active opened apply");
  $(".dateSearchButton").addClass("active");
  $("#checkinInput, #checkInText").addClass("selected");

  setTimeout(function () {
    $("#dateInputs").data("dateRangePicker").open(); // dateRangePicker'i aç
  }, 100); // 100 milisaniye gecikme
});

$(".dateSearchButton").on("click", function () {
  $(".dateTimeSearchWrapper").removeClass("active");
  $(".calendarWrapper").removeClass("opened");
});
// Belirtilen alan dışında bir yere tıklandığında active sınıfını kaldır
$(document).on("click", function (event) {
  if (!$(event.target).closest(".calendarWrapper").length) {
    $(".dateTimeSearchWrapper").removeClass("active");

    resetDateInputs();
    $(
      "#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose"
    ).show();

    // .locationSelect öğesinin ilk option'ını seçili yapalım
    $(".locationSelect").prop("selectedIndex", 0); // İlk öğe seçili olacak
    $(".locationSelect").niceSelect("update"); // niceSelect'i güncelle

    // .locationSelect tıklama olayını sıfırlayıp yeniden ekleyelim
    $(".locationSelect")
      .off("click")
      .on("click", function () {
        if (!$(this).closest(".nice-select").hasClass("open")) {
          console.log("Location select açıldı");
          $(".dateTimeSearchWrapper").addClass("active");
        } else {
          console.log("Location select kapandı");
          if (!isDateRangePickerOpen) {
            $(".dateTimeSearchWrapper").removeClass("active");
          }
        }
      });
  }
});

// calendarWrapper içinde bir yere tıklandığında
$(".calendarWrapper").on("click", function () {
  // Eğer locationSelect açık değilse .active sınıfını kaldır
  if (
    $(".locationSelect").closest(".nice-select").hasClass("open") &&
    !isDateRangePickerOpen
  ) {
    $(".dateTimeSearchWrapper").removeClass("active");

    resetDateInputs();

    console.log("CalendarWrapper içinde tıklama, active sınıfı kaldırıldı.");
  }
});

$(".boatType").on("click", function () {
  $(".dateTimeSearchWrapper").removeClass("active");

  resetDateInputs();

  $(
    "#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose"
  ).show();
  $(".locationSelect").val("").niceSelect("update"); // niceSelect'i güncelle

  // .locationSelect tıklama olayını sıfırlayıp yeniden ekleyelim
  $(".locationSelect")
    .off("click")
    .on("click", function () {
      if (!$(this).closest(".nice-select").hasClass("open")) {
        console.log("Location select açıldı");
        $(".dateTimeSearchWrapper").addClass("active");
      } else {
        console.log("Location select kapandı");
        if (!isDateRangePickerOpen) {
          $(".dateTimeSearchWrapper").removeClass("active");
        }
      }
    });
});
$(".boatType .typeItem").on("click", function () {
  $(".boatType .typeItem").removeClass("active");
  $(this).addClass("active");
  $(".dateTimeSearchWrapper").removeClass("active opened apply");

  resetDateInputs();

  $(
    "#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose"
  ).show();
  $(".locationSelect").val("").niceSelect("update"); // niceSelect'i güncelle

  // .locationSelect tıklama olayını sıfırlayıp yeniden ekleyelim
  $(".locationSelect")
    .off("click")
    .on("click", function () {
      if (!$(this).closest(".nice-select").hasClass("open")) {
        console.log("Location select açıldı");
        $(".dateTimeSearchWrapper").addClass("active");
      } else {
        console.log("Location select kapandı");
        if (!isDateRangePickerOpen) {
          $(".dateTimeSearchWrapper").removeClass("active");
        }
      }
    });
});

// .typeItem’a tıklanınca active class kontrolü
$(".reservation-type .typeItem").on("click", function (event) {
  event.stopPropagation(); // Tıklamanın document'e yayılmasını engeller
  $(".reservation-type .typeItem").removeClass("active");
  $(this).addClass("active");

  // Date inputları temizleyip yeniden gösteriyoruz
  $("#dateInputs").data("dateRangePicker").clear();
  $(
    "#dateInputs #checkInText .choose, #dateInputs #checkOutText .choose"
  ).show();
});
