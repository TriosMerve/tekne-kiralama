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

//Header End

// Swiper'ları başlatan fonksiyon
function initializeSwipers() {
  // .blogSlider sınıfına sahip bir element var mı?
  const blogSliderElement = document.querySelector(".blogSlider");
  if (blogSliderElement) {
    var blogSlider = new Swiper(blogSliderElement, {
      slidesPerView: 1,
      pagination: {
        el: ".blog-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  const sliders = [
    {
      element: ".singleImgSlider",
      pagination: ".swiper-pagination-single01",
      nextEl: ".nextButton-single01",
      prevEl: ".prevButton-single01"
    },
    {
      element: ".singleImgSlider2",
      pagination: ".swiper-pagination-single02",
      nextEl: ".nextButton-single02",
      prevEl: ".prevButton-single02"
    },
    {
      element: ".singleImgSlider3",
      pagination: ".swiper-pagination-single03",
      nextEl: ".nextButton-single03",
      prevEl: ".prevButton-single03"
    },
    {
      element: ".singleImgSlider4",
      pagination: ".swiper-pagination-single04",
      nextEl: ".nextButton-single04",
      prevEl: ".prevButton-single04"
    },
    {
      element: ".singleImgSlider5",
      pagination: ".swiper-pagination-single05",
      nextEl: ".nextButton-single05",
      prevEl: ".prevButton-single05"
    },
    {
      element: ".singleImgSlider6",
      pagination: ".swiper-pagination-single06",
      nextEl: ".nextButton-single06",
      prevEl: ".prevButton-single06"
    }
  ];
  
  sliders.forEach(slider => {
    const sliderElement = document.querySelector(slider.element);
    if (sliderElement) {
      new Swiper(sliderElement, {
        slidesPerView: 1,
        pagination: {
          el: slider.pagination,
          clickable: true,
        },
        navigation: {
          nextEl: slider.nextEl,
          prevEl: slider.prevEl,
        },
      });
    }
  });
  
  

  // .verticalSwiper sınıfına sahip bir element var mı?
  const verticalSwiperElement = document.querySelector(".verticalSwiper");
  if (verticalSwiperElement) {
    verticalSwiper = new Swiper(verticalSwiperElement, {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 1,
      speed: 600,
      observer: true,
      observeParents: true,
      on: {
        slideChangeTransitionEnd: function () {
          this.update();
        },
      },
    });

    // Tab tıklamalarını dinleyen event listener
    document.querySelectorAll(".customTabs .nav-link").forEach((tab, index) => {
      tab.addEventListener("click", function () {
        verticalSwiper.slideToLoop(index, 600); // İlgili slide'a geçiş yap
      });
    });
  }
}

// DOM tamamen yüklendikten sonra başlatma
document.addEventListener("DOMContentLoaded", function () {
  initializeSwipers();
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
