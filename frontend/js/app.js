const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
  
      const productList = document.getElementById('product-list');
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
  
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>₺${product.price}</strong></p>
        `;
  
        productList.appendChild(productCard);
      });
    } catch (error) {
      console.error('Ürünler alınırken bir hata oluştu:', error);
    }
  };
  
  fetchProducts();
  