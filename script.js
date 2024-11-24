let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для добавления товара в корзину
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Увеличиваем количество, если товар уже есть в корзине
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Добавляем новый товар
    }

    updateCart(); // Обновляем корзину
}

// Функция для обновления корзины
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
    renderCartItems(); // Перерисовываем товары в корзине
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0); // Обновляем количество товаров
}

// Функция для отображения товаров в корзине
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Очищаем контейнер перед рендером
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity; // Рассчитываем стоимость для каждого товара
        total += itemTotal; // Добавляем к общей сумме
        itemCount += item.quantity; // Считаем общее количество товаров

        // Создаем элемент для каждого товара
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price}₴ × ${item.quantity} = ${itemTotal.toFixed(2)}₴</p>
            <button onclick="removeFromCart(${index})">-</button> 
            <button onclick="increaseQuantity(${index})">+</button> 
        `;
        cartItemsContainer.appendChild(cartItem); // Добавляем товар в корзину
    });

    // Обновляем сводку
    document.getElementById('summary-count').innerText = itemCount;
    document.getElementById('cart-total').innerText = `${total.toFixed(2)}₴`;
}

// Функция для увеличения количества товара
function increaseQuantity(index) {
    cart[index].quantity += 1; // Увеличиваем количество товара
    updateCart(); // Обновляем корзину
}

// Функция для уменьшения количества товара
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Уменьшаем количество товара, если его больше 1
    } else {
        cart.splice(index, 1); // Удаляем товар из корзины, если его количество равно 1
    }
    updateCart(); // Обновляем корзину
}

// Функция для переключения видимости корзины
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block'; // Показываем/скрываем корзину
    renderCartItems(); // Перерисовываем корзину
}

// Функция для оформления заказа
function checkout() {
   localStorage.setItem('cart', JSON.stringify(cart));

    // Перенаправляем на страницу оформления заказа
    window.location.href = 'checkout.html';
}

// Слушаем событие загрузки страницы и сразу обновляем корзину
window.addEventListener('load', updateCart);

