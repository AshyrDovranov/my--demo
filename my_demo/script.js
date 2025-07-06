// 3D Dünya Şehir Posta Kutusu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const earth = document.getElementById('earth');
    const istanbulPopup = document.getElementById('istanbul');
    const mailbox = document.getElementById('mailbox');
    const hearts = document.querySelector('.hearts');
    const romanticText = document.querySelector('.romantic-text');
    const romanticMessage = document.getElementById('romantic-message');
    const heartRainContainer = document.querySelector('.heart-rain-container');

    // Romantik cümleler listesi
    const romanticMessages = [
        "Bir gün yollar seni bana getirirse...",
        "Sana yazmak, yıldızlara bakmak gibi güzel...",
        "Kalbim dünyanın bir köşesinde yankılandı, belki sen duydun.",
        "Seni düşünmek, gecenin en güzel yıldızını görmek gibi...",
        "Her kalp atışımda senin adın yankılanıyor...",
        "Seni sevmek, baharın ilk çiçeğini koklamak gibi...",
        "Kalbim senin için atıyor, uzaklarda olsan bile...",
        "Seni özlemek, güneşin doğuşunu beklemek gibi..."
    ];

    // Dünyaya tıklama - İstanbul popup'ını aç
    earth.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // 3D popup animasyonu
        istanbulPopup.style.display = 'block';
        setTimeout(() => {
            istanbulPopup.classList.add('show');
        }, 10);
        
        // Dünya hover efektini artır
        earth.style.transform = 'scale(1.05) rotateY(10deg)';
    });

    // Posta kutusuna tıklama - Kalpleri göster
    mailbox.addEventListener('click', function() {
        // 3D kalp animasyonu
        hearts.style.display = 'block';
        hearts.classList.add('show');
        
        // Posta kutusu 3D bounce efekti
        mailbox.style.transform = 'translateY(-15px) rotateY(20deg) rotateX(10deg) scale(1.2)';
        setTimeout(() => {
            mailbox.style.transform = 'translateY(-10px) rotateY(15deg) rotateX(5deg) scale(1.1)';
        }, 200);
        
        // Romantik cümle göster
        const randomMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        romanticMessage.textContent = randomMessage;
        romanticText.style.display = 'block';
        
        // 3D Kalp yağmuru başlat
        startHeartRain();
        
        // Kalpleri ve romantik cümleyi 5 saniye sonra gizle
        setTimeout(() => {
            hearts.classList.remove('show');
            romanticText.style.display = 'none';
            setTimeout(() => {
                hearts.style.display = 'none';
            }, 1000);
        }, 5000);
    });

    // Popup dışına tıklama - Popup'ı kapat
    document.addEventListener('click', function(e) {
        if (!istanbulPopup.contains(e.target) && !earth.contains(e.target)) {
            istanbulPopup.classList.remove('show');
            setTimeout(() => {
                istanbulPopup.style.display = 'none';
            }, 500);
            
            // Dünya efektini normale döndür
            earth.style.transform = '';
        }
    });

    // Mouse hareketi ile 3D parallax efekti
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Dünya için hafif 3D hareket
        if (!istanbulPopup.classList.contains('show')) {
            const rotateX = (mouseY - 0.5) * 10;
            const rotateY = (mouseX - 0.5) * 10;
            earth.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    // Posta kutusu hover efektleri
    mailbox.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateY(15deg) rotateX(5deg) scale(1.1)';
    });

    mailbox.addEventListener('mouseleave', function() {
        if (!hearts.classList.contains('show')) {
            this.style.transform = '';
        }
    });

    // Sayfa yüklendiğinde başlangıç animasyonu
    setTimeout(() => {
        earth.style.opacity = '0';
        earth.style.transform = 'scale(0.5) rotateY(180deg)';
        earth.style.transition = 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            earth.style.opacity = '1';
            earth.style.transform = 'scale(1) rotateY(0deg)';
        }, 100);
    }, 500);

    // 3D Kalp Yağmuru Fonksiyonu
    function startHeartRain() {
        const heartCount = 20; // Toplam kalp sayısı
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                create3DHeart();
            }, i * 100); // Her 100ms'de bir kalp
        }
    }

    // 3D Kalp oluşturma fonksiyonu
    function create3DHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px'; // 15-35px arası rastgele boyut
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '-50px';
        heart.style.transform = 'rotateY(0deg)';
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))';
        
        // Rastgele renk varyasyonları
        const colors = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd6d6'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        heartRainContainer.appendChild(heart);
        
        // 3D döndürme ve düşme animasyonu
        const animationDuration = Math.random() * 3 + 2; // 2-5 saniye arası
        const rotationSpeed = Math.random() * 360 + 180; // 180-540 derece döndürme
        
        heart.style.animation = `heartRain3D ${animationDuration}s ease-in forwards`;
        
        // CSS animasyonu ekle
        if (!document.querySelector('#heart-rain-animation')) {
            const style = document.createElement('style');
            style.id = 'heart-rain-animation';
            style.textContent = `
                @keyframes heartRain3D {
                    0% {
                        transform: translateY(0) rotateY(0deg) scale(0);
                        opacity: 0;
                    }
                    10% {
                        transform: translateY(50px) rotateY(${rotationSpeed * 0.1}deg) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(${window.innerHeight * 0.5}px) rotateY(${rotationSpeed * 0.5}deg) scale(1.2);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(${window.innerHeight + 100}px) rotateY(${rotationSpeed}deg) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Kalbi temizle
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, animationDuration * 1000 + 1000);
    }

    // Eski kalp parçacık efekti (artık kullanılmıyor)
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.animation = 'heartFloat 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 3000);
    }

    // Kalp parçacıkları için CSS animasyonu ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% {
                transform: translateY(0) rotateY(0deg) scale(0);
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) rotateY(180deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) rotateY(360deg) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Posta kutusuna tıklandığında 3D kalp yağmuru başlat (zaten yukarıda var)
    // Bu kısım artık startHeartRain() fonksiyonu ile yapılıyor
}); 