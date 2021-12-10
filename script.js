// Declaring the main variables
const button = document.querySelector('button');
const radioBase = document.querySelectorAll('input[name="base"]');
const radioSauce = document.querySelectorAll('input[name="sauce"]');
const checkOlives = document.querySelector('input[name="olives"]');
const checkSeafood = document.querySelector('input[name="seafood"]');
const checkCondiments = document.querySelector('input[name="condiments"]');

// Creating classes


class Pizza {
    /**
     * Creates a Pizza instance.
     *
     * @constructor
     * @this  {Pizza}
     * @param {options}  - Pizza ingredients.
     */
    constructor(options) {
        this.base = options.base;
        this.sauce = options.sauce;
        this.olives = options.olives;
        this.seafood = options.seafood;
        this.condiments = options.condiments;
        this.price = options.price;
        this.calorie = options.calorie
    }
}

class Base {
    /**
     * Creates a Base instance.
     *
     * @constructor
     * @this  {Base}
     * @param {index}  - Selected pizza bases.
     */
    constructor(index) {
        this.name = index.name;
        this.price = index.price;
        this.calorie = index.calorie;
    }
}

class Sauce {
    /**
     * Creates a Sauce instance.
     *
     * @constructor
     * @this  {Sauce}
     * @param {index}  - Selected pizza Sauce.
     */
    constructor(index) {
        this.name = index.name;
        this.price = index.price;
        this.calorie = index.calorie;
    }
}

class Olives {
    /**
     * Creates a Sauce instance.
     *
     * @constructor
     * @this  {Olives}
     * @param {index}  - Selected pizza Olives(if selected).
     */
    constructor(index) {
        this.name = index.name;
        this.price = index.price;
        this.calorie = index.calorie;
    }
}

class Seafood {
    /**
     * Creates a Sauce instance.
     *
     * @constructor
     * @this  {Seafood}
     * @param {index}  - Selected pizza Seafood(if selected).
     */
    constructor(index) {
        this.name = index.name;
        this.price = index.price;
        this.calorie = index.calorie;
    }
}


class Condiments {
    /**
     * Creates a Condiments instance.
     *
     * @constructor
     * @this  {Condiments}
     * @param {index}  - Selected pizza Condiments(if selected).
     */
    constructor(index) {
        this.name = index.name;
        this.price = index.price;
        this.calorie = index.calorie;
    }
}

// The function of sending data to the server
const sendData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    });
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
    }
    return await response.json();
}

// Creating instances of classes and send data to the server by clicking on the button
button.addEventListener('click', function(e) {
    e.preventDefault();
    let baseName = basePrice = baseCalorie = sauceName = saucePrice = sauceCalorie = condimentsName = condimentsPrice = condimentsCalorie = olivesName = olivesPrice = olivesCalorie = seafoodName = seafoodPrice = seafoodCalorie = '';
    for (const radio of radioBase) {
        if (radio.checked) {

            baseName = radio.dataset.name;
            basePrice = radio.dataset.price;
            baseCalorie = radio.dataset.calorie;
        }
    }
    for (const radio of radioSauce) {
        if (radio.checked) {
            sauceName = radio.dataset.name;
            saucePrice = radio.dataset.price;
            sauceCalorie = radio.dataset.calorie;
        }
    }
    if (checkOlives.checked) {
        olivesName = checkOlives.dataset.name;
        olivesPrice = checkOlives.dataset.price;
        olivesCalorie = checkOlives.dataset.calorie;
    }
    if (checkSeafood.checked) {
        seafoodName = checkSeafood.dataset.name;
        seafoodPrice = checkSeafood.dataset.price;
        seafoodCalorie = checkSeafood.dataset.calorie;
    }
    if (checkCondiments.checked) {
        condimentsName = checkCondiments.dataset.name;
        condimentsPrice = checkCondiments.dataset.price;
        condimentsCalorie = checkCondiments.dataset.calorie;
    }
    const base = new Base({
        name: baseName,
        price: basePrice,
        calorie: baseCalorie
    })
    const sauce = new Sauce({
        name: sauceName,
        price: saucePrice,
        calorie: sauceCalorie
    })
    const olives = new Olives({
        name: olivesName,
        price: olivesPrice,
        calorie: olivesCalorie
    })
    const seafood = new Seafood({
        name: seafoodName,
        price: seafoodPrice,
        calorie: seafoodCalorie
    })
    const condiments = new Condiments({
        name: condimentsName,
        price: condimentsPrice,
        calorie: condimentsCalorie
    })


    const pizza = new Pizza({
        base: base.name,
        sauce: sauce.name,
        olives: olives.name,
        seafood: seafood.name,
        condiments: condiments.name,
        price: Number(base.price) + Number(sauce.price) + Number(olives.price) + Number(seafood.price) + Number(condiments.price),
        calorie: Number(base.calorie) + Number(sauce.calorie) + Number(olives.calorie) + Number(seafood.calorie) + Number(condiments.calorie),

    })

    let totalPrice;
    if (pizza.price < 10) {
        totalPrice = pizza.price * 1.2;
    } else if (pizza.price > 10 && pizza.price < 15) {
        totalPrice = pizza.price * 1.15;
    } else {
        totalPrice = pizza.price * 1.1;
    }
    alert(`Вы выбрали пиццу на ценой в ${totalPrice} руб. и калорийностью ${pizza.calorie} кКал`);
    const jsonData = JSON.stringify(pizza);
    sendData('https://jsonplaceholder.typicode.com/posts', jsonData)

});