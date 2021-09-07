const puppeteer = require('puppeteer');

async function run () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://www.casenews.co.kr/',{ timeout: 0, waitUntil: 'domcontentloaded'});
  var test_page = await page.$$('.height-435');

  for(let Test of test_page)
  {
    const Test_style = await page.evaluate(el => el.getAttribute('style'), Test);
    var Test_background = Test_style.split('(')[1];
    Test_background = Test_background.substring(0, Test_background.length -1);
    console.log(Test_background);
  }

  await browser.close();
}

run();