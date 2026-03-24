// Sistema de Gerenciamento de Carrinho

class ShoppingCart {
    constructor() {
        this.items = [];
        this.discount = 0;
        this.shippingCost = 15;
        this.discountPercentage = 10;
        this.loadCart();
        this.init();
    }

    // Inicializar o carrinho
    init() {
        if (document.querySelector('.cart-section')) {
            this.renderCart();
            this.setupEventListeners();
        }
    }

    // Adicionar item ao carrinho
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showNotification(`✓ ${product.name} adicionado ao carrinho!`, 'success');
    }

    // Remover item do carrinho
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
        this.showNotification('✓ Produto removido do carrinho', 'info');
    }

    // Aumentar quantidade
    increaseQuantity(productId) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.quantity += 1;
            this.saveCart();
            this.renderCart();
        }
    }

    // Diminuir quantidade
    decreaseQuantity(productId) {
        const item = this.items.find(i => i.id === productId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            this.saveCart();
            this.renderCart();
        } else if (item && item.quantity === 1) {
            this.removeItem(productId);
        }
    }

    // Calcular subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Calcular desconto
    getDiscount() {
        return (this.getSubtotal() * this.discountPercentage) / 100;
    }

    // Calcular total
    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const shipping = this.items.length > 0 ? this.shippingCost : 0;
        return subtotal - discount + shipping;
    }

    // Salvar carrinho no localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Carregar carrinho do localStorage
    loadCart() {
        const saved = localStorage.getItem('cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }

    // Renderizar carrinho na página
    renderCart() {
        const cartList = document.getElementById('cart-list');
        const emptyCart = document.getElementById('empty-cart');

        if (this.items.length === 0) {
            cartList.style.display = 'none';
            emptyCart.style.display = 'block';
            document.getElementById('checkout-btn').disabled = true;
            this.updateSummary();
            return;
        }

        cartList.style.display = 'block';
        emptyCart.style.display = 'none';
        document.getElementById('checkout-btn').disabled = false;

        cartList.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-category">${item.category}</p>
                    <p class="item-description">${item.description}</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn minus" data-action="decrease">−</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button class="qty-btn plus" data-action="increase">+</button>
                </div>
                <div class="item-price">
                    <p class="unit-price">R$ ${this.formatPrice(item.price)}</p>
                    <p class="total-price">R$ ${this.formatPrice(item.price * item.quantity)}</p>
                </div>
                <div class="item-remove">
                    <button class="btn-remove" title="Remover item">🗑️</button>
                </div>
            </div>
        `).join('');

        // Adicionar event listeners aos botões
        this.attachItemListeners();
        this.updateSummary();
    }

    // Adicionar event listeners aos items
    attachItemListeners() {
        document.querySelectorAll('.cart-item').forEach(item => {
            const productId = item.dataset.productId;

            // Botão remover
            item.querySelector('.btn-remove').addEventListener('click', () => {
                this.removeItem(productId);
            });

            // Botões quantidade
            item.querySelectorAll('.qty-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.action === 'increase') {
                        this.increaseQuantity(productId);
                    } else {
                        this.decreaseQuantity(productId);
                    }
                });
            });
        });
    }

    // Atualizar resumo do pedido
    updateSummary() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const shipping = this.items.length > 0 ? this.shippingCost : 0;
        const total = this.getTotal();

        document.getElementById('subtotal').textContent = `R$ ${this.formatPrice(subtotal)}`;
        document.getElementById('shipping').textContent = `R$ ${this.formatPrice(shipping)}`;
        document.getElementById('discount').textContent = `R$ ${this.formatPrice(discount)}`;
        document.getElementById('total').textContent = `R$ ${this.formatPrice(total)}`;
    }

    // Formatar preço
    formatPrice(price) {
        return price.toFixed(2).replace('.', ',');
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Aplicar cupom
    applyCoupon(code) {
        const validCoupons = {
            'DESCONTO10': 0.10,
            'PROMO20': 0.20,
            'SAVE15': 0.15,
            'GRATIS': 1.0
        };

        const messageDiv = document.getElementById('coupon-message');
        if (validCoupons[code.toUpperCase()]) {
            this.discountPercentage = validCoupons[code.toUpperCase()] * 100;
            messageDiv.textContent = `✓ Cupom "${code}" aplicado com sucesso!`;
            messageDiv.style.color = '#27ae60';
            messageDiv.style.display = 'block';
            this.updateSummary();
            this.showNotification(`✓ Cupom aplicado! Desconto de ${this.discountPercentage.toFixed(0)}%`, 'success');
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
            return true;
        } else {
            messageDiv.textContent = '✗ Cupom inválido';
            messageDiv.style.color = '#e74c3c';
            messageDiv.style.display = 'block';
            this.showNotification('✗ Cupom inválido', 'error');
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
            return false;
        }
    }

    // Setup de event listeners
    setupEventListeners() {
        const aplicarCupomBtn = document.getElementById('apply-coupon-btn');
        const couponInput = document.getElementById('coupon-input');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (aplicarCupomBtn) {
            aplicarCupomBtn.addEventListener('click', () => {
                const code = couponInput.value.trim();
                if (code) {
                    this.applyCoupon(code);
                    couponInput.value = '';
                }
            });

            couponInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    aplicarCupomBtn.click();
                }
            });
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    // Finalizar compra
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Seu carrinho está vazio', 'error');
            return;
        }

        const total = this.getTotal();
        const itemCount = this.items.length;
        
        // Criar pedido com código de rastreamento
        const order = window.tracking ? window.tracking.createOrder(this.items, total) : null;
        
        this.showNotification(
            `✓ Pedido confirmado! ${itemCount} produto(s) | Total: R$ ${this.formatPrice(total)}`,
            'success'
        );

        // Simular processamento e mostrar código de rastreamento
        setTimeout(() => {
            const trackingCode = order ? order.trackingCode : 'TRK-DEMO123';
            
            alert(
                `🎉 Seu pedido foi confirmado!\n\n` +
                `📦 Código de Rastreamento: ${trackingCode}\n` +
                `💰 Total: R$ ${this.formatPrice(total)}\n` +
                `📊 Itens: ${itemCount}\n\n` +
                `📧 Um email foi enviado com os detalhes.\n` +
                `🔍 Acompanhe seu pedido na página de rastreamento.`
            );
            
            // Limpar carrinho
            this.items = [];
            this.saveCart();
            this.renderCart();
            
            // Redirecionar para página de rastreamento (opcional)
            // window.location.href = 'rastreamento.html';
        }, 1500);
    }

    // Limpar carrinho
    clearCart() {
        this.items = [];
        this.saveCart();
        this.renderCart();
    }
}

// Inicializar carrinho quando DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
    window.cart = new ShoppingCart();
});
