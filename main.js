// العناصر
const typeOptions = document.querySelectorAll('input[name="projectType"]');
const optionCards = document.querySelectorAll('.option-card');
const pagesSlider = document.getElementById('pagesSlider');
const pagesValue = document.getElementById('pagesValue');
const featureChecks = document.querySelectorAll('.feature-check');

const totalPriceEl = document.getElementById('totalPrice');
const totalDaysEl = document.getElementById('totalDays');

// تحديث اختيار النوع
optionCards.forEach(card => {
  card.addEventListener('click', () => {
    optionCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const radio = card.querySelector('input');
    radio.checked = true;
    calculateTotal();
  });
});

// تحديث السلايدر
pagesSlider.addEventListener('input', (e) => {
  pagesValue.textContent = `${e.target.value} صفحات`;
  calculateTotal();
});

// تحديث الـ Checkboxes
featureChecks.forEach(check => {
  check.addEventListener('change', calculateTotal);
});

// دالة الحساب اللحظي
function calculateTotal() {
  let price = 0;
  let days = 0;

  // 1. سعر نوع المشروع
  const selectedType = document.querySelector('input[name="projectType"]:checked');
  if (selectedType) {
    price += parseFloat(selectedType.dataset.price);
    days += parseFloat(selectedType.dataset.days);
  }

  // 2. سعر عدد الصفحات (كل صفحة زيادة تكلفتها 10$ وتزيد نص يوم)
  const pages = parseInt(pagesSlider.value);
  if (pages > 1) {
    price += (pages - 1) * 10;
    days += Math.ceil((pages - 1) * 0.5);
  }

  // 3. سعر الميزات الإضافية
  featureChecks.forEach(check => {
    if (check.checked) {
      price += parseFloat(check.dataset.price);
      days += parseFloat(check.dataset.days);
    }
  });

  // تحديث الشاشة
  totalPriceEl.textContent = `$${price}`;
  totalDaysEl.textContent = `${days} أيام`;
}

// تشغيل الحساب أول مرة
calculateTotal();
