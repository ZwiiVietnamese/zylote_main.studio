document.addEventListener('DOMContentLoaded', () => {
    // Hiệu ứng "scroll-to-section" mượt mà cho các liên kết trong nav
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                // Nếu là "Trang chủ", cuộn về đầu trang
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Lấy vị trí của section và điều chỉnh cho thanh nav cố định
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const offsetTop = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Thêm hiệu ứng active cho menu khi cuộn trang (Optional)
    // Đây là một đoạn code mẫu, bạn có thể tinh chỉnh để phù hợp hơn
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Điều chỉnh khoảng cách để menu active đúng lúc
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - document.querySelector('nav').offsetHeight - 50) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Hiệu ứng Fade-in khi scroll cho các section
    // (Bạn đã có animation textFadeIn, đây là cách để kích hoạt các animation khác khi phần tử hiện ra)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% phần tử hiển thị
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiển thị
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section'); // Thêm class để CSS có thể target
        sectionObserver.observe(section);
    });

    // Thêm CSS cho hiệu ứng fade-in-section vào style.css (bạn cần thêm vào file style.css)
    /*
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }
    .fade-in-section.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    */

    // --- Các ý tưởng để bạn phát triển thêm JavaScript ---

    // 1. Hiệu ứng Parallax cho header background
    // window.addEventListener('scroll', function() {
    //     const header = document.querySelector('header');
    //     const scrollPosition = window.pageYOffset;
    //     header.style.backgroundPositionY = -scrollPosition * 0.3 + 'px'; // Điều chỉnh tốc độ parallax
    // });

    // 2. Form liên hệ động (nếu bạn có form)
    // const contactForm = document.querySelector('#contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         // Xử lý gửi form bằng AJAX hoặc fetch API
    //         alert('Form đã được gửi!');
    //     });
    // }

    // 3. Carousel/Slider cho các dự án (nếu có section dự án)
    // Sử dụng thư viện như Swiper.js hoặc tự viết JS để điều khiển slide

    // 4. Modal popup cho chi tiết dịch vụ khi click card
    // const cards = document.querySelectorAll('.card');
    // cards.forEach(card => {
    //     card.addEventListener('click', () => {
    //         // Hiển thị modal với nội dung chi tiết
    //     });
    // });
});