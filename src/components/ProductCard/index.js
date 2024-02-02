import createElement from "../../assets/lib/create-element.js";

import plusIcon from "../../assets/images/icons/plus-icon.svg";

export default class ProductCard {
  #product;

  constructor(product) {
    this.#product = product;
    this.#render();
    this.#addProduct();
  }

  #render() {
    const product = this.#product;
    const productPrice = product.price.toFixed(2);

    this.elem = createElement(`
    <div class="card">
      <div class="card__top">
        <img src="${product.image}" class="card__image" alt="product">
        <span class="card__price">€${productPrice}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="${plusIcon}" alt="icon">
        </button>
      </div>
    </div>
    `);
  }

  #addProduct() {
    const event = new CustomEvent("product-add", {
      detail: this.#product.id,
      bubbles: true,
    });
    this.elem.addEventListener("click", () => {
      this.elem.dispatchEvent(event);
    });
  }
}
