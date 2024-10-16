const dialog = document.querySelector("#dataModal");
const cards = document.querySelectorAll(".show-modal");
const cancelButton = document.querySelector("#cancelBtn");
const confirmButton = dialog.querySelector("#confirmBtn");
const clearButton = document.querySelector("#clearBtn");
const totalPrice = document.querySelector(".total-price");

const modalName = document.querySelector(".modal-name");
const modalPrice = document.querySelector(".modal-price");

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
});

let whichPart;

const checkLocal = () => {
  if ("cpu" in localStorage) {
    cpuLocal = JSON.parse(localStorage.getItem("cpu"));
    cards[0].removeAttribute("class");
    cards[0].classList.add("v-card");
    cards[0].innerHTML = `
            <img class="cpu-img" src="images/cpu.png" alt="An image of a CPU">
            <div class="card-info">
                <p class="part-title">${cpuLocal.name}</p>
                <p class="part-price">₱${cpuLocal.price.toLocaleString()}</p>
                <p class="part-tag">CPU</p>
            </div>
    `;
  }

  if ("motherboard" in localStorage) {
    motherboardLocal = JSON.parse(localStorage.getItem("motherboard"));
    cards[1].removeAttribute("class");
    cards[1].classList.add("h-card");
    cards[1].innerHTML = `
            <div class="card-info">
                <p class="part-title">${motherboardLocal.name}</p>
                <p class="part-price">₱${motherboardLocal.price.toLocaleString()}</p>
                <p class="part-tag">Motherboard</p>
            </div>
            <img class="motherboard-img" src="images/motherboard.png" alt="An image of a motherboard">
    `;
  }

  if ("memory" in localStorage) {
    memoryLocal = JSON.parse(localStorage.getItem("memory"));
    cards[2].removeAttribute("class");
    cards[2].classList.add("card");
    cards[2].innerHTML = `
            <div class="card-info">
                <p class="part-title">${memoryLocal.name}</p>
                <p class="part-price">₱${memoryLocal.price.toLocaleString()}</p>
                <p class="part-tag">Memory</p>
            </div>
    `;
  }

  cpuLocal = JSON.parse(localStorage.getItem("cpu"));
  motherboardLocal = JSON.parse(localStorage.getItem("motherboard"));
  memoryLocal = JSON.parse(localStorage.getItem("memory"));
  // storageLocal = JSON.parse(localStorage.getItem("storage"));
  // gpuLocal = JSON.parse(localStorage.getItem("gpu"));
  // caseLocal = JSON.parse(localStorage.getItem("case"));
  // powerSupplyLocal = JSON.parse(localStorage.getItem("powerSupply"));
};

// const updatePage = () => {};
let total = 0;

const updateTotal = () => {};

const printCard = (partName, partPrice, card) => {
  if (card.textContent === "+ Add A CPU") {
    card.removeAttribute("class");
    card.classList.add("v-card");
    card.innerHTML = `
            <img class="cpu-img" src="images/cpu.png" alt="An image of a CPU">
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">CPU</p>
            </div>
    `;
    let cpuPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("cpu", JSON.stringify(cpuPart));
  } else if (card.textContent === "+ Add A Motherboard") {
    card.removeAttribute("class");
    card.classList.add("h-card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Motherboard</p>
            </div>
            <img class="motherboard-img" src="images/motherboard.png" alt="An image of a motherboard">
    `;
    let motherboardPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("motherboard", JSON.stringify(motherboardPart));
  } else if (card.textContent === "+ Add Memory") {
    card.removeAttribute("class");
    card.classList.add("card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Memory</p>
            </div>
    `;
    let memoryPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("memory", JSON.stringify(memoryPart));
  }
};

// "Add card" opens the dialog modally
cards.forEach((card) => {
  card.addEventListener("click", () => {
    dialog.showModal();
    whichPart = card;
  });
});

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  printCard(modalName.value, parseInt(modalPrice.value), whichPart);
  dialog.close();
});

checkLocal();
