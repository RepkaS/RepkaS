// Инициализация параметров
let balance = +localStorage.getItem("balance") || 0;
let income = +localStorage.getItem("income") || 0;
let tapMult = +localStorage.getItem("tapMult") || 1;
let tapCount = +localStorage.getItem("tapCount") || 0;
let totalBalance = +localStorage.getItem("totalBalance") || balance;
let tapCost = +localStorage.getItem("tapCost") || 2;

// Отображение параметров
const displayBalance = document.getElementById("balance");
const displayIncome = document.getElementById("income");
const displayTapMult = document.getElementById("tapMult");
const displayTapCount = document.getElementById("tapCount");
const displayTotalBalance = document.getElementById("totalBalance");
displayBalance.innerHTML = balance;
displayIncome.innerHTML = income;
displayTapMult.innerHTML = tapMult;

// Класс  апгрейда
class Upgrade {
   constructor(cost, income, costId, lvlId, incomeId, btnId, lvl = 0) {
      this.cost = cost;
      this.income = income;
      this.lvl = lvl;
      this.costId = document.getElementById(costId);
      this.lvlId = document.getElementById(lvlId);
      this.incomeId = document.getElementById(incomeId);
      this.btnId = btnId;
      this.updateUI();
   }

   // Обновление отображения
   updateUI() {
      this.costId.textContent = formatNumber(this.cost);
      this.lvlId.textContent = this.lvl;
      this.incomeId.textContent = formatNumber(this.income);
   }

   // Обновление апгрейда
   upgrader(costMult, incomeMult) {
      if (balance >= this.cost) {
         balance -= this.cost;
         balance = parseFloat(balance.toFixed(2));
         document.getElementById("balance").innerHTML = balance;

         this.cost = Math.floor(this.cost * costMult);
         this.lvl++;
         income += this.income;
         income = parseFloat(income.toFixed(2));
         displayIncome.textContent = income;

         this.income = parseFloat((this.income * incomeMult).toFixed(2));
         this.updateUI();

         // Сохранение данных в localStorage
         localStorage.setItem("balance", balance);
         localStorage.setItem("income", income);
         this.saveToStorage();
      }
   }

   // Улучшение тапа
   tapUpgrader(costMult) {
      if (balance >= this.cost) {
         balance -= this.cost;
         balance = parseFloat(balance.toFixed(2));
         document.getElementById("balance").innerHTML = displayTapMult.innerHTML;

         this.cost = Math.floor(this.cost * costMult);
         this.lvl++;
         tapMult += tapCost;
         tapCost++;


         this.updateUI();
         this.incomeId.textContent = formatNumber(tapMult);
         // Сохранение данных в localStorage
         localStorage.setItem("balance", balance);
         localStorage.setItem("tapMult", tapMult);
         localStorage.setItem("tapCost", tapCost);
         this.saveToStorage();
         updateDisplay();
      }
   }
   // Сохранение объекта в localStorage
   saveToStorage() {
      const upgradeData = {
         cost: this.cost,
         income: this.income,
         lvl: this.lvl,
         btnId: this.btnId,
      };
      localStorage.setItem(this.btnId, JSON.stringify(upgradeData));
   }


   // Восстановление объекта из localStorage
   static loadFromStorage(cost, income, costId, lvlId, incomeId, btnId) {
      const storedData = JSON.parse(localStorage.getItem(btnId));
      if (storedData) {
         return new Upgrade(
             storedData.cost,
             storedData.income,
             costId,
             lvlId,
             incomeId,
             btnId,
             storedData.lvl
         );
      } else {
         return new Upgrade(cost, income, costId, lvlId, incomeId, btnId);
      }
   }
}
function paramsSaveToStorage() {
   localStorage.setItem("balance", balance);
   localStorage.setItem("tapMult", tapMult);
   localStorage.setItem("tapCount", tapCount);
   localStorage.setItem("totalBalance", totalBalance);
}

// Функция для форматирования чисел
function formatNumber(value) {
   if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + "m"; // Миллионы
   } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + "k"; // Тысячи
   }
   return value.toFixed(2); // По умолчанию (с двумя знаками после запятой)
}

// Обновление отображения баланса и дохода
function updateDisplay() {
   displayBalance.textContent = formatNumber(balance);
   displayIncome.textContent = formatNumber(income);
   displayTapMult.textContent = formatNumber(tapMult);
   displayTapCount.textContent = formatNumber(tapCount);
   displayTotalBalance.textContent = formatNumber(totalBalance);

}


// Установка начальных значений
displayTapCount.textContent = formatNumber(tapCount);
displayTotalBalance.textContent = formatNumber(totalBalance);


// Восстановление объектов или создание новых
let upgrade1 = Upgrade.loadFromStorage(10, 0.3, "upgrade1Cost", "upgrade1Level", "upgrade1Income", "upgrade1Btn");
let upgrade2 = Upgrade.loadFromStorage(100, 4, "upgrade2Cost", "upgrade2Level", "upgrade2Income", "upgrade2Btn");
let upgrade3 = Upgrade.loadFromStorage(1400, 16, "upgrade3Cost", "upgrade3Level", "upgrade3Income", "upgrade3Btn");
let otherUpgrade1 = Upgrade.loadFromStorage(100, 1, "otherUpgrade1Cost", "otherUpgrade1Level", "otherUpgrade1Income", "otherUpgrade1Btn");

// Переменная для управления звуком
let isSoundEnabled = JSON.parse(localStorage.getItem("isSoundEnabled")) ?? true;

// Иконка кнопки звука
const soundIcon = document.getElementById("soundIcon");

// Установка начальной иконки
soundIcon.className = isSoundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute";

// Обработчик для кнопки "Отключить/Включить звук"
document.getElementById("toggleSound").addEventListener("click", function () {
   isSoundEnabled = !isSoundEnabled; // Переключение состояния звука

   // Обновление иконки
   soundIcon.className = isSoundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute";

   // Сохранение состояния звука в localStorage
   localStorage.setItem("isSoundEnabled", JSON.stringify(isSoundEnabled));
});

// Тап на хомяка
document.getElementById("addBalance").addEventListener("click", function () {
   // Воспроизведение звука, если включено
   if (isSoundEnabled) {
      const clickSound = document.getElementById("clickSound");
      clickSound.currentTime = 0; // Сброс времени воспроизведения для быстрого повтора
      clickSound.play();
   }
   balance+= tapMult;
   displayBalance.textContent = balance;
   totalBalance += tapMult;
   tapCount++;

   // Сохранение данных в localStorage
   paramsSaveToStorage()

   // Обновление отображения
   updateDisplay();
});

// Создание улучшений
document.getElementById(upgrade1.btnId).onclick = function () {
   upgrade1.upgrader(1.3, 1.1);
   updateDisplay();
};
document.getElementById(upgrade2.btnId).onclick = function () {
   upgrade2.upgrader(1.3, 1.1);
   updateDisplay();
};
document.getElementById(upgrade3.btnId).onclick = function () {
   upgrade3.upgrader(1.25, 1.15);
   updateDisplay();
};
document.getElementById(otherUpgrade1.btnId).onclick = function () {
   otherUpgrade1.tapUpgrader(1.7);
   updateDisplay();
}

// Автоматический доход
setInterval(() => {
   balance += income;
   balance = parseFloat(balance.toFixed(2));
   displayBalance.textContent = balance;
   totalBalance+= income;
   paramsSaveToStorage()
   updateDisplay();
   otherUpgrade1.incomeId.textContent = formatNumber(tapMult);
}, 1000);


// Переключатель вкладок (tabs)
document.addEventListener("DOMContentLoaded", () => {
   const tabs = document.querySelectorAll('input[name="tab-btn"]');
   const contents = document.querySelectorAll('.tab-content');

   tabs.forEach((tab, index) => {
      tab.addEventListener("change", () => {
         contents.forEach((content, contentIndex) => {
            content.style.display = contentIndex === index ? "grid" : "none";
         });
      });
   });

   // Убедимся, что отображается содержимое первой вкладки по умолчанию
   if (tabs[0]) tabs[0].dispatchEvent(new Event("change"));
})

// Обработчик для сброса localStorage
document.getElementById("resetButton").addEventListener("click", () => {
   if (confirm("Вы уверены, что хотите сбросить все данные?")) {
      // Очистка localStorage
      localStorage.clear();

      // Сброс всех значений
      balance = 0;
      income = 0;
      tapMult = 1;
      tapCount = 0;
      totalBalance = 0;

      // Обновление интерфейса
      displayBalance.textContent = balance;
      displayIncome.textContent = income;
      displayTapMult.textContent = tapMult;

      // Сброс апгрейдов
      upgrade1 = new Upgrade(10, 0.3, "upgrade1Cost", "upgrade1Level", "upgrade1Income", "upgrade1Btn");
      upgrade2 = new Upgrade(100, 4, "upgrade2Cost", "upgrade2Level", "upgrade2Income", "upgrade2Btn");
      upgrade3 = new Upgrade(1400, 16, "upgrade3Cost", "upgrade3Level", "upgrade3Income", "upgrade3Btn");
      otherUpgrade1 = Upgrade.loadFromStorage(100, 1, "otherUpgrade1Cost", "otherUpgrade1Level", "otherUpgrade1Income", "otherUpgrade1Btn");



      // Обновляем интерфейс
      upgrade1.updateUI();
      upgrade2.updateUI();
      upgrade3.updateUI();
      otherUpgrade1.updateUI();

      alert("Данные успешно сброшены!");
   }
})
