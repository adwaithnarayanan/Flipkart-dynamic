import viewProduct from "./viewProduct.js";

class ProductSection {
  _data;

  _pageNumber = 1;

  render(data) {
    this._data = data;

    this._createProductSections();
    viewProduct.currentPageNumber = this._pageNumber;

    // createMobileViews()
  }

  _createProductSections() {
    const productSectionContainer = document.createElement("div");
    productSectionContainer.classList.add("product-section-container");

    const productsHeader = document.createElement("div");
    productsHeader.classList.add("product-section-header");

    productsHeader.innerHTML = `
    <div class="path">
        <span class="path-text">Home</span>
        <span class="arrow">
            <img src="assets/icons/arrow-gray.svg" alt="" />
        </span>
        <span class="path-text">Mobiles & Accessories</span>
        <span class="arrow">
            <img src="assets/icons/arrow-gray.svg" alt="" />
        </span>
        <span class="path-text">Mobiles</span>
    </div>
    <div class="results-header">
        <span class="results-text">
            Showing 1 - 24 fo 282 results for "smartphones"
        </span>
    </div>
    <div class="sort-by">
        <span class="sort-by-head">Sort By</span>
        <ul class="sort-values">
            <li class="active-sort" id='relevance'>Relevance</li>
            <li id="popularity">Popularity</li>
            <li id="low-to-high">Price -- Low to High</li>
            <li id="high-to-low">Price -- High to Low</li>
            <li id="newest">Newest First</li>
        </ul>
    </div>
    
    `;
    /*
    // Sorting section can include if needed
    <div class="sort-by">
        <span class="sort-by-head">Sort By</span>
        <ul class="sort-values">
            <li class="active-sort">Relevance</li>
            <li>Popularity</li>
            <li>Price -- Low to High</li>
            <li>Price -- High to Low</li>
            <li>Newest First</li>
        </ul>
    </div>
    */

    const productsLists = document.createElement("div");
    productsLists.classList.add("products-list");

    productSectionContainer.appendChild(productsHeader);
    productSectionContainer.appendChild(productsLists);

    const pagination = this._createPaginationSection();

    // console.log(pagination);

    productSectionContainer.appendChild(pagination);

    document
      .querySelector(".main-section")
      .appendChild(productSectionContainer);
  }

  _createPaginationSection() {
    // console.log(this._pageNumber);

    const paginationContainer = document.createElement("ul");
    paginationContainer.classList.add("pagination");

    // const ul = document.createElement("ul");

    return paginationContainer;
  }

  eventListener() {
    // WISHLIST icon activate
    const wishlist = document.querySelectorAll(".wishlist");

    wishlist.forEach((item) =>
      item.addEventListener("click", (e) => {
        const imgs = item.querySelectorAll("img");

        imgs.forEach((img) => img.classList.toggle("hide"));
      })
    );
  }
}

export default new ProductSection();

//  90 -- till 14/08/2024
