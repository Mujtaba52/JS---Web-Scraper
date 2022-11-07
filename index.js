const {
  By,
  Builder,
  until,
  Capabilities
} = require("selenium-webdriver");
require("chromedriver");

async function main() {
  let driver = await new Builder().withCapabilities(Capabilities.chrome()).build();

  await driver.get(
    "https://www.hcidirectory.gov.sg/hcidirectory"
  );

  const title = await driver.getTitle();
  console.log("Title is: ", title);

  await driver
  .findElement(
    By.id('search_btn')).click()

  await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(text(),'Showing 1 - 10')]"))), 10000)
  while(driver.findElement(By.xpath(
      "//a[@class='next']/img")).isDisplayed){
    const allClinics = await driver.findElements(By.xpath("//div[@class='result_container']/div/span[@class='name']/a"));

    allClinics.forEach(async (clinic) => {
      const clinicLink = await clinic.getAttribute("href");
      console.log(clinicLink);
    });

      await driver.findElement(
        By.xpath(
          "//a[@class='next']/img"
        )
      ).click()
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(text(),'results')]"))), 10000)
    }
  }
  

main();
