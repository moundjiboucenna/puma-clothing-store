let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="Product Image">
        <div>
          <h5>${item.title}</h5>
          <p>Size: ${item.size}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: <input type='number' min='1' value='${item.quantity}' onchange='updateQuantity(${index}, this.value)'></p>
          <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItemDiv);

      const priceNumber = parseFloat(item.price.replace('$', ''));
      total += priceNumber * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
  }

  window.updateQuantity = (index, newQuantity) => {
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  updateCartDisplay();
});

