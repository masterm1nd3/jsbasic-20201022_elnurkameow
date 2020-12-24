import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cardItem = this.cartItems.find(item => item.product.id === product.id)

    if(!cardItem) {
      this.cartItem = {
        product,
        count: 1
      }
      this.cartItems.push(this.cartItem)
    } else {
      this.cartItem.count ++
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(productId, cartItem)
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    )
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal
    modal.setTitle('Your order');
    modal.open();
    let modalBody = document.querySelector('.modal__body')
    for (const product of this.cartItems) {
      modalBody.append(this.renderProduct(product.product, product.count))
    }
    modalBody.append(this.renderOrderForm())

    modalBody.addEventListener('click', (e) => {
      let button = e.target.closest('button')
      if(!button) {
        return
      }
      if(button.className === 'cart-counter__button cart-counter__button_minus') {
        let productId = e.target.closest('.cart-product').dataset.productId
        let countProduct = +button.nextElementSibling.textContent
        if (countProduct > 0) {
          button.nextElementSibling.textContent--
          this.updateProductCount(productId,-1)
        }
      }

      if(button.className === 'cart-counter__button cart-counter__button_plus') {
        let productId = e.target.closest('.cart-product').dataset.productId
        button.previousElementSibling.textContent++
        this.updateProductCount(productId,1)
      }
      let productItem = document.querySelector('.cart-product')
      if (!productItem) {
        document.querySelector('.modal').closest('.container').remove()
      }
    })

    document.querySelector('.cart-form').addEventListener('submit', (e)=> {
      this.onSubmit(e)
    })
  }

  onProductUpdate(cartId,cartItem) {
    const openModal = document.querySelector('body').className
    if (openModal === 'is-modal-open') {
      let productId = cartId
      let modalBody = document.querySelector('.modal')
      let productItem = modalBody.querySelector(`[data-product-id="${productId}"]`)
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (+productCount.textContent === 0) {
        productItem.remove()
      }

      let productSum = productCount.textContent * cartItem.product.price
      productPrice.innerHTML = `€${productSum.toFixed(2)}`

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault()
    let formCart = document.querySelector('.cart-form')
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(formCart)
    }).then(response => {
      if (response.status === 200) {
        document.querySelector('.modal__title').textContent = 'Success!'
        this.cartItems = []
        document.querySelector('.modal__body').innerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `
      }
      console.log(response);
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
