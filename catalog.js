const defaultCatalog = [
  {
    name: 'Обручальные кольца',
    description: 'Гравировка на золотых и серебряных кольцах с использованием лазерных технологий',
    price: 'от 1 500 ₽',
    icon: 'fa-ring',
    category: 'Украшения'
  },
  {
    name: 'Кулоны и подвески',
    description: 'Элегантные кулоны из серебра и золота с индивидуальной гравировкой',
    price: 'от 1 200 ₽',
    icon: 'fa-gem',
    category: 'Украшения'
  },
  {
    name: 'Наручные часы',
    description: 'Гравировка на задней крышке часов из нержавеющей стали и золота',
    price: 'от 2 000 ₽',
    icon: 'fa-watch',
    category: 'Украшения'
  },
  {
    name: 'Зажигалки Zippo',
    description: 'Эксклюзивная гравировка на металлических зажигалках премиум-класса',
    price: 'от 900 ₽',
    icon: 'fa-fire',
    category: 'Аксессуары'
  },
  {
    name: 'Металлические фляжки',
    description: 'Гравировка на фляжках из нержавеющей стали и серебра',
    price: 'от 1 000 ₽',
    icon: 'fa-wine-bottle',
    category: 'Аксессуары'
  },
  {
    name: 'Перьевые ручки',
    description: 'Персонализация дорогих ручек гравировкой имени или логотипа',
    price: 'от 1 100 ₽',
    icon: 'fa-pen',
    category: 'Аксессуары'
  }
];

function loadCatalog() {
  const stored = localStorage.getItem('catalog');
  return stored ? JSON.parse(stored) : defaultCatalog.slice();
}

let catalog = loadCatalog();

function saveCatalog() {
  localStorage.setItem('catalog', JSON.stringify(catalog));
}

function createCard(item, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.index = index;

  const img = document.createElement('div');
  img.className = 'product-img';
  img.style.background = 'linear-gradient(45deg, #2c2c40, #1a1a2e)';
  img.style.display = 'flex';
  img.style.alignItems = 'center';
  img.style.justifyContent = 'center';
  const icon = document.createElement('i');
  icon.className = `fas ${item.icon}`;
  icon.style.fontSize = '5rem';
  icon.style.color = '#d4af37';
  img.appendChild(icon);

  const quick = document.createElement('div');
  quick.className = 'quick-view';
  quick.textContent = 'Быстрый просмотр';

  const content = document.createElement('div');
  content.className = 'product-content';
  const h3 = document.createElement('h3');
  h3.innerHTML = `<i class="fas ${item.icon}"></i> ${item.name}`;
  const p = document.createElement('p');
  p.textContent = item.description;
  const meta = document.createElement('div');
  meta.className = 'product-meta';
  const priceDiv = document.createElement('div');
  priceDiv.className = 'price';
  priceDiv.textContent = item.price;
  const addBtn = document.createElement('button');
  addBtn.className = 'add-to-cart';
  addBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> В корзину';
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-item';
  editBtn.textContent = 'Редактировать';

  meta.appendChild(priceDiv);
  meta.appendChild(addBtn);
  meta.appendChild(editBtn);

  content.appendChild(h3);
  content.appendChild(p);
  content.appendChild(meta);

  card.appendChild(img);
  card.appendChild(quick);
  card.appendChild(content);

  return card;
}

function renderCatalog() {
  const container = document.getElementById('catalog-container');
  if (!container) return;
  container.innerHTML = '';
  const categories = {};
  catalog.forEach((item, index) => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push({ item, index });
  });
  Object.keys(categories).forEach(cat => {
    const section = document.createElement('div');
    section.className = 'catalog-category';
    const title = document.createElement('h3');
    title.textContent = cat;
    section.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'catalog-grid';
    categories[cat].forEach(({ item, index }) => {
      grid.appendChild(createCard(item, index));
    });
    section.appendChild(grid);
    container.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  document.getElementById('catalog-container').addEventListener('click', e => {
    if (e.target.classList.contains('edit-item')) {
      const card = e.target.closest('.product-card');
      const index = parseInt(card.dataset.index, 10);
      const item = catalog[index];
      const name = prompt('Название', item.name);
      if (name !== null) item.name = name;
      const desc = prompt('Описание', item.description);
      if (desc !== null) item.description = desc;
      const price = prompt('Цена', item.price);
      if (price !== null) item.price = price;
      const category = prompt('Категория', item.category);
      if (category !== null) item.category = category;
      saveCatalog();
      renderCatalog();
    }
  });
});
