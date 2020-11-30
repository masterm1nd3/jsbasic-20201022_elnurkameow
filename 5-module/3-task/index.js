function initCarousel() {
const carusel = document.querySelector('.carousel__inner')
          const caruselWidth = carusel.offsetWidth
          const rightBtn = document.querySelector('.carousel__arrow_right')
          const leftBtn = document.querySelector('.carousel__arrow_left')
          const slide = document.querySelectorAll('.carousel__slide').length - 1
          let countClick = 0

          leftBtn.style.display = 'none'

        function move(count, btn) {
                    carusel.style.transform = `translateX(-${caruselWidth*countClick}px)`
                if(countClick === count) {
                              btn.style.display = 'none'
                            
                } else {
                              rightBtn.style.display = ''
                              leftBtn.style.display = ''
                            
                }
                  
        }

        rightBtn.addEventListener('click', () => {
                    countClick = ++countClick
                    move(slide, rightBtn)
                  
        })

        leftBtn.addEventListener('click', () => {
                    countClick = --countClick
                    move(0, leftBtn)
                  
        })
}
