const WC_AIRPORT_RE = /(antalya\s*(airport|intl\.?|international\s*airport)|antalya\s*hava\s*alanı|antalya\s*havalimanı|antalya\s*havaalani|antalya\s*hava\s*limani|flughafen\s*antalya|aéroport\s+d'antalya|aeroport\s+d'antalya|аэропорт\s*анталья|مطار\s*أنطاليا|ayt)/i;
const WC_BELEK_RE = /(belek\b|belek\s*hotel\s*area|belek\s*antalya|Белек|بيلك|بيليك)/i;
const WC_KUNDU_RE = /(kundu\b|kundu\s*antalya|kundu\s*otel\b|kadriye\s*kundu)/i;
const WC_LARA_RE = /(lara\b|lara\s*beach|lara\s*antalya|lara\s*hotel)/i;
const WC_MURATPASA_RE = /(muratpasa|muratpaşa|murat pasha|city\s*center|antalya\s*center|antalya\s*city\s*centre)/i;
const WC_KONYAALTI_RE = /(konyaalti|konyaaltı|konya altı|konyaalti\s*antalya)/i;
const WC_BELDIBI_RE = /(beldibi|bel dibi|beldibi\s*kemer|beldibi\s*antalya)/i;
const WC_KEMER_RE = /(kemer\b|kemer\s*antalya)/i;
const WC_BOGAZKENT_RE = /(boğazkent|bogazkent|bogaz kent|boğaz kent)/i;
const WC_SIDE_RE = /(side\b|manavgat|side\s*antalya)/i;
const WC_ALANYA_RE = /(alanya\b|alanya\s*otelleri|alanya\s*antalya)/i;

const WC_PRICE_TABLE = [
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_BELEK_RE },
      { from: WC_BELEK_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 30,
      "Mercedes Vito": 35,
      "Mercedes Luxury Vito": 40,
      Sprinter: 50,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_KUNDU_RE },
      { from: WC_KUNDU_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 25,
      "Mercedes Vito": 30,
      "Mercedes Luxury Vito": 45,
      Sprinter: 50,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_LARA_RE },
      { from: WC_LARA_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 25,
      "Mercedes Vito": 30,
      "Mercedes Luxury Vito": 45,
      Sprinter: 50,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_MURATPASA_RE },
      { from: WC_MURATPASA_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 25,
      "Mercedes Vito": 30,
      "Mercedes Luxury Vito": 45,
      Sprinter: 50,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_KONYAALTI_RE },
      { from: WC_KONYAALTI_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 30,
      "Mercedes Vito": 35,
      "Mercedes Luxury Vito": 50,
      Sprinter: 55,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_BELDIBI_RE },
      { from: WC_BELDIBI_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 35,
      "Mercedes Vito": 40,
      "Mercedes Luxury Vito": 60,
      Sprinter: 70,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_KEMER_RE },
      { from: WC_KEMER_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 35,
      "Mercedes Vito": 40,
      "Mercedes Luxury Vito": 60,
      Sprinter: 70,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_BOGAZKENT_RE },
      { from: WC_BOGAZKENT_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 35,
      "Mercedes Vito": 40,
      "Mercedes Luxury Vito": 60,
      Sprinter: 70,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_SIDE_RE },
      { from: WC_SIDE_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 45,
      "Mercedes Vito": 50,
      "Mercedes Luxury Vito": 70,
      Sprinter: 80,
    },
  },
  {
    routes: [
      { from: WC_AIRPORT_RE, to: WC_ALANYA_RE },
      { from: WC_ALANYA_RE, to: WC_AIRPORT_RE },
    ],
    prices: {
      "Economic Sedan": 65,
      "Mercedes Vito": 70,
      "Mercedes Luxury Vito": 100,
      Sprinter: 120,
    },
  },
];

const wcExtrasState = { flower: false, city: false, baby: 0, snack: false, return: false };

function wcFindBasePrice(pickup, dropoff, vehicleTitle) {
  if (!pickup || !dropoff || !vehicleTitle) return null;
  for (const rule of WC_PRICE_TABLE) {
    for (const route of rule.routes) {
      if (route.from.test(pickup) && route.to.test(dropoff)) {
        const price = rule.prices[vehicleTitle];
        if (typeof price === "number") {
          return price;
        }
      }
    }
  }
  return null;
}

function wcCalcBabyPrice(count) {
  if (count <= 1) return 0;
  if (count === 2) return 10;
  return 20;
}

function wcCalcExtrasTotal() {
  let total = 0;
  if (wcExtrasState.flower) total += 25;
  if (wcExtrasState.snack) total += 25;
  total += wcCalcBabyPrice(wcExtrasState.baby);
  return total;
}

function wcCalcReturnPrice(pickup, dropoff, vehicleTitle) {
  const base = wcFindBasePrice(dropoff, pickup, vehicleTitle);
  if (!base) return 0;
  const discounted = base - 5;
  return discounted > 0 ? discounted : 0;
}

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById("vehicleTrigger");
  const list = document.getElementById("vehicleList");
  const hidden = document.getElementById("f-vehicle");
  const titleEl = document.getElementById("vehicleSelectedTitle");
  const descEl = document.getElementById("vehicleSelectedDesc");
  const extrasBox = document.getElementById("wc-extras");
  const returnSection = document.getElementById("wc-return-section");
  const transferBar = document.getElementById("wc-transfer-bar");
  const transferVal = document.getElementById("wc-transfer-bar-val");

  function wcUpdateSummary(transfer, extras, ret) {
    const card = document.getElementById("wc-price-card");
    if (!card) return;
    card.style.display = "flex";
    document.getElementById("wc-sum-transfer").textContent = "€" + transfer;
    document.getElementById("wc-sum-extras").textContent = "€" + extras;
    const returnLine = document.getElementById("wc-sum-return-line");
    if (ret && ret > 0) {
      returnLine.style.display = "flex";
      document.getElementById("wc-sum-return").textContent = "€" + ret;
    } else {
      returnLine.style.display = "none";
    }
    const total = transfer + extras + (ret || 0);
    document.getElementById("wc-sum-total").textContent = "€" + total;
  }

  function wcUpdateTransferBar(price) {
    if (price) {
      transferBar.classList.remove("is-hidden");
      transferVal.textContent = "€" + price;
    } else {
      transferBar.classList.add("is-hidden");
    }
  }

  function wcUpdateExtrasUI() {
    const extrasTotalEl = document.getElementById("wcExtrasTotalVal");
    if (extrasTotalEl) {
      extrasTotalEl.textContent = "€" + wcCalcExtrasTotal();
    }
  }

  function wcUpdateFinalTotalDisplay() {
    const pickup = document.getElementById("f-pickup").value || "";
    const dropoff = document.getElementById("f-dropoff").value || "";
    const vehicleRaw = document.getElementById("f-vehicle").value || "";
    const vehicleTitle = (vehicleRaw.split(" - ")[0] || vehicleRaw).trim();
    const basePrice = wcFindBasePrice(pickup, dropoff, vehicleTitle) || 0;
    const extrasTotal = wcCalcExtrasTotal();
    let returnPrice = 0;
    if (!returnSection.classList.contains("is-hidden")) {
      returnPrice = wcCalcReturnPrice(pickup, dropoff, vehicleTitle);
      document.getElementById("wcReturnTotalVal").textContent = "€" + returnPrice;
    }
    wcUpdateTransferBar(basePrice);
    wcUpdateSummary(basePrice, extrasTotal, returnPrice);
  }

  function filterVehicleListByPassengers() {
    if (!list) return;
    const pax = parseInt(document.getElementById("f-passengers").value || "1", 10);
    list.querySelectorAll(".wc-vehicle-item").forEach(function (item) {
      const cap = parseInt(item.getAttribute("data-capacity") || "16", 10);
      if (pax > 6) {
        item.style.display = cap >= pax ? "flex" : "none";
      } else if (pax > 3) {
        item.style.display = cap >= pax ? "flex" : "none";
      } else {
        item.style.display = "flex";
      }
    });
    const vehicleRaw = hidden.value || "";
    if (vehicleRaw) {
      const selectedTitle = (vehicleRaw.split(" - ")[0] || vehicleRaw).trim();
      const selectedItem = Array.from(list.querySelectorAll(".wc-vehicle-item")).find(
        (i) => i.getAttribute("data-title") === selectedTitle,
      );
      if (selectedItem) {
        const cap = parseInt(selectedItem.getAttribute("data-capacity") || "16", 10);
        if (cap < pax) {
          hidden.value = "";
          titleEl.textContent = "Select vehicle";
          descEl.textContent = "tap to choose";
          transferBar.classList.add("is-hidden");
          if (extrasBox) extrasBox.classList.add("is-hidden");
        }
      }
    }
  }

  function refreshVehicleListPrices() {
    if (!list) return;
    const pickup = document.getElementById("f-pickup").value || "";
    const dropoff = document.getElementById("f-dropoff").value || "";
    if (!pickup || !dropoff) return;
    list.querySelectorAll(".wc-vehicle-item").forEach(function (item) {
      if (item.style.display === "none") return;
      const vehicleName = item.getAttribute("data-title");
      const labelEl = item.querySelector(".wc-vehicle-text strong");
      if (!labelEl) return;
      const basePrice = wcFindBasePrice(pickup, dropoff, vehicleName);
      if (typeof basePrice === "number") {
        labelEl.textContent = `${vehicleName} (€${basePrice})`;
      } else {
        labelEl.textContent = vehicleName;
      }
    });
  }

  function syncReturnFields() {
    const pickup = document.getElementById("f-pickup").value || "";
    const dropoff = document.getElementById("f-dropoff").value || "";
    const pax = document.getElementById("f-passengers").value || "";
    const lug = document.getElementById("f-luggage").value || "";
    const vehicleRaw = document.getElementById("f-vehicle").value || "";
    const vehicleTitle = (vehicleRaw.split(" - ")[0] || vehicleRaw).trim();
    document.getElementById("f-return-pickup").value = dropoff;
    document.getElementById("f-return-dropoff").value = pickup;
    document.getElementById("f-return-passengers").value = pax;
    document.getElementById("f-return-luggage").value = lug;
    document.getElementById("f-return-vehicle").value = vehicleTitle;
  }

  function recalc() {
    if (!returnSection.classList.contains("is-hidden")) {
      syncReturnFields();
    }
    wcUpdateFinalTotalDisplay();
  }

  if (trigger && list) {
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      const isOpen = list.style.display === "block";
      if (!isOpen) {
        filterVehicleListByPassengers();
        refreshVehicleListPrices();
      }
      list.style.display = isOpen ? "none" : "block";
    });

    list.querySelectorAll(".wc-vehicle-item").forEach(function (item) {
      item.addEventListener("click", function () {
        if (this.style.display === "none") return;
        const title = this.getAttribute("data-title");
        const desc = this.getAttribute("data-desc");
        titleEl.textContent = title;
        descEl.textContent = desc;
        hidden.value = `${title} - ${desc}`;
        list.style.display = "none";
        if (extrasBox) extrasBox.classList.remove("is-hidden");
        recalc();
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest("#vehiclePicker")) {
        list.style.display = "none";
      }
    });
  }

  ["f-pickup", "f-dropoff"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("change", function () {
        recalc();
        refreshVehicleListPrices();
      });
  });

  const paxEl = document.getElementById("f-passengers");
  if (paxEl)
    paxEl.addEventListener("change", function () {
      filterVehicleListByPassengers();
      recalc();
    });

  const lugEl = document.getElementById("f-luggage");
  if (lugEl)
    lugEl.addEventListener("change", function () {
      if (!returnSection.classList.contains("is-hidden")) {
        document.getElementById("f-return-luggage").value = lugEl.value;
      }
    });

  const extras = document.getElementById("wc-extras");
  if (extras) {
    extras.addEventListener("click", function (event) {
      const infoBtn = event.target.closest(".wc-extra-info");
      const extraCard = event.target.closest(".wc-extra-card");
      if (extraCard) {
        const extra = extraCard.getAttribute("data-extra");
        if (extra === "return") {
          wcExtrasState.return = !wcExtrasState.return;
          extraCard.classList.toggle("active", wcExtrasState.return);
          if (wcExtrasState.return) {
            returnSection.classList.remove("is-hidden");
            syncReturnFields();
          } else {
            returnSection.classList.add("is-hidden");
          }
          wcUpdateFinalTotalDisplay();
          return;
        }
        if (extra !== "baby" && extra !== "snack") {
          wcExtrasState[extra] = !wcExtrasState[extra];
          extraCard.classList.toggle("active", wcExtrasState[extra]);
          wcUpdateExtrasUI();
          wcUpdateFinalTotalDisplay();
        }
      }

      const babyBtn = event.target.closest("[data-baby]");
      if (babyBtn) {
        const dir = babyBtn.getAttribute("data-baby");
        if (dir === "+") wcExtrasState.baby = Math.min(3, wcExtrasState.baby + 1);
        else wcExtrasState.baby = Math.max(0, wcExtrasState.baby - 1);
        document.getElementById("wcBabyCount").textContent = wcExtrasState.baby;
        const babyCard = extras.querySelector('.wc-extra-card[data-extra="baby"]');
        if (babyCard) babyCard.classList.toggle("active", wcExtrasState.baby > 0);
        wcUpdateExtrasUI();
        wcUpdateFinalTotalDisplay();
      }

      if (infoBtn && infoBtn.getAttribute("data-info") === "snack") {
        alert("Snack packs: soft drinks, cake, nuts. (€25)");
      }

      if (
        extraCard &&
        extraCard.getAttribute("data-extra") === "snack" &&
        !infoBtn
      ) {
        wcExtrasState.snack = !wcExtrasState.snack;
        extraCard.classList.toggle("active", wcExtrasState.snack);
        wcUpdateExtrasUI();
        wcUpdateFinalTotalDisplay();
      }
    });
  }

  const sendBtn = document.getElementById("wcSend");
  if (sendBtn)
    sendBtn.addEventListener("click", function () {
      const pickup = document.getElementById("f-pickup").value.trim();
      const dropoff = document.getElementById("f-dropoff").value.trim();
      const date = document.getElementById("f-date").value.trim();
      const pax = document.getElementById("f-passengers").value.trim();
      const lug = document.getElementById("f-luggage").value.trim();
      const vehicle = document.getElementById("f-vehicle").value.trim();
      const errors = [];
      if (!pickup) errors.push("Pickup required");
      if (!dropoff) errors.push("Drop-off required");
      if (!date) errors.push("Date required");
      if (!pax) errors.push("Passengers required");
      if (!lug) errors.push("Luggages required");
      if (!vehicle) errors.push("Vehicle required");
      if (wcExtrasState.return) {
        const returnDate = document.getElementById("f-return-date").value.trim();
        if (!returnDate) errors.push("Return date required");
      }
      if (errors.length) {
        alert(errors.join("\n"));
        return;
      }

      const vehicleTitle = vehicle.split(" - ")[0].trim();
      const basePrice = wcFindBasePrice(pickup, dropoff, vehicleTitle) || 0;
      const extrasTotal = wcCalcExtrasTotal();
      const messageParts = [
        "Antalya Transfer Request",
        `Vehicle: ${vehicle}`,
        `Pickup: ${pickup}`,
        `Drop-off: ${dropoff}`,
        `Date/Time: ${date}`,
        `Passengers: ${pax}`,
        `Luggages: ${lug}`,
      ];
      if (extrasTotal) messageParts.push(`Extras: €${extrasTotal}`);
      let total = basePrice + extrasTotal;
      if (wcExtrasState.return) {
        const returnPickup = document.getElementById("f-return-pickup").value;
        const returnDropoff = document.getElementById("f-return-dropoff").value;
        const returnDate = document.getElementById("f-return-date").value;
        const returnPrice = wcCalcReturnPrice(pickup, dropoff, vehicleTitle);
        messageParts.push("", "Return transfer:");
        messageParts.push(`Pickup: ${returnPickup}`);
        messageParts.push(`Drop-off: ${returnDropoff}`);
        messageParts.push(`Date/Time: ${returnDate}`);
        messageParts.push(`Passengers: ${pax}`);
        messageParts.push(`Luggages: ${lug}`);
        if (returnPrice) messageParts.push(`Return price: €${returnPrice}`);
        total += returnPrice;
      }
      if (total) messageParts.push(`Total: €${total}`);
      const message = encodeURIComponent(messageParts.join("\n"));
      window.open(`https://wa.me/905510868368?text=${message}`, "_blank");
    });

  const acOpts = { componentRestrictions: { country: "tr" } };
  const pickupInput = document.getElementById("f-pickup");
  const dropInput = document.getElementById("f-dropoff");
  if (pickupInput && window.google && google.maps && google.maps.places) {
    new google.maps.places.Autocomplete(pickupInput, acOpts);
  }
  if (dropInput && window.google && google.maps && google.maps.places) {
    new google.maps.places.Autocomplete(dropInput, acOpts);
  }
});
