document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const donateForm = document.getElementById('donateForm');
    const amountInput = document.getElementById('amount');
    const amountSuggestions = document.querySelectorAll('.amount-suggestion');

    amountSuggestions.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            amountInput.value = amount;
            
            amountSuggestions.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    amountInput.addEventListener('input', function() {
        amountSuggestions.forEach(btn => btn.classList.remove('active'));
    });

    donateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nickname = document.getElementById('nickname').value.trim();
        const amount = amountInput.value;
        
        if (!nickname) {
            alert('Пожалуйста, введите ваш никнейм');
            return;
        }
        
        if (!amount || amount <= 0) {
            alert('Пожалуйста, введите сумму доната');
            return;
        }
        
        console.log('Данные для доната:', {
            nickname: nickname,
            amount: amount
        });
        
        alert(`Спасибо! Ваш донат на сумму ${amount}₽ для игрока ${nickname} обрабатывается.`);
        
        donateForm.reset();
        amountSuggestions.forEach(btn => btn.classList.remove('active'));
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .screenshot-item, .player-card, .donate-form-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
