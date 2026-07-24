export type BookProduct = {
  slug: string;
  name: string;
  shortName: string;
  price: number | null;
  category: "elite" | "elegant" | "art" | "album" | "accessory";
  description: string;
  promise: string;
  audience: string[];
  features: string[];
  gallery: string[];
  featured?: boolean;
  consultationOnly?: boolean;
};

export const books: BookProduct[] = [
  {
    slug: "elitnaya-rodoslovnaya-kniga",
    name: "Элитная родословная книга",
    shortName: "Элитная",
    price: 29000,
    category: "elite",
    description:
      "Статусная семейная реликвия в выразительном кожаном переплёте с металлическим декором.",
    promise:
      "Книга, которую хочется поставить в центре домашней библиотеки и однажды передать детям.",
    audience: ["Для главы семьи", "На юбилей", "Для семейной библиотеки"],
    features: [
      "Крупный подарочный формат",
      "Твёрдый кожаный переплёт",
      "Выразительная фурнитура",
      "Разделы для истории рода",
    ],
    gallery: [
      "/products/elitnaya-01.jpg",
      "/products/elitnaya-02.jpg",
      "/products/elitnaya-03.jpg",
    ],
    featured: true,
  },
  {
    slug: "elitnaya-s-tisneniem",
    name: "Элитная книга с тиснением",
    shortName: "Элитная с тиснением",
    price: 26500,
    category: "elite",
    description:
      "Тёплый оттенок натуральной кожи, глубокое тиснение и спокойный фамильный характер.",
    promise:
      "Достойный подарок, который показывает уважение к истории семьи без лишней демонстративности.",
    audience: ["Родителям", "На годовщину", "Руководителю семьи"],
    features: [
      "Ручной характер отделки",
      "Кожаная обложка",
      "Декоративное тиснение",
      "Подарочное исполнение",
    ],
    gallery: [
      "/products/elitnaya-tisnenie-01.jpg",
      "/products/elitnaya-tisnenie-02.jpg",
      "/products/elitnaya-tisnenie-03.jpg",
    ],
    featured: true,
  },
  {
    slug: "izyskannaya-v-opletke-s-zolotym-drevom",
    name: "Изысканная в оплётке с золочёным древом",
    shortName: "Оплётка и золотое древо",
    price: 11200,
    category: "elegant",
    description:
      "Бордовая книга с объёмным золотым древом — символом корней, памяти и продолжения рода.",
    promise:
      "Выразительный семейный подарок, который с первого взгляда объясняет свой смысл.",
    audience: ["Родителям", "Бабушке и дедушке", "На семейный праздник"],
    features: [
      "Объёмное изображение древа",
      "Декоративная оплётка",
      "Подарочный формат",
      "Тёплая бордовая палитра",
    ],
    gallery: [
      "/products/opletka-drevo-01.jpg",
      "/products/opletka-drevo-02.jpg",
      "/products/opletka-drevo-03.jpg",
    ],
    featured: true,
  },
  {
    slug: "izyskannaya-v-opletke",
    name: "Изысканная родословная книга в оплётке",
    shortName: "Изысканная в оплётке",
    price: 10500,
    category: "elegant",
    description:
      "Лаконичная кожаная книга с фактурной рамкой и тёплым рельефным древом.",
    promise:
      "Универсальная семейная книга с дорогим видом и понятной символикой.",
    audience: ["Для семьи", "На новоселье", "В подарок родителям"],
    features: [
      "Фактурная обложка",
      "Рельефное древо",
      "Универсальный дизайн",
      "Страницы для семейной истории",
    ],
    gallery: [
      "/products/opletka-01.jpg",
      "/products/opletka-02.jpg",
      "/products/opletka-03.jpg",
    ],
  },
  {
    slug: "izyskannaya",
    name: "Изысканная родословная книга",
    shortName: "Изысканная",
    price: 9500,
    category: "elegant",
    description:
      "Сдержанная книга благородного бордового оттенка для фотографий, воспоминаний и семейных историй.",
    promise:
      "Память, которую можно держать в руках, дополнять вместе и хранить на видном месте.",
    audience: ["Молодой семье", "Родителям", "На годовщину"],
    features: [
      "Благородная цветовая гамма",
      "Классическое древо",
      "Удобный подарочный формат",
      "Подходит для разных поколений",
    ],
    gallery: [
      "/products/izyskannaya-01.jpg",
      "/products/izyskannaya-02.jpg",
      "/products/izyskannaya-03.jpg",
    ],
  },
  {
    slug: "izyskannaya-troyka",
    name: "Изысканная «Тройка»",
    shortName: "Тройка",
    price: 9500,
    category: "elegant",
    description:
      "Родословная книга с русским характером и динамичной композицией на обложке.",
    promise:
      "Символ дороги поколений, семейной силы и связи с культурой.",
    audience: ["Ценителям традиций", "Мужчине", "На памятную дату"],
    features: [
      "Русская сюжетная композиция",
      "Фактурная обложка",
      "Подарочное исполнение",
      "Тёплая семейная символика",
    ],
    gallery: [
      "/products/troyka-01.jpg",
      "/products/troyka-02.jpg",
      "/products/troyka-03.jpg",
    ],
  },
  {
    slug: "izyskannaya-letopisets",
    name: "Изысканная «Летописец»",
    shortName: "Летописец",
    price: 9500,
    category: "elegant",
    description:
      "Книга для тех, кто хочет собрать семейные события в последовательную, живую летопись.",
    promise:
      "Превращает разрозненные воспоминания в историю, которую легко продолжать.",
    audience: ["Семейному хранителю", "Старшему поколению", "Для домашнего архива"],
    features: [
      "Летописная стилистика",
      "Разделы для важных событий",
      "Место для фотографий",
      "Классическое оформление",
    ],
    gallery: [
      "/products/letopisets-01.jpg",
      "/products/letopisets-02.jpg",
      "/products/letopisets-03.jpg",
    ],
  },
  {
    slug: "izyskannaya-blagoslovenie",
    name: "Изысканная «Благословение»",
    shortName: "Благословение",
    price: 9500,
    category: "elegant",
    description:
      "Тёплая родословная книга с мягким, благодарным настроением.",
    promise:
      "Подарок, который говорит о любви к семье спокойнее и глубже обычных слов.",
    audience: ["Маме", "Бабушке", "На семейное торжество"],
    features: [
      "Светлая символика",
      "Классический формат",
      "Место для историй и пожеланий",
      "Подарочная подача",
    ],
    gallery: [
      "/products/blessing-01.jpg",
      "/products/blessing-02.jpg",
      "/products/blessing-03.jpg",
    ],
  },
  {
    slug: "semejnyj-albom",
    name: "Семейный фотоальбом",
    shortName: "Семейный альбом",
    price: 5000,
    category: "album",
    description:
      "Светлый семейный альбом для главных фотографий, подписей и воспоминаний.",
    promise:
      "Простой первый шаг к семейному архиву без сложной подготовки.",
    audience: ["Молодой семье", "На рождение ребёнка", "Для домашнего архива"],
    features: [
      "Светлое современное оформление",
      "Место для фотографий",
      "Подходит для совместного заполнения",
      "Доступный стартовый формат",
    ],
    gallery: [
      "/products/album-01.jpg",
      "/products/album-02.jpg",
      "/products/album-03.jpg",
    ],
    featured: true,
  },
  {
    slug: "hudozhestvennaya-bordovaya-s-gerbom",
    name: "Художественная бордовая с гербом",
    shortName: "Бордовая с гербом",
    price: 7200,
    category: "art",
    description:
      "Классическая бордовая книга с золотым гербом и выразительной рамкой.",
    promise:
      "Подчёркивает достоинство фамилии и превращает семейные записи в реликвию.",
    audience: ["Главе семьи", "На юбилей", "Коллеге или руководителю"],
    features: [
      "Золотой герб",
      "Классическая бордовая палитра",
      "Фактурная рамка",
      "Подарочный формат",
    ],
    gallery: [
      "/products/bordo-gerb-01.jpg",
      "/products/bordo-gerb-02.jpg",
      "/products/bordo-gerb-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-bordovaya-s-drevom",
    name: "Художественная бордовая с древом",
    shortName: "Бордовая с древом",
    price: 7200,
    category: "art",
    description:
      "Бордовая книга с золотым древом для имён, фотографий и историй нескольких поколений.",
    promise:
      "Понятный и красивый символ семейных корней.",
    audience: ["Родителям", "На годовщину", "Для семейной встречи"],
    features: [
      "Золотое древо",
      "Классический цвет",
      "Универсальная символика",
      "Разделы для истории семьи",
    ],
    gallery: [
      "/products/bordo-drevo-01.jpg",
      "/products/bordo-drevo-02.jpg",
      "/products/bordo-drevo-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-chernaya-s-gerbom",
    name: "Художественная чёрная с гербом",
    shortName: "Чёрная с гербом",
    price: 7200,
    category: "art",
    description:
      "Сдержанная чёрная книга с золотым гербом для серьёзного, статусного подарка.",
    promise:
      "Выбор для человека, который ценит лаконичность, порядок и семейное достоинство.",
    audience: ["Мужчине", "Главе семьи", "На деловой юбилей"],
    features: [
      "Глубокий чёрный цвет",
      "Золотой герб",
      "Сдержанная композиция",
      "Подарочное исполнение",
    ],
    gallery: [
      "/products/black-gerb-01.jpg",
      "/products/black-gerb-02.jpg",
      "/products/black-gerb-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-sinyaya-s-gerbom",
    name: "Художественная синяя с гербом",
    shortName: "Синяя с гербом",
    price: 7200,
    category: "art",
    description:
      "Спокойная синяя книга с гербом и классическим золотым тиснением.",
    promise:
      "Благородный семейный подарок без излишней торжественности.",
    audience: ["Родителям", "Мужчине", "На семейную дату"],
    features: [
      "Глубокий синий оттенок",
      "Геральдическая композиция",
      "Золотое тиснение",
      "Универсальный формат",
    ],
    gallery: [
      "/products/blue-gerb-01.jpg",
      "/products/blue-gerb-02.jpg",
      "/products/blue-gerb-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-svadebnaya-s-drevom",
    name: "Художественная свадебная с древом",
    shortName: "Свадебная с древом",
    price: 7200,
    category: "art",
    description:
      "Белая книга с золотым древом для начала общей истории новой семьи.",
    promise:
      "Подарок молодожёнам, который будет наполняться смыслом много лет.",
    audience: ["Молодожёнам", "На годовщину", "Для новой семьи"],
    features: [
      "Светлое свадебное оформление",
      "Золотое древо",
      "Место для первых семейных историй",
      "Торжественная подача",
    ],
    gallery: [
      "/products/wedding-01.jpg",
      "/products/wedding-02.jpg",
      "/products/wedding-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-zelenaya-s-mechetyu",
    name: "Художественная зелёная с мечетью",
    shortName: "Зелёная с мечетью",
    price: 7200,
    category: "art",
    description:
      "Зелёная семейная книга с архитектурным мотивом и уважением к традиции.",
    promise:
      "Помогает сохранить родовую память в оформлении, близком семье по духу.",
    audience: ["Верующей семье", "Старшему поколению", "На семейный праздник"],
    features: [
      "Глубокий зелёный цвет",
      "Архитектурный мотив",
      "Деликатное золотое оформление",
      "Семейный формат",
    ],
    gallery: [
      "/products/mosque-01.jpg",
      "/products/mosque-02.jpg",
      "/products/mosque-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-musulmanskaya",
    name: "Художественная мусульманская",
    shortName: "Мусульманская",
    price: 7200,
    category: "art",
    description:
      "Родословная книга с деликатной восточной орнаментикой и уважительной подачей.",
    promise:
      "Семейная память, оформленная в близкой культурной традиции.",
    audience: ["Мусульманской семье", "Родителям", "На семейную дату"],
    features: [
      "Восточная орнаментика",
      "Благородная палитра",
      "Тематическое оформление",
      "Подарочный формат",
    ],
    gallery: [
      "/products/muslim-01.jpg",
      "/products/muslim-02.jpg",
      "/products/muslim-03.jpg",
    ],
  },
  {
    slug: "hudozhestvennaya-na-anglijskom",
    name: "Художественная родословная книга на английском",
    shortName: "Художественная English",
    price: null,
    category: "art",
    description:
      "Книга для семей, чья история продолжается в разных странах и на разных языках.",
    promise:
      "Соединяет родственников через общий семейный рассказ без языкового барьера.",
    audience: ["Международной семье", "Родственникам за рубежом", "Билингвам"],
    features: [
      "Англоязычное наполнение",
      "Художественная обложка",
      "Уточнение комплектации",
      "Персональная консультация",
    ],
    gallery: [
      "/products/english-art-01.jpg",
      "/products/english-art-02.jpg",
      "/products/english-art-03.jpg",
    ],
    consultationOnly: true,
  },
  {
    slug: "izyskannaya-na-anglijskom",
    name: "Изысканная родословная книга на английском",
    shortName: "Изысканная English",
    price: null,
    category: "elegant",
    description:
      "Благородная англоязычная версия для семейной истории без границ.",
    promise:
      "Подарок, понятный родственникам в любой стране.",
    audience: ["Международной семье", "В подарок за рубеж", "Билингвам"],
    features: [
      "Англоязычные разделы",
      "Изысканное оформление",
      "Подбор по запросу",
      "Консультация перед заказом",
    ],
    gallery: [
      "/products/english-elegant-01.jpg",
      "/products/english-elegant-02.jpg",
      "/products/english-elegant-03.jpg",
    ],
    consultationOnly: true,
  },
  {
    slug: "izyskannaya-eko-kozha",
    name: "Изысканная родословная книга из экокожи",
    shortName: "Изысканная экокожа",
    price: 7200,
    category: "elegant",
    description:
      "Современная аккуратная книга из экокожи с тёплым семейным смыслом.",
    promise:
      "Практичный вариант для тех, кому важны чистый дизайн и понятная цена.",
    audience: ["Молодой семье", "Родителям", "Для первого семейного архива"],
    features: [
      "Качественная экокожа",
      "Современное оформление",
      "Удобный семейный формат",
      "Понятная стоимость",
    ],
    gallery: [
      "/products/eco-01.jpg",
      "/products/eco-02.jpg",
      "/products/eco-03.jpg",
    ],
  },
  {
    slug: "podarochnyj-paket",
    name: "Подарочный пакет",
    shortName: "Подарочный пакет",
    price: 150,
    category: "accessory",
    description:
      "Аккуратная упаковка, с которой книга сразу выглядит как готовый подарок.",
    promise:
      "Последний штрих, избавляющий от отдельного поиска упаковки.",
    audience: ["К любой книге", "Для вручения", "На семейный праздник"],
    features: [
      "Подходит к формату книг",
      "Готовое подарочное решение",
      "Добавляется к основному заказу",
      "Лаконичное оформление",
    ],
    gallery: ["/products/gift-bag-01.jpg"],
  },
];

export const featuredBooks = books.filter((book) => book.featured);

export const categoryLabels: Record<BookProduct["category"], string> = {
  elite: "Элитные",
  elegant: "Изысканные",
  art: "Художественные",
  album: "Альбомы",
  accessory: "Дополнения",
};

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price === null) return "По запросу";
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
