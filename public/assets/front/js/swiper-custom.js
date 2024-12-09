var wWidth = $(window).width();
// Swiper'ları başlatan fonksiyon
var blogSlider = new Swiper(".blogSlider", {
  slidesPerView: 1,
  pagination: {
    el: ".blog-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".blogNext",
    prevEl: ".blogPrev",
  },
});


var detailsSlider = new Swiper(".detailsSlider", {
  slidesPerView:1,
  spaceBetween: 0,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

const sliders = document.querySelectorAll('.singleSlide');

sliders.forEach((sliderElement) => {
    new Swiper(sliderElement, {
        slidesPerView: 1,
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   pauseOnMouseEnter: true,
        // },
        pagination: {
            el: sliderElement.querySelector('.swiper-pagination-single'),
            clickable: true,
        },
        navigation: {
            nextEl: sliderElement.querySelector('.nextButton-single'),
            prevEl: sliderElement.querySelector('.prevButton-single'),
        },
    });
});


const bannerSlider = document.querySelectorAll('.bannerSlider');

bannerSlider.forEach((sliderElement) => {
    new Swiper(sliderElement, {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.paginationBanner',
            clickable: true,
        },
    });
});

const slidersText = document.querySelectorAll('.textSlideWrapper');

slidersText.forEach((sliderElement) => {
    new Swiper(sliderElement, {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 2500,
          pauseOnMouseEnter: true,
        },
    });
});


// Swiper slider'ı ilk başlatma
const swiperInstance = new Swiper(".verticalSwiper", {
  direction: "vertical",
  slidesPerView: 2,
  spaceBetween: 50,
  centeredSlides: true,
  loop: true,
});

// Tab değişikliklerinde ilgili slide'a geçiş ve güncelleme işlemleri
$(".boatTabWrapper .customTabs .nav-link").on("shown.bs.tab", function (e) {
  const tabIndex = $(e.target).parent().index(); // Aktif tab'ın index'ini al

  // DOM değişiklikleri için kısa bir gecikme ekleyin
  setTimeout(() => {
    swiperInstance.slideToLoop(tabIndex, 0); // İlgili slide'a geçiş yap
    swiperInstance.update(); // Swiper'ı güncelle
  }, 50); // 50ms gecikme (DOM için)
});


document.querySelectorAll('.thirdSlider').forEach(slider => {
  const swiperId = slider.getAttribute('data-swiper-id');
  
  new Swiper(`.thirdSlider[data-swiper-id="${swiperId}"]`, {
    slidesPerView: 1.3,
    spaceBetween: 30,
    navigation: {
      nextEl: `.thirdSlideNext[data-swiper-id="${swiperId}"]`,
      prevEl: `.thirdSlidePrev[data-swiper-id="${swiperId}"]`,
    },
    breakpoints: {
      640: {
        slidesPerView: 2.3,
        spaceBetween:30,
      },

      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});


var tekneKiralamaSlider;
var populerLokasyonSlider;

function initOrDestroySwipers() {
  var wWidth = window.innerWidth;

  // Tekne Kiralama Slider: 768 altı aktif, üstü devre dışı
  if (wWidth <= 768) {
    if (!tekneKiralamaSlider) {
      tekneKiralamaSlider = new Swiper(".tekneKiralamaSlider", {
        slidesPerView: 1.3,
        spaceBetween:16,
      });
    }
  } else {
    if (tekneKiralamaSlider) {
      tekneKiralamaSlider.destroy(true, true);
      tekneKiralamaSlider = null;
    }
  }

  // Popüler Lokasyon Slider: 992 altı aktif, üstü devre dışı
  if (wWidth <= 992) {
    if (!populerLokasyonSlider) {
      populerLokasyonSlider = new Swiper(".populerLokasyonSlider", {
        slidesPerView: 1.3,
        spaceBetween: 30,
        breakpoints: {
          640: {
            slidesPerView: 2.3,
            spaceBetween: 30,
          },
        },
      });
    }
  } else {
    if (populerLokasyonSlider) {
      populerLokasyonSlider.destroy(true, true);
      populerLokasyonSlider = null;
    }
  }
}

// Sayfa yüklendiğinde ve pencere yeniden boyutlandığında çalıştır
window.addEventListener("load", initOrDestroySwipers);
window.addEventListener("resize", initOrDestroySwipers);




/** Filter slide  */
/** Filter slide  */
document.querySelectorAll('.filterSlideButton').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const filter = this.getAttribute('data-filter');

    // Butonun ait olduğu .sectionContent'i bul
    const sectionContent = this.closest('.sectionContent');
    const swiperContainer = sectionContent.querySelector('.swiper'); // Swiper öğesini seç

    // Eğer swiperContainer bulunamazsa işlemi durdur
    if (!swiperContainer) {
      console.error("Swiper container bulunamadı");
      return;
    }

    // Eğer buton zaten aktifse filtreyi kaldır
    if (this.classList.contains('active')) {
      // Active sınıfını kaldır
      this.classList.remove('active');

      // Tüm slaytları göster
      swiperContainer.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.display = 'block';
      });
    } else {
      // Diğer butonlardan `active` sınıfını kaldır ve tıklanan butona ekle
      sectionContent.querySelectorAll('.filterSlideButton').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Swiper slaytlarını al ve filtre uygula
      swiperContainer.querySelectorAll('.swiper-slide').forEach(slide => {
        if (slide.getAttribute('data-location') === filter) {
          slide.style.display = 'block'; // Filtreye uygun slaytı göster
        } else {
          slide.style.display = 'none'; // Uygun olmayanları gizle
        }
      });
    }

    // Swiper'ı güncelle
    const swiperInstance = swiperContainer.swiper; // Swiper örneğini al
    if (swiperInstance) {
      swiperInstance.update(); // Swiper'ı güncelle
    }

    // Single Slide'ı yeniden yükle
    const visibleSlides = Array.from(swiperContainer.querySelectorAll('.swiper-slide')).filter(slide => slide.style.display === 'block');

    visibleSlides.forEach(sliderElement => {
      // Mevcut swiper instance'ını kontrol et
      const singleSwiper = sliderElement.querySelector('.singleSlide')?.swiper; 
      if (singleSwiper) {
        singleSwiper.destroy(true, true); // Mevcut swiper instance'ını yok et
      }

      // Yeni bir Swiper instance'ı oluştur
      new Swiper(sliderElement.querySelector('.singleSlide'), {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: sliderElement.querySelector('.swiper-pagination-single'),
          clickable: true,
        },
        navigation: {
          nextEl: sliderElement.querySelector('.nextButton-single'),
          prevEl: sliderElement.querySelector('.prevButton-single'),
        },
      });
    });

    // Kaydırma işlemi
    const container = document.querySelector('.verticalCustomScroll');
    const offsetLeft = this.offsetLeft - container.offsetLeft;

    container.scrollTo({
      left: offsetLeft - 16,
      behavior: 'smooth'
    });
  });
});
