$(window).on("load", function () {
  if ($(".preloader").length) {
    $(".preloader").addClass("last");
    setTimeout(() => {
      $(".preloader").remove();
    }, 100);
  }
});

/*Scrooll page fixed header */
let lastScrollY = window.scrollY;

document.addEventListener("scroll", function () {
  var header = document.getElementById("header");

  // Header için sticky sınıfı ekleme
  if (window.scrollY > 0) {
    header.classList.add("sticky-top");
  } else {
    header.classList.remove("sticky-top");
  }
});


if (typeof Fancybox !== "undefined") {
  Fancybox.bind("[data-fancybox]", {
    compact: !1,
    Carousel: {},
    Thumbs: !1,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  });
  Fancybox.bind(".galleryItem", {
    compact: !1,
    Carousel: {},
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  });
}


if (typeof $.fn.niceSelect !== "undefined") {
  $(".customSelect").niceSelect();
  // Select elementini seç
  // Tab seçimi değiştiğinde tetiklenecek event
  $(".tabSelector").on("change", function () {
    var selectedValue = $(this).val();
    console.log("selected : " + selectedValue);
    $(".tab-pane").removeClass("show active");
    $("#" + selectedValue).addClass("show active");
  });
}

// document.querySelectorAll(".checkedControl").forEach(function (checkbox) {
//   checkbox.addEventListener("change", function () {
//     const wrapper = this.closest(".checkedControlWrapper");
//     const priceInputWrapper = wrapper.querySelector(".priceInputWrapper");

//     if (this.checked) {
//       priceInputWrapper.classList.remove("disabled");
//     } else {
//       priceInputWrapper.classList.add("disabled");
//     }
//   });
// });

$(document).on('change', '.checkedControl', function () {
    const wrapper = $(this).closest('.checkedControlWrapper');
    const options = wrapper.find('.checkedControlOption');

    if ($(this).is(':checked')) {
        options.removeClass('disabled');
    } else {
        options.addClass('disabled');
    }
});


$(document).ready(function () {
  // Switch durumunu dinle
  $(".custom-switch-input").on("change", function () {
    // Şu anki switch'in kapsayıcı .accSwitchHead'ini al
    const accSwitchHead = $(this).closest(".accSwitchHead");

    // Bu .accSwitchHead'in next'ini (yani ilgili .accSwitchBody) al
    const accSwitchBody = accSwitchHead.next(".accSwitchBody");

    if ($(this).is(":checked")) {
      // Eğer switch checked ise: Yüksekliği hesapla ve aç
      const targetHeight = accSwitchBody.prop("scrollHeight"); // Dinamik yükseklik
      accSwitchBody.removeClass("disabled");
    } else {
      // Eğer switch unchecked ise: Kapat
      accSwitchBody.addClass("disabled");
    }
  });

  $(".mobileSideMenu").on("click", function () {
    $(this).hasClass("active")
      ? ($(this).removeClass("active"),
        $(this).next(".sidenavWrapper").removeClass("active"),
        $(".overlay").hide(),
        $("html").removeClass("overflow-hidden"))
      : ($(this).addClass("active"),
        $(this).next(".sidenavWrapper").addClass("active"),
        $(".overlay").show(),
        $("html").addClass("overflow-hidden"));
  });

  $(".overlay").on("click", function () {
    if ($(".mobileSideMenu").hasClass("active")) {
      $(".mobileSideMenu").removeClass("active");
      $(".mobileSideMenu").next(".sidenavWrapper").removeClass("active");
      $(this).hide();
      $("html").removeClass("overflow-hidden");
    }
  });

  //Tekne sahibi hesabım sunulan hizmetler fiyat buton
  // Radio button durum kontrolü
  $(".priceRadioWrapper").each(function () {
    const wrapper = $(this); // Her priceRadioWrapper için işleme başla
    const radios = wrapper.find('input[type="radio"]'); // Bu wrapper içindeki tüm radio butonlarını al
    const priceInputWrapper = wrapper.find(".priceInputWrapper"); // Fiyat input alanını seç

    // Sayfa yüklendiğinde radio butonlarının başlangıç durumunu kontrol et
    const initialRadio = radios.filter(":checked"); // Seçili olan radio butonunu al
    console.log(
      "Başlangıç durumunda seçili radio:",
      initialRadio.length ? initialRadio.val() : "Seçili yok"
    ); // Başlangıç durumunu logla
    if (initialRadio.length && initialRadio.hasClass("priceRadioCheck")) {
      console.log("Ücretli radio butonu seçili, disabled kaldırılıyor");
      priceInputWrapper.removeClass("disabled"); // Eğer "Ücretli" seçiliyse
    } else {
      console.log("Fiyata Dahil radio butonu seçili, disabled ekleniyor");
      priceInputWrapper.addClass("disabled"); // Eğer "Fiyata Dahil" seçiliyse
    }

    // Radio button değişikliklerini dinle
    radios.on("change", function () {
      const radio = $(this); // Tıklanan radio butonunu al
      console.log("Tıklanan radio:", radio.val()); // Tıklanan radio butonunu logla
      if (radio.hasClass("priceRadioCheck") && radio.prop("checked")) {
        console.log("Ücretli radio butonu seçildi, disabled kaldırılıyor");
        priceInputWrapper.removeClass("disabled"); // "Ücretli" seçildiğinde fiyat input alanını aktif et
      } else {
        console.log("Fiyata Dahil radio butonu seçildi, disabled ekleniyor");
        priceInputWrapper.addClass("disabled"); // Diğer seçeneklerde fiyat input alanını devre dışı bırak
      }
    });
  });
});
