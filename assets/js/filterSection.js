class FilterSection {
  _data;
  render(data) {
    this._data = data;

    this._renderSearchArea();

    console.log(data);
  }

  _renderSearchArea() {
    const mainBody = document.createElement("main");
    mainBody.classList.add("main-section");

    document.body.appendChild(mainBody);
    console.log(mainBody);
  }
}

export default new FilterSection();
