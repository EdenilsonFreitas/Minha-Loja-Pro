# 🛍️ Minha Loja Pro

Uma loja profissional moderna, rápida e intuitiva com design responsivo e experiência otimizada.

## 📋 Características

- ⚡ **Rápido** - Navegação instantânea e layouts otimizados
- 🔒 **Seguro** - Pronto para integração com sistemas seguros
- 📦 **Entrega Garantida** - Interface para rastreamento
- 📱 **Responsivo** - Funciona perfeitamente em todos os dispositivos
- 🎨 **Design Moderno** - Interface limpa e profissional
- 🛒 **Carrinho de Compras** - Sistema completo de carrinho com persistência
- 🎁 **Cupons de Desconto** - Suporte a cupons promocionais

## 📁 Estrutura do Projeto

```
Minha-Loja-Pro/
├── index.html              # Página inicial
├── pages/
│   ├── produtos.html      # Página de produtos
│   └── carrinho.html      # Página do carrinho de compras
├── css/
│   └── style.css          # Estilos principais
├── js/
│   ├── main.js            # Scripts principais
│   └── cart.js            # Sistema de gerenciamento do carrinho
├── README.md              # Este arquivo
├── DEVELOPMENT.md         # Guia de desenvolvimento
└── .gitignore             # Arquivos ignorados pelo Git
```

## 🚀 Como Começar

### Opção 1: Abrir diretamente no navegador

1. Abra o arquivo `index.html` em seu navegador
2. A página será carregada localmente

### Opção 2: Usar um servidor local

Se você tiver Python instalado:

```bash
# Python 3
python -m http.server 8000

# Depois acesse http://localhost:8000
```

Se você tiver Node.js com http-server:

```bash
npx http-server
```

## 🛒 Sistema de Carrinho

### Funcionalidades

- ✅ Adicionar produtos ao carrinho
- ✅ Remover produtos do carrinho
- ✅ Aumentar/diminuir quantidade
- ✅ Cálculo automático de totais
- ✅ Desconto automático de 10%
- ✅ Cálculo de frete (R$ 15,00)
- ✅ Sistema de cupons promocionais
- ✅ Persistência de dados (localStorage)
- ✅ Notificações visuais de ações

### Cupons De Exemplo

- **DESCONTO10** - 10% de desconto
- **PROMO20** - 20% de desconto
- **SAVE15** - 15% de desconto
- **GRATIS** - Frete grátis (100% desconto)

### Como Usar o Carrinho

1. Acesse a página de produtos
2. Clique em "Comprar" para adicionar produtos
3. Acesse o carrinho clicando no ícone 🛒 na navegação
4. Veja o resumo do seu pedido
5. Use um cupom se tiver (opcional)
6. Clique em "Finalizar Compra"

### Dados Persistidos

O carrinho utiliza `localStorage` do navegador para persistir os dados. Isso significa que:
- Os produtos no carrinho são salvos automaticamente
- Os dados são mantidos mesmo após fechar o navegador
- Cada navegador/dispositivo tem seu próprio carrinho

## 🎨 Personalização

### Personalizando as Cores

Edite as variáveis CSS no topo do arquivo `css/style.css`:

```css
:root {
    --primary-color: #ff6b6b;      /* Cor primária (vermelho) */
    --secondary-color: #4ecdc4;    /* Cor secundária (turquesa) */
    --text-dark: #2d3436;          /* Texto escuro */
    --text-light: #636e72;         /* Texto claro */
    --bg-light: #f5f6fa;           /* Fundo claro */
}
```

### Personalizando Frete e Desconto

No arquivo `js/cart.js`, classe `ShoppingCart`:

```javascript
this.shippingCost = 15;           // Custo de frete (altere aqui)
this.discountPercentage = 10;     // Percentual de desconto (altere aqui)
```

## 📝 Estrutura HTML

A loja contém as seguintes seções:

- **Header** - Navegação superior com logo e links
- **Hero** - Seção principal com chamada para ação
- **Produtos** - Grid de 9 produtos de tecnologia
- **Features** - Apresentação de vantagens
- **Carrinho** - Visualização de compras
- **Footer** - Rodapé com direitos reservados

## 🎯 Páginas Disponíveis

- [index.html](index.html) - Página inicial
- [pages/produtos.html](pages/produtos.html) - Catálogo de produtos
- [pages/carrinho.html](pages/carrinho.html) - Carrinho de compras

## 📱 Responsividade

O design é totalmente responsivo com breakpoints para:
- **Desktop** (>768px) - Layout completo em grade
- **Tablet** (768px - 480px) - Layout adaptado
- **Mobile** (<480px) - Layout mobile otimizado

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos com variáveis
- **JavaScript Vanilla** - Sem dependências externas
- **localStorage** - Persistência de dados
- **Unsplash API** - Imagens de produtos

## 📚 Como Contribuir

Para adicionar novos produtos:

1. Abra `pages/produtos.html`
2. Adicione um novo `.product-card` na seção `.products-grid`
3. Use URLs de imagens do Unsplash ou outra fonte
4. O carrinho funcionará automaticamente

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ para Minha Loja Pro**

Para mais informações, consulte [DEVELOPMENT.md](DEVELOPMENT.md)
