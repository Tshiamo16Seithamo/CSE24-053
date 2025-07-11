 // Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function renderCartItems() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty</p>';
    cartTotalEl.textContent = 'P0.00';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="images/${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>P${item.price.toFixed(2)}</p>
      </div>
      <div class="quantity-controls">
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
      </div>
      <button class="remove-btn">Remove</button>
    </div>
  `).join('');

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalEl.textContent = `P${total.toFixed(2)}`;

  // Add event listeners
  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('.cart-item').dataset.id;
      const item = cart.find(i => i.id === id);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart();
    });
  });

  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('.cart-item').dataset.id;
      const item = cart.find(i => i.id === id);
      item.quantity++;
      saveCart();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('.cart-item').dataset.id;
      cart = cart.filter(i => i.id !== id);
      saveCart();
    });
  });
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Initialize
updateCartCount();
renderCartItems();