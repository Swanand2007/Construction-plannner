// ------- Helpers -------
function lsNumber(key, fallback = 0) {
  const v = parseFloat(localStorage.getItem(key) || "NaN");
  return isNaN(v) ? fallback : v;
}
function lsFlag(key) {
  return localStorage.getItem(key) === "1";
}

// ------- Step 1: plot form -------
const plotForm = document.getElementById("plotForm");
if (plotForm) {
  plotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const length = parseFloat(document.getElementById("length").value || "0");
    const width = parseFloat(document.getElementById("width").value || "0");
    const direction = document.getElementById("direction").value;
    const region = document.getElementById("region").value;
    const budget = parseFloat(document.getElementById("budget").value || "0");

    const area = length * width;

    localStorage.setItem("length", length);
    localStorage.setItem("width", width);
    localStorage.setItem("direction", direction);
    localStorage.setItem("region", region);
    localStorage.setItem("budget", budget);
    localStorage.setItem("area", area);

    window.location.href = "lifestyle.html";
  });
}

// ------- Step 2: lifestyle form -------
const lifestyleForm = document.getElementById("lifestyleForm");
if (lifestyleForm) {
  lifestyleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const hostGuests = document.getElementById("hostGuests").checked;
    const workFromHome = document.getElementById("workFromHome").checked;
    const kids = document.getElementById("kids").checked;
    const elderly = document.getElementById("elderly").checked;
    const expansion =
      (document.querySelector('input[name="expansion"]:checked') || {}).value ||
      "none";

    localStorage.setItem("hostGuests", hostGuests ? "1" : "0");
    localStorage.setItem("workFromHome", workFromHome ? "1" : "0");
    localStorage.setItem("kids", kids ? "1" : "0");
    localStorage.setItem("elderly", elderly ? "1" : "0");
    localStorage.setItem("expansion", expansion);

    const genBtn = document.getElementById("genBtn");
    if (genBtn) {
      genBtn.disabled = true;
      genBtn.textContent = "Calculating your plan...";
    }

    setTimeout(() => {
      window.location.href = "results-top.html";
    }, 600);
  });
}

// ------- Step 3: overview page -------
if (window.location.pathname.endsWith("results-top.html")) {
  const area = lsNumber("area");
  const budget = lsNumber("budget");
  const region = localStorage.getItem("region") || "";
  const direction = localStorage.getItem("direction") || "";

  const areaEl = document.getElementById("areaResult");
  if (areaEl) areaEl.textContent = `${Math.round(area)} sq.ft`;

  const houseTypeEl = document.getElementById("houseTypeResult");
  const archEl = document.getElementById("architectureResult");
  const intEl = document.getElementById("interiorResult");

  let houseType = "Compact 1BHK";
  if (area > 800 && area <= 1200) houseType = "Comfort 2BHK";
  else if (area > 1200 && area <= 2000)
    houseType = "Family 3BHK / Duplex‑ready";
  else if (area > 2000) houseType = "Large 3–4BHK / Villa‑style";

  let architectureNote = `Optimised for ${direction || "given"} facing with simple Vastu‑aware placement.`;
  let interiorLevel =
    "Balanced interior budget with focus on essentials and durability.";
  if (region === "Metro")
    interiorLevel = "Higher interior allowance for metro‑grade finishes.";
  else if (region === "Tier3")
    interiorLevel = "Value‑focused interior with smart material selection.";

  if (houseTypeEl) houseTypeEl.textContent = houseType;
  if (archEl) archEl.textContent = architectureNote;
  if (intEl) intEl.textContent = interiorLevel;

  // Costs
  const constRateEl = document.getElementById("constRate");
  const intRateEl = document.getElementById("intRate");
  const archRateEl = document.getElementById("archRate");
  const constTotalEl = document.getElementById("constTotal");
  const intTotalEl = document.getElementById("intTotal");
  const archTotalEl = document.getElementById("archTotal");
  const grandTotalEl = document.getElementById("grandTotal");
  const budgetNoteEl = document.getElementById("budgetNote");

  let baseConst = 1500,
    baseInt = 600,
    baseArch = 80;
  if (region === "Metro") {
    baseConst = 2200;
    baseInt = 900;
    baseArch = 120;
  } else if (region === "Tier2") {
    baseConst = 1800;
    baseInt = 700;
    baseArch = 100;
  }

  const constTotal = area * baseConst;
  const intTotal = area * baseInt;
  const archTotal = area * baseArch;
  const grandTotal = constTotal + intTotal + archTotal;

  const rupee = (x) =>
    "₹" + x.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  if (constRateEl) constRateEl.textContent = rupee(baseConst);
  if (intRateEl) intRateEl.textContent = rupee(baseInt);
  if (archRateEl) archRateEl.textContent = rupee(baseArch);
  if (constTotalEl) constTotalEl.textContent = rupee(constTotal);
  if (intTotalEl) intTotalEl.textContent = rupee(intTotal);
  if (archTotalEl) archTotalEl.textContent = rupee(archTotal);
  if (grandTotalEl) grandTotalEl.textContent = rupee(grandTotal);

  if (budgetNoteEl && budget > 0) {
    const diff = grandTotal - budget;
    const pct = Math.round((diff / budget) * 100);
    if (Math.abs(pct) <= 10) {
      budgetNoteEl.textContent =
        "Good news: this estimate is roughly within " +
        Math.abs(pct) +
        "% of your target budget.";
    } else if (diff > 0) {
      budgetNoteEl.textContent =
        "Warning: this estimate is about " +
        Math.abs(pct) +
        "% above your target budget. Consider reducing built‑up area or interior level.";
    } else {
      budgetNoteEl.textContent =
        "Your budget is roughly " +
        Math.abs(pct) +
        "% above this estimate. You may upgrade materials or interior finish.";
    }
  }

  // Preview details
  const roomsEl = document.getElementById("roomsCount");
  const entrancesEl = document.getElementById("entrances");
  const windowsEl = document.getElementById("windows");
  const parkingEl = document.getElementById("parking");
  const previewTitle = document.getElementById("previewTitle");
  const previewDesc = document.getElementById("previewDesc");

  if (roomsEl) {
    if (houseType.includes("1BHK"))
      roomsEl.textContent =
        "1 bedroom, living, compact kitchen and 1 common bathroom.";
    else if (houseType.includes("2BHK"))
      roomsEl.textContent =
        "2 bedrooms, living, kitchen with dining and around 2 bathrooms.";
    else
      roomsEl.textContent =
        "3–4 bedrooms with living, dining, kitchen and 3+ bathrooms.";
  }
  if (entrancesEl) {
    entrancesEl.textContent =
      (direction === "East" || direction === "North")
        ? "Main entry from a Vastu‑preferred side, with option for rear service door."
        : "Main entry balanced for light and privacy; consider porch/foyer screening.";
  }
  if (windowsEl) {
    windowsEl.textContent =
      "Plan cross‑ventilation with larger openings to North / East where possible.";
  }
  if (parkingEl) {
    parkingEl.textContent =
      area > 1200
        ? "Space for at least 1 car plus 2‑wheelers near the front setback."
        : "Compact bay for 2‑wheelers and possibly one small car.";
  }
  if (previewTitle) previewTitle.textContent = houseType;
  if (previewDesc)
    previewDesc.textContent =
      "Basic massing and circulation tuned to your plot, facing and city band. Final layout to be refined with your architect.";

  // BHK-based suggestion image + video
  const bhkImg = document.getElementById("bhkImage");
  const galleryTitle = document.getElementById("galleryTitle");
  const planningVideo = document.getElementById("planningVideo");

  if (houseType.includes("1BHK")) {
    if (bhkImg) {
      bhkImg.src = "layout-1bhk.jpg.jpeg";
      bhkImg.alt = "Sample compact 1BHK floor plan suggestion";
    }
    if (galleryTitle) {
      galleryTitle.textContent = "Compact 1BHK-style layout inspiration";
    }
    if (planningVideo) {
      planningVideo.src = "planning-1bhk.mp4";
    }
  } else if (houseType.includes("2BHK")) {
    if (bhkImg) {
      bhkImg.src = "layout-2bhk.jpg.jpeg";
      bhkImg.alt = "Sample 2BHK layout suggestion";
    }
    if (galleryTitle) {
      galleryTitle.textContent = "Comfort 2BHK-style layout inspiration";
    }
    if (planningVideo) {
      planningVideo.src = "planning-2bhk.mp4.mp4";
    }
  } else {
    if (bhkImg) {
      bhkImg.src = "layout-3bhk.jpg.jpeg";
      bhkImg.alt = "Sample 3BHK / larger layout suggestion";
    }
    if (galleryTitle) {
      galleryTitle.textContent = "Family 3BHK / duplex-style layout inspiration";
    }
    if (planningVideo) {
      planningVideo.src = "planning-3bhk.mp4.mp4";
    }
  }

  // tab switching
  const tabVideo = document.getElementById("tabVideo");
  const tabImage = document.getElementById("tabImage");
  const videoPane = document.getElementById("videoPane");
  const imagePane = document.getElementById("imagePane");

  function activateVideo() {
    if (!tabVideo || !tabImage || !videoPane || !imagePane) return;
    tabVideo.classList.add("active");
    tabImage.classList.remove("active");
    videoPane.style.display = "block";
    imagePane.style.display = "none";
  }
  function activateImage() {
    if (!tabVideo || !tabImage || !videoPane || !imagePane) return;
    tabImage.classList.add("active");
    tabVideo.classList.remove("active");
    videoPane.style.display = "none";
    imagePane.style.display = "block";
  }

  if (tabVideo) tabVideo.addEventListener("click", activateVideo);
  if (tabImage) tabImage.addEventListener("click", activateImage);

  const toBottom = document.getElementById("toBottomPage");
  const restartFromPlot = document.getElementById("restartFromPlot");
  if (toBottom)
    toBottom.addEventListener(
      "click",
      () => (window.location.href = "results-bottom.html")
    );
  if (restartFromPlot)
    restartFromPlot.addEventListener(
      "click",
      () => (window.location.href = "plot.html")
    );
}

// ------- Step 4: suggestions page -------
if (window.location.pathname.endsWith("results-bottom.html")) {
  const hostGuests = lsFlag("hostGuests");
  const workFromHome = lsFlag("workFromHome");
  const kids = lsFlag("kids");
  const elderly = lsFlag("elderly");
  const expansion = localStorage.getItem("expansion") || "none";
  const area = lsNumber("area");
  const region = localStorage.getItem("region") || "";

  const lifestyleText = document.getElementById("lifestyleSummaryText");
  const expansionText = document.getElementById("expansionText");
  const sustList = document.getElementById("sustainabilityList");
  const smartList = document.getElementById("smartHomeList");

  if (lifestyleText) {
    const lines = [];
    if (hostGuests)
      lines.push(
        "Plan a slightly larger living / dining with clear guest circulation and a common washroom near the living zone."
      );
    if (workFromHome)
      lines.push(
        "Reserve a quieter corner room or section for work‑from‑home with natural light and reliable power / data points."
      );
    if (kids)
      lines.push(
        "Keep kid bedroom close to the main family area, with good daylight and space for study plus storage."
      );
    if (elderly)
      lines.push(
        "Ensure at least one bedroom with attached toilet at ground floor, with minimal steps and grab‑friendly details."
      );
    if (!lines.length)
      lines.push(
        "Standard layout with balanced focus on living, bedrooms and storage."
      );
    lifestyleText.textContent = lines.join(" ");
  }

  if (expansionText) {
    if (expansion === "vertical") {
      expansionText.textContent =
        "Discuss column grid, foundation depth and staircase position so that an extra floor can be added later with minimum structural changes.";
    } else if (expansion === "horizontal") {
      expansionText.textContent =
        "Keep at least one setback or rear part relatively clear so rooms can be pushed outwards without disturbing key services.";
    } else {
      expansionText.textContent =
        "No strong expansion plan yet – prioritise good light, ventilation and storage in the first build.";
    }
  }

  if (sustList) {
    sustList.innerHTML = "";
    const items = [];
    items.push(
      "Use light‑coloured external paint and consider roof insulation to cut heat gain, especially in hot regions."
    );
    items.push(
      "Place openings to catch morning/evening breeze and limit large west‑facing glass."
    );
    if (area > 1200)
      items.push(
        "Reserve terrace space and conduits for a small solar PV system, even if you install it later."
      );
    if (region === "Metro")
      items.push(
        "Plan simple rainwater harvesting and basic grey‑water reuse where local rules allow."
      );
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      sustList.appendChild(li);
    });
  }

  if (smartList) {
    smartList.innerHTML = "";
    const items = [
      "Provide neutral conduits from each room to a small network hub for future smart switches / CCTV.",
      "Add enough sockets near beds, study tables and TV units so you do not depend on extension boards.",
      "Keep Wi‑Fi router location central and in open space for better coverage."
    ];
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      smartList.appendChild(li);
    });
  }

  const backToTop = document.getElementById("backToTopPage");
  const restartAll = document.getElementById("restartAll");
  if (backToTop)
    backToTop.addEventListener(
      "click",
      () => (window.location.href = "results-top.html")
    );
  if (restartAll)
    restartAll.addEventListener(
      "click",
      () => (window.location.href = "plot.html")
    );

  const copyBtn = document.getElementById("copySummaryBtn");
  const waLink = document.getElementById("waShare");
  const copyStatus = document.getElementById("copyStatus");

  function buildSummary() {
    const area = lsNumber("area");
    const budget = lsNumber("budget");
    const region = localStorage.getItem("region") || "";
    const direction = localStorage.getItem("direction") || "";

    let text = "";
    text += `Plot: ${Math.round(
      area
    )} sq.ft, facing ${direction || "N/A"}, region: ${region || "N/A"}\n`;
    if (budget)
      text += `Budget: ₹${budget.toLocaleString("en-IN")}\n\n`;
    text += "Lifestyle notes:\n" + (lifestyleText?.textContent || "") + "\n\n";
    text +=
      "Future expansion:\n" + (expansionText?.textContent || "") + "\n\n";
    text +=
      "Use this as a starting brief – your architect will refine it as per site conditions.";
    return text;
  }

  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(buildSummary());
        if (copyStatus) {
          copyStatus.textContent = "Summary copied!";
          setTimeout(() => (copyStatus.textContent = ""), 2000);
        }
      } catch (err) {
        if (copyStatus)
          copyStatus.textContent =
            "Copy failed. Please select the text manually.";
      }
    });
  }

  if (waLink) {
    const txt = encodeURIComponent(buildSummary());
    waLink.href = `https://wa.me/?text=${txt}`;
  }
}

// ------- 3D preview modal helpers -------
function open3DPreview() {
  const m = document.getElementById("modelModal");
  if (m) m.classList.add("show");
}
function close3DPreview() {
  const m = document.getElementById("modelModal");
  if (m) m.classList.remove("show");
}
