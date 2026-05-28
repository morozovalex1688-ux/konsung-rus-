// ============================================
// ФАЙЛ ДЛЯ РЕДАКТИРОВАНИЯ ПРОДУКТОВ САЙТА
// ============================================
// 
// Как добавить новый продукт:
// 1. Скопируй один из существующих объектов ниже
// 2. Измени значения
// 3. Добавь фото в папку: public/images/products/
// 4. Добавь инструкцию (PDF) в папку: public/pdfs/
// 5. Сохрани файл — сайт обновится автоматически
//
// ВАЖНО: Сохраняй тот же стиль и структуру!

export type Product = {
  id: string;
  name: string;
  model?: string;
  category: 'glucometer' | 'strips' | 'other';
  badge?: string;                    // Например: "С Bluetooth" или "Новинка"
  image: string;                     // Путь от public/images/   Пример: "products/my-new-product.jpg"
  description: string;
  shortFeatures?: string[];          // Короткие фичи под названием (через • )
  specs: Array<{                     // Полные технические характеристики
    label: string;
    value: string;
  }>;
  pdf?: string;                      // Путь от public/pdfs/     Пример: "my-product-instruction.pdf"
  isFeatured?: boolean;              // Показывать ли в основном блоке
};

// ============================================
// СПИСОК ПРОДУКТОВ (редактируй здесь)
// ============================================

export const products: Product[] = [
  {
    id: "bg-710b",
    name: "Sejoy BG-710b",
    model: "с Bluetooth",
    category: "glucometer",
    badge: "С Bluetooth",
    image: "products/2.JPG",
    description: "Современный глюкометр с беспроводной передачей данных. Идеален для постоянного мониторинга и интеграции с приложениями.",
    shortFeatures: [
      "Быстрый результат",
      "Память 1000 измерений",
      "Bluetooth"
    ],
    specs: [
      { label: "Метод измерения", value: "Электрохимический (глюкозодегидрогеназа FAD)" },
      { label: "Время измерения", value: "5 секунд" },
      { label: "Объём образца", value: "0,6 мкл" },
      { label: "Диапазон измерения", value: "0,5 – 33,3 ммоль/л (20 – 600 мг/дл)" },
      { label: "Память", value: "1000 измерений" },
      { label: "Точность", value: "Соответствует ISO 15197:2013" },
      { label: "Кодирование", value: "Не требуется" },
      { label: "Гематокрит", value: "0 – 70%" },
      { label: "Цветовой индикатор", value: "Есть" },
      { label: "Маркер еды", value: "Есть" },
      { label: "Калибровка", value: "По плазме крови" },
      { label: "Питание", value: "CR2032" },
    ],
    pdf: "sejoy-glucometer-instruction.pdf",
    isFeatured: true,
  },

  {
    id: "bg-710",
    name: "Sejoy BG-710",
    model: "Классическая модель",
    category: "glucometer",
    image: "products/IMG_9427.JPG",
    description: "Надёжный и точный глюкометр без Bluetooth. Отличный выбор для повседневного использования в аптеках и учреждениях.",
    shortFeatures: [
      "5 секунд на результат",
      "Высокая точность",
      "Простота использования"
    ],
    specs: [
      { label: "Метод измерения", value: "Электрохимический (глюкозодегидрогеназа FAD)" },
      { label: "Время измерения", value: "5 секунд" },
      { label: "Объём образца", value: "0,6 мкл" },
      { label: "Диапазон измерения", value: "0,5 – 33,3 ммоль/л (20 – 600 мг/дл)" },
      { label: "Память", value: "1000 измерений" },
      { label: "Точность", value: "Соответствует ISO 15197:2013" },
      { label: "Кодирование", value: "Не требуется" },
      { label: "Гематокрит", value: "0 – 70%" },
      { label: "Цветовой индикатор", value: "Есть" },
      { label: "Маркер еды", value: "Есть" },
      { label: "Калибровка", value: "По плазме крови" },
      { label: "Питание", value: "CR2032" },
    ],
    pdf: "sejoy-glucometer-instruction.pdf",
    isFeatured: true,
  },

  {
    id: "test-strips",
    name: "Тест-полоски Sejoy",
    category: "strips",
    image: "test-poloski.png",           // Можно переместить в products/
    description: "Высокоточные тест-полоски с технологией GDH-FAD. Совместимы с глюкометрами Sejoy BG-710 и BG-710b.",
    specs: [
      { label: "Метод измерения", value: "Электрохимический (FAD-GDH)" },
      { label: "Объём образца крови", value: "0,6 мкл" },
      { label: "Время измерения", value: "5 секунд" },
      { label: "Диапазон измерения", value: "0,5 – 33,3 ммоль/л" },
      { label: "Гематокрит", value: "0 – 70%" },
      { label: "Точность", value: "Соответствует ISO 15197:2013" },
      { label: "Кодирование", value: "Не требуется" },
      { label: "Срок годности", value: "24 месяца" },
      { label: "Условия хранения", value: "+4…+30°C (< 85% влажность)" },
      { label: "Упаковка", value: "50 полосок в тубусе" },
    ],
    pdf: "sejoy-test-strips-instruction.pdf",
  },

  // ==========================================
  // ПРИМЕР: Как добавить новый продукт
  // ==========================================
  // {
  //   id: "bg-720",
  //   name: "Sejoy BG-720",
  //   category: "glucometer",
  //   badge: "Новинка",
  //   image: "products/bg-720.jpg",
  //   description: "Описание нового глюкометра...",
  //   shortFeatures: ["Быстрый результат", "Bluetooth 5.0"],
  //   specs: [
  //     { label: "Время измерения", value: "5 секунд" },
  //     // ... другие характеристики
  //   ],
  //   pdf: "bg-720-instruction.pdf",
  // },
];
