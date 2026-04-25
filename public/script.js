async function loadProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();

  document.getElementById('total').innerText = data.length;

  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach(p => {
    list.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td><button onclick="removeProduct(${p.id})">Delete</button></td>
      </tr>
    `;
  });
}

async function addProduct() {
  const name = document.getElementById('name').value;
  const qty = document.getElementById('qty').value;

  await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, qty })
  });

  loadProducts();
}

async function removeProduct(id) {
  await fetch('/api/products/' + id, { method: 'DELETE' });
  loadProducts();
}

loadProducts();
``