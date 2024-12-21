const apiUrl = 'http://localhost:5000/api';

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Giriş başarılı!');
      window.location.href = 'products.html';
    } else {
      alert(data.message || 'Giriş başarısız!');
    }
  } catch (error) {
    console.error('Hata:', error);
    alert('Bir hata oluştu.');
  }
});
