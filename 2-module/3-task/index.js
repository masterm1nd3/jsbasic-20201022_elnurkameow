let calculator = {
        read(a,b) {
                return (
                        this.num = a,
                        this.num2 = b
                )
        },
        sum() {
                return this.num + this.num2
        },
        mul: function () {
                return this.num * this.num2
        }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
