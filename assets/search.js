const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let songsData = [];

// Load JSON file
fetch("../searchstories.json")
  .then((res) => res.json())
  .then((data) => {
    songsData = data;
  });

// Search logic
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = "";

  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  const filtered = songsData.filter(item =>
    (item.title && item.title.toLowerCase().includes(query)) ||
    (item.singer && item.singer.toLowerCase().includes(query)) ||
    (item.movie && item.movie.toLowerCase().includes(query)) ||
    (item.language && item.language.toLowerCase().includes(query)) ||
    (item.actor && item.actor.toLowerCase().includes(query)) ||
    (item.name && item.name.toLowerCase().includes(query)) || // For story name
    (item.role && item.role.toLowerCase().includes(query))     // For gender role
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = "<div class='no-results'>No results found</div>";
  } else {
    filtered.slice(0, 10).forEach(item => {
      const div = document.createElement("div");
      div.classList.add("result-item");

      // For gender objects (no title)
      if (!item.title && item.name) {
        div.textContent = `🎤 ${item.name} - ${item.role || "Artist"}`;
        div.onclick = () => window.location.href = item.url;
      } else {
        div.textContent = `${item.title} - ${item.singer || "Unknown Singer"}`;
        div.onclick = () => window.location.href = item.link;
      }

      searchResults.appendChild(div);
    });
  }

  searchResults.style.display = "block";
});

// Hide on outside click
document.addEventListener("click", function (event) {
  if (!document.querySelector(".search-container").contains(event.target)) {
    searchResults.style.display = "none";
  }
});
