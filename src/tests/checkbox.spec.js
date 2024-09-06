const { By, Builder, Browser } = require('selenium-webdriver');

(async function checkboxTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://unzerstort.github.io/gerador-senhas/');

        const uppercase = await driver.findElement(By.id('uppercase'));
        const lowercase = await driver.findElement(By.id('lowercase'));
        const digits = await driver.findElement(By.id('digits'));

        const strengthElement = await driver.findElement(By.id('strength'));

        await uppercase.click();
        await lowercase.click();
        await digits.click();
        await driver.sleep(500); 

        const finalStrength = await strengthElement.getAttribute('class');

        if (finalStrength !== 'medium') {
            throw new Error(`Esperado medium, mas encontrado '${finalStrength}'`);
        }

        } catch (event) {
            console.log(event);
        } finally {
            await driver.quit();
        }
    }())