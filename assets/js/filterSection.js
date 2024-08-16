"use strict";

import viewProduct from "./viewProduct.js";

class FilterSection {
  _minPrice = [0, 10000, 15000, 20000, 30000];
  _maxPrice = [10000, 15000, 20000, 30000, 35000];

  brands = [];
  rams = [];
  filteredPrice = [];
  discounts = [50, 40, 30, 20, 10];

  _data;
  _minValue = 0;
  _maxValue = 35000;
  checkedBrands = [];

  mobiles = [];

  render(data) {
    this._data = data.products;

    data.products.productItems.forEach((item) => {
      this.mobiles.push(item);
    });

    this._addBrandsToArray();
    this._addRAMToArray();

    this._renderFilterArea();
  }

  _addBrandsToArray() {
    this._data.productItems.forEach((item) => {
      if (!this.brands.includes(item.brand)) {
        this.brands.push(item.brand);
      }
    });
  }

  _addRAMToArray() {
    this._data.productItems.forEach((item) => {
      if (item.ram >= 8) item.ram = 8;
      if (!this.rams.includes(item.ram)) this.rams.push(item.ram);
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
    // const assuredFillter = this._createAssuredFilter();
    const ratingFilter = this._createRatingFilter();
    const ramFilter = this._createRamFilter();
    const discountFilter = this._createDiscountFilter();

    // console.log(discountFilter);

    //

    filterContainer.appendChild(headingArea);
    filterContainer.appendChild(categoriesFilter);
    filterContainer.appendChild(priceFilter);
    filterContainer.appendChild(brandFilter);
    // filterContainer.appendChild(assuredFillter);
    filterContainer.appendChild(ratingFilter);
    filterContainer.appendChild(ramFilter);
    filterContainer.appendChild(discountFilter);

    mainBody.appendChild(filterContainer);

    document.body.appendChild(mainBody);

    // this._filterValue("POCO");
    // this._filterValue("samsung");

    // this._eventListeners();
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
        if (this._minPrice[i] === min) {
          option.defaultSelected = true;
        }

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
    <div class="clear-checked-brands hide"><span>✕</span> Clear all</div>
            <div class="brand-search hide">
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
            <div class="moree brand-moree"></div>
          </div>
    `;

    // <div class="more brand-more"><span>${this.brands.length}</span> more</div>

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

      // if (idx >= 6) return false;

      return true;
    });

    return brandNames;
  }

  _filterValue(text, id = "") {
    const filteredContainer = document.querySelector(".filtered");
    let flag = false;
    const spans = filteredContainer.querySelectorAll(".filtered-item");

    if (spans.length > 0) {
      for (let i = 0; i < spans.length; i++) {
        if (spans[i].id === "price" && id === "price") {
          spans[i].innerHTML = "";
          spans[i].innerHTML = `
          <span class="close">✕</span>
              <span class="filter">${text}</span>`;

          return;
        } else if (spans[i].id === id) {
          flag = true;
          break;
        }
      }
    }

    if (flag) return;

    if (id === "price") console.log("price idd");

    const filteredItem = document.createElement("span");
    filteredItem.classList.add("filtered-item");
    filteredItem.id = id;
    filteredItem.innerHTML = `
              <span class="close">✕</span>
              <span class="filter">${text}</span>
            `;

    filteredContainer.appendChild(filteredItem);

    // Event Listener for deleting filter value
    filteredItem.addEventListener("mouseover", () => {
      filteredItem.querySelector(".filter").style.textDecoration =
        "line-through";
    });

    filteredItem.addEventListener("mouseleave", () => {
      filteredItem.querySelector(".filter").style.textDecoration = "none";
    });

    filteredItem.addEventListener("click", () => {
      if (filteredItem.id === "price") {
        this._resetPriceFilter();
      } else {
        // uncheck the checked item when removed from filterview
        document.querySelector(`input#${filteredItem.id}`).checked = false;

        this._checkForCheckedBrands();
      }

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
              ><img src="${this._data.assured}" alt="assured"
            /></label>
          </span>
    `;

    return filterSection;
  }

  _createRatingFilter() {
    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");
    filterSection.innerHTML = `
        <span class="sub-heading">customer ratings</span>
          <ul class="customer-ratings checkbox-list">
            <li>
              <input type="checkbox" name="rating-4" id="rating-4" />
              <label for="rating-4">4★ & above</label>
            </li>
            <li>
              <input type="checkbox" name="rating-3" id="rating-3" />
              <label for="rating-3">3★ & above</label>
            </li>
          </ul>
    `;

    return filterSection;
  }

  _createRamFilter() {
    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");

    const heading = document.createElement("span");
    heading.classList.add("sub-heading");
    heading.textContent = "ram";

    const div = document.createElement("div");
    div.classList.add("ram-lists");

    const element = this._createRamLists();

    // div.appendChild(element);

    filterSection.appendChild(heading);
    filterSection.appendChild(div);
    filterSection.appendChild(element);

    return filterSection;
  }

  _createRamLists() {
    const ul = document.createElement("ul");
    ul.classList.add("ram-lists");
    ul.classList.add("checkbox-list");

    this.rams.forEach((ram) => {
      if (ram >= 8) ram = "8 GB and Above";
      if (ram <= 1) ram = "1 GB and Below";

      //   const ramValue = isNaN(ram) ? ram : ram + "gb";
      const li = document.createElement("li");

      li.innerHTML = `
        <input type="checkbox" name="${isNaN(ram) ? ram : ram + "gb"}" id="${
        isNaN(ram) ? ram : ram + "gb"
      }" />
        <label for="${isNaN(ram) ? ram : ram + "gb"}">${
        isNaN(ram) ? ram : ram + " gb".toUpperCase()
      }</label>
        `;

      ul.appendChild(li);
    });

    return ul;
  }

  _createDiscountFilter() {
    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");

    const heading = document.createElement("span");
    heading.classList.add("sub-heading");
    heading.textContent = "Discount";
    filterSection.appendChild(heading);

    const ul = document.createElement("ul");
    ul.classList.add("discount-lists");
    ul.classList.add("checkbox-list");

    this.discounts.forEach((discount) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <input type="checkbox" name="${discount}" id="${
        discount + "ormore"
      }" />
            <label for="${discount + "ormore"}">${
        discount + "% or more"
      }</label>
    `;

      ul.appendChild(li);
    });

    filterSection.appendChild(ul);

    return filterSection;
  }

  eventListeners() {
    // const filteredEl = document.querySelector(".filtered");
    const filteredItem = document.querySelectorAll(".filtered-item");
    const filterClearAll = document.querySelector("#filter-heading-clear");
    // const brandMore = document.querySelector(".brand-more");

    const brands = document.querySelectorAll(".brand-names li input");
    const ratings = document.querySelectorAll(".customer-ratings li input");

    const dropDowns = document.querySelectorAll(".range-dropdown select");

    filterClearAll.addEventListener("click", () => {
      filteredItem.forEach((item) => {
        item.remove();
      });
    });

    // brandMore.addEventListener("click", () => {
    //   // this._createMoreBrandSection();
    // });

    dropDowns.forEach((dropdown) => {
      dropdown.addEventListener("change", (e) => {
        if (dropdown.id === "min-price")
          this._minValue = isNaN(e.target.value) ? 0 : Number(e.target.value);
        else if (dropdown.id === "max-price") {
          this._maxValue = isNaN(e.target.value)
            ? 35000
            : Number(e.target.value);
        }

        this._updateDropdown(this._minValue, this._maxValue);
      });
    });

    brands.forEach((brand) => {
      brand.addEventListener("click", (e) => {
        if (e.target.checked) {
          this._filterValue(e.target.id, e.target.id);
          // return false;
        } else if (!e.target.checked) {
          this._clearFromFiltered(e.target.id);
          // return false;
        }

        this._checkForCheckedBrands();
      });
    });

    ratings.forEach((rating) => {
      rating.addEventListener("click", (e) => {
        const text = e.target.nextElementSibling.textContent;

        if (e.target.checked) this._filterValue(text, e.target.id);
        else if (!e.target.checked) this._clearFromFiltered(e.target.id);
      });
    });
  }

  _clearFromFiltered(itemID) {
    const filteredItems = document.querySelectorAll(".filtered .filtered-item");

    filteredItems.forEach((item) => {
      if (item.id === itemID) item.remove();
    });
  }

  _updateDropdown(minValue, maxValue) {
    const minMaxDropdown = document.querySelector(".min-max-drop");
    minMaxDropdown.innerHTML = "";

    const element = this._createDropDown(minValue, maxValue);
    minMaxDropdown.innerHTML = element;

    // console.log(minValue, maxValue);

    const filterText = `${minValue < 10000 ? "Min" : "₹" + minValue}-₹${
      maxValue > 30000 ? "30000+" : maxValue
    }`;

    this._filterValue(filterText, "price");
    this._priceFilter();

    this.eventListeners();
  }

  _priceFilter() {
    this.filteredPrice = [];
    const mobiles = [...this._data.productItems];

    if (this._maxValue > 30000) this._maxValue = 9999999999;

    for (let i = 0; i < mobiles.length; i++) {
      if (
        mobiles[i].price >= this._minValue &&
        mobiles[i].price <= this._maxValue
      ) {
        if (this.filteredPrice.includes(mobiles[i].price)) {
          continue;
        } else {
        }
        this.filteredPrice.push(mobiles[i].price);
      }
    }

    console.log(this.filteredPrice);

    this._filterProduct();

    // viewProduct.createProductCard(this.filteredPrice);
  }

  _checkForCheckedBrands() {
    const brands = document.querySelectorAll(".brand-names li input");

    this.checkedBrands = [];
    brands.forEach((brand) => {
      if (brand.checked) {
        this.checkedBrands.push(brand.id);
      }
    });

    console.log(this.checkedBrands);

    this._filterProduct();
  }

  _filterProduct() {
    // console.log(this._data.productItems);
    const mobiles = [...this._data.productItems];

    if (this.checkedBrands.length < 1) {
      mobiles.forEach((mobile) => {
        this.checkedBrands.push(mobile.brand);
      });
    }

    if (this.filteredPrice.length < 1) {
      mobiles.forEach((mobile) => {
        this.filteredPrice.push(mobile.price);
      });
    }

    let filteredProducts = [];

    filteredProducts = mobiles.filter((mobile, idx) => {
      if (
        this.checkedBrands.includes(mobile.brand) &&
        this.filteredPrice.includes(mobile.price)
      )
        return mobile;
    });

    console.log(filteredProducts);

    viewProduct.createProductCard(filteredProducts);
  }

  _resetPriceFilter() {
    this._minValue = 0;
    this._maxValue = 35000;
    this._updateDropdown();
  }
}

export default new FilterSection();

// 575 ---- 14/08/24
