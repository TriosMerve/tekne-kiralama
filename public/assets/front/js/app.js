var wWidth = $(window).width();

$(window).on("load", function () {
  if ($(".preloader").length) {
    $(".preloader").addClass("last");
    setTimeout(() => {
      $(".preloader").remove();
    }, 100);
  }
});

/*Scrooll page fixed header */
document.addEventListener("scroll", function () {
  var header = document.getElementById("header");

  if (window.scrollY > 0) {
    header.classList.add("sticky-top");
  } else {
    header.classList.remove("sticky-top");
  }
});

//Animasyonlar icin aos init kullaniliyor
AOS.init({
  offset: 50,
  easing: "ease",
  once: true,
});

/**Marquee */
$(".marquee").marquee({
  direction: "left",
  duration: 9000,
  gap: 50,
  delayBeforeStart: 0,
  duplicated: true,
  startVisible: true,
});

$(".stopMarquee").click(function (e) {
  e.preventDefault();
  console.log("dd");
  if ($(this).hasClass("paused")) {
    $(this).removeClass("paused");
    $(".marquee").trigger("resume");
  } else {
    $(this).addClass("paused");
    $(".marquee").trigger("pause");
  }
});
/**Marquee finished */

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
  $(".rightMenuColumn .subMenuWrapper").addClass("d-none");

  // İlgili subMenuWrapper'ı göster
  const targetWrapper = $(".rightMenuColumn .subMenuWrapper").eq(targetIndex);
  targetWrapper.removeClass("d-none");

  // Animasyonu çalıştır
  animateSubMenu(targetWrapper);
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

const homeCarousel = new Swiper(".homeCarousel", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 300,
  on: {
    slideChangeTransitionStart: function () {
      $(".swiper-slide .slideCaption").hide(0);
      $(".swiper-slide .slideCaption")
        .removeClass("aos-init")
        .removeClass("aos-animate");
    },
    slideChangeTransitionEnd: function () {
      $(".swiper-slide .slideCaption").show(0);
      AOS.init();
    },
  },
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
}

/**Tab Js
 *
 *
 *
 */
const swiper = new Swiper(".haberlerCardSlide", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: ".swiper-bizden-next",
    prevEl: ".swiper-bizden-prev",
  },
  breakpoints: {
    480: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
    },
    992: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

const gallerySlide = new Swiper(".gallerySlide", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: ".swiper-gallery-next",
    prevEl: ".swiper-gallery-prev",
  },
  breakpoints: {
    640: {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
    },
    992: {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const swipersingleSlide = new Swiper(".singleSlide", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: ".swiper-gallery-next",
    prevEl: ".swiper-gallery-prev",
  },
});
/**Tab js end
 *
 *
 */

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
