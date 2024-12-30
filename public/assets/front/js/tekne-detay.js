var headerHeight = $("header").outerHeight();
var staticColumn =
  $(".staticColumn").offset().top + $(".staticColumn").outerHeight();
var fixedColumn = $(".fixedColumn");
var fixedColumnTop = fixedColumn.offset().top;
var wWidth = $(window).width();

$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  // Header yüksekliğinden +100px daha aşağı scroll yapıldığında show class'ı ekle
  if (scrollTop > fixedColumnTop - 100) {
    fixedColumn.addClass("show");
  } else {
    fixedColumn.removeClass("show");
  }

  // pageContent'in altına geldiğimizde absolute class'ı ekle
  if (scrollTop + $(window).height() - 300 >= staticColumn) {
    fixedColumn.addClass("absolute");
  } else {
    fixedColumn.removeClass("absolute");
  }

  if (isDatepickerOpen) {
    if (wWidth < 992) {
      if (scrollTop > fixedColumnTop - 100) {
        $(".dateColumnWrapper").addClass("fixed selected");
      }
    }
    console.log("Datepicker açıkken sayfa scroll edildi.");
  }
  if (wWidth < 992) {
    if (scrollTop > fixedColumnTop - 100) {
      $(".dateColumnWrapper").addClass("fixed");
      $(".dateColumnWrapper .dateColumn .title").text("Tarih Seçimini göster");
    } else {
      $(".dateColumnWrapper").removeClass("fixed");
      $(".dateColumnWrapper .dateColumn .title").text(
        "Fiyatları görmek için tarih seçiniz"
      );
    }
  }
});
// Sadece ekran genişliği 992px'den küçükse çalışacak
if (wWidth < 992) {
  var $wrapper = $(".dateColumnWrapper");

  // Eğer .fixed sınıfı varsa, metni hemen değiştir
  if ($wrapper.hasClass("fixed")) {
    console.log("test");
    $(".dateColumnWrapper .dateColumn .title").text("Tarih Seçimini göster");
  }

  // Tıklama olayını dinle
  $(".dateColumnWrapper .dateColumn .title").on("click", function () {
    var $wrapper = $(this).closest(".dateColumnWrapper");
    console.log("tıkladım");
    // .fixed sınıfı eklenmişse işlem yapılacak
    if ($wrapper.hasClass("fixed")) {
      // Başlangıç metni değişikliği ve selected sınıfının kontrolü
      console.log("fixed");
      if ($wrapper.hasClass("selected")) {
        $(".fixedColumn").removeClass("selected");
        console.log("selected");
        $(this).text("Tarih Seçimini göster");
        $wrapper.removeClass("selected");
        $("html").removeClass("overflow-hidden");
      } else {
        $(".fixedColumn").addClass("selected");
        console.log("selected degıl");
        $(this).text("Fiyatları görmek için tarih seçiniz");
        $wrapper.addClass("selected");
        $("html").addClass("overflow-hidden");

        $(".nice-select").on("click", function () {
          var $dropdown = $(this).find(".list");
          var dropdownHeight = $dropdown.outerHeight(); // Dropdown yüksekliği
          var viewportHeight = $(window).height(); // Görünen ekranın yüksekliği
          var offsetTop = $(this).offset().top; // Dropdown'un üstten uzaklığı

          // Eğer alan yukarı daha genişse, yukarı açılacak
          if (viewportHeight - offsetTop < dropdownHeight) {
            $dropdown.css({
              top: "auto",
              bottom: "100%",
            });
          } else {
            $dropdown.css({
              top: "100%",
              bottom: "auto",
            });
          }
        });
      }
    }
  });
}
$(document).on("click", function (e) {
  var $wrapper = $(".dateColumnWrapper");
  var $fixedColumn = $(".fixedColumn");

  // Tıklanan element .fixedColumn veya .dateColumnWrapper içinde değilse işlemi çalıştır
  if (
    !$wrapper.is(e.target) &&
    !$fixedColumn.is(e.target) &&
    $wrapper.has(e.target).length === 0 &&
    $fixedColumn.has(e.target).length === 0
  ) {
    // .fixed ve .selected sınıfları varsa işlem yapılacak
    if ($wrapper.hasClass("fixed") && $wrapper.hasClass("selected")) {
      $(".dateColumnWrapper .dateColumn .title").text("Tarih Seçimini göster");
      $wrapper.removeClass("selected");
      $fixedColumn.removeClass("selected");
      $("html").removeClass("overflow-hidden");
    }
  }
});

let isDatepickerOpen = false; // Açık durumunu kontrol etmek için

const today = new Date(); // Bugünün tarihi
today.setHours(0, 0, 0, 0);
// Tarih aralığı seçici için başlangıç ayarları
function initializeDatepicker(container) {
  $("#dateInputs2")
    .dateRangePicker({
      separator: " to ",
      container: container, // Dinamik olarak ayarlanacak
      language: "tr-short",
      stickyMonths: true,
      autoClose: true,
      showShortcuts: true,
      shortcuts: {
        "next-days": [3, 5, 7],
        next: ["week", "month", "year"],
      },
      startDate: today, // Bugün tarihini sıfırlanmış şekilde ayarla
      selectForward: false, // Sadece ileri tarih seçimine izin ver
      getValue: function () {
        if ($(".checkinInput").val() && $(".checkoutInput").val()) {
          return $(".checkinInput").val() + " to " + $(".checkoutInput").val();
        } else return "";
      },
      setValue: function (s, s1, s2) {
        $(".checkinInput").val(s1);
        $(".checkoutInput").val(s2);
        $(".teklifisteButton").removeClass("disabled");
      },
    })
    .bind("datepicker-open", function () {
      isDatepickerOpen = true; // Açık olduğunu belirt
      console.log("Datepicker açıldı!");

      // Görünmez durumdaysa görünür yap
      $(".dateRangePicker").css("display", "block");

      // Eğer .fixedColumn sınıfı 'show' içermiyorsa sayfayı yukarı kaydır
      if (!$(".fixedColumn").hasClass("show")) {
        // Sayfanın yukarı kaydırılması
        const fixedColumnTop = $(".fixedColumn").offset().top;
        const offsetValue = 100; // Yukarı kaydırma için eklenmiş ofset değeri
        $("html, body").animate(
          {
            scrollTop: fixedColumnTop - offsetValue,
          },
          300 // Animasyon süresi (ms)
        );
      }
    })
    .bind("datepicker-close", function () {
      isDatepickerOpen = false; // Kapandığında durumu sıfırla
      console.log("Datepicker kapandı!");
    });

  $("#dateInputs3")
    .dateRangePicker({
      singleDate: true,
      singleMonth: true,
      container: container,
      language: "tr-short",
      autoClose: true,
      showShortcuts: false,
      selectForward: true, // Sadece ileri tarih seçimine izin ver
      minDate: new Date().setDate(new Date().getDate() + 1), // Bugün hariç, yalnızca yarından itibaren tarihler
      startDate: new Date().setDate(new Date().getDate() + 1), // Bugün tarihini hariç tutarak yarından başlat
      showTopbar: false,
      setValue: function (s, s1) {
        $(".checkinInput2").val(s1);

        // Tarihi .dateResult içine ekle
        if (s1) {
          var selectedDate = new Date(s1);
          var formattedDate =
            selectedDate.getDate() +
            " " +
            selectedDate.toLocaleString("default", { month: "short" });

          $(".dateResult").text(formattedDate).show();

          //   // İlk .formSelectWrapper'dan disabled sınıfını kaldır ve select'i etkinleştir
          $(".chooseHourWrapper .formSelectWrapper")
            .first()
            .removeClass("disabled")
            .find(".checkin-hour")
            .prop("disabled", false)
            .niceSelect("update");
          $(".chooseHourWrapper .formSelectWrapper")
            .first()
            .find(".checkin-hour")
            .trigger("click");
          // Nice Select menüsünü aç
        }
        //Secım yapıldıgında takvımı kapatma
      },
    })
    .bind("datepicker-open", function () {
      $(".reservation-type").addClass("d-none"); // Açıldığında d-none ekle
    });

  $(".chooseHourWrapper").hide();

  $(".boatType .typeItem").on("click", function () {
    $(".boatType .typeItem").removeClass("active");
    $(this).addClass("active");

    var thisDataId = $(this).attr("data-id");
    console.log("this data id : " + thisDataId);
    $(".teklifisteButton").addClass("disabled");

    // Önce mevcut datepicker'ı yok et
    // $("#dateInputs2").data("dateRangePicker").destroy();

    if (thisDataId == "toursBoat") {
      $(".chooseHourWrapper").show().addClass("active");
      $("#dateInputs3").removeClass("d-none");
      $("#dateInputs2").addClass("d-none");
      $("#dateInputs3").addClass("singleInputs");
      $(".dateColumnWrapper").addClass("singleDateWrapper");
    } else {
      $("#dateInputs3").addClass("d-none");
      $("#dateInputs2").removeClass("d-none");
      $(".chooseHourWrapper").hide().removeClass("active");
      $(".dateColumnWrapper").removeClass("singleDateWrapper");
      $(".checkinInput").val("");
      $(".checkoutInput").val("");
    }

    $(
      ".dateInputs .checkInText .choose, .dateInputs .checkOutText .choose"
    ).show();

    if (!$(".fixedColumn").hasClass("show")) {
      const targetOffset = $(".dateColumn").offset().top - 150;
      smoothScrollTo(targetOffset, 500); // 500ms animasyon;
    }
  });
}

$(".chooseHourWrapper .formSelectWrapper .checkin-hour").on(
  "change",
  function () {
    var selectedText = $(this)
      .next(".nice-select")
      .find(".current")
      .text()
      .trim();

    // "Seçiniz" kontrolü
    if (selectedText === "Seçiniz") {
      console.log("Lütfen geçerli bir seçenek yapın.");
      return; // Geçerli bir seçim yapılmadıysa işlem yapma
    }

    console.log("Bir option seçildi:", selectedText);

    // .checkinHourGet üzerine bir işlem yaparak seçimi değiştirme (gerekirse)
    $(".checkinHourGet")
      .next(".nice-select")
      .find(".current")
      .text(selectedText); // .checkin-hour'dan alınan metni .checkinHourGet'e aktar

    // Aktif form elemanına 'test' sınıfı ekle
    $("#dateInputs2").data("dateRangePicker").close();
    $(this).closest(".formSelectWrapper").addClass("test");

    // Bir sonraki form elemanını tanımla
    $(this)
      .closest(".formSelectWrapper")
      .next(".formSelectWrapper")
      .removeClass("disabled")
      .find(".checkout-hour")
      .prop("disabled", false)
      .niceSelect("update");

    // niceSelect açma işlemi
    setTimeout(function () {
      console.log("ss");
      $(".detailsHour").find(".checkout-hour").trigger("click");
      //   $(".nice-select.checkout-hour").trigger("click");
    }, 200); // 100ms gecikme ile
  }
);
$(".chooseHourWrapper .formSelectWrapper .checkout-hour").on(
  "change",
  function () {
    console.log("out secım yapıldı");
    var selectedText = $(this)
      .next(".nice-select")
      .find(".current")
      .text()
      .trim();

    // "Seçiniz" kontrolü
    if (selectedText === "Seçiniz") {
      console.log("Lütfen geçerli bir seçenek yapın.");
      return; // Geçerli bir seçim yapılmadıysa işlem yapma
    }

    console.log("Bir option seçildi:", selectedText);

    // .checkinHourGet üzerine bir işlem yaparak seçimi değiştirme (gerekirse)
    $(".checkoutHourGet")
      .next(".nice-select")
      .find(".current")
      .text(selectedText); // .checkin-hour'dan alınan metni .checkinHourGet'e aktar

    $(".teklifisteButton").removeClass("disabled");
  }
);

// Varsayılan container ile başlat
initializeDatepicker(".dateColumn");

$(".changeDateButton").on("click", function () {
  // Datepicker'ı yok et
  $("#dateInputs3").data("dateRangePicker").destroy();
  if ($("#dateInputs2").data("dateRangePicker")) {
    $("#dateInputs2").data("dateRangePicker").destroy();
  }

  // Yeni container için başlat
  const newContainer = ".offerCanvas";
  initializeDatepicker(newContainer);

  console.log(`Datepicker container değiştirildi: ${newContainer}`);

  // Datepicker'ı bir süre sonra aç
  setTimeout(() => {
    $("#dateInputs2").data("dateRangePicker").open();
  }, 100); // 100 ms gecikme
});
$(".changeDateButton2").on("click", function () {
  // Datepicker'ı yok et
  $("#dateInputs2").data("dateRangePicker").destroy();
  if ($("#dateInputs3").data("dateRangePicker")) {
    $("#dateInputs3").data("dateRangePicker").destroy();
  }

  // Yeni container için başlat
  const newContainer = ".offerCanvas";
  initializeDatepicker(newContainer);

  console.log(
    `Datepicker container değiştirildi ve singleDate etkinleştirildi: ${newContainer}`
  );
  // Datepicker'ı bir süre sonra aç
  setTimeout(() => {
    $("#dateInputs3").data("dateRangePicker").open();
  }, 100); // 100 ms gecikme

  //    // Kullanıcı bir tarih seçmiş mi kontrol et
  //    var selectedDate = $(".checkinInput2").val(); // .checkinInput2'deki tarih değerini al

  //    if (selectedDate && selectedDate !== "Tarih Seçiniz") {
  //      // Eğer tarih seçildiyse, işlemi yap
  //      console.log("Tarih zaten seçildi: " + selectedDate);

  //      // İlk .formSelectWrapper'dan disabled sınıfını kaldır ve select'i etkinleştir
  //      $(".chooseHourWrapper.offerHours .formSelectWrapper").first().removeClass("disabled").find(".checkinHourGet").prop("disabled", false).niceSelect("update");

  //      $("..chooseHourWrapper.offerHours .formSelectWrapper").first().find(".checkin-hour").trigger("click");

  //      // İlgili işlemleri burada yapabilirsin, örneğin formu veya saat seçimini etkinleştirebilirsin
  //    }

  //    // Datepicker'ı yok et
  //    $("#dateInputs2").data("dateRangePicker").destroy();
  //    if ($("#dateInputs3").data("dateRangePicker")) {
  //      $("#dateInputs3").data("dateRangePicker").destroy();
  //    }

  //    // Yeni container için başlat
  //    const newContainer = ".offerCanvas";
  //    initializeDatepicker(newContainer);

  //    console.log(
  //      `Datepicker container değiştirildi ve singleDate etkinleştirildi: ${newContainer}`
  //    );

  //    // Datepicker'ı bir süre sonra aç
  //    setTimeout(() => {
  //      $("#dateInputs3").data("dateRangePicker").open();
  //    }, 100); // 100 ms gecikme
});

//Teklif iste butonu tıklandıgında yukarı kaydırdıgı ıcın bu kod eklendı ıslem yaparken kaldırılabılır
// $(".teklifisteButton").on("click", function (e) {
//   e.preventDefault();
// });
$(".teklifisteButton").on("click", function (e) {
  const toursBoat = $("#toursBoat");
  if (!toursBoat.hasClass("active")) {
    e.preventDefault(); // Tıklamayı engelle
  } else {
    // Canvas açma işlemleri burada devam eder
    const navTekneTurlariTab = $("#nav-tekneturlari-tab");
    const navTekneTurlariContent = $("#nav-tekneturlari");

    // Sekmeyi aktif yap
    $(".offerNavTabs .nav-link.active").removeClass("active");
    $(".tab-pane.show.active").removeClass("show active");

    navTekneTurlariTab.addClass("active");
    navTekneTurlariContent.addClass("show active");
  }
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

$("#offerNavTabs .nav-link").on("click", function () {
  var dataId = $(this).data("id");

  // Aktif tab'ı kontrol et
  $(this).tab("show");

  console.log("data id : " + dataId);
  if (dataId == "toursBoat") {
    $(".checkinInput2").val("Tarih Seçiniz");
    console.log("check value : " + $(".checkinInput2").val());
  }
  //   if ($(".checkinInput2").val() === "Tarih Seçiniz"){
  //     $(".chooseHourWrapper.offerHours .formSelectWrapper").addClass("disabled")
  //     $(".chooseHourWrapper.offerHours .formSelectWrapper .customSelect").addClass("disabled")
  //   }
});
