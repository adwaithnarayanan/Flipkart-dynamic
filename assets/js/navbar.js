class Navbar {
  _data;

  render(data) {
    this._data = data;

    this._displayNav();
  }

  _displayNav() {
    const nav = document.createElement("nav");
    const navContainer = document.createElement("div");
    navContainer.classList.add("nav-container");

    const brand = document.createElement("div");
    brand.classList.add("brand");
    brand.innerHTML = `
        <span class="brand-name">
            <img src="${this._data.icons.flipkartText}" alt="Flipkart" />
          </span>
          <span class="plus-text">
            Explore<span class="plus-sub-text">${
              this._data.plus ? this._data.plus : ""
            }</span>
            <img src="${this._data.icons.plusIcon}" alt="plus" />
          </span>`;

    const searchBar = document.createElement("div");
    searchBar.classList.add("search-bar");
    searchBar.innerHTML = `
    <input type="text" name="search" id="search" class="search-field" 
        placeholder="${this._data.searchPlaceholder}"
            value="smartphone" />
          <span class="search-icon">
            <img src="${this._data.icons.searchBlue}" alt="search" />
          </span>
    `;

    const loginText = document.createElement("div");
    loginText.classList.add("login");
    loginText.innerHTML = `<div class="login-text">${this._data.login}</div>`;

    navContainer.appendChild(brand);
    navContainer.appendChild(searchBar);
    navContainer.appendChild(loginText);

    this._data.navText.forEach((item, idx) => {
      const element = this._createNavTextItem(item, idx);

      navContainer.appendChild(element);
    });

    nav.appendChild(navContainer);

    document.body.appendChild(nav);
  }

  _createNavTextItem(item, idx) {
    const navText = document.createElement("div");
    navText.classList.add("nav-text");

    if (idx === 0) {
      navText.innerHTML = ` <span class="text">${item}</span> `;
      return navText;
    } else if (idx === 1) {
      navText.innerHTML = `
        <span class="text">${item}</span>
          <span class="arrow">
            <img src="${this._data.downArrowWhite}" alt="arrow" />
          </span>
        `;
      return navText;
    } else if (idx === 2) {
      navText.innerHTML = `
        <span class="cart">
            <img src="${this._data.icons.cartIcon}" alt="cart" />
          </span>
          <span class="text">${item}</span>
        `;
      return navText;
    } else {
      navText.innerHTML = `<span class="text">${item}</span>`;
    }
  }
}

export default new Navbar();
