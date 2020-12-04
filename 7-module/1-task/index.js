import createElement from '../../assets/lib/create-element.js';

import categories from './categories.js';
class RibbonItem {
  constructor(categories) {
    this.id = categories.id
    this.name = categories.name
    this.item = document.createElement('A')
    this.item.setAttribute('href', '#')
    this.item.className = 'ribbon__item'
    this.item.setAttribute('data-id', this.id)
    this.item.textContent = this.name
  }
}

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('DIV')
    this.elem.classList.add('ribbon')
    this.elem.innerHTML = `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `
    for (const i in categories) {
      const item = new RibbonItem(categories[i])
      if (i === '0' ) {
        item.item.classList.add('ribbon__item_active')
      }
      this.elem.querySelector('.ribbon__inner').append(item.item)
    }
    this.scrollMenu()
    this.selectItem()
  }

  scrollMenu() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner')
    const btnRight = this.elem.querySelector('.ribbon__arrow_right')
    const btnLeft = this.elem.querySelector('.ribbon__arrow_left')
    let scrollWidth
    let scrollLeft
    let scrollRight
    let clientWidth
    btnLeft.addEventListener('click', ()=> {
      ribbonInner.scrollBy(-350, 0)
      scrollWidth = ribbonInner.scrollWidth
      scrollLeft = ribbonInner.scrollLeft
      clientWidth = ribbonInner.clientWidth;
      scrollRight = scrollWidth - scrollLeft - clientWidth
      if(scrollRight === 0) {
        btnRight.classList.toggle('ribbon__arrow_visible')
        btnLeft.classList.toggle('ribbon__arrow_visible')
      }
    })
    btnRight.addEventListener('click', ()=> {
      ribbonInner.scrollBy(350, 0)
      scrollLeft = ribbonInner.scrollLeft;
      if(scrollLeft < 1) {
        btnRight.classList.toggle('ribbon__arrow_visible')
        btnLeft.classList.toggle('ribbon__arrow_visible')
      }
    })
  }

  selectItem() { this.elem.querySelector('.ribbon__inner').addEventListener('click',(ev) => {
      ev.target.preventDefault
      const itemArr = Array.from(this.elem.querySelectorAll('.ribbon__item'))
      itemArr.forEach(item => item.classList.remove('ribbon__item_active'))
      ev.target.classList.add('ribbon__item_active')
      this.choiсeEv = new CustomEvent('ribbon-select',{
        detail: ev.target.getAttribute('data-id'),
        bubbles: true
      })
      this.elem.dispatchEvent(this.choiсeEv)
    })
  }
}
