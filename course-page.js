/* catalog.js */
const ageLabels = {
  '10-13': '10–13 лет',
  '14-17': '14–17 лет'
};

const courses = [
  {
    id: 'robotics', title: 'Робототехника', ages: ['10-13', '14-17'], ageLabel: '10–17 лет',
    image: 'course-robotics.webp', alt: 'Коралловый колёсный робот с открытым шасси',
    summary: 'Соберите колёсного робота и научите его объезжать препятствия.',
    introduction: 'От шасси и моторов до программы управления. Разберёмся, как робот воспринимает препятствия и выбирает, куда повернуть.',
    project: 'Робот с датчиком расстояния', result: 'Колёсная модель самостоятельно объезжает препятствия на небольшой трассе. Школьник объясняет, как датчик, моторы и программа работают вместе.',
    modules: [
      ['Механика и шасси', 'Собираем платформу и проверяем, как расположение моторов влияет на движение.'],
      ['Программа движения', 'Учим робота ездить вперёд, назад и поворачивать.'],
      ['Датчики и решения', 'Подключаем датчик расстояния и пишем условия для объезда препятствия.'],
      ['Испытания на трассе', 'Настраиваем повороты, исправляем ошибки и показываем рабочий прототип.']
    ]
  },
  {
    id: 'electronics', title: 'Электроника', ages: ['14-17'], ageLabel: '14–17 лет',
    image: 'course-electronics.webp', alt: 'Микроконтроллер и макетная плата с соединительными проводами',
    summary: 'Разберитесь в цепях и соберите устройство с датчиком света.',
    introduction: 'Изучим, как работают простые электрические цепи, датчики и микроконтроллеры. Соберём первое устройство на макетной плате.',
    project: 'Подсветка с датчиком света', result: 'Устройство включает свет, когда становится темно. В итоговом проекте можно менять порог срабатывания и проверять работу при разной освещённости.',
    modules: [
      ['Цепи и измерения', 'Разбираем простую цепь. Измеряем напряжение и проверяем работу светодиода.'],
      ['Макетная плата', 'Читаем простые схемы и собираем цепь без пайки.'],
      ['Сигнал от датчика', 'Подключаем датчик к микроконтроллеру и сравниваем показания.'],
      ['Сборка подсветки', 'Настраиваем порог включения и испытываем готовое устройство.']
    ]
  },
  {
    id: 'modeling', title: '3D-моделирование', ages: ['10-13', '14-17'], ageLabel: '10–17 лет',
    image: 'course-modeling.webp', alt: 'Три разноцветные инженерные детали, напечатанные на 3D-принтере',
    summary: 'Спроектируйте деталь, напечатайте её и проверьте в сборке.',
    introduction: 'Пройдём путь от размеров и эскиза до цифровой модели и первой печати. Проверим, как проектное решение работает на реальной детали.',
    project: 'Крепление для двигателя модели', result: 'Напечатанное крепление стыкуется с корпусом учебной модели. Школьник сравнивает измерения с чертежом и корректирует размеры при необходимости.',
    modules: [
      ['Эскиз и размеры', 'Измеряем детали и переносим размеры в эскиз.'],
      ['Объёмная модель', 'Строим 3D-модель из простых форм и предусматриваем отверстия под крепёж.'],
      ['Подготовка к печати', 'Выбираем положение детали и проверяем слои перед печатью.'],
      ['Сборка и доработка', 'Проверяем, подходит ли деталь, и готовим исправленную версию модели.']
    ]
  },
  {
    id: 'flight', title: 'Аэродинамика', ages: ['10-13', '14-17'], ageLabel: '10–17 лет',
    image: 'course-flight.webp', alt: 'Лёгкая деревянная модель планера с коралловыми крыльями',
    summary: 'Соберите планер и узнайте, почему одни модели летят дальше других.',
    introduction: 'Изучим, как площадь крыла и положение центра тяжести меняют полёт. Соберём лёгкий планер и проверим выводы на серии запусков.',
    project: 'Планер со сменным крылом', result: 'Два варианта крыла позволяют сравнить дальность полёта одного и того же планера. Школьник записывает результаты и выбирает удачную форму.',
    modules: [
      ['Почему летает планер', 'Разбираем подъёмную силу и влияние формы крыла на полёт.'],
      ['Сборка модели', 'Собираем корпус и крылья из лёгкого материала.'],
      ['Балансировка', 'Проверяем центр тяжести и настраиваем планирование модели.'],
      ['Серия запусков', 'Меняем по одному параметру и сравниваем результаты нескольких испытаний.']
    ]
  }
];
;
/* school.js */
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
}

menu.hidden = false;
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

function courseLink(course) {
  return `course.html?course=${course.id}`;
}

function applicationLink(course, age) {
  const query = new URLSearchParams({ interest: course.id });
  if (course.ages.includes(age)) query.set('age', age);
  return `./?${query}#enroll`;
}

const grid = document.querySelector('#course-grid');
const coursePage = document.querySelector('#course-details');
const form = document.querySelector('#enroll-form');
const params = new URLSearchParams(location.search);

if (grid) {
  if (['#history', '#restoration', '#materials'].includes(location.hash)) {
    location.replace(`project.html${location.hash}`);
  }
  const filters = document.querySelector('.filters');
  const buttons = [...filters.querySelectorAll('button')];
  const status = document.querySelector('#result-status');

  const labByCourse = { flight: 'flight', robotics: 'rover', electronics: 'light', modeling: 'fit' };

  grid.innerHTML = courses.map((course) => `
    <article class="course-card tone-${course.id}" data-course="${course.id}">
      <div class="course-art">
        <img src="assets/${course.image}" srcset="assets/${course.image.replace('.webp', '-400.webp')} 400w, assets/${course.image} 768w" sizes="(max-width: 700px) 87vw, (max-width: 1100px) 46vw, 304px" alt="${course.alt}" width="768" height="512" loading="lazy" decoding="async">
      </div>
      <div class="course-body">
        <p class="course-meta"><strong>${course.title}</strong><span>${course.ageLabel}</span></p>
        <h3>${course.project}</h3>
        <p class="course-summary">${course.summary}</p>
        <details class="course-inline">
          <summary>Программа курса</summary>
          <p>${course.introduction}</p>
          <ol>${course.modules.map(([title, description]) => `<li><strong>${title}</strong><span>${description}</span></li>`).join('')}</ol>
          <p>${course.result}</p>
          <div class="inline-actions">
            <a class="text-link" href="#lab" data-lab-jump="${labByCourse[course.id]}">Попробовать в лаборатории</a>
            <a class="text-link" href="#enroll" data-demo-course="${course.id}">Пробное занятие</a>
          </div>
        </details>
      </div>
      <button class="course-compare" type="button" data-compare="${course.id}" aria-label="Сравнить курс «${course.title}»" aria-pressed="false" hidden>Сравнить курс</button>
    </article>
  `).join('');

  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const selected = event.target.closest('button[data-age]');
    if (!selected) return;

    const age = selected.dataset.age;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === selected)));
    let visibleCount = 0;
    courses.forEach((course) => {
      const shown = age === 'all' || course.ages.includes(age);
      grid.querySelector(`[data-course="${course.id}"]`).hidden = !shown;
      visibleCount += Number(shown);
    });
    status.textContent = `Показано курсов: ${visibleCount}`;
  });
}

function plainActivation(event) {
  return !(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey);
}

function showCourseProgram(id) {
  const card = [...document.querySelectorAll('[data-course]')].find((item) => item.dataset.course === id);
  if (!card) return;
  if (card.hidden) document.querySelector('.filters [data-age="all"]').click();
  const details = card.querySelector('details');
  details.open = true;
  details.querySelector('summary').focus({ preventScroll: true });
  card.scrollIntoView({ block: 'start' });
}

if (coursePage) {
  const course = courses.find((item) => item.id === params.get('course'));

  if (course) {
    document.title = `${course.title} · Формула Неба`;
    document.querySelector('.header-action').href = applicationLink(course, params.get('age'));
    coursePage.innerHTML = `
      <section class="course-hero tone-${course.id}" aria-labelledby="course-title">
        <div class="course-hero-copy">
          <p class="eyebrow section-label">Инженерный курс · ${course.ageLabel}</p>
          <h1 id="course-title">${course.title}</h1>
          <p>${course.introduction}</p>
          <div class="course-hero-actions">
            <a class="button button-primary" href="${applicationLink(course, params.get('age'))}">Пробное занятие</a>
            ${{ flight: '<a class="text-link" href="./?lab=flight#lab">Испытать планер</a><a class="text-link" href="./?tour=range#center">Посмотреть полигон</a>', robotics: '<a class="text-link" href="./?lab=rover#lab">Запрограммировать робота</a>', electronics: '<a class="text-link" href="./?lab=light#lab">Настроить датчик света</a>', modeling: '<a class="text-link" href="./?lab=fit#lab">Подогнать детали</a>' }[course.id] ?? ''}
          </div>
        </div>
        <img src="assets/${course.image}" alt="${course.alt}" width="768" height="512" fetchpriority="high">
      </section>
      <dl class="course-facts">
        <div><dt>Возраст</dt><dd>${course.ageLabel}</dd></div>
        <div><dt>Программа</dt><dd>8 занятий</dd></div>
        <div><dt>Длительность</dt><dd>90 минут</dd></div>
        <div><dt>Формат</dt><dd>Очно, раз в неделю</dd></div>
      </dl>
      <div class="course-detail-grid">
        <section aria-labelledby="syllabus-title">
          <p class="eyebrow section-label">Учебный модуль</p>
          <h2 id="syllabus-title">Программа курса</h2>
          <ol class="syllabus">${course.modules.map(([title, description]) => `
            <li><h3>${title}</h3><p>${description}</p></li>
          `).join('')}</ol>
        </section>
        <aside class="course-outcome">
          <p class="eyebrow section-label">Итоговый проект</p>
          <h2>${course.project}</h2>
          <p>${course.result}</p>
          <div class="course-price"><strong>16 500 ₽</strong><span>Плановый тариф за месяц</span></div>
          <a class="button button-primary" href="${applicationLink(course, params.get('age'))}">Попробовать записаться</a>
          <small>Программа, тариф и запись показаны для будущего центра.</small>
        </aside>
      </div>
    `;
  } else {
    coursePage.innerHTML = '<div class="course-missing"><h1>Курс не найден</h1><p>Выберите программу в <a class="text-link" href="./#courses">каталоге школы</a>.</p></div>';
  }
}

if (form) {
  const courseInput = form.elements.namedItem('course');
  const ageInput = form.elements.namedItem('age');
  const nameInput = form.elements.namedItem('name');
  const emailInput = form.elements.namedItem('email');
  const confirmation = document.querySelector('#form-confirmation');
  const details = document.querySelector('#confirmation-details');
  const restart = document.querySelector('#another-application');

  for (const course of courses) courseInput.add(new Option(course.title, course.id));
  courseInput.add(new Option('Помогите выбрать курс', 'undecided'));

  function updateAgeOptions() {
    const course = courses.find((item) => item.id === courseInput.value);
    for (const option of ageInput.options) {
      option.disabled = !!(option.value && course && !course.ages.includes(option.value));
    }
    if (ageInput.selectedOptions[0]?.disabled) ageInput.value = '';
  }

  courseInput.addEventListener('change', updateAgeOptions);
  nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));

  function startApplication() {
    form.reset();
    nameInput.setCustomValidity('');
    const requested = courses.find((course) => course.id === params.get('interest'));
    if (requested) courseInput.value = requested.id;
    updateAgeOptions();
    const age = params.get('age');
    if (requested?.ages.includes(age)) ageInput.value = age;
  }

  function prefillDemo(courseId, age) {
    const selected = courses.find((course) => course.id === courseId);
    if (!selected) return;
    if (form.hidden) {
      form.hidden = false;
      confirmation.hidden = true;
    }
    courseInput.value = selected.id;
    updateAgeOptions();
    if (selected.ages.includes(age)) ageInput.value = age;
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-demo-course]');
    if (!link || !plainActivation(event)) return;
    prefillDemo(link.dataset.demoCourse, link.dataset.demoAge);
  });

  startApplication();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (nameInput.value.trim().length < 2) {
      nameInput.setCustomValidity('Введите имя из двух или более букв.');
      nameInput.reportValidity();
      return;
    }
    const title = courseInput.selectedOptions[0].text;
    details.textContent = `${title} · ${ageLabels[ageInput.value]}`;
    nameInput.value = '';
    emailInput.value = '';
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  });

  restart.addEventListener('click', () => {
    startApplication();
    confirmation.hidden = true;
    form.hidden = false;
    courseInput.focus();
  });
  form.querySelector('fieldset').disabled = false;
}


const picker = document.querySelector('#course-picker');

if (picker && typeof picker.showModal === 'function') {
  const pickerForm = document.querySelector('#picker-form');
  const result = document.querySelector('#picker-result');
  const courseName = document.querySelector('#picker-course');
  const explanation = document.querySelector('#picker-explanation');
  const program = document.querySelector('#picker-program');
  const enroll = document.querySelector('#picker-enroll');
  const close = document.querySelector('#close-picker');

  for (const trigger of document.querySelectorAll('[data-course-picker]')) {
    trigger.hidden = false;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      picker.showModal();
    });
  }

  close.addEventListener('click', () => picker.close());
  enroll.addEventListener('click', (event) => {
    if (plainActivation(event)) picker.close();
  });
  program.addEventListener('click', (event) => {
    if (!plainActivation(event) || !grid) return;
    event.preventDefault();
    picker.close();
    showCourseProgram(program.dataset.courseProgram);
  });
  document.querySelector('#picker-back').addEventListener('click', () => {
    result.hidden = true;
    pickerForm.hidden = false;
    pickerForm.querySelector('input[name="age"]:checked').focus();
  });

  pickerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(pickerForm);
    const age = data.get('age');
    const interest = data.get('interest');
    const preferred = courses.find((course) => course.id === interest);
    const exactMatch = preferred.ages.includes(age);
    const recommended = exactMatch ? preferred : courses.find((course) => course.id === 'robotics');

    courseName.textContent = recommended.title;
    explanation.textContent = exactMatch ? recommended.summary :
      `Электроника рассчитана на 14–17 лет. На робототехнике можно начать знакомство с моторами и датчиками уже в ${ageLabels[age]}.`;
    program.href = `${courseLink(recommended)}&age=${encodeURIComponent(age)}`;
    program.dataset.courseProgram = recommended.id;
    enroll.href = '#enroll';
    enroll.dataset.demoCourse = recommended.id;
    enroll.dataset.demoAge = age;
    pickerForm.hidden = true;
    result.hidden = false;
    result.focus();
  });
}
;
