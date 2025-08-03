// Инициализация анимаций и эффектов
document.addEventListener('DOMContentLoaded', function() {
    // Параллакс эффект
    document.addEventListener('mousemove', function(e) {
        const x = (window.innerWidth - e.pageX) / 50;
        const y = (window.innerHeight - e.pageY) / 50;
        
        document.querySelector('.layer-1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) translateZ(-5px) scale(2)`;
        document.querySelector('.layer-2').style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateZ(-3px) scale(1.6)`;
        document.querySelector('.layer-3').style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateZ(-1px) scale(1.2)`;
    });

    // Анимация при скролле
    gsap.registerPlugin(ScrollTrigger);
    
    // Анимация карточек товаров
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                onComplete: () => card.classList.add('visible')
            }
        );
    });
    
    // Анимация отзывов
    gsap.utils.toArray('.testimonial').forEach((testimonial, i) => {
        gsap.fromTo(testimonial, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: testimonial,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                onComplete: () => testimonial.classList.add('visible')
            }
        );
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Инициализация 3D сцены
    const init3DScene = () => {
        const canvas = document.getElementById('product-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Создание геометрии
        const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            emissive: 0x000000,
            emissiveIntensity: 0.5
        });
        
        const ring = new THREE.Mesh(geometry, material);
        scene.add(ring);
        
        // Освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xd4af37, 1, 100);
        pointLight.position.set(-5, -5, -5);
        scene.add(pointLight);
        
        camera.position.z = 5;
        
        // Анимация
        const animate = () => {
            requestAnimationFrame(animate);
            
            ring.rotation.x += 0.005;
            ring.rotation.y += 0.007;
            
            renderer.render(scene, camera);
        };
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        animate();
    };
    
    // Инициализация 3D сцены
    if (document.getElementById('product-canvas')) {
        init3DScene();
    }
    
    // Корзина
    const cartBtn = document.getElementById('cartBtn');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    let cartItems = 0;
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Анимация добавления в корзину
            gsap.to(cartBtn, {
                scale: 1.3,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.out"
            });
            
            // Всплывающее уведомление
            const toast = document.createElement('div');
            toast.textContent = 'Товар добавлен в корзину!';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.backgroundColor = '#d4af37';
            toast.style.color = '#0c0c14';
            toast.style.padding = '15px 25px';
            toast.style.borderRadius = '8px';
            toast.style.zIndex = '10000';
            toast.style.fontWeight = '600';
            toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            document.body.appendChild(toast);
            
            gsap.to(toast, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
            
            setTimeout(() => {
                gsap.to(toast, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => document.body.removeChild(toast)
                });
            }, 3000);
        });
    });
    
    // 3D просмотр товара
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const productViewer = document.querySelector('.product-viewer');
    const closeViewer = document.querySelector('.close-viewer');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            productViewer.classList.add('active');
        });
    });
    
    closeViewer.addEventListener('click', () => {
        productViewer.classList.remove('active');
    });
});

