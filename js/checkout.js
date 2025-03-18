function displayCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutSummary = document.getElementById('checkout-summary');

    if (cart.length === 0) {
        checkoutSummary.innerHTML = '<div class="alert alert-warning">Your cart is empty.</div>';
        return;
    }

    let total = 0;
    let summaryHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Order Summary</h5>
                <ul class="list-group list-group-flush">
    `;

    cart.forEach(product => {
        const price = parseFloat(product.price.replace('$', ''));
        const productTotal = price * product.quantity;
        total += productTotal;

        summaryHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${product.title}</strong> (${product.size}) - Quantity: ${product.quantity}
                </div>
                <span>$${productTotal.toFixed(2)}</span>
            </li>
        `;
    });

    summaryHTML += `
                </ul>
                <hr>
                <div class="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>$${total.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    `;

    checkoutSummary.innerHTML = summaryHTML;
}

function handleCheckout(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod === "credit-card") {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || !expiryDate || !cvv) {
            alert('Please fill in all credit card details.');
            return;
        }
    }

    if (!name || !email || !address || !paymentMethod) {
        alert('Please fill in all required fields.');
        return;
    }

    alert(`Thank you, ${name}! Your order has been placed successfully.`);
    localStorage.removeItem('cart');
    window.location.href = '../index.html';
}

function toggleCreditCardForm() {
    const paymentMethod = document.getElementById('payment-method').value;
    const creditCardForm = document.querySelector('.credit-card-form');
    if (paymentMethod === 'credit-card') {
        creditCardForm.style.display = 'block';
    } else {
        creditCardForm.style.display = 'none';
    }
}

document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
document.getElementById('payment-method').addEventListener('change', toggleCreditCardForm);

displayCheckoutSummary();

