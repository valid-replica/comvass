const dialog = document.querySelector("#dataModal");
const partForm = document.querySelector("#addForm");
const cards = document.querySelectorAll(".show-modal");
const cancelButton = dialog.querySelector("#cancelBtn");
const confirmButton = dialog.querySelector("#confirmBtn");
const clearButton = document.querySelector("#clearBtn");
const totalPrice = document.querySelector(".total-price");
const modalName = document.querySelector(".modal-name");
const modalPrice = document.querySelector(".modal-price");
const info = document.querySelector(".info-card");

let whichPart;
let total = 0;

const updateTotal = (price, oldPrice = 0) => {
  total += price;
  total -= oldPrice;
  console.log("Price: " + price);
  console.log("Old price: " + oldPrice);
  console.log("Total: " + total);

  if (total === 0) {
    info.innerHTML = `
            <h2 class="computer-name">My Computer</h2>
            <div class="total-info">
              <p class="total-price">Part list is empty</p>
              <p style="color: #475569;">Add something</p>
            </div>
  `;
  } else {
    info.innerHTML = `
            <h2 class="computer-name">My Computer</h2>
            <div class="total-info">
              <p class="total-price">₱ ${total.toLocaleString()}</p>
              <p style="color: #475569;">Total</p>
            </div>
  `;
  }
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

  if ("storage" in localStorage) {
    let storageLocal = JSON.parse(localStorage.getItem("storage"));
    cards[3].removeAttribute("class");
    cards[3].classList.add("v-card", "storage-card");
    cards[3].innerHTML = `
            <img class="ssd-img" src="images/ssd.png" alt="An image of an SSD">
            <div class="card-info">
                <p class="part-title">${storageLocal.name}</p>
                <p class="part-price">₱${storageLocal.price.toLocaleString()}</p>
                <p class="part-tag">Storage</p>
            </div>
    `;
    updateTotal(storageLocal.price);
  }

  if ("gpu" in localStorage) {
    let gpuLocal = JSON.parse(localStorage.getItem("gpu"));
    cards[4].removeAttribute("class");
    cards[4].classList.add("v-card", "gpu-card");
    cards[4].innerHTML = `
            <div class="card-info">
                <p class="part-title">${gpuLocal.name}</p>
                <p class="part-price">₱${gpuLocal.price.toLocaleString()}</p>
                <p class="part-tag">Gpu</p>
            </div>
            <img class="gpu-img" src="images/gpu.png" alt="An image of a GPU">
    `;
    updateTotal(gpuLocal.price);
  }

  if ("case" in localStorage) {
    let caseLocal = JSON.parse(localStorage.getItem("case"));
    cards[5].removeAttribute("class");
    cards[5].classList.add("card", "case-card");
    cards[5].innerHTML = `
            <div class="card-info">
                <p class="part-title">${caseLocal.name}</p>
                <p class="part-price">₱${caseLocal.price.toLocaleString()}</p>
                <p class="part-tag">Case</p>
            </div>
    `;
    updateTotal(caseLocal.price);
  }

  if ("powerSupply" in localStorage) {
    let powerSupplyLocal = JSON.parse(localStorage.getItem("powerSupply"));
    cards[6].removeAttribute("class");
    cards[6].classList.add("h-card", "power-supply-card");
    cards[6].innerHTML = `
            <div class="card-info">
                <p class="part-title">${powerSupplyLocal.name}</p>
                <p class="part-price">₱${powerSupplyLocal.price.toLocaleString()}</p>
                <p class="part-tag">Power Supply</p>
            </div>
            <img class="psu-img" src="images/psu.png" alt="An image of a power supply">
    `;
    updateTotal(powerSupplyLocal.price);
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
    cpuOld = JSON.parse(localStorage.getItem("cpu"));

    cpuOld
      ? updateTotal(parseInt(partPrice), cpuOld.price)
      : updateTotal(parseInt(partPrice));

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
    motherboardOld = JSON.parse(localStorage.getItem("motherboard"));

    motherboardOld
      ? updateTotal(parseInt(partPrice), motherboardOld.price)
      : updateTotal(parseInt(partPrice));

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
    memoryOld = JSON.parse(localStorage.getItem("memory"));

    memoryOld
      ? updateTotal(parseInt(partPrice), memoryOld.price)
      : updateTotal(parseInt(partPrice));

    let memoryPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("memory", JSON.stringify(memoryPart));
  } else if (card.classList.contains("storage-card")) {
    card.removeAttribute("class");
    card.classList.add("v-card", "storage-card");
    card.innerHTML = `
            <img class="ssd-img" src="images/ssd.png" alt="An image of an SSD">
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Storage</p>
            </div>
    `;
    storageOld = JSON.parse(localStorage.getItem("storage"));

    storageOld
      ? updateTotal(parseInt(partPrice), storageOld.price)
      : updateTotal(parseInt(partPrice));

    let storagePart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("storage", JSON.stringify(storagePart));
  } else if (card.classList.contains("gpu-card")) {
    card.removeAttribute("class");
    card.classList.add("v-card", "gpu-card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">GPU</p>
            </div>
            <img class="gpu-img" src="images/gpu.png" alt="An image of a GPU">
    `;
    gpuOld = JSON.parse(localStorage.getItem("gpu"));

    gpuOld
      ? updateTotal(parseInt(partPrice), gpuOld.price)
      : updateTotal(parseInt(partPrice));

    let gpuPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("gpu", JSON.stringify(gpuPart));
  } else if (card.classList.contains("case-card")) {
    card.removeAttribute("class");
    card.classList.add("card", "case-card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Case</p>
            </div>
    `;
    caseOld = JSON.parse(localStorage.getItem("case"));

    caseOld
      ? updateTotal(parseInt(partPrice), caseOld.price)
      : updateTotal(parseInt(partPrice));

    let casePart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("case", JSON.stringify(casePart));
  } else if (card.classList.contains("power-supply-card")) {
    card.removeAttribute("class");
    card.classList.add("h-card", "power-supply-card");
    card.innerHTML = `
            <div class="card-info">
                <p class="part-title">${partName}</p>
                <p class="part-price">₱${partPrice.toLocaleString()}</p>
                <p class="part-tag">Power Supply</p>
            </div>
            <img class="psu-img" src="images/psu.png" alt="An image of a power supply">
    `;
    powerSupplyOld = JSON.parse(localStorage.getItem("powerSupply"));

    powerSupplyOld
      ? updateTotal(parseInt(partPrice), powerSupplyOld.price)
      : updateTotal(parseInt(partPrice));

    let powerSupplyPart = {
      name: partName,
      price: parseInt(partPrice),
    };
    localStorage.setItem("powerSupply", JSON.stringify(powerSupplyPart));
  }
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    dialog.showModal();
    whichPart = card;
  });
});

partForm.addEventListener("submit", (event) => {
  event.preventDefault();
  printCard(modalName.value, parseInt(modalPrice.value), whichPart);
  partForm.reset();
  dialog.close();
  console.log("Form submitted");
});

cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
  total = 0;
  updateTotal(0);
  const partList = [
    "A CPU",
    "A Motherboard",
    "Memory",
    "Storage",
    "A GPU",
    "A Case",
    "A Power Supply",
  ];
  const partListStyle = [
    "cpu-card",
    "motherboard-card",
    "memory-card",
    "storage-card",
    "gpu-card",
    "case-card",
    "power-supply-card",
  ];
  cards.forEach((card, index) => {
    card.innerHTML = `+ Add ${partList[index]}`;
    card.removeAttribute("class");
    card.classList.add("add-card", "show-modal", partListStyle[index]);
  });
});

checkLocal();
