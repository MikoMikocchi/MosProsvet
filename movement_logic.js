let points = [];
let currentIndex = 0;

// Функция для загрузки данных из JSON файла
async function loadData() {
  const response = await fetch("./cultural_points.json");
  const data = await response.json();
  return data.culturalPoints;
}

document.getElementById("start-button").onclick = async function () {
  document.getElementById("welcome-menu").style.display = "none";
  document.getElementById("category-menu").style.display = "block";
  points = await loadData(); // Загружаем данные при старте
};

const categoryButtons = document.querySelectorAll(".category-button");
categoryButtons.forEach((button) => {
  button.onclick = function () {
    const category = this.getAttribute("data-category");
    // Фильтруем точки по категории
    const filteredPoints = points.filter(
      (point) => point.category === category
    );
    currentIndex = 0;

    // Если нет точек в выбранной категории, выводим сообщение
    if (filteredPoints.length === 0) {
      alert("Нет точек в этой категории.");
      return;
    }

    updatePointsList(filteredPoints);

    document.getElementById("category-menu").style.display = "none";
    document.getElementById("result").style.display = "block";
  };
});

document.getElementById("prev-button").onclick = function () {
  currentIndex = (currentIndex - 1 + points.length) % points.length;
  updatePointsList(points);
};

document.getElementById("next-button").onclick = function () {
  currentIndex = (currentIndex + 1) % points.length;
  updatePointsList(points);
};

function updatePointsList(points) {
  const pointsList = document.getElementById("points-list");
  pointsList.innerHTML = ""; // Очистить список

  // Добавление текущей точки
  const currentPoint = points[currentIndex];
  const listItem = document.createElement("li");
  listItem.textContent = `${currentPoint.name} - ${currentPoint.description}`;
  pointsList.appendChild(listItem);

  // Можно добавить картинку
  const img = document.createElement("img");
  img.src = currentPoint.picture;
  img.alt = currentPoint.name;
  img.style.width = "300px";
  pointsList.appendChild(img);
}
