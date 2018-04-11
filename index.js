#!/usr/bin/env node
'use strict';
const argv = require('yargs').argv
const puppeteer = require('puppeteer');

const url = argv.url;

if(!url){
    console.error('Please provide a url via the --url flag');
    return;
}
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 3000000
  });

  await page.screenshot({ path: `screenshot.png`, fullPage: true });
  await browser.close();
})().catch((reason) => {
  console.log(reason)
});
