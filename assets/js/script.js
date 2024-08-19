//

"use strict";

import navbar from "./navbar.js";
import categoriesTab from "./categoriesTab.js";
import filterSection from "./filterSection.js";
import productsSection from "./productsSection.js";
import viewProduct from "./viewProduct.js";

async function getData() {
  const res = await fetch("mobiles.json");
  const data = await res.json();

  navbar.render(data.nav);
  categoriesTab.render(data.categoriesTab);
  filterSection.render(data.products);

  // return data;
}

getData();

// 24 till 13/08
