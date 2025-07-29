function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
    const productElement = document.querySelector(`.product[data-id="${id}"]`);
    const name = productElement.querySelector('h3').innerText;
    const price = parseInt(productElement.querySelector('.price').dataset.price, 10);

    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    saveCart(cart);
    alert('장바구니에 추가되었습니다');
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    if (!container || !totalEl) return;
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerText = `${item.name} x ${item.qty} - ${item.price * item.qty}원`;
        container.appendChild(div);
        total += item.price * item.qty;
    });
    totalEl.innerText = total;
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('장바구니가 비어 있습니다');
        return;
    }
    alert('주문이 접수되었습니다. 결제는 추후 진행됩니다.');
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);
