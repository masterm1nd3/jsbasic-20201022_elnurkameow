export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value +1
    this.elem = document.createElement('DIV')
    this.elem.className = 'slider'
    this.elem.insertAdjacentHTML('afterbegin',`
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 25%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 25%;"></div>
      <!--Шаги слайдера-->
      <div class="slider__steps"></div>
    `)
    this.renderStep(steps)
    this.elem.querySelectorAll('span')[this.value].classList.add('slider__step-active')
    this.sliderClick(steps)
  }
  renderStep(steps) {
    const stepS = this.elem.querySelector('.slider__steps')
    const span = document.createElement('SPAN')
    for(let i = 0; i < steps; i++) {
      stepS.innerHTML += '<span></span>'
    }
    console.log(stepS)
  }
  sliderClick(steps) {
    const thumb = this.elem.querySelector('.slider__thumb')
    const sliderVal = this.elem.querySelector('.slider__value')
    const sliderProg = this.elem.querySelector('.slider__progress')
    const span = Array.from(this.elem.querySelectorAll('span'))
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      thumb.style = `left: ${valuePercents}%;`
      sliderVal.textContent = value
      sliderProg.style = `width: ${valuePercents}%;`
      span.forEach(item => item.classList.remove('slider__step-active'))
      span[value+1].classList.add('slider__step-active')

      this.sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(this.sliderChange)
    })
  }
}
