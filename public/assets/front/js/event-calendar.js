document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    // FullCalendar'ı başlat
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'tr', // Türkçe dil seçimi
        initialView: 'dayGridMonth', // Aylık görünümü varsayılan yapar
        // initialView: 'timeGridWeek', // Haftalık görünüm
        selectable: true, // Saat seçimi için
        allDaySlot: false, // Tüm Gün alanını gizle,
        timeFormat: 'HH:mm', // Saat formatını 06:00 gibi göstermek için
        dayMaxEvents: 2, // Bir gün için maksimum 3 etkinlik gösterilecek
        moreLinkText: function(count) {
            return "+" +count + ' Etkinlik'; // "More" yerine "Etkinlik" yazısı görünecek
        },
        slotLabelFormat: { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false // 24 saat formatı için
        },
        dayHeaderFormat: {
            weekday: 'short', // Hafta günü kısaltması (Paz, Sal, Çar, ...)
            day: '2-digit', // Günün iki haneli formatı (22, 23, vb.)
            month: '2-digit', // Ayın iki haneli formatı (12, 01, vb.)
            year: 'numeric', // Yıl
            format: 'DD/MM/YYYY' // Gün/Ay/Yıl formatı
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Görünüm değiştirme butonları
        },
        buttonText: {
            today: 'Bugün', // "Today" butonunu Türkçe yap
            month: 'Ay',
            week: 'Hafta',
            day: 'Gün'
        },
        allDayText: 'Tüm Gün', // "All Day" başlığını Türkçeleştir
        events: [
            {
                id: '1',
                title: 'Toplantı',
                start: '2024-12-22T10:00:00',
                end: '2024-12-22T12:00:00',
                description: 'Yıllık değerlendirme toplantısı.'
            },
            {
                id: '2',
                title: 'Toplantı',
                start: '2024-12-25T10:00:00',
                end: '2024-12-25T12:00:00',
                description: 'Yıllık değerlendirme toplantısı.'
            },
            {
                id: '3',
                title: 'Webinar',
                start: '2024-12-28T14:00:00',
                end: '2024-12-28T16:00:00',
                description: 'Online eğitim semineri.'
            },
            {
                id: '4',
                title: 'Near the beach Near the beach',
                start: '2024-12-28T14:00:00',
                end: '2024-12-28T16:00:00',
                description: 'Online eğitim semineri.'
            },
            {
                id: '5',
                title: 'Webinar',
                start: '2024-12-28T14:00:00',
                end: '2024-12-28T16:00:00',
                description: 'Online eğitim semineri.'
            },
            {
                id: '6',
                title: 'Webinar',
                start: '2024-12-28T14:00:00',
                end: '2024-12-28T16:00:00',
                description: 'Online eğitim semineri.'
            }
        ],
        // Geçerli tarih aralığını belirle
        // validRange: {
        //     start: new Date() // Bugünden önceki tarihleri seçilemez yapar
        // },
        validRange: {
            start: null, // Geçmiş tarihler görünsün
            end: null    // Gelecek tarihler sınırlaması yok
        },
        selectAllow: function(selectInfo) {
            // Geçmiş tarihlerde seçim yapılamaz
            return selectInfo.start >= new Date();
        },
        eventClick: function(info) {
            document.getElementById('modalEventTitle').textContent = info.event.title;
            document.getElementById('modalEventStart').textContent = info.event.start.toLocaleString(); // Tarih ve saat birlikte
            document.getElementById('modalEventEnd').textContent = info.event.end ? info.event.end.toLocaleString() : 'Bitiş Tarihi Yok';
            
            // Başlangıç ve bitiş saatlerini yalnızca saat olarak formatla
            document.getElementById('modalEventStartHour').textContent = info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('modalEventEndHour').textContent = info.event.end
                ? info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Bitiş Saati Yok';
            
            // Yeni alan: Giriş Saati (modalEventStartTour)
            // Burada, etkinlik için "giriş saati" bilgisi eklemelisiniz.
            // Etkinlik başlangıcını al, fakat saat kısmını ayıklayıp sadece tarihi al
            var eventStartTour = info.event.start.toLocaleDateString(); // Sadece tarihi al
            document.getElementById('modalEventStartTour').textContent = eventStartTour;
            
            // 'editEventButton' için data-event-id değerini güncelle
            document.getElementById('editEventButton').dataset.eventId = info.event.id;
            document.getElementById('deleteEventButton').dataset.eventId = info.event.id; // Silme butonuna event id ekle
          
            // Modalı göster
            var eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
            eventModal.show();
        },        
        select: function(info) {
            // Seçilen tarih ve saat formatını uygun hale getirme (YYYY-MM-DDTHH:mm)
            var startDate = info.startStr.split('T');
            var endDate = info.endStr.split('T');
            
            // Saat formatı varsa, saati substring ile al
            var startTime = startDate[1] ? startDate[1].substring(0, 5) : '';
            var endTime = endDate[1] ? endDate[1].substring(0, 5) : '';
        
            // Yeni etkinlik için bilgileri modalda göster
            document.getElementById('eventStart').value = startDate[0] + 'T' + startTime; // 'YYYY-MM-DDTHH:mm' formatı
            document.getElementById('eventEnd').value = endDate[0] + 'T' + endTime; // 'YYYY-MM-DDTHH:mm' formatı
        
            // Yeni etkinlik ekleme modalını aç
            var eventAddModal = new bootstrap.Modal(document.getElementById('eventAddModal'));
            eventAddModal.show();
        }
    });

    // Takvimi render et
    calendar.render();


     // Modal kapanma olayını dinleyin
     var eventModal = document.getElementById('eventModal');
     eventModal.addEventListener('hidden.bs.modal', function () {
         // Modal kapandığında gerekli işlemleri yap
         document.getElementById('editSaveEventButton').classList.add('disabled', 'd-none'); // editSaveEventButton'a 'disabled' ve 'd-none' ekle
         document.getElementById('editEventButton').classList.remove('disabled', 'd-none'); // editEventButton'dan 'disabled' ve 'd-none' sınıflarını kaldır
     });
       // Modal açıldığında tarih inputlarını flatpickr ile aktive et
        $('#eventAddModal').on('shown.bs.modal', function() {
            // flatpickr ile tarih inputlarını başlat
            $('.date-input').flatpickr({
                // flatpickr seçeneklerini buraya ekleyebilirsiniz, örneğin:
                locale: 'tr', // Türkçe dil desteği
                enableTime: true,
                dateFormat: 'Y-m-d H:i',
                time_24hr: true        // Türkçe dil desteği
            });
        });
    // Düzenle butonuna tıklandığında
    document.getElementById('editEventButton').addEventListener('click', function () {
        var eventId = this.dataset.eventId;
        var event = calendar.getEventById(eventId);
        const eventDateInput = document.getElementById("eventDateInput");

        // Etkinlik bilgilerini modalda düzenleme için input'lara yansıtma
        document.getElementById('modalEventTitle').innerHTML = `<input type="text" class="form-control" value="${event.title}">`;
        document.getElementById('modalEventStart').innerHTML = `<input type="datetime-local" class="form-control date-input dateInputStart" placeholder="Tarih ve saat seçin" value="${event.start.toISOString().slice(0, 16)}"> <span class="icon-date"></span>`;
        document.getElementById('modalEventEnd').innerHTML = `<input type="datetime-local" class="form-control date-input dateInputEnd" placeholder="Tarih ve saat seçin" value="${event.end.toISOString().slice(0, 16)}"> <span class="icon-date"></span>`;
        // document.getElementById('modalEventDescription').innerHTML = `<textarea class="form-control">${event.extendedProps.description}</textarea>`;

        // Flatpickr'ı başlat
        flatpickr('.dateInputStart', {
            locale: 'tr', // Türkçe dil desteği
            // dateFormat: "Y-m-d", // Tarih formatı
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            time_24hr: true
        });
        flatpickr('.dateInputEnd', {
            locale: 'tr', // Türkçe dil desteği
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            time_24hr: true
        });


        this.classList.add("disabled","d-none");

        // "Kaydet" butonunun tıklama fonksiyonunu tanımla
        document.getElementById('editSaveEventButton').classList.remove("disabled","d-none");

        document.getElementById('editSaveEventButton').addEventListener('click', function () {
            var eventId = document.getElementById('editEventButton').dataset.eventId;
            var event = calendar.getEventById(eventId);
            
            // Yeni değerleri alalım
            var updatedTitle = document.querySelector('#modalEventTitle input').value;
            var updatedStart = document.querySelector('#modalEventStart input').value;
            var updatedEnd = document.querySelector('#modalEventEnd input').value;
        
            // Etkinliği güncelle
            event.setProp('title', updatedTitle);
            event.setStart(updatedStart);
            event.setEnd(updatedEnd);
        
            // Modalda gösterilen bilgileri güncelle
            document.getElementById('modalEventTitle').textContent = updatedTitle;
            document.getElementById('modalEventStart').textContent = new Date(updatedStart).toLocaleString();
            document.getElementById('modalEventEnd').textContent = updatedEnd ? new Date(updatedEnd).toLocaleString() : 'Bitiş Tarihi Yok';
        
            // Güncellenen başlangıç ve bitiş saatlerini saat formatında ayrı göster
            document.getElementById('modalEventStartHour').textContent = new Date(updatedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('modalEventEndHour').textContent = updatedEnd
                ? new Date(updatedEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Bitiş Saati Yok';
            
            // "Kaydet" butonunu tekrar "Düzenle" butonuna dönüştür
            document.getElementById('editEventButton').classList.remove("disabled", "d-none");
        
            // Kaydet butonunu devre dışı bırak
            document.getElementById('editSaveEventButton').classList.add("disabled", "d-none");
        
            // Modalı gizle
            var eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
            eventModal.hide();
        });
        
    });

    // Sil butonuna tıklandığında
    document.getElementById('deleteEventButton').addEventListener('click', function () {
        var eventId = this.dataset.eventId;
        var event = calendar.getEventById(eventId);
        
        // Etkinliği takvimden sil
        event.remove();

        // Modalı kapat
        var eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
        eventModal.hide();
    });

    // Kaydet butonuna tıklama işlemi (Yeni etkinlik)
    document.getElementById('saveEventButton').addEventListener('click', function () {
        // Form verilerini al
        var title = document.getElementById('eventTitle').value;
        // var description = document.getElementById('eventDescription').value;
        var start = document.getElementById('eventStart').value;
        var end = document.getElementById('eventEnd').value;

       
        // Validasyon kontrolü
        if (!title || !start || !end) {
            alert('Lütfen tüm gerekli alanları doldurun.');
            return;
        }

        // Yeni etkinliği takvime ekle
        calendar.addEvent({
            id: String(new Date().getTime()), // Benzersiz bir id
            title: title,
            start: start,
            end: end,
            // description: description
        });

        // Modalı kapat
        var eventAddModal = bootstrap.Modal.getInstance(document.getElementById('eventAddModal'));
        eventAddModal.hide();

        // Formu sıfırla
        document.getElementById('eventForm').reset();
    });
});
