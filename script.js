// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 进度条功能
    const progressBar = document.querySelector('.progress-bar');
    
    // 监听页面滚动更新进度条
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 创建交叉观察器用于滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,  // 当元素出现 10% 时触发
        rootMargin: '0px'  // 可以调整触发的位置
    });

    // 观察所有需要动画的元素
    document.querySelectorAll('.section-title, .feature-card, .practice-card, .competition-item')
        .forEach(el => observer.observe(el));

    // 数字计数动画功能
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间（毫秒）
        const steps = 50; // 动画步数
        const stepValue = target / steps;
        let current = 0;
        
        const updateCounter = () => {
            current += stepValue;
            if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        updateCounter();
    }

    // 监听站点信息区域
    const siteInfoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                siteInfoObserver.unobserve(entry.target); // 只触发一次
            }
        });
    }, { threshold: 0.5 });

    // 观察站点信息区域
    const siteInfo = document.querySelector('.site-info');
    if (siteInfo) {
        siteInfoObserver.observe(siteInfo);
    }
}); 