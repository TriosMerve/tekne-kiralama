var wWidth = $(window).width();

$(window).on("load", function () {
  if ($(".preloader").length) {
    $(".preloader").addClass("last");
    setTimeout(() => {
      $(".preloader").remove();
    }, 100);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");

  // Video öğesi mevcutsa gözlem başlat
  if (video) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.src = video.getAttribute("data-src");
          observer.unobserve(video);
        }
      });
    });

    observer.observe(video);
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

  // Ekran genişliği 992 pikselden küçükse çalışacak kodlar
  // if (window.innerWidth < 992) {
  // filterHead için fixed ve yukarı kaydırma sticky sınıfı ekleme
  if (window.scrollY > 0) {
    $(".filterHead").addClass("fixed");
    $("header.type2").addClass("transitionTop");
  } else {
    $(".filterHead").removeClass("fixed");
    $("header.type2").removeClass("transitionTop");
  }

  // Yukarı kaydırma sırasında filterHead'e sticky sınıfı ekleme
  if (window.scrollY < lastScrollY) {
    $("header.type2").removeClass("transitionTop");
    $(".filterHead").addClass("sticky");
  } else {
    $(".filterHead").removeClass("sticky");
  }

  // calendarMobilButton sabitleme
  if (window.scrollY > 230) {
    $(".calendarMobilButton.sticky").addClass("fixed");
  } else {
    $(".calendarMobilButton.sticky").removeClass("fixed");
  }
  // }

  // if (window.innerWidth > 992) {
  //   if (window.scrollY > 0) {
  //     $(".calendarResult").removeClass("d-none").show();
  //   } else {
  //     $(".calendarResult").hide();
  //   }
  // }

  // Mevcut scroll pozisyonunu sakla
  lastScrollY = window.scrollY;
});

//Animasyonlar icin aos init kullaniliyor
AOS.init({
  offset: 50,
  easing: "ease",
  once: true,
});

/**Header menu button */
$(".openMenuButton").on("click", function () {
  $(this).toggleClass("active");
  $("header").toggleClass("opened");
  $(".headerMenuNav").toggleClass("active");
  $("html").toggleClass("overflow-hidden");
  $(".navMenu .menuList .subMenuItem").removeClass("active");
  $(".navMenu .menuList > li").removeClass("active");
  $(".subMenuList > li").removeClass("show").css("animation", "");

  if ($(this).hasClass("active")) {
    $(".menuList > li").each(function (index) {
      var listItem = $(this);
      setTimeout(function () {
        // listItem.addClass("show");
        listItem
          .addClass("show")
          .css("animation", "slideInFromDown2 .3s linear forwards");
      }, index * 230); // 100 milisaniye aralıklarla göster
    });
    const firstWrapper = $(".rightMenuColumn .subMenuWrapper").first();
    animateSubMenu(firstWrapper, true); // true: animasyonu çalıştır
  } else {
    $(".menuList > li").removeClass("show").css("animation", "");

    // İlk subMenuWrapper'daki animasyonu durdur
    const firstWrapper = $(".rightMenuColumn .subMenuWrapper").first();
    animateSubMenu(firstWrapper, false); // false: animasyonu durdur
  }
});

$(".subMenuItem").on("click", function () {
  const targetIndex = $(this).data("target"); // Tıklanan öğeye ait target

  // Tüm subMenuWrapper'ları gizle
  $(".rightMenuColumn .subMenuWrapper")
    .addClass("d-none")
    .removeClass("active");

  // İlgili subMenuWrapper'ı göster
  const targetWrapper = $(".rightMenuColumn .subMenuWrapper").eq(targetIndex);
  targetWrapper.removeClass("d-none").addClass("active");
  targetWrapper.closest(".rightMenuColumn").addClass("opened");
  $(".navMenuContent .leftMenuColumn").addClass("disabled");

  // Animasyonu çalıştır
  animateSubMenu(targetWrapper);
});

$(".subMenuWrapper .subMenuList").on("click", function () {
  if ($(this).hasClass("selected")) {
    $(this).removeClass("selected");
  } else {
    $(".subMenuWrapper .subMenuList").removeClass("selected");
    $(this).addClass("selected");
  }
});

$(".backLink").on("click", function () {
  $(".navMenuContent .leftMenuColumn").removeClass("disabled");
  $(this).parent(".mobileMenuColumn").removeClass("opened");
});

$(".closedMenuButton").on("click", function () {
  $(".rightMenuColumn .subMenuWrapper").addClass("d-none");
  $(".rightMenuColumn .subMenuWrapper")
    .first()
    .removeClass("d-none")
    .addClass("d-block");
  $(".openMenuButton").trigger("click");
});

// Animasyon işlevi: title ve içerikleri sırayla gösterir
function animateSubMenu(wrapper, shouldAnimate = true) {
  let delay = 0; // Başlangıç gecikmesi

  // İlk olarak, tüm öğelerin başlangıç durumunu ayarla
  wrapper.find(".subMenuList .title").removeClass("show");
  wrapper.find(".subMenuList li").removeClass("show");
  wrapper.find(".subMenuList .items a").removeClass("show");

  // Animasyon işlemi
  wrapper.find(".subMenuList").each(function () {
    const $title = $(this).find(".title"); // Title öğesi
    const $items = $(this).find("li"); // li öğeleri

    if (shouldAnimate) {
      // Title için animasyon ekle
      $title.css("animation-delay", `${delay}s`).addClass("show");
      delay += 0.3; // Title için gecikme

      // li öğeleri için animasyon ekle
      $items.each(function (index, element) {
        $(element)
          .css("animation-delay", `${delay + index * 0.1}s`) // Her öğe için gecikme
          .addClass("show"); // Göster
      });

      // li öğeleri için toplam gecikmeyi artır
      delay += $items.length * 0.1;
    }
  });
}
//Header End

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

$(".morePlusButton").on("click", function () {
  $(this).siblings(".movContent").toggleClass("opened");
  $(this).toggleClass("active");

  if ($(this).hasClass("active")) {
    $(this).text("- Daha az");
  } else {
    $(this).text("+ Daha Fazla");
  }
});
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
const dropdownToggle = document.querySelector(".languageWrapper .dropdown-toggle");

if (dropdownToggle) { // Eğer element varsa
  dropdownToggle.addEventListener("click", function () { 
    const body = document.body;
    if (this.classList.contains("show")) {
      body.classList.toggle("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  });
}


const userButtonToggle = document.querySelector(".userButton.type2");

if (userButtonToggle) { // Eğer element varsa
  userButtonToggle.addEventListener("click", function () { 
    const body = document.body;
    if (this.classList.contains("show")) {
      $(".mobileSideMenu").hide()
    } else {
      $(".mobileSideMenu").show()
    }
  });
}
// Dropdown kapandığında sınıfı kaldır
document.addEventListener("click", function (e) {
  if (!e.target.closest(".languageWrapper")) {
    document.body.classList.remove("overflow-hidden");
  }
});

$(".closeBlockquote").on("click", function () {
  $(this).parent("blockquote").remove();
});

$(document).on("click", ".footerTab.customTab .nav-link", function () {
  var $scrollContainer = $(".verticalCustomScroll"); // Scrollable container
  var $activeTab = $(this); // Clicked tab

  // Tabın soldan uzaklığını hesaplayalım
  var scrollPosition =
    $activeTab.position().left + $scrollContainer.scrollLeft();

  // Tabın scrollContainer içinde yatay olarak ortalanması
  var centerScrollPosition =
    scrollPosition - $scrollContainer.width() / 2 + $activeTab.outerWidth() / 2;

  // Scroll hareketi
  $scrollContainer.animate(
    {
      scrollLeft: centerScrollPosition,
    },
    300 // Animasyon süresi (ms)
  );
});

// document.querySelectorAll(".customTab .nav-link").forEach((tab) => {
//   tab.addEventListener("click", function () {
//     console.log("tıkladım")
//     setTimeout(() => {
//       if (this.classList.contains("active")) {
//         const container = document.querySelector(".verticalCustomScroll");
//         const offsetLeft = this.offsetLeft - container.offsetLeft;

//         container.scrollTo({
//           left: offsetLeft,
//           behavior: "smooth",
//         });
//       }
//     }, 100); // Aktif sınıfının atanmasını beklemek için kısa bir gecikme
//   });
// });

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

$(".moreLink").on("click", function(){
  $(this).prev(".line-clamp").toggleClass("line-clamp-3");
  if($(this).hasClass("active")){
    $(this).removeClass("active").text("Daha Fazla")
  }
  else{
    $(this).addClass("active").text("Daha Az")
  }
})

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
