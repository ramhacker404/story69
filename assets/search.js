
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
        <div style="display: flex; align-items: center;">
          <img src="${item.cover}" alt="${item.title}" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover; margin-right: 10px;">
          <div>
            <div style="font-weight: bold; font-size: 15px;">${item.title}</div>
            <div style="font-size: 12px; color: gray;">${item.language} | ${item.category}</div>
          </div>
        </div>
      `;

      div.onclick = () => window.location.href = item.link;
      searchResults.appendChild(div);
    });
  }

  searchResults.style.display = "block";
});

// Hide search results on outside click
document.addEventListener("click", function (event) {
  if (!document.querySelector(".search-container").contains(event.target)) {
    searchResults.style.display = "none";
  }
});

