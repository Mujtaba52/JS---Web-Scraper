const fs = require('fs')
const {
    By,
    Builder,
    until,
    Capabilities
  } = require("selenium-webdriver");
  require("chromedriver");


const fileData = fs.readFileSync('log-file.txt', 'utf8')

const urlArr = fileData.split(/\r?\n/).map((line) => {
    return line; 
  });

(async function () {
    let driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
    let data_list = {}
    let title, location_text, location_url, phone, fax, licensee_name, licence_period
    , info, HCI_code, UEN, speciality, doctor_name, qualifications, doctor_info, detail_services
    let n=0;
    for(url of urlArr){
        await driver.get(url);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id("results"))), 300000)

        // title
        try{
          await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@id='results']/div/div/h1"))), 10000)
          title = await driver.findElement(By.xpath("//div[@id='results']/div/div/h1")).getText()
        }
        catch{
          title = "Couldn't get Title"
        }
        
        // location text
        try{
          location_text = await driver.findElement(By.xpath("//div[@class='address']/p")).getText()
        }
        catch{
          location_text = "Couldn't get location text"
        }
        // location url
        try{
          location_url = await driver.findElement(By.xpath("//a[@title='Google Map']")).getAttribute("href")
        }
        catch{
          location_url = "Couldn't get location url"
        }
        // phone
        try{
          phone = await driver.findElement(By.xpath("//*[@class='icon_text contact_mobile']/a")).getAttribute("href")
        }
        catch{
          phone = "Couldn't get phone"
        }
        
        // fax
        try{
          fax = await driver.findElement(By.xpath("//span[@class='icon_text']/parent::td")).getText()
        }
        catch{
          fax = "Couldn't get fax"
        }

        // Licensee name
        try{
          licensee_name = await driver.findElement(By.xpath("//td[text()='Licensee Name:']/following-sibling::td")).getText()
        }
        catch{
          licensee_name = "Couldn't get licensee name"
        }

        // License period
        try{
          licence_period = await driver.findElement(By.xpath("//td[text()='Licence Period:']/following-sibling::td")).getText()
          }
          catch{
            licence_period = "Couldn't get license period"
          }

        // HCI Code
        try{
            HCI_code = await driver.findElement(By.xpath("//td[text()='HCI Code:']/following-sibling::td")).getText()
          }
          catch{
            HCI_code = "Couldn't get HCI code"
          }

        //UEN
        try{
          UEN = await driver.findElement(By.xpath("//td[text()='UEN:']/following-sibling::td")).getText()
        }
          catch{
            UEN = "Couldn't get UEN"
          }

        // info
        try{
          info = await driver.findElement(By.xpath("//div[@id='results']/div/div/table[@class='info']")).getText()
          }
        catch{
          info = "Couldn't get info"
          }

        // doctor_name
        try{
          doctor_name = await driver.findElement(By.xpath("(//*[@class='doctors']/*/tr/td/li[@class='prof-list']/parent::*/preceding-sibling::*)[1]")).getText()
        }
        catch{
          doctor_name = "Couldn't get doctor name"
          }
        
        // qualifications
        try{
          qualifications = await driver.findElement(By.xpath("(//*[@class='doctors']/*/tr/td/li)[1]")).getText()
        }
        catch{
          qualifications = "Couldn't get qualifications"
        }
        
        // speciality
        try{
        speciality = await driver.findElement(By.xpath("(//*[@class='doctors']/*/tr/td/li)[1]")).getText()
        }
        catch{
          speciality = "Couldn't get speciality"
        }

        // doctor_info
        try{
          doctor_info = await driver.findElement(By.xpath("//div[@id='results']/div/div/table[@class='doctors']")).getText()
        }
        catch{
          doctor_info = "Couldn't get doctor info"
        }

        // detail services
        try{
          detail_services = await driver.findElement(By.xpath("(//div[@id='results']/div/div/table)[3]")).getText()
        }
        catch{
          detail_services = "Couldn't get doctor info"
        }

        data_list[n]= {
            'url': url,
            'title': title,
            'location_text': location_text,
            'location_url': location_url,
            "phone": phone.replace('tel:',''),
            'fax': fax.replace(/ /g,'').replace('Fax:',''),
            'Licensee Name': licensee_name,
            'Licence Period': licence_period,
            'HCI Code': HCI_code,
            'UEN': UEN,
            'info': info,
            'doctor_name': doctor_name,
            'qualifications': qualifications,
            'speciality': speciality,
            'doctor_info': doctor_info,
            'detail services': detail_services
        }
        console.log(data_list[n])
        n++

    }
    
})()