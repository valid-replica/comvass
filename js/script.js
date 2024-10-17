const dialog = document.querySelector("#dataModal");
const cards = document.querySelectorAll(".show-modal");
const cancelButton = dialog.querySelector("#cancelBtn");
const confirmButton = dialog.querySelector("#confirmBtn");
const clearButton = document.querySelector("#clearBtn");
const totalPrice = document.querySelector(".total-price");
const modalName = document.querySelector(".modal-name");
const modalPrice = document.querySelector(".modal-price");
const info = document.querySelector(".info-card");

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
});

let whichPart;
let total = 0;

const updateTotal = (price) => {
  total += price;
  console.log(price);
  console.log(total);
  info.innerHTML = `
                  <h2 class="computer-name">My Computer</h2>
                <div class="total-info">
                  <p class="total-price">₱ ${total.toLocaleString()}</p>
                  <p style="color: #475569;">Total</p>
                </div>
                `;
};

const checkLocal = () => {
  if ("cpu" in localStorage) {
    let cpuLocal = JSON.parse(localStorage.getItem("cpu"));
    cards[0].removeAttribute("class");
    cards[0].classList.add("v-card", "cpu-card");
    cards[0].innerHTML = `
            <img class="cpu-img" src="images/cpu.png" alt="An image of a CPU">
            <div class="card-info">
                <p class="part-title">${cpuLocal.name}</p>
                <p class="part-price">₱${cpuLocal.price.toLocaleString()}</p>
                <p class="part-tag">CPU</p>
            </div>
    `;
    updateTotal(cpuLocal.price);
  }

  if ("motherboard" in localStorage) {
    let motherboardLocal = JSON.parse(localStorage.getItem("motherboard"));
    cards[1].removeAttribute("class");
    cards[1].classList.add("h-card", "motherboard-card");
    cards[1].innerHTML = `
            <div class="card-info">
                <p class="part-title">${motherboardLocal.name}</p>
                <p class="part-price">₱${motherboardLocal.price.toLocaleString()}</p>
                <p class="part-tag">Motherboard</p>
            </div>
            <img class="motherboard-img" src="images/motherboard.png" alt="An image of a motherboard">
    `;
    updateTotal(motherboardLocal.price);
  }

  if ("memory" in localStorage) {
    let memoryLocal = JSON.parse(localStorage.getItem("memory"));
    cards[2].removeAttribute("class");
    cards[2].classList.add("card", "memory-card");
    cards[2].innerHTML = `
            <div class="card-info">
                <p class="part-title">${memoryLocal.name}</p>
                <p class="part-price">₱${memoryLocal.price.toLocaleString()}</p>
                <p class="part-tag">Memory</p>
            </div>
    `;
    updateTotal(memoryLocal.price);
  }
};

const printCard = (partName, partPrice, card) => {
  if (card.classList.contains("cpu-card")) {
    card.removeAttribute("class");
    card.classList.add("v-card", "cpu-card");
    card.innerHTML = `
            <img class="cpu-img" src="images/cpu.png" alt="An image of a CPU">
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">CPU</p>
            </div>
    `;
    // cpuLocal = JSON.parse(localStorage.getItem("cpu"));
    updateTotal(parseInt(partPrice));
    let cpuPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("cpu", JSON.stringify(cpuPart));
  } else if (card.classList.contains("motherboard-card")) {
    card.removeAttribute("class");
    card.classList.add("h-card", "motherboard-card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Motherboard</p>
            </div>
            <img class="motherboard-img" src="images/motherboard.png" alt="An image of a motherboard">
    `;
    updateTotal(parseInt(partPrice));

    let motherboardPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("motherboard", JSON.stringify(motherboardPart));
  } else if (card.classList.contains("memory-card")) {
    card.removeAttribute("class");
    card.classList.add("card", "memory-card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Memory</p>
            </div>
    `;
    updateTotal(parseInt(partPrice));

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
    console.log(whichPart);
    console.log(whichPart.classList.contains("cpu-card"));
  });
});

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  printCard(modalName.value, parseInt(modalPrice.value), whichPart);
  dialog.close();
});

checkLocal();
