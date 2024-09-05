const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function Test() {
    let driver;
    
    try {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://unzerstort.github.io/gerador-senhas/');
        
        const numberInput = await driver.findElement(By.id('rangeValue'));
        const numberInputValue = await numberInput.getAttribute('value');

        const sliderInput = await driver.findElement(By.id('charNum'));
        const sliderInputValue = await sliderInput.getAttribute('value');

        assert.strictEqual(sliderInputValue, numberInputValue);
    } catch (event) {
        console.log(event);
    } finally {
        await driver.quit();
    }
}())