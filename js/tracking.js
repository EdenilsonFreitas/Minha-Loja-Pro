// Sistema de Rastreamento de Pedidos

class OrderTracking {
    constructor() {
        this.orders = [];
        this.loadOrders();
        this.init();
    }

    // Inicializar o sistema
    init() {
        if (document.querySelector('.tracking-section')) {
            this.setupTrackingForm();
            this.loadExampleOrders();
        }
    }

    // Configurar formulário de rastreamento
    setupTrackingForm() {
        const form = document.getElementById('tracking-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const code = document.getElementById('tracking-code').value.trim().toUpperCase();
                this.trackOrder(code);
            });
        }
    }

    // Rastrear pedido por código
    trackOrder(code) {
        const order = this.orders.find(o => o.trackingCode === code);

        const resultDiv = document.getElementById('tracking-result');
        const errorDiv = document.getElementById('tracking-error');

        if (order) {
            this.displayOrderDetails(order);
            resultDiv.style.display = 'block';
            errorDiv.style.display = 'none';
        } else {
            resultDiv.style.display = 'none';
            errorDiv.style.display = 'block';
        }
    }

    // Exibir detalhes do pedido
    displayOrderDetails(order) {
        // Atualizar informações básicas
        document.getElementById('tracking-code-display').textContent = order.trackingCode;
        document.getElementById('order-number').textContent = `#${order.id}`;
        document.getElementById('order-date').textContent = this.formatDate(order.date);
        document.getElementById('order-value').textContent = `R$ ${this.formatPrice(order.total)}`;

        // Atualizar código dos Correios
        document.getElementById('correios-code').textContent = order.correiosCode;

        // Atualizar timeline baseado no status
        this.updateTimeline(order.status);

        // Exibir produtos do pedido
        this.displayOrderProducts(order.products);
    }

    // Atualizar timeline do pedido
    updateTimeline(status) {
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach((item, index) => {
            item.classList.remove('completed', 'active', 'pending');

            if (index < status) {
                item.classList.add('completed');
            } else if (index === status) {
                item.classList.add('active');
            } else {
                item.classList.add('pending');
            }
        });
    }

    // Exibir produtos do pedido
    displayOrderProducts(products) {
        const productsList = document.getElementById('order-products-list');
        productsList.innerHTML = products.map(product => `
            <div class="order-product-item">
                <img src="${product.image}" alt="${product.name}" class="product-thumb">
                <div class="product-info">
                    <h5>${product.name}</h5>
                    <p class="product-category">${product.category}</p>
                    <p class="product-quantity">Quantidade: ${product.quantity}</p>
                    <p class="product-price">R$ ${this.formatPrice(product.price * product.quantity)}</p>
                </div>
            </div>
        `).join('');
    }

    // Gerar novo pedido com código de rastreamento
    createOrder(cartItems, total) {
        const orderId = this.generateOrderId();
        const trackingCode = this.generateTrackingCode();
        const correiosCode = this.generateCorreiosCode();

        const order = {
            id: orderId,
            trackingCode: trackingCode,
            correiosCode: correiosCode,
            date: new Date(),
            products: cartItems,
            total: total,
            status: 2, // Status inicial: Enviado
            statusHistory: [
                { status: 0, date: new Date(), description: 'Pedido confirmado' },
                { status: 1, date: new Date(Date.now() + 2 * 60 * 60 * 1000), description: 'Em preparação' },
                { status: 2, date: new Date(Date.now() + 6 * 60 * 60 * 1000), description: 'Enviado' }
            ]
        };

        this.orders.push(order);
        this.saveOrders();

        return order;
    }

    // Gerar ID único do pedido
    generateOrderId() {
        return Math.floor(10000 + Math.random() * 90000);
    }

    // Gerar código de rastreamento
    generateTrackingCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'TRK-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // Gerar código dos Correios
    generateCorreiosCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'BR';
        for (let i = 0; i < 11; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        code += 'BR';
        return code;
    }

    // Carregar pedidos do localStorage
    loadOrders() {
        const saved = localStorage.getItem('orders');
        if (saved) {
            this.orders = JSON.parse(saved);
        }
    }

    // Salvar pedidos no localStorage
    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    // Carregar pedidos de exemplo para demonstração
    loadExampleOrders() {
        if (this.orders.length === 0) {
            const exampleOrders = [
                {
                    id: 12345,
                    trackingCode: 'TRK-ABC123',
                    correiosCode: 'BR123456789BR',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
                    total: 2499.00,
                    status: 2, // Enviado
                    products: [
                        {
                            id: 'product-0-123456789',
                            name: 'Smartphone Premium',
                            price: 2499.00,
                            quantity: 1,
                            image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
                            category: '📱 Celular'
                        }
                    ]
                },
                {
                    id: 67890,
                    trackingCode: 'TRK-XYZ789',
                    correiosCode: 'BR987654321BR',
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
                    total: 899.00,
                    status: 4, // Entregue
                    products: [
                        {
                            id: 'product-1-987654321',
                            name: 'Fones Wireless Pro',
                            price: 899.00,
                            quantity: 1,
                            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
                            category: '🎧 Áudio'
                        }
                    ]
                },
                {
                    id: 54321,
                    trackingCode: 'TRK-DEF456',
                    correiosCode: 'BR456789123BR',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
                    total: 1299.00,
                    status: 3, // Em trânsito
                    products: [
                        {
                            id: 'product-2-456789123',
                            name: 'Smartwatch Elite',
                            price: 1299.00,
                            quantity: 1,
                            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
                            category: '⌚ Relógio Inteligente'
                        }
                    ]
                }
            ];

            this.orders = exampleOrders;
            this.saveOrders();
        }
    }

    // Formatar preço
    formatPrice(price) {
        return price.toFixed(2).replace('.', ',');
    }

    // Formatar data
    formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString('pt-BR');
    }

    // Obter status do pedido como texto
    getStatusText(status) {
        const statuses = [
            'Pedido Confirmado',
            'Em Preparação',
            'Enviado',
            'Em Trânsito',
            'Entregue'
        ];
        return statuses[status] || 'Status Desconhecido';
    }

    // Atualizar status do pedido (para simulação)
    updateOrderStatus(trackingCode, newStatus) {
        const order = this.orders.find(o => o.trackingCode === trackingCode);
        if (order) {
            order.status = newStatus;
            order.statusHistory.push({
                status: newStatus,
                date: new Date(),
                description: this.getStatusText(newStatus)
            });
            this.saveOrders();
        }
    }
}

// Função global para criar pedido (chamada do carrinho)
function createOrder(cartItems, total) {
    if (window.tracking) {
        const order = window.tracking.createOrder(cartItems, total);
        return order;
    }
    return null;
}

// Inicializar sistema de rastreamento quando DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
    window.tracking = new OrderTracking();
});
