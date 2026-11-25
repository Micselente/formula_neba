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
/* flight-lab.js */
const wingProfiles = {
  narrow: { label: 'Узкое крыло', airSpeed: 7.6, sinkRate: 0.85 },
  wide: { label: 'Широкое крыло', airSpeed: 5.3, sinkRate: 0.5 }
};

function modelFlight(wing, height, wind) {
  const { label, airSpeed, sinkRate } = wingProfiles[wing];
  const duration = height / sinkRate;
  return { label, height, wind, duration, distance: (airSpeed + wind) * duration };
}

const lab = document.querySelector('#flight-lab');
const canvas = document.querySelector('#flight-chart');
const chart = canvas?.getContext('2d');

if (lab && chart) {
  const controls = document.querySelector('#flight-controls');
  const heightInput = document.querySelector('#launch-height');
  const windInput = document.querySelector('#wind-speed');
  const heightValue = document.querySelector('#height-value');
  const windValue = document.querySelector('#wind-value');
  const status = document.querySelector('#flight-status');
  const history = document.querySelector('#flight-history');
  const reset = document.querySelector('#flight-reset');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const number = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 });

  const { width, height: chartHeight } = canvas;
  const left = 65;
  const ground = chartHeight - 65;
  const plotWidth = width - left - 36;
  const plotHeight = ground - 40;
  const toX = (meters) => left + meters / 90 * plotWidth;
  const toY = (meters) => ground - meters / 6 * plotHeight;
  const measure = (value, unit) => `${number.format(value)} ${unit}`;

  let attempts = [];
  let frameId = 0;

  function describeWind(wind) {
    if (wind === 0) return 'Штиль';
    return `${wind < 0 ? 'Встречный' : 'Попутный'} · ${measure(Math.abs(wind), 'м/с')}`;
  }

  function line(x1, y1, x2, y2, color, thickness = 1) {
    chart.beginPath();
    chart.moveTo(x1, y1);
    chart.lineTo(x2, y2);
    chart.strokeStyle = color;
    chart.lineWidth = thickness;
    chart.stroke();
  }

  function dot(x, y, color, radius) {
    chart.beginPath();
    chart.arc(x, y, radius, 0, Math.PI * 2);
    chart.fillStyle = color;
    chart.fill();
  }

  function drawGrid() {
    chart.clearRect(0, 0, width, chartHeight);
    const compact = canvas.clientWidth < 520;
    chart.font = compact ? '28px Onest, sans-serif' : '17px Onest, sans-serif';
    chart.fillStyle = '#d3e8e5';
    chart.textAlign = 'center';
    chart.textBaseline = 'middle';

    for (let distance = 0; distance <= 90; distance += compact ? 30 : 15) {
      const x = toX(distance);
      line(x, toY(6), x, ground, '#416662');
      chart.fillText(number.format(distance), x, ground + (compact ? 20 : 19));
    }

    chart.textAlign = 'right';
    for (let height = compact ? 2 : 1; height <= 6; height += compact ? 2 : 1) {
      const y = toY(height);
      line(left, y, toX(90), y, '#416662');
      chart.fillText(number.format(height), left - 12, y);
    }

    chart.textAlign = 'left';
    chart.fillText('Высота, м', left, 18);
    chart.textAlign = 'right';
    chart.fillText('Дальность, м', toX(90), chartHeight - (compact ? 15 : 12));
    line(left, ground, toX(90), ground, '#b6dbd0', 2);
  }

  function drawPlane(x, y, color) {
    chart.save();
    chart.translate(x, y);
    chart.beginPath();
    chart.moveTo(-15, -6);
    chart.lineTo(15, 0);
    chart.lineTo(-6, 9);
    chart.lineTo(-3, 1);
    chart.closePath();
    chart.fillStyle = color;
    chart.fill();
    chart.restore();
  }

  function render(progress = 1) {
    drawGrid();
    const previous = attempts.length > 1 ? attempts[0] : null;
    const current = attempts.at(-1);
    if (previous) {
      chart.setLineDash([8, 7]);
      line(left, toY(previous.height), toX(previous.distance), ground, '#a5d8d5', 3);
      chart.setLineDash([]);
      dot(toX(previous.distance), ground, '#a5d8d5', 5);
    }
    if (!current) {
      drawPlane(left + 13, toY(Number(heightInput.value)), '#f4b584');
      return;
    }

    const x = toX(current.distance * progress);
    const y = toY(current.height * (1 - progress));
    line(left, toY(current.height), x, y, '#f4b584', 4);
    drawPlane(x, y, '#f4b584');
  }

  function updateControls() {
    heightValue.textContent = measure(Number(heightInput.value), 'м');
    windValue.textContent = describeWind(Number(windInput.value));
    heightInput.setAttribute('aria-valuetext', heightValue.textContent);
    windInput.setAttribute('aria-valuetext', windValue.textContent);
    if (!attempts.length) render();
  }

  function updateResults() {
    history.replaceChildren();
    for (const [index, attempt] of attempts.entries()) {
      const item = document.createElement('li');
      const isLatest = index === attempts.length - 1;
      item.dataset.latest = String(isLatest);
      const heading = document.createElement('strong');
      heading.textContent = `${isLatest ? 'Последний' : 'Предыдущий'} · ${measure(attempt.distance, 'м')}`;
      const conditions = document.createElement('span');
      conditions.textContent = `${attempt.label} · ${measure(attempt.height, 'м')} · ${describeWind(attempt.wind)}`;
      item.append(heading, conditions);
      history.append(item);
    }
    history.hidden = attempts.length === 0;
    reset.hidden = attempts.length === 0;
  }

  function play() {
    cancelAnimationFrame(frameId);
    if (motion.matches) {
      render();
      return;
    }
    const start = performance.now();
    function step(now) {
      const progress = Math.min(1, (now - start) / 1050);
      render(progress);
      if (progress < 1) frameId = requestAnimationFrame(step);
    }
    frameId = requestAnimationFrame(step);
  }

  controls.addEventListener('input', updateControls);
  controls.addEventListener('submit', (event) => {
    event.preventDefault();
    const settings = new FormData(controls);
    const result = modelFlight(settings.get('wing'), Number(heightInput.value), Number(windInput.value));
    attempts = [...attempts.slice(-1), result];
    const delta = attempts.length > 1 ? result.distance - attempts[0].distance : null;
    let comparison = '';
    if (delta !== null) {
      comparison = Math.abs(delta) < 0.05 ? ' Дальность почти не изменилась.' :
        ` Это на ${measure(Math.abs(delta), 'м')} ${delta > 0 ? 'дальше' : 'ближе'} предыдущего запуска.`;
    }
    status.textContent = `Дальность — ${measure(result.distance, 'м')}. Время полёта — ${measure(result.duration, 'с')}.${comparison}`;
    updateResults();
    play();
  });

  reset.addEventListener('click', () => {
    cancelAnimationFrame(frameId);
    attempts = [];
    updateResults();
    render();
    status.textContent = 'Результаты сброшены. Можно запустить планер снова.';
    controls.querySelector('button[type="submit"]').focus();
  });

  lab.hidden = false;
  updateControls();
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(() => render()).observe(canvas);
  }
  document.fonts?.ready.then(() => render());
}
;
/* atlas.js */
for (const list of document.querySelectorAll('[data-atlas-tabs]')) {
  const tabs = [...list.querySelectorAll('button')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  function activate(index, focus = false) {
    tabs.forEach((tab, position) => {
      const active = position === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[position].hidden = !active;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      const keys = {
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!Object.hasOwn(keys, event.key)) return;
      event.preventDefault();
      activate(keys[event.key], true);
    });
  });

  const labChoice = new URLSearchParams(location.search).get('lab');
  const deepLink = tabs.findIndex((tab) => tab.dataset.lab === labChoice);
  activate(Math.max(0, deepLink));
  list.hidden = false;
}

const compareButton = document.querySelector('#compare-open');
const compareDialog = document.querySelector('#compare-dialog');
if (typeof compareDialog?.showModal === 'function') {
  const count = document.querySelector('#compare-count');
  const content = document.querySelector('#compare-content');
  const cards = [...document.querySelectorAll('[data-compare]')];
  const selected = new Set();

  function updateComparison() {
    count.textContent = `${selected.size} / 2`;
    compareButton.disabled = selected.size !== 2;
    for (const button of cards) {
      const active = selected.has(button.dataset.compare);
      button.setAttribute('aria-pressed', String(active));
      button.textContent = active ? 'В сравнении' : 'Сравнить курс';
      button.disabled = !active && selected.size === 2;
    }
  }

  for (const button of cards) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const { compare } = button.dataset;
      if (selected.has(compare)) selected.delete(compare);
      else if (selected.size < 2) selected.add(compare);
      updateComparison();
    });
  }

  compareButton.hidden = false;
  compareButton.addEventListener('click', () => {
    const compared = [...selected].map((id) => courses.find((course) => course.id === id));
    content.innerHTML = `<div class="compare-course-grid">${compared.map((course) => `
      <section class="compare-course tone-${course.id}">
        <h3>${course.title}</h3>
        <dl>
          <dt>Возраст</dt><dd>${course.ageLabel}</dd>
          <dt>Темы курса</dt><dd><ul>${course.modules.map(([title]) => `<li>${title}</li>`).join('')}</ul></dd>
          <dt>Итоговый проект</dt><dd>${course.project}</dd>
        </dl>
        <a class="text-link" href="${courseLink(course)}" data-course-program="${course.id}">Программа курса</a>
      </section>`).join('')}</div>
      <p class="compare-shared">Оба курса рассчитаны на 8 очных занятий по 90 минут.</p>
      <button type="button" class="picker-close" data-compare-reset>Сбросить выбор</button>`;
    for (const link of content.querySelectorAll('[data-course-program]')) {
      link.addEventListener('click', (event) => {
        if (!plainActivation(event)) return;
        event.preventDefault();
        compareDialog.close();
        showCourseProgram(link.dataset.courseProgram);
      });
    }
    content.querySelector('[data-compare-reset]').addEventListener('click', () => {
      selected.clear();
      updateComparison();
      compareDialog.close();
      cards.find((button) => !button.closest('article').hidden)?.focus();
    });
    compareDialog.showModal();
  });
}

const planDialog = document.querySelector('#atlas-plan');
if (typeof planDialog?.showModal === 'function') {
  const image = document.querySelector('#atlas-plan-image');
  const title = document.querySelector('#atlas-plan-title');
  for (const link of document.querySelectorAll('[data-plan]')) {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.dataset.plan;
      image.src = link.href;
      image.alt = link.dataset.plan;
      planDialog.showModal();
    });
  }
}

const light = document.querySelector('#light-level');
if (light) {
  const threshold = document.querySelector('#light-threshold');
  const display = document.querySelector('#sensor-illustration');
  const lightStatus = document.querySelector('#light-status');
  const lightValue = document.querySelector('#light-value');
  const thresholdValue = document.querySelector('#threshold-value');

  function updateCircuit() {
    const level = Number(light.value);
    const trigger = Number(threshold.value);
    const lit = level < trigger;
    lightValue.textContent = `${level}%`;
    thresholdValue.textContent = `${trigger}%`;
    display.style.setProperty('--light', level / 100);
    display.classList.toggle('is-lit', lit);
    const description = lit ? 'Лампа включена. Света меньше, чем заданный порог.' :
      'Лампа выключена. Освещённость достигла порога или выше него.';
    if (lightStatus.textContent !== description) lightStatus.textContent = description;
  }

  light.addEventListener('input', updateCircuit);
  threshold.addEventListener('input', updateCircuit);
  for (const button of document.querySelectorAll('[data-light-level]')) {
    button.addEventListener('click', () => {
      light.value = button.dataset.lightLevel;
      updateCircuit();
    });
  }
  updateCircuit();
}

const board = document.querySelector('#rover-board');
if (board) {
  const side = 5;
  const start = { x: 0, y: 4 };
  const goal = { x: 4, y: 0 };
  const obstacles = new Set([2, 6, 13, 17, 21]);
  const commands = {
    U: { x: 0, y: -1, label: '↑', name: 'Вверх' },
    D: { x: 0, y: 1, label: '↓', name: 'Вниз' },
    L: { x: -1, y: 0, label: '←', name: 'Влево' },
    R: { x: 1, y: 0, label: '→', name: 'Вправо' }
  };
  const moves = [...document.querySelectorAll('[data-move]')];
  const run = document.querySelector('#rover-run');
  const undo = document.querySelector('#rover-undo');
  const clear = document.querySelector('#rover-clear');
  const queue = document.querySelector('#rover-queue');
  const count = document.querySelector('#rover-count');
  const status = document.querySelector('#rover-status');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const program = [];
  let position = start;
  let running = false;

  const indexOf = ({ x, y }) => y * side + x;
  const cells = Array.from({ length: side ** 2 }, (_, index) => {
    const cell = document.createElement('div');
    cell.className = 'rover-cell';
    if (obstacles.has(index)) cell.dataset.terrain = 'wall';
    if (index === indexOf(goal)) cell.dataset.terrain = 'goal';
    if (index === indexOf(start)) cell.dataset.terrain = 'start';
    return cell;
  });
  board.append(...cells);

  function drawBoard() {
    cells.forEach((cell, index) => cell.classList.toggle('has-rover', index === indexOf(position)));
    board.setAttribute('aria-label',
      `Поле 5 на 5. Робот: ряд ${position.y + 1}, столбец ${position.x + 1}. Финиш: ряд 1, столбец 5. Преграды: ряд 1 столбец 3, ряд 2 столбец 2, ряд 3 столбец 4, ряд 4 столбец 3, ряд 5 столбец 2.`);
  }

  function drawQueue() {
    count.textContent = `${program.length} / 16`;
    queue.replaceChildren(...program.map((step) => {
      const item = document.createElement('li');
      item.textContent = commands[step].label;
      item.setAttribute('aria-label', commands[step].name);
      return item;
    }));
    moves.forEach((button) => { button.disabled = running || program.length === 16; });
    run.disabled = undo.disabled = clear.disabled = running || program.length === 0;
  }

  function editQueue() {
    position = start;
    drawBoard();
    drawQueue();
    status.textContent = program.length ? `Команд в программе — ${program.length}.` :
      'Робот на старте. Добавьте первую команду.';
  }

  for (const button of moves) button.addEventListener('click', () => {
    program.push(button.dataset.move);
    editQueue();
  });
  undo.addEventListener('click', () => {
    program.pop();
    editQueue();
  });
  clear.addEventListener('click', () => {
    program.length = 0;
    editQueue();
    moves[0].focus();
  });

  run.addEventListener('click', async () => {
    running = true;
    position = start;
    drawBoard();
    drawQueue();
    status.textContent = 'Робот выполняет программу.';
    let result = 'Программа закончилась до финиша. Добавьте команды и запустите снова.';
    for (const [index, step] of program.entries()) {
      if (!reducedMotion.matches) await new Promise((resolve) => setTimeout(resolve, 160));
      const { x, y } = commands[step];
      const next = { x: position.x + x, y: position.y + y };
      if (next.x < 0 || next.y < 0 || next.x >= side || next.y >= side || obstacles.has(indexOf(next))) {
        result = `На шаге ${index + 1} робот встретил преграду или край поля. Измените программу.`;
        break;
      }
      position = next;
      drawBoard();
      if (indexOf(position) === indexOf(goal)) {
        result = `Финиш! Робот добрался до цели за ${index + 1} шагов.`;
        break;
      }
    }
    running = false;
    drawQueue();
    status.textContent = result;
  });

  drawBoard();
  drawQueue();
}

const diameter = document.querySelector('#hole-diameter');
if (diameter) {
  const value = document.querySelector('#hole-value');
  const status = document.querySelector('#fit-status');
  const figure = document.querySelector('.fit-figure');
  const decimal = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  function updateHole() {
    const size = Number(diameter.value);
    value.textContent = `${decimal.format(size)} мм`;
    diameter.setAttribute('aria-valuetext', value.textContent);
    figure.style.setProperty('--diameter', size / 10);
  }

  diameter.addEventListener('input', () => {
    updateHole();
    status.textContent = 'Диаметр изменён. Проверьте посадку.';
  });
  document.querySelector('#check-fit').addEventListener('click', () => {
    const tenths = Math.round(Number(diameter.value) * 10) - 100;
    const gap = decimal.format(Math.abs(tenths) / 10);
    if (tenths < 0) status.textContent = `Штифт не входит. Отверстие уже штифта на ${gap} мм.`;
    else if (tenths < 2) status.textContent = `Зазор ${gap} мм. Для этой задачи нужна более свободная посадка.`;
    else if (tenths > 4) status.textContent = `Зазор ${gap} мм. Деталь будет болтаться.`;
    else status.textContent = `Подходит! Зазор ${gap} мм в нужном диапазоне.`;
  });
  updateHole();
}
;
/* campus.js */
const campus = document.querySelector('#tour-images');

if (campus) {
  const stops = [
    {
      id: 'courtyard', title: 'Двор школы', location: 'Парковая улица, 7Р', plan: 'yard',
      description: 'Под деревьями вдоль обновлённого корпуса запланированы прогулочные дорожки и места для отдыха между занятиями.',
      alt: 'Зелёный двор будущей школы на Парковой со школьниками и отреставрированным фасадом',
      width: 1672, height: 941, image: 'hero.webp', mobile: 'school-courtyard-mobile.webp', mobileWidth: 768
    },
    {
      id: 'lecture', title: 'Лекторий', location: 'В здании · 3 этаж', plan: 'three',
      description: 'Здесь можно обсудить историю авиации, разобрать устройство планера и представить свой проект группе.',
      alt: 'Школьники на занятии в лектории с авиационными иллюстрациями на стенах',
      width: 1446, height: 1087
    },
    {
      id: 'play', title: 'Детская площадка', location: 'Во дворе', plan: 'yard',
      description: 'Деревянные игровые конструкции встроены в зелёную часть двора. Здесь можно провести время до или после занятий.',
      alt: 'Дети на игровой площадке с деревянными конструкциями среди деревьев',
      width: 1448, height: 1086
    },
    {
      id: 'rest', title: 'Зона отдыха', location: 'Во дворе', plan: 'yard',
      description: 'В зоне отдыха предусмотрена модель дирижабля. Она напоминает об истории воздухоплавательной школы.',
      alt: 'Серебристая модель дирижабля на постаменте в зелёном дворе',
      width: 760, height: 782
    },
    {
      id: 'range', title: 'Испытательный полигон', location: 'Во дворе', plan: 'yard',
      description: 'На площадке с разметкой можно испытать модели, созданные в мастерской, и сравнить результаты запусков.',
      alt: 'На размеченной площадке школьник запускает модель самолёта',
      width: 853, height: 803
    }
  ];

  const image = document.querySelector('#campus-image');
  const locationLabel = document.querySelector('#campus-location');
  const title = document.querySelector('#campus-title');
  const description = document.querySelector('#campus-text');
  const position = document.querySelector('#campus-position');
  const plan = document.querySelector('#campus-plan');
  const experiment = document.querySelector('#campus-lab');
  const selectors = [...campus.querySelectorAll('[data-campus-stop]')];
  const dialog = document.querySelector('#campus-dialog');
  const dialogTitle = document.querySelector('#campus-dialog-title');
  const dialogImage = document.querySelector('#campus-dialog-image');
  const dialogPosition = document.querySelector('#campus-dialog-position');
  const expand = document.querySelector('#campus-expand');
  let current = 0;

  function showStop(index) {
    current = (index + stops.length) % stops.length;
    const stop = stops[current];
    const src = `assets/${stop.image ?? `visit-${stop.id}.webp`}`;
    const mobile = `assets/${stop.mobile ?? `visit-${stop.id}-mobile.webp`}`;
    image.alt = stop.alt;
    image.width = stop.width;
    image.height = stop.height;
    image.dataset.orientation = stop.width / stop.height > 1.2 ? 'landscape' : 'portrait';
    image.srcset = `${mobile} ${stop.mobileWidth ?? 700}w, ${src} ${stop.width}w`;
    image.src = src;

    locationLabel.textContent = stop.location;
    title.textContent = stop.title;
    description.textContent = stop.description;
    position.textContent = `${current + 1} из ${stops.length}`;
    plan.textContent = stop.plan === 'yard' ? 'Открыть генплан' : 'Открыть план этажа';
    experiment.hidden = stop.id !== 'range';
    selectors.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.campusStop === stop.id)));

    if (dialog.open) {
      dialogTitle.textContent = stop.title;
      dialogImage.alt = stop.alt;
      dialogImage.src = src;
      dialogPosition.textContent = position.textContent;
    }
  }

  function openStop(id) {
    const index = stops.findIndex((stop) => stop.id === id);
    if (index < 0) return;
    document.querySelector('#tour-images-tab').click();
    showStop(index);
  }

  function enableSwipe(surface) {
    let start = null;
    surface.addEventListener('touchstart', (event) => {
      start = event.touches.length === 1 ? event.touches[0] : null;
    }, { passive: true });
    surface.addEventListener('touchcancel', () => { start = null; }, { passive: true });
    surface.addEventListener('touchend', (event) => {
      if (!start || event.touches.length) return;
      const finger = event.changedTouches[0];
      const distance = finger.clientX - start.clientX;
      const vertical = finger.clientY - start.clientY;
      start = null;
      if (Math.abs(distance) > 45 && Math.abs(distance) > Math.abs(vertical) * 1.5) {
        showStop(current + (distance < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  for (const controls of campus.querySelectorAll('[data-campus-controls]')) controls.hidden = false;
  for (const button of selectors) {
    button.addEventListener('click', () => openStop(button.dataset.campusStop));
  }
  for (const button of document.querySelectorAll('[data-campus-step]')) {
    button.addEventListener('click', () => showStop(current + Number(button.dataset.campusStep)));
  }
  for (const link of document.querySelectorAll('[data-campus-visit]')) {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      openStop(link.dataset.campusVisit);
    });
  }
  experiment.addEventListener('click', (event) => {
    if (!(event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)) {
      document.querySelector('#lab-flight-tab').click();
    }
  });
  plan.addEventListener('click', () => {
    document.querySelector('#tour-plans-tab').click();
    const floor = document.getElementById(`tour-${stops[current].plan}-tab`);
    floor.click();
    floor.focus({ preventScroll: true });
    document.querySelector('#center').scrollIntoView({ block: 'start', behavior: 'instant' });
  });

  if (typeof dialog.showModal === 'function') {
    expand.addEventListener('click', () => {
      dialog.showModal();
      showStop(current);
    });
    dialog.addEventListener('keydown', (event) => {
      const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
      if (!step) return;
      event.preventDefault();
      showStop(current + step);
    });
    enableSwipe(dialogImage);
  } else {
    expand.hidden = true;
  }

  enableSwipe(image);
  openStop(new URLSearchParams(location.search).get('tour') || 'courtyard');
}
;
/* front-page.js */
const pageProgress = document.querySelector('.reading-progress');

if (pageProgress) {
  const links = [...document.querySelectorAll('#navigation a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.hash));
  const header = document.querySelector('.header');
  let frame = 0;

  function updateReadingPosition() {
    frame = 0;
    const viewport = document.documentElement;
    const range = viewport.scrollHeight - viewport.clientHeight;
    const ratio = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    pageProgress.style.transform = `scaleX(${ratio})`;
    const guide = header.offsetHeight + viewport.clientHeight * 0.21;
    const current = sections.findLastIndex((section) => section.getBoundingClientRect().top <= guide);
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function requestReadingPosition() {
    if (!frame) frame = requestAnimationFrame(updateReadingPosition);
  }

  window.addEventListener('scroll', requestReadingPosition, { passive: true });
  window.addEventListener('resize', requestReadingPosition);
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(requestReadingPosition).observe(document.querySelector('main'));
  }
  updateReadingPosition();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-lab-jump]');
    if (!link || !plainActivation(event)) return;
    document.querySelector(`[data-lab="${link.dataset.labJump}"]`).click();
  });
}

const courseNavigation = document.querySelector('.intro-courses');

if (courseNavigation) {
  courseNavigation.addEventListener('click', (event) => {
    const link = event.target.closest('[data-intro-course]');
    if (!link || !plainActivation(event)) return;
    event.preventDefault();
    showCourseProgram(link.dataset.introCourse);
  });
}
;
