// Script de interatividade da Loja Pro

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um âncora local
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Animação de hover dos cards de features
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });

    // Log de evento quando o botão CTA é clicado
    const ctaButton = document.querySelector('.btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            console.log('Botão "Comprar Agora" clicado em:', new Date().toLocaleString('pt-BR'));
        });
    }

    // Detecção de scroll para efeitos parallax simples
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const hero = document.querySelector('.hero');
                const scrollPos = window.pageYOffset;
                
                if (hero) {
                    hero.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Adicionar interatividade aos botões de compra de produtos
    const productButtons = document.querySelectorAll('.product-btn');
    
    productButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pegar informações do produto
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-info h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('img').src;
            const productCategory = productCard.querySelector('.product-category').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            
            // Extrsupervínculo o preço de texto para número
            const priceValue = parseFloat(productPrice.replace('R$ ', '').replace(',', '.'));
            
            // Criar objeto do produto
            const product = {
                id: `product-${index}-${Date.now()}`,
                name: productName,
                price: priceValue,
                image: productImage,
                category: productCategory,
                description: productDescription
            };
            
            // Adicionar ao carrinho global
            if (window.cart) {
                window.cart.addItem(product);
            } else {
                // Fallback se o carrinho não está carregado
                showNotification(`✓ "${productName}" adicionado ao carrinho!`, 'success');
            }
            
            // Animação do botão
            const originalText = this.textContent;
            this.textContent = '✓ Adicionado!';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Função para mostrar notificação
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});

// Adicionar estilos de animação globais se não existirem
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
