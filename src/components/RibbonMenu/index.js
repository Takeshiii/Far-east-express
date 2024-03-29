import createElement from "../../assets/lib/create-element.js";

import angleIcon from "../../assets/images/icons/angle-icon.svg";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.#render();
    this.#menuScroll();
    this.#menuCategorySelect();
  }

  #render() {
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="${angleIcon}" alt="icon">
      </button>
      <nav class="ribbon__inner">
      ${this.categories
        .map(
          (category) =>
            `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
        )
        .join("")}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="${angleIcon}" alt="icon">
      </button>
    </div>
    `);
  }

  #menuScroll() {
    const arrowShow = (arrow) => arrow.classList.add("ribbon__arrow_visible");
    const arrowHide = (arrow) =>
      arrow.classList.remove("ribbon__arrow_visible");
    const ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    const ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    ribbonArrowRight.classList.add("ribbon__arrow_visible");

    ribbonInner.addEventListener("scroll", () => {
      const clientWidth = ribbonInner.clientWidth;
      const scrollWidth = ribbonInner.scrollWidth;
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        arrowHide(ribbonArrowLeft);
      } else {
        arrowShow(ribbonArrowLeft);
      }

      if (scrollRight < 1) {
        arrowHide(ribbonArrowRight);
      } else {
        arrowShow(ribbonArrowRight);
      }
    });

    this.elem.addEventListener("click", (event) => {
      const target = event.target;

      if (ribbonArrowLeft.contains(target)) {
        ribbonInner.scrollBy(-350, 0);
      } else if (ribbonArrowRight.contains(target)) {
        ribbonInner.scrollBy(350, 0);
      }
    });
  }

  #menuCategorySelect() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");

    ribbonInner.addEventListener("click", (event) => {
      const target = event.target.closest(".ribbon__item");
      if (!target || target.classList.contains("ribbon__item_active")) return;
      event.preventDefault();
      const id = target.dataset.id;
      const items = this.elem.querySelectorAll(".ribbon__item");
      items.forEach((item) => item.classList.remove("ribbon__item_active"));
      target.classList.add("ribbon__item_active");
      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: id,
          bubbles: true,
        })
      );
    });
  }
}
