function HtmlElement() {
  this.click = function() {
    console.log("Element clicked.");
  };
}

HtmlElement.prototype.focus = function() {
  console.log("Element focused.");
};

HtmlElement.prototype.render = function() {
  console.log("Element rendered.");
};

function HtmlSelectElement(src) {
  this.src = src;

  this.render = function() {
    return `<select>${this.src
      .map(
        element => `
        <option>${element}</option>`
      )
      .join("")}
  </select>`;
  };
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

function HtmlImageElement(src) {
  this.src = src;

  this.render = function() {
    return `<img src="${this.src}" />`;
  };
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const html = new HtmlElement();
const select = new HtmlSelectElement();
const image = new HtmlImageElement();

const elements = [
  new HtmlSelectElement([1, 2, 3, 4, 5]),
  new HtmlImageElement("https://gmail.com")
];

function renderElements(elements) {
  for (let element of elements) console.log(element.render());
}

renderElements(elements);
