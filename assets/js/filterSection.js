class FilterSection {
  _minPrice = [0, 10000, 15000, 20000, 30000];
  _maxPrice = [10000, 15000, 20000, 30000, 35000];

  checkedBrands = [];
  brands = [];

  _data;
  render(data) {
    this._data = data;

    console.log(this._data);

    this._addBrandsToArray();

    this._renderFilterArea();
  }

  _addBrandsToArray() {
    this._data.productItems.forEach((item) => {
      if (!this.brands.includes(item.brand)) {
        this.brands.push(item.brand);
      }
    });
  }

  _renderFilterArea() {
    const mainBody = document.createElement("main");
    mainBody.classList.add("main-section");

    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-section-container");

    const headingArea = this._createHeadingSection();
    const categoriesFilter = this._createCategoriesFilter();
    const priceFilter = this._createPriceFilter();
    const brandFilter = this._createBrandFilter();
    const assuredFillter = this._createAssuredFilter();

    console.log(assuredFillter);

    //

    filterContainer.appendChild(headingArea);
    filterContainer.appendChild(categoriesFilter);
    filterContainer.appendChild(priceFilter);
    filterContainer.appendChild(brandFilter);

    mainBody.appendChild(filterContainer);

    document.body.appendChild(mainBody);

    this._filterValue("POCO");
    this._filterValue("samsung");

    this._eventListeners();
  }

  _createHeadingSection() {
    const sectionHeading = document.createElement("div");
    sectionHeading.classList.add("section-heading-filter");

    sectionHeading.innerHTML = `
        <div class="filter-heading">
            <span class="section-heading">${this._data.filterSectionHeading}</span>
            <span class="clear" id="filter-heading-clear">${this._data.clearAll}</span>
        </div>
        <div class="filtered">
            
        </div>
    `;

    return sectionHeading;
  }

  _createCategoriesFilter() {
    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");

    filterSection.innerHTML = `
        <span class="sub-heading">categories</span>
          <div class="category-items">
            <span class="img">
              <img src="${this._data.arrowGray}" alt="arrow" />
              <span class="text">Mobiles & Accessories</span>
            </span>
            <span class="product">Mobiles</span>
          </div>
    
    `;

    return filterSection;
  }

  _createPriceFilter() {
    //

    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");

    const heading = document.createElement("span");
    heading.classList.add("sub-heading");
    heading.textContent = "price";
    filterSection.appendChild(heading);

    const priceRange = document.createElement("div");
    priceRange.classList.add("price-range");

    const rangeBox = document.createElement("ul");
    rangeBox.classList.add("range-box");
    for (let i = 0; i < 5; i++) {
      const li = document.createElement("li");
      rangeBox.appendChild(li);
    }
    priceRange.appendChild(rangeBox);

    const priceSliderContainer = document.createElement("div");
    priceSliderContainer.classList.add("price-slider-container");
    priceSliderContainer.innerHTML = `
    <div class="price-slider">
        <span class="min-dot dot"></span>
        <span class="max-dot dot"></span>
        <span class="active-range"></span>
        <span class="vacant-range"></span>
    </div>
    `;

    const priceSliderDivider = document.createElement("ul");
    priceSliderDivider.classList.add("price-slider-divider");
    for (let i = 0; i < 6; i++) {
      const li = document.createElement("li");
      li.textContent = ".";
      priceSliderDivider.appendChild(li);
    }
    priceSliderContainer.appendChild(priceSliderDivider);

    priceRange.appendChild(priceSliderContainer);

    //

    const minMaxDrop = document.createElement("div");
    minMaxDrop.classList.add("min-max-drop");

    const element = this._createDropDown(0, 35000);

    minMaxDrop.innerHTML = element;

    filterSection.append(priceRange);
    filterSection.appendChild(minMaxDrop);

    return filterSection;
  }

  _createBrandFilter() {
    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");

    const filterSectionHeading = document.createElement("span");
    filterSectionHeading.classList.add("sub-heading");
    filterSectionHeading.textContent = "brand";

    filterSection.appendChild(filterSectionHeading);

    const brandSection = document.createElement("div");
    brandSection.classList.add("brand-section");

    const brandLists = this._createBrandList();

    brandSection.innerHTML = `
    <div class="clear-checked-brands"><span>✕</span> Clear all</div>
            <div class="brand-search">
              <img src="${this._data.searchGray}" alt="" />
              <input
                type="text"
                name="brand"
                id="search-brand"
                placeholder="Search Brand"
              />
            </div>
            <div class="brands">
              

            ${brandLists.outerHTML}
             
            </div>
            <div class="more brand-more"><span>${this.brands.length}</span> more</div>
          </div>
    `;

    filterSection.appendChild(brandSection);

    return filterSection;
  }

  _createBrandList() {
    const brandNames = document.createElement("ul");
    brandNames.classList.add("brand-names");
    brandNames.classList.add("checkbox-list");

    this.brands.every((brand, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" name="${brand}" id="${brand}"  />
        <label for="${brand}">${brand}</label>
      `;

      brandNames.appendChild(li);

      if (idx >= 6) return false;

      return true;
    });

    return brandNames;
  }

  _createDropDown(min = 0, max = 35000) {
    let markup = "";

    // DIV  for MIN value dropdown
    const rangeDropdownMin = document.createElement("div");
    rangeDropdownMin.classList.add("range-dropdown");

    const selectMinPrice = document.createElement("select");
    selectMinPrice.setAttribute("name", "min-price");
    selectMinPrice.id = "min-price";
    selectMinPrice.classList.add("dropdown-price");

    // MIN value options
    for (let i = 0; i < this._minPrice.length; i++) {
      if (this._minPrice[i] >= max) break;
      else {
        const option = document.createElement("option");
        // option.selected = false;

        const value = this._minPrice[i] === 0 ? "min" : this._minPrice[i];

        // option.selected = true;

        option.value = value;
        option.textContent =
          value === Number(value)
            ? value
            : value[0].toUpperCase() + value.slice(1);

        // make the selected min price as default
        if (this._minPrice[i] === min) option.defaultSelected = true;

        selectMinPrice.appendChild(option);
      }
    }

    rangeDropdownMin.appendChild(selectMinPrice);

    markup = markup + rangeDropdownMin.outerHTML;

    // ------------------

    const toRange = document.createElement("div");
    toRange.classList.add("to-range");
    toRange.textContent = "to";

    markup = markup + toRange.outerHTML;

    // ------------------
    // MAX value DIV
    const rangeDropdownMax = document.createElement("div");
    rangeDropdownMax.classList.add("range-dropdown");

    const selectMaxPrice = document.createElement("select");
    selectMaxPrice.setAttribute("name", "max-price");
    selectMaxPrice.id = "max-price";
    selectMaxPrice.classList.add("dropdown-price");

    //MAX value options
    for (let i = 0; i < this._maxPrice.length; i++) {
      if (this._maxPrice[i] <= min) continue;
      else {
        const value = this._maxPrice[i] > 30000 ? "30000+" : this._maxPrice[i];

        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;

        // make the selected max price as default
        if (this._maxPrice[i] === max) option.defaultSelected = true;

        selectMaxPrice.appendChild(option);
      }
    }

    rangeDropdownMax.appendChild(selectMaxPrice);
    markup = markup + rangeDropdownMax.outerHTML;
    return markup;
  }

  _filterValue(text) {
    const filteredItem = document.createElement("span");
    filteredItem.classList.add("filtered-item");
    filteredItem.innerHTML = `
              <span class="close">✕</span>
              <span class="filter">${text}</span>
            `;

    document.querySelector(".filtered").appendChild(filteredItem);

    // Event Listener for deleting filter value
    filteredItem.addEventListener("mouseover", () => {
      filteredItem.querySelector(".filter").style.textDecoration =
        "line-through";
    });
    filteredItem.addEventListener("mouseleave", () => {
      filteredItem.querySelector(".filter").style.textDecoration = "none";
    });
    filteredItem.addEventListener("click", () => {
      filteredItem.remove();
    });
  }

  _createMoreBrandSection() {
    const moreBrandsContainer = document.createElement("div");
    moreBrandsContainer.classList.add("more-brands-container");

    const nav = document.createElement("div");
    nav.classList.add("more-brands-nav");
    nav.innerHTML = `
    <input
        type="text"
        name="search-brand-all"
        id="search-brand-all"
        placeholder="Search Brand"
    />    
    `;

    const closeMoreBrands = document.createElement("span");
    closeMoreBrands.classList.add("close-more-brands");
    closeMoreBrands.textContent = "✕";

    nav.appendChild(closeMoreBrands);
    moreBrandsContainer.appendChild(nav);

    const showAllBrands = document.createElement("div");
    showAllBrands.classList.add("show-all-brands");

    const listElements = this._createAllBrandItems();

    showAllBrands.appendChild(listElements);
    moreBrandsContainer.appendChild(showAllBrands);

    const allBrandsButtons = document.createElement("div");
    allBrandsButtons.classList.add("all-brands-buttons");

    allBrandsButtons.innerHTML = `
    
        <button class="clearAll">${this._data.allProductsButtons[0]}</button>
        <button class="apply-filters">${this._data.allProductsButtons[1]}</button>

    `;

    moreBrandsContainer.appendChild(allBrandsButtons);

    document.querySelector(".brand-section").appendChild(moreBrandsContainer);

    closeMoreBrands.addEventListener("click", () => {
      moreBrandsContainer.remove();
    });
  }

  _createAllBrandItems() {
    const allBrandsUL = document.createElement("ul");
    allBrandsUL.classList.add("all-brands-ul");
    allBrandsUL.classList.add("checkbox-list");

    this.brands.forEach((brand) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <input type="checkbox" name="${brand}" id="${brand}"/>
        <label for="${brand}" >${brand}</label>
        `;

      allBrandsUL.appendChild(li);
    });

    return allBrandsUL;
  }

  _createAssuredFilter() {
    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");
    filterSection.innerHTML = `
    <span class="sub-heading assured">
            <input type="checkbox" name="f-assured" id="f-assured" />
            <label for="f-assured"
              ><img src="assets/icons/assured.png" alt=""
            /></label>
          </span>

`;

    return filterSection;
  }

  _eventListeners() {
    // const filteredEl = document.querySelector(".filtered");
    const filteredItem = document.querySelectorAll(".filtered-item");

    const filterClearAll = document.querySelector("#filter-heading-clear");

    const brandMore = document.querySelector(".brand-more");

    // filteredItem.forEach((item) => {
    //   item.addEventListener("mouseover", () => {
    //     console.log(item.closest(".filter"));
    //     item.querySelector(".filter").style.textDecoration = "line-through";
    //   });
    //   item.addEventListener("mouseleave", () => {
    //     item.querySelector(".filter").style.textDecoration = "none";
    //     // item.querySelector(".filter").style.color = "red";
    //   });
    //   item.addEventListener("click", () => {
    //     item.remove();
    //   });
    // });

    filterClearAll.addEventListener("click", () => {
      filteredItem.forEach((item) => {
        item.remove();
      });
    });

    brandMore.addEventListener("click", () => {
      this._createMoreBrandSection();
    });
  }
}

export default new FilterSection();

// 252 ---- 13/08/24
