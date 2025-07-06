// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service buttons click events
    const serviceButtons = document.querySelectorAll('.btn-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            showContactModal(serviceTitle);
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Floating contact buttons animation
    setTimeout(function() {
        const floatingContact = document.querySelector('.floating-contact');
        if (floatingContact) {
            floatingContact.style.opacity = '1';
            floatingContact.style.transform = 'translateX(0)';
        }
    }, 1000);
});

// Show contact modal
function showContactModal(serviceName) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Thuê Dịch Vụ: ${serviceName}</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <p>Bạn đang chọn dịch vụ: <strong>${serviceName}</strong></p>
                <p>Vui lòng chọn phương thức liên hệ:</p>
                <div class="contact-buttons">
                    <a href="tel:0912345678" class="modal-btn phone-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                        </svg>
                        <span>Gọi điện<br><small>0912345678</small></span>
                    </a>
                    <a href="https://zalo.me/0912345678" target="_blank" class="modal-btn zalo-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,9V11H17V9H7M7,12V14H17V12H7M7,15V17H13V15H7Z"/>
                        </svg>
                        <span>Chat Zalo<br><small>0912345678</small></span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Close modal when clicking contact buttons
    const contactBtns = modal.querySelectorAll('.modal-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        });
    });
}