//

"use strict";

import navbar from "./navbar.js";
import categoriesTab from "./categoriesTab.js";
import filterSection from "./filterSection.js";

async function getData() {
  // const res = await fetch("allproducts.json");
  const res = await fetch("mobiles.json");
  const data = await res.json();

  // console.log(data.products);
  console.log(data);

  navbar.render(data.nav);
  categoriesTab.render(data.categoriesTab);
  filterSection.render(data);

  // return data;
}

getData();

// 13 till 12/08
