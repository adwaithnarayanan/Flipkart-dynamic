async function getData() {
  const res = await fetch("allproducts.json");
  const data = await res.json();

  //   console.log(data);
}

// getData();
