document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loader        = document.getElementById("loader");
  const mainContent   = document.getElementById("main-content");
  const quoteEl       = document.getElementById("quote");
  const categoryEl    = document.getElementById("category");
  const newBtn        = document.getElementById("new-quote");
  const saveBtn       = document.getElementById("save-quote");
  const viewBtn       = document.getElementById("view-saved");
  const savedCont     = document.getElementById("saved-container");
  const savedList     = document.getElementById("saved-quotes");
  const searchInput   = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const submitBtn     = document.getElementById("submit-quote");
  const userInput     = document.getElementById("user-quote");

  // Curated HD backgrounds (20)
  const backgrounds = [
    "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764b0b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526481280690-3ca4850b8cf7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764b0b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549887534-330dde9f7113?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519068733956-8168c7971a1d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80"
  ];

  // Predefined quotes + categories
  const categories = {
    "Open Mind": [
      "Your only limit is your mind.",
      "Think bigger. Do bigger.",
      "Imagination is everything."
    ],
    "Action": [
      "Dream it. Wish it. Do it.",
      "Don’t stop until you’re proud.",
      "Push yourself, because no one else is going to do it for you."
    ],
    "Discipline": [
      "Great things never come from comfort zones.",
      "Sometimes later becomes never. Do it now.",
      "Success doesn’t just find you. You have to go out and get it."
    ]
  };

  // Keyword map for auto-categorization
  const keywordMap = {
    "Open Mind":    ["mind","think","imagine","limit","potential"],
    "Action":       ["do","act","push","now","start","stop"],
    "Discipline":   ["discipline","focus","routine","hard","commit"],
    "Success":      ["success","achieve","goal","win","reward"],
    "Vision":       ["dream","vision","future","plan","see"],
    "Persistence":  ["persist","never","keep","continue","tire"]
  };

  // Load user-submitted & saved arrays
  const userQuotes = JSON.parse(localStorage.getItem("userQuotes")  || "[]");
  const getSaved   = () => JSON.parse(localStorage.getItem("savedQuotes") || "[]");

  let currentQuote = "";

  const rand = arr => arr[Math.floor(Math.random() * arr.length)];

  // Build full pool
  function allQuotes() {
    const auto = Object.entries(categories)
      .flatMap(([cat, qs]) => qs.map(q => ({ text:q, cat })));
    const users = userQuotes.map(q => ({
      text: q,
      cat: Object.keys(keywordMap).reduce((best,cat)=> {
        const score = keywordMap[cat].reduce((sum,k)=>
          sum + (q.toLowerCase().includes(k)?1:0),0);
        return score > (keywordMap[best]?.reduce((sum,k)=>
          sum + (q.toLowerCase().includes(k)?1:0),0)||0) ? cat : best;
      }, "Open Mind")
    }));
    return auto.concat(users);
  }

  function showRandQuote() {
    const { text, cat } = rand(allQuotes());
    currentQuote        = text;
    quoteEl.textContent = text;
    categoryEl.textContent = cat;
  }

  function setBackground() {
    const url = rand(backgrounds) + `&sig=${Date.now()}`;
    const img = new Image();
    img.onload = () => {
      document.body.style.backgroundImage = `url('${url}')`;
    };
    img.src = url;
  }

  function showLoader() {
    loader.style.display = "flex";
    mainContent.style.display = "none";
  }
  function hideLoader() {
    loader.style.display = "none";
    mainContent.style.display = "block";
  }

  function renderSaved() {
    savedList.innerHTML = "";
    getSaved().forEach((q,i) => {
      const li = document.createElement("li"); li.textContent = q;
      const del = document.createElement("button"); del.textContent = "🗑️";
      del.className = "delete-btn"; del.onclick = () => {
        const arr = getSaved(); arr.splice(i,1);
        localStorage.setItem("savedQuotes", JSON.stringify(arr));
        renderSaved();
      };
      li.appendChild(del); savedList.appendChild(li);
    });
    document.getElementById("saved-container").style.display =
      getSaved().length ? "block" : "none";
  }

  // Event bindings
  newBtn.onclick  = () => { showRandQuote(); setBackground(); };
  saveBtn.onclick = () => {
    const arr = getSaved();
    if (!arr.includes(currentQuote)) {
      arr.push(currentQuote);
      localStorage.setItem("savedQuotes", JSON.stringify(arr));
      alert("Saved!");
    }
  };
  viewBtn.onclick = renderSaved;

  searchInput.oninput = () => {
    const term = searchInput.value.toLowerCase();
    const results = allQuotes()
      .map(o=>o.text)
      .filter(t=> t.toLowerCase().includes(term));
    searchResults.innerHTML = results.map(t=>`<div>${t}</div>`).join("");
  };

  submitBtn.onclick = () => {
    const q = userInput.value.trim();
    if (!q) return alert("Enter a quote first.");
    userQuotes.push(q);
    localStorage.setItem("userQuotes", JSON.stringify(userQuotes));
    alert("Added—and auto-categorized on next shuffle!");
    userInput.value = "";
  };

  // Initialize
  showLoader();
  setTimeout(() => {
    showRandQuote();
    setBackground();
    hideLoader();
  }, 800);
});
