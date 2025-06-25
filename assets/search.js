const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let storyData = [];

// Load JSON file
fetch("../searchstories.json")
  .then((res) => res.json())
  .then((data) => {
    storyData = data;
  });

// Search logic
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = "";

  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  const filtered = storyData.filter(item =>
    (item.title && item.title.toLowerCase().includes(query)) ||
    (item.language && item.language.toLowerCase().includes(query)) ||
    (item.category && item.category.toLowerCase().includes(query))
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = "<div class='no-results'>No stories found</div>";
  } else {
    filtered.slice(0, 10).forEach(item => {
      const div = document.createElement("div");
      div.classList.add("result-item");
      
      div.innerHTML = `
        <img src="${item.cover}" alt="${item.title}" class="search-thumb">
        <div class="search-info">
          <strong>${item.title}</strong><br>
          <small>${item.language} | ${item.category}</small>
        </div>
      `;

      div.onclick = () => window.location.href = item.link;
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
