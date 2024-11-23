let points = [];
let currentCategoryPoints = [];
let currentIndex = 0;

async function loadData() {
  const response = await fetch("./cultural_points.json");
  const data = await response.json();
  return data.culturalPoints;
}

document.getElementById("start-button").onclick = async function () {
  document.getElementById("welcome-menu").style.display = "none";
  document.getElementById("category-menu").style.display = "block";
  points = await loadData();
};

const categoryButtons = document.querySelectorAll(".category-button");
categoryButtons.forEach((button) => {
  button.onclick = function () {
    const category = this.getAttribute("data-category");

    // Фильтрация по категориям
    currentCategoryPoints = points.filter(
      (point) => point.category === category
    );
    currentIndex = 0;

    if (currentCategoryPoints.length === 0) {
      alert("Нет точек в этой категории.");
      return;
    }

    updatePointsList(currentCategoryPoints);

    document.getElementById("category-menu").style.display = "none";
    document.getElementById("result").style.display = "block";
  };
});

// Кнопки
document.getElementById("prev-button").onclick = function () {
  currentIndex =
    (currentIndex - 1 + currentCategoryPoints.length) %
    currentCategoryPoints.length;
  updatePointsList(currentCategoryPoints);
};

document.getElementById("next-button").onclick = function () {
  currentIndex = (currentIndex + 1) % currentCategoryPoints.length;
  updatePointsList(currentCategoryPoints);
};

// Кнопка Рандом
document.getElementById("random-button").onclick = function () {
  // Генерация случайного индекса для текущей категории
  currentIndex = Math.floor(Math.random() * currentCategoryPoints.length);

  // Обновляем отображение точки
  updatePointsList(currentCategoryPoints);
};

// Возвращение обратно. Результаты скрываются и появляется меню выбора.
document.getElementById("back-button").onclick = function () {
  document.getElementById("result").style.display = "none";
  document.getElementById("category-menu").style.display = "block";
};

function updatePointsList(points) {
  const pointsList = document.getElementById("points-list");
  pointsList.innerHTML = ""; // Список очищается

  // Добавление текущей точки с картинкой
  const currentPoint = points[currentIndex];
  const listItem = document.createElement("li");
  listItem.textContent = `${currentPoint.name} - ${currentPoint.description}. Место расположено по адресу: ${currentPoint.address}`;
  pointsList.appendChild(listItem);

  const img = document.createElement("img");
  img.src = currentPoint.picture;
  img.alt = currentPoint.name;
  img.style.width = "300px";
  pointsList.appendChild(img);
}
