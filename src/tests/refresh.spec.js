const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function refreshTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://unzerstort.github.io/gerador-senhas/');
        
        const password = await driver.findElement(By.id('password'));
        const initialValue = await password.getText();
        
        const refreshButton = driver.findElement(By.className('generate'));
        await refreshButton.click();
        
        const newValue = await password.getText();

        assert.notEqual(newValue, initialValue);
    } catch (event) {
        console.log(event);
    } finally {
        await driver.quit();
    }
}())