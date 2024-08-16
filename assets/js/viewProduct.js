class ViewProducts {
  _data;
  _assuredIcon;
  currentPageNumber;
  _productsInPage = 24;
  _newSortedArray = [];

  // MAX and MIN elements in a page
  _pageMin;
  _pageMax;

  // MAX and  MIN index values
  _minIndex;
  _maxIndex;

  render(data) {
    this._data = data.productItems;

    this._assuredIcon = data.assured;

    this.createProductCard();
    this.changeHeaderPageNumber();
    this.createPages();
  }

  createProductCard(mobileData = this._data, page = 0) {
    this._newSortedArray = [...mobileData];

    const productsList = document.querySelector(".products-list");
    productsList.innerHTML = "";

    const ulEl = document.createElement("ul");
    ulEl.classList.add("products-view");

    mobileData.forEach((mobile, idx) => {
      const li = document.createElement("li");

      const off = Math.floor(100 - (mobile.price / mobile.mrp) * 100);
      const assuredIcon = `<img src="${this._assuredIcon}" alt="" />`;

      const highlights = this._createHighlights(mobile.highlights);

      li.innerHTML = `

        <div class="product-card">
              <div class="product-img">
                <div class="img">
                  <img
                    src="${mobile.image}"
                    alt="${mobile.brand.toLowerCase()}"
                  />
                </div>
                <div class="add-to-compare">
                  <input type="checkbox" name="compare" id="compare${idx}" />
                  <label for="compare${idx}">Add to Compare</label>
                </div>
                <div class="wishlist">
                  <img src="assets/icons/wishlist-red.svg" class="red hide" />
                  <img src="assets/icons/wishlist-white.svg" />
                </div>
              </div>

              <div class="product-description">
                <div class="product-details">
                  <span class="title">${mobile.title}</span
                  >
                  <div class="rating-reviews">
                    <span class="rating-stars">
                      <span>${mobile.rating.average}</span>
                      <img src="assets/icons/rating-star.svg" alt="stars" />
                    </span>
                    <span class="rating-count">
                      ${mobile.rating.count} Ratings & ${
        mobile.rating.reviewCount
      } Reviews
                    </span>
                  </div>

                  ${highlights.outerHTML}
                </div>
                <div class="product-price-offer">
                  <div class="price-assured">
                    <div class="product-price">
                      <span class="price">${
                        "₹ " + mobile.price.toLocaleString()
                      }</span>
                      <span class="mrp-off">
                        <span class="mrp">${
                          "₹ " + mobile.mrp.toLocaleString()
                        }</span>
                        <span class="off-on-mrp">${off}% off</span>
                      </span>
                      <span class="delivery">Free delivery</span>
                    </div>
                    ${mobile.isSponsored ? "" : assuredIcon}
                  </div>
                  
                </div>
              </div>
            </div>

        `;

      /*

        <span class="discount-offer">Top Discount of the Sale</span>
        <span class="exchange-offer">
            Upto <span>₹36,300</span> Off on Exchange
        </span>

        */

      ulEl.appendChild(li);
    });

    productsList.appendChild(ulEl);

    this.changeHeaderPageNumber();
  }

  _createHighlights(highlights) {
    // console.log("highligts ", highlights);

    const ul = document.createElement("ul");
    ul.classList.add("product-spec");

    highlights.forEach((spec) => {
      const li = document.createElement("li");
      li.textContent = spec;

      ul.appendChild(li);
    });

    return ul;
  }

  changeHeaderPageNumber() {
    const headerPageNumber = document.querySelector(".results-text");

    this._calculatePageItems();
    // console.log(
    //   "pageNumber",
    //   this.currentPageNumber,
    //   "total  ",
    //   this._newSortedArray.length
    // );
    headerPageNumber.textContent = `Showing ${this._pageMin} - ${this._pageMax} of ${this._newSortedArray.length} results for "smartphones"`;
  }

  _calculatePageItems() {
    this._pageMax = this.currentPageNumber * this._productsInPage;

    this._pageMin = this._pageMax - 24 + 1;

    if (this._pageMax > this._newSortedArray.length)
      this._pageMax = this._newSortedArray.length;

    this._minIndex = this._pageMin - 1;
    this._maxIndex = this._pageMax - 1;
  }

  createPages() {
    const paginationEl = document.querySelector(".pagination");
  }
}

export default new ViewProducts();

//  125 -- till 14/08/2024
