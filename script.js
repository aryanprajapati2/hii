const products = [
  { 
    name: "Vintage Denim Jacket", 
    price: 25,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTrFvynFKkmCca9UdgHRJclj3RLllyudOww45M42YIE4pAx6AIFHQx0kqtqf4jyRLNkubVzIGHGpLaGJSUlOwzWQzr4sCcpNQlrnASgecOSoveP9zx9kjTef8RJ2ma4AKNrh-krjvM&usqp=CAc"
  },
  { 
    name: "Retro Graphic Hoodie", 
    price: 18,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vP90HNp0d0QSvVXjhH7yrzb05ZXHVyqWTVLyC56thVOWB2CJrxjnRso&s=10"
  },
  { 
    name: "Corduroy Pants", 
    price: 22,
    image: "2wCEAAkGBxMTEhUTEhMVFRMXFhgYFRcVGBUVFRcVFxUWGBcVFhUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQFysdHSUrLS0tLS0tLi0tLS0tLS0tLS0tLTUtLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tK"
  },
  { 
    name: "Checkered Shirt", 
    price: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZ7peL18G0J8ybdaoH0WFMtJgTkq7hDx9Lw&s"
  },
  { 
    name: "Leather Trench Coat", 
    price: 30,
    image: "https://assets.burberry.com/is/image/Burberryltd/DD96D896-C759-4131-B445-4C4282F5C0D1?$BBY_V3_SL_1$&wid=1501&hei=1500"
  },
  { 
    name: "Plaid Wool Scarf", 
    price: 12,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST66cpHIZcmE_-FZrDed0SKYMrnW1eZDCjdw&s"
  }
];

function loadProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = ""; // Clear existing products

  products.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <p>${item.name} - $${item.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    grid.appendChild(div);
  });
}

function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const totalAmountEl = document.getElementById("totalAmount");

  if (!cartItemsContainer || !totalAmountEl) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<li>Your cart is empty.</li>";
    totalAmountEl.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(li);
    total += item.price;
  });

  totalAmountEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

window.onload = function() {
  loadProducts();
  renderCart();
  updateCartCount();
};
