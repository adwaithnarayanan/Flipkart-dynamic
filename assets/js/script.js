//

async function getData() {
  // const res = await fetch("allproducts.json");
  const res = await fetch("mobiles.json");
  data = await res.json();

  // console.log(data.products);
  console.log(data);
  return data;
}

getData();
