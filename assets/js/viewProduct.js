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
  _minIndex = 0;
  _maxIndex = 23;

  _errorMessage = [];
  _errorImg = "";

  totalPages = 0;

  _prevBtn;
  _nextBtn;
  _pages;
  _paginationBtns;
  _paginationSection;

  initialView = true;

  render(data) {
    this._data = data.productItems;

    this._errorMessage = [...data.errorMessage];
    this._errorImg = data.error;

    this._assuredIcon = data.assured;

    this.createProductCard();
    this.changeHeaderPageNumber();
    this.createPages();
  }

  createProductCard(mobileData = this._data, page = 0) {
    this._newSortedArray = [...mobileData];

    const productsList = document.querySelector(".products-list");
    productsList.innerHTML = "";

    if (this._newSortedArray.length < 1) {
      const div = document.createElement("div");
      div.classList.add("error-message");

      const img = document.createElement("img");
      img.src = this._errorImg;

      div.appendChild(img);

      this._errorMessage.forEach((message) => {
        const span = document.createElement("span");
        span.textContent = message;

        div.appendChild(span);
      });

      productsList.appendChild(div);

      return;
    }

    this.changeHeaderPageNumber(true);

    const ulEl = document.createElement("ul");
    ulEl.classList.add("products-view");

    mobileData.forEach((mobile, idx) => {
      if (idx >= this._minIndex && idx <= this._maxIndex) {
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

        li.addEventListener("mouseenter", this._mouseEnterOnProduct);
        li.addEventListener("mouseleave", this._mouseLeaveOnProduct);

        ulEl.appendChild(li);
      }
    });

    productsList.appendChild(ulEl);
  }

  _mouseEnterOnProduct(e) {
    const title = e.target.querySelector(".product-description .title");
    title.style.color = "var(--font-color-two)";
  }

  _mouseLeaveOnProduct(e) {
    const title = e.target.querySelector(".product-description .title");
    title.style.color = "var(--font-color-one)";
  }

  _createHighlights(highlights) {
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

    headerPageNumber.textContent = `Showing ${this._pageMin} - ${this._pageMax} of ${this._newSortedArray.length} results for "smartphones"`;

    if (this.initialView) this.createPages();
  }

  _calculatePageItems() {
    if (this.initialView) this._resetPagination();
    this._pageMax = this.currentPageNumber * this._productsInPage;

    this._pageMin = this._pageMax - this._productsInPage + 1;

    if (this._pageMax > this._newSortedArray.length)
      this._pageMax = this._newSortedArray.length;

    this._minIndex = this._pageMin - 1;
    this._maxIndex = this._pageMax - 1;
  }

  _resetPagination() {
    this.currentPageNumber = 1;
  }

  createPages() {
    const paginationEl = document.querySelector(".pagination");

    paginationEl.innerHTML = "";

    this.totalPages = Math.ceil(
      this._newSortedArray.length / this._productsInPage
    );

    this.hideButtons();
    if (this.totalPages === 1) {
      return;
    }

    for (let i = 1; i <= this.totalPages; i++) {
      const li = document.createElement("li");

      if (i === this.currentPageNumber) li.classList.add("active-page");
      li.textContent = i;

      paginationEl.appendChild(li);
    }
  }

  eventlisteners() {
    this._paginationSection = document.querySelector(".pagination-section");
    this._pages = document.querySelectorAll(".pagination li");
    this._paginationBtns = this._paginationSection.querySelectorAll("button");

    this._paginationBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target.id === "prev") this.currentPageNumber--;
        else if (e.target.id == "next") this.currentPageNumber++;

        if (this.currentPageNumber < 1) this.currentPageNumber = 1;
        else if (this.currentPageNumber > this.totalPages) {
          this.currentPageNumber = this.totalPages;
        }

        this._buttonCommonFunCalls();
        console.log(this._pages[this.currentPageNumber - 1]);
        this._pages[this.currentPageNumber - 1].classList.add("active-page");
      });
    });
  }

  pageEventlisteners() {
    this._pages = document.querySelectorAll(".pagination li");

    this._pages.forEach((page) => {
      page.addEventListener("click", () => {
        let newPage = Number(page.textContent);

        this.currentPageNumber = newPage;
        this._buttonCommonFunCalls();

        page.classList.add("active-page");
      });
    });
  }

  _buttonCommonFunCalls() {
    this._removeActivePage();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.hideButtons();
    this.initialView = false;
    this.createProductCard(this._newSortedArray);
  }

  _removeActivePage() {
    this._pages.forEach((page) => {
      page.classList.remove("active-page");
    });
  }

  hideButtons() {
    this._prevBtn = document.querySelector(".prev-page");
    this._nextBtn = document.querySelector(".next-page");

    this._paginationSection = document.querySelector(".pagination-section");

    if (this.totalPages === 1) this._paginationSection.classList.add("hide");
    else this._paginationSection.classList.remove("hide");

    if (this.currentPageNumber === 1) {
      this._prevBtn.classList.add("hide");
      this._nextBtn.classList.remove("hide");
    } else if (this.currentPageNumber === this.totalPages) {
      this._nextBtn.classList.add("hide");
      this._prevBtn.classList.remove("hide");
    } else {
      this._prevBtn.classList.remove("hide");
      this._nextBtn.classList.remove("hide");
    }
  }
}

export default new ViewProducts();

//  187 -- till 16/08/2024
