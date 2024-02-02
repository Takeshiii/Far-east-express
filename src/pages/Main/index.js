import Carousel from "../../components/Carousel/index.js";
import slides from "../../components/Carousel/slides.js";

import RibbonMenu from "../../components/RibbonMenu/index.js";
import categories from "../../components/RibbonMenu/categories.js";

import StepSlider from "../../components/StepSlider/index.js";
import ProductsGrid from "../../components/ProductsGrid/index.js";

import CartIcon from "../../components/CartIcon/index.js";
import Cart from "../../components/Cart/index.js";

import products from "../../constants/products.js";

export default class Main {
  constructor() {}

  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();

    this.cart = new Cart(this.cartIcon);
    this.products = products;
    this.renderProductsGrid();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", ({ detail: productId }) => {
      const product = this.products.find((product) => product.id === productId);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener(
      "slider-change",
      ({ detail: value }) => {
        this.productsGrid.updateFilter({
          maxSpiciness: value,
        });
      }
    );

    this.ribbonMenu.elem.addEventListener(
      "ribbon-select",
      ({ detail: categoryId }) => {
        this.productsGrid.updateFilter({
          category: categoryId,
        });
      }
    );

    const nutsCheckbox = document.getElementById("nuts-checkbox");
    nutsCheckbox.addEventListener("change", () => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked,
      });
    });

    const vegeterianCheckbox = document.getElementById("vegeterian-checkbox");
    vegeterianCheckbox.addEventListener("change", () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked,
      });
    });
  }

  renderCarousel() {
    const carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(carousel.elem);
  }

  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document
      .querySelector("[data-cart-icon-holder]")
      .append(this.cartIcon.elem);
  }

  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);
  }
}
