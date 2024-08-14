class CategoriesTab {
  _data;

  render(data) {
    this._data = data;

    this._dispalyCategories();
  }

  _dispalyCategories() {
    const categories = document.createElement("div");
    categories.classList.add("categories-tab");

    const ulEl = document.createElement("ul");
    ulEl.classList.add("categories-tab-container");

    this._data.items.forEach((item) => {
      const liEl = document.createElement("li");
      liEl.innerHTML = `
        <span class="category">${item}</span>
        <span class="category-arrow" >
            <img src="${this._data.downArrow}" alt="arrow" />
        </span>
        `;

      ulEl.appendChild(liEl);
    });

    categories.appendChild(ulEl);

    document.body.appendChild(categories);
  }
}

export default new CategoriesTab();

// 35 till 13/08
