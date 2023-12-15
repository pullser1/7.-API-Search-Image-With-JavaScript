class UnsplashImageSearch {
     constructor(accessKey) {
          this.accessKey = accessKey;
          this.formEl = document.querySelector("form");
          this.inputEl = document.getElementById("search-input");
          this.searchResults = document.querySelector(".search-results");
          this.showMore = document.getElementById("show-more-button");
          this.inputData = "";
          this.page = 1;

          this.formEl.addEventListener("submit", (event) => {
               event.preventDefault();
               this.page = 1;
               this.searchImages();
          });

          this.showMore.addEventListener("click", () => {
               this.searchImages();
          });
     }

     async searchImages() {
          this.inputData = this.inputEl.value;
          const apiUrl = `https://api.unsplash.com/search/photos?page=${this.page}&query=${this.inputData}&client_id=${this.accessKey}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          const result = data.results;

          if (this.page === 1) {
               this.searchResults.innerHTML = "";
          }

          result.map((result) => {
               const imageWrapper = document.createElement("div");
               imageWrapper.classList.add("search-result");

               const image = document.createElement("img");
               image.src = result.urls.small;
               image.alt = result.alt_description;

               const imageLink = document.createElement("a");
               imageLink.href = result.links.html;
               imageLink.target = "_blank";
               imageLink.textContent = result.alt_description;

               imageWrapper.appendChild(image);
               imageWrapper.appendChild(imageLink);
               this.searchResults.appendChild(imageWrapper);
          });
          this.page++;

          if (this.page > 1) {
               this.showMore.style.display = "block";
          }
     }
}

// Create an instance of UnsplashImageSearch
const unsplashSearch = new UnsplashImageSearch("r4rIqMhsTFWtSHVjSVIArEVGnKFvKxK7fYFLITQi5P8");
