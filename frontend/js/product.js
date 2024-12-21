const token = localStorage.getItem('token');
const apiUrl = 'http://localhost:5000/api';

if (!token) {
  alert('Önce giriş yapmalısınız.');
  window.location.href = 'login.html';
}

// Ürünleri listele
const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const products = await response.json();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - ₺${product.price}`;
      productList.appendChild(li);
    });
  } catch (error) {
    console.error('Hata:', error);
  }
};

// Ürün ekle
document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;

  try {
    const response = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price }),
    });

    if (response.ok) {
      alert('Ürün eklendi!');
      fetchProducts();
    } else {
      alert('Ürün eklenirken hata oluştu.');
    }
  } catch (error) {
    console.error('Hata:', error);
  }
});

fetchProducts();
