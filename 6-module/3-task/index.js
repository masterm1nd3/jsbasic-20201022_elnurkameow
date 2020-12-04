import createElement from '../../assets/lib/create-element.js';

class Slider {
	constructor(slide) {
	  this.name = slide.name
	  this.price = slide.price
	  this.image = slide.image
	  this.id = slide.id
	  this.slideElem = document.createElement('DIV')
	  this.slideElem.classList.add('carousel__slide')
	  this.slideElem.setAttribute('data-id', `${this.id}`)
	  this.slideElem.insertAdjacentHTML('afterbegin',`
		 <img src="/assets/images/carousel/${this.image}" class="carousel__img" alt="slide">
		 <div class="carousel__caption">
			<span class="carousel__price">€${this.price.toFixed(2)}</span>
			<div class="carousel__title">${this.name}</div>
			<button type="button" class="carousel__button">
			  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
			</button>
		 </div>
	  `)
	  this.clickBtn()
	}
	// создание кастомного события при нажатие на кнопку +
	clickBtn() {
	  this.slideElem.querySelector('.carousel__button').addEventListener('click', () => {
		 this.event = new CustomEvent("product-add", {
			detail: this.id,
			bubbles: true
		 })
		 this.slideElem.dispatchEvent(this.event)
	  })
	}
 }
 
 export default class Carousel {
	constructor(slides) {
	  this.slides = slides;
	  this.elem = document.createElement('DIV')
	  this.elem.classList.add('carousel')
	  this.elem.insertAdjacentHTML('afterbegin', `
		 <div class="carousel__arrow carousel__arrow_right">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		 </div>
		 <div class="carousel__arrow carousel__arrow_left">
			<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
		 </div>
		 <div class="carousel__inner"></div>
	  `)
	  for(let i in slides) {
		 const slide = new Slider(slides[i])
		 this.elem.querySelector('.carousel__inner').append(slide.slideElem)
	  }
	  this.countClick = 0 //перееменная хранящаю кол-во нажатия кнопки
	  this.initCarousel()
	  this.rightBtn = this.elem.querySelector('.carousel__arrow_right')
	  this.leftBtn = this.elem.querySelector('.carousel__arrow_left')
	}
	// метод при нажатии на кнопку вправо или влево
	move(count, btn) {
	  const carousel = this.elem.querySelector('.carousel__inner')
	  const carouselWidth = carousel.offsetWidth
	  carousel.style.transform = `translateX(-${carouselWidth * this.countClick}px)`
	  if(this.countClick === count) {
		 btn.style.display = 'none'
	  } else {
		 this.rightBtn.style.display = ''
		 this.leftBtn.style.display = ''
	  }
	}
	// метод заускающие движение карусели
	initCarousel() {
	  this.rightBtn = this.elem.querySelector('.carousel__arrow_right')
	  this.leftBtn = this.elem.querySelector('.carousel__arrow_left')
	  const slide = this.elem.querySelectorAll('.carousel__slide').length - 1
	  this.leftBtn.style.display = 'none'
 
	  this.rightBtn.addEventListener('click', () => {
		 this.countClick = ++this.countClick
		 this.move(slide, this.rightBtn)
	  })
 
	  this.leftBtn.addEventListener('click', () => {
		 this.countClick = --this.countClick
		 this.move(0, this.leftBtn)
	  })
	}
 }
