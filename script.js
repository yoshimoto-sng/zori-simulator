const hanaoItems = [
  {
    id: "hanao_01",
    name: "鼻緒 01",
    image: "./images/hanao/hanao_01.png",
    category: ["popular", "cute"],
    categoryLabel: ["人気", "かわいい"]
  },
  {
    id: "hanao_02",
    name: "鼻緒 02",
    image: "./images/hanao/hanao_02.png",
    category: ["gorgeous", "popular"],
    categoryLabel: ["華やか", "人気"]
  },
  {
    id: "hanao_03",
    name: "鼻緒 03",
    image: "./images/hanao/hanao_03.png",
    category: ["elegant", "calm"],
    categoryLabel: ["上品", "落ち着き"]
  },
  {
    id: "hanao_04",
    name: "鼻緒 04",
    image: "./images/hanao/hanao_04.png",
    category: ["cute", "gorgeous"],
    categoryLabel: ["かわいい", "華やか"]
  },
  {
    id: "hanao_05",
    name: "鼻緒 05",
    image: "./images/hanao/hanao_05.png",
    category: ["simple", "calm"],
    categoryLabel: ["シンプル", "落ち着き"]
  }
];

const daiItems = [
  {
    id: "dai_01",
    name: "台 01",
    image: "./images/dai/dai_01.png"
  }
];

const sizeItems = [
  { id: "S", name: "S" },
  { id: "M", name: "M" },
  { id: "L", name: "L" }
];

const combinationUrls = {
  "hanao_01_dai_01_S": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64941a",
  "hanao_01_dai_01_M": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64942a",
  "hanao_01_dai_01_L": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64943a",
  "hanao_02_dai_01_S": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64944a",
  "hanao_02_dai_01_M": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64945a",
  "hanao_02_dai_01_L": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64946a",
  "hanao_03_dai_01_S": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64947a",
  "hanao_03_dai_01_M": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64948a",
  "hanao_03_dai_01_L": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb64949a",
  "hanao_04_dai_01_S": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb649410a",
  "hanao_04_dai_01_M": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb649411a",
  "hanao_04_dai_01_L": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb649412a",
  "hanao_05_dai_01_S": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb649413a",
  "hanao_05_dai_01_M": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb649414a",
  "hanao_05_dai_01_L": "https://item.rakuten.co.jp/yamako-02/td35eb6494/?variantId=td35eb649415a"
};

const fallbackUrl = "https://www.rakuten.co.jp/";

let selectedHanao = hanaoItems[0].id;
let selectedDai = daiItems[0].id;
let selectedSize = sizeItems[0].id;
let currentFilter = "all";
let showAll = false;
const initialVisibleCount = 6;

function getFilteredHanaoItems() {
  if (currentFilter === "all") {
    return hanaoItems;
  }
  return hanaoItems.filter(item => item.category.includes(currentFilter));
}

function renderHanaoItems() {
  const grid = document.getElementById("hanao-grid");
  const moreButton = document.getElementById("more-button");
  const filteredItems = getFilteredHanaoItems();
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, initialVisibleCount);

  grid.innerHTML = "";

  visibleItems.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb-button";
    if (item.id === selectedHanao) {
      button.classList.add("selected");
    }

    const tagsHtml = item.categoryLabel
      .map(label => `<span class="thumb-tag">${label}</span>`)
      .join("");

    button.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <div class="thumb-tags">${tagsHtml}</div>
    `;

    button.addEventListener("click", function () {
      changeHanao(item.id);
    });

    grid.appendChild(button);
  });

  if (filteredItems.length > initialVisibleCount) {
    moreButton.style.display = "inline-block";
    moreButton.textContent = showAll ? "表示を減らす" : "もっと見る";
  } else {
    moreButton.style.display = "none";
  }
}

function renderDaiItems() {
  const grid = document.getElementById("dai-grid");
  grid.innerHTML = "";

  daiItems.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb-button";
    if (item.id === selectedDai) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
    `;

    button.addEventListener("click", function () {
      changeDai(item.id);
    });

    grid.appendChild(button);
  });
}

function renderSizeItems() {
  const grid = document.getElementById("size-grid");
  grid.innerHTML = "";

  sizeItems.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb-button";

    if (item.id === selectedSize) {
      button.classList.add("selected");
    }

    button.innerHTML = `<span>${item.name}</span>`;

    button.addEventListener("click", function () {
      changeSize(item.id);
    });

    grid.appendChild(button);
  });
}

function changeHanao(id) {
  const item = hanaoItems.find(hanao => hanao.id === id);
  if (!item) return;

  selectedHanao = item.id;
  document.getElementById("hanao").src = item.image;
  renderHanaoItems();
  updateSelection();
  updateBuyLink();
}

function changeDai(id) {
  const item = daiItems.find(dai => dai.id === id);
  if (!item) return;

  selectedDai = item.id;
  document.getElementById("dai").src = item.image;
  renderDaiItems();
  updateSelection();
  updateBuyLink();
}

function changeSize(id) {
  selectedSize = id;
  renderSizeItems();
  updateSelection();
  updateBuyLink();
}

function filterHanao(category, buttonEl) {
  currentFilter = category;
  showAll = false;

  document.querySelectorAll(".filter-button").forEach(button => {
    button.classList.remove("active");
  });

  buttonEl.classList.add("active");
  renderHanaoItems();
}

function showMoreHanao() {
  showAll = !showAll;
  renderHanaoItems();
}

function updateSelection() {
  const selectedHanaoItem = hanaoItems.find(item => item.id === selectedHanao);
  const selectedDaiItem = daiItems.find(item => item.id === selectedDai);

  document.getElementById("current-selection").innerText =
    "鼻緒：" + selectedHanaoItem.name +
    " / 台：" + selectedDaiItem.name +
    " / サイズ：" + selectedSize;
}

function updateBuyLink() {
  const key = `${selectedHanao}_${selectedDai}_${selectedSize}`;
  const buyLink = document.getElementById("buy-link");

  if (!buyLink) return;

  buyLink.href = combinationUrls[key] || fallbackUrl;
}

document.addEventListener("DOMContentLoaded", function () {
  renderHanaoItems();
  renderDaiItems();
  renderSizeItems();
  updateSelection();
  updateBuyLink();
});
