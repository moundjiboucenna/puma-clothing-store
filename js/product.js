const products = {
  1: {
    title: "PUMA x HELLO KITTY® AND FRIENDS Palermo",
    description: "Big Kids' Sneakers",
    price: "$75.00",
    image: "images/PUMA-x-HELLO-KITTY®-AND-FRIENDS-Palermo-Big-Kids'-Sneakers.avif",
    sizes: ["1", "2", "3", "4", "5"]
  },
  2: {
    title: "F1® Graphic Ringer Tee Men",
    description: "Graphic Ringer Tee Men",
    price: "$45.00",
    image: "images/F1®-Graphic-Ringer-Tee-Men.avif",
    sizes: ["S", "M", "L", "XL"]
  },
  3: {
    title: "PUMA x HELLO KITTY® AND FRIENDS Easy Rider Goth",
    description: "Women's Sneakers",
    price: "$100.00",
    image: "images/PUMA-x-HELLO-KITTY®-AND-FRIENDS-Easy-Rider-Goth-Women's-Sneakers (1).avif",
    sizes: ["6", "7", "8", "9"]
  },
  4: {
    title: "F1® Suede XL 75 Years Hero",
    description: "Sneakers",
    price: "$90.00",
    image: "images/F1®-Suede-XL-75-Years-Hero-Sneakers.avif",
    sizes: ["6", "7", "8", "9"]
  },
  5: {
    title: "Scuderia Ferrari Race",
    description: "Men's MT7 Pants",
    price: "$100.00",
    image: "images/Scuderia-Ferrari-Race-Men's-MT7-Pants.avif",
    sizes: ["M", "L", "XL"]
  },
  6: {
    title: "BMW M Motorsport Essentials Hoodie",
    description: "Big Kids",
    price: "$50.00",
    image: "images/BMW-M-Motorsport-Essentials-Hoodie-Big-Kids.avif",
    sizes: ["XS", "S", "M", "L"]
  },
  7: {
    title: "AC Milan 24/25 Away Authentic",
    description: "Men's Soccer Jersey",
    price: "$140.00",
    image: "images/25-Away-Authentic-Men's-Soccer-Jersey.avif",
    sizes: ["S", "M", "L", "XL"]
  },
  8: {
    title: "WARDROBE ESSENTIALS Polo",
    description: "Men's Pique Relaxed Polo",
    price: "$60.00",
    image: "images/WARDROBE-ESS-Men's-Pique-Relaxed-Polo.avif",
    sizes: ["M", "L", "XL"]
  },
  9: {
    title: "PUMA x CHRISTIAN PULISIC",
    description: "Chasing the Dream Big Kids' Jersey",
    price: "$66.00",
    image: "images/PUMA-x-CHRISTIAN-PULISIC-Big-Kids'-Chasing-the-Dream-Jersey.avif",
    sizes: ["XS", "S", "M", "L"]
  }
};

// Display Product Details Based on URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (products[productId]) {
  const product = products[productId];
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = product.price;
  document.getElementById('product-image').src = product.image;

  const sizesSelect = document.getElementById('sizes');
  product.sizes.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    sizesSelect.appendChild(option);
  });
} else {
  document.body.innerHTML = '<h1>Product not found</h1>';
}

function addToCart() {
  const selectedSize = document.getElementById('sizes').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  const product = {
    title: document.getElementById('product-title').textContent,
    price: document.getElementById('product-price').textContent,
    image: document.getElementById('product-image').src,
    size: selectedSize,
    quantity: quantity
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  window.location.href = 'cart.html';
}


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// call the update after loading the page
updateCartCount();