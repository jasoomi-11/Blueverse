// ======= SEARCH SYSTEM (Instant Auto Search) =======
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("searchResults");

let allData = [];

// ✅ Fetch JSON data (from CDN or local)
fetch("https://cdn.jsdelivr.net/gh/jasoomi-11/Asset@main/data/data.json") // <-- change if local: "data.json"
  .then(res => res.json())
  .then(data => {
    allData = data;
  })
  .catch(err => console.error("Error loading JSON:", err));

// 🔍 Handle live search (trigger on 1+ letter)
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query.length === 0) {
    resultsContainer.style.display = "none";
    resultsContainer.innerHTML = "";
    return;
  }

  const filtered = allData.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  renderResults(filtered);
});

// 🧩 Render matched results
function renderResults(data) {
  resultsContainer.innerHTML = "";
  if (data.length === 0) {
    resultsContainer.innerHTML = `<p style="text-align:center;color:#aaa;padding:10px;">No results found.</p>`;
    resultsContainer.style.display = "block";
    return;
  }

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" onerror="this.src='/images/placeholder.jpg'">
      <div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `;
    div.addEventListener("click", () => window.location.href = item.url);
    resultsContainer.appendChild(div);
  });

  resultsContainer.style.display = "block";
}