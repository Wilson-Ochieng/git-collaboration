const menuItems = [
  {
    id: 1,
    title: 'Espresso',
    category: 'coffee',
    price: '$3.50',
    description: 'Rich and concentrated shot made from our house single-origin beans.'
  },
  {
    id: 2,
    title: 'Oat Milk Latte',
    category: 'coffee',
    price: '$5.00',
    description: 'Smooth double espresso paired with creamy steamed oat milk.'
  },
  {
    id: 3,
    title: 'Matcha Latte',
    category: 'tea',
    price: '$4.50',
    description: 'Ceremonial grade matcha whisked with lightly sweetened oat milk.'
  },
  {
    id: 4,
    title: 'Almond Croissant',
    category: 'pastries',
    price: '$4.00',
    description: 'Flaky buttery pastry filled with rich almond frangipane.'
  }
];

const menuGrid = document.getElementById('menu-grid');
const tabButtons = document.querySelectorAll('.tab-btn');

function renderMenuItems(items) {
  menuGrid.innerHTML = items
    .map(
      (item) => `
    <article class="bg-white border border-stone-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-baseline mb-2">
          <h3 class="font-bold text-lg text-stone-900">${item.title}</h3>
          <span class="font-bold text-amber-800">${item.price}</span>
        </div>
        <p class="text-stone-500 text-sm leading-relaxed">${item.description}</p>
      </div>
    </article>
  `
    )
    .join('');
}

// Active styling toggle classes
const activeClasses = ['bg-amber-800', 'text-white', 'border-amber-800'];
const inactiveClasses = ['bg-white', 'text-stone-600', 'border-stone-300', 'hover:border-amber-800', 'hover:text-amber-800'];

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Reset buttons styling
    tabButtons.forEach((btn) => {
      btn.classList.remove(...activeClasses);
      btn.classList.add(...inactiveClasses);
    });

    // Set active button styling
    button.classList.remove(...inactiveClasses);
    button.classList.add(...activeClasses);

    // Filter items
    const category = button.dataset.category;
    if (category === 'all') {
      renderMenuItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) => item.category === category);
      renderMenuItems(filtered);
    }
  });
});

// Initial render
renderMenuItems(menuItems);