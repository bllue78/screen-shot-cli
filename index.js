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

  await page.setViewport({width:1920, height:1800});
  
  var stream = await page.screenshot({ fullPage: true });
  
  await browser.close();
  
  console.log(Buffer.from(stream).toString('base64'));
  
  })().catch((reason) => {
  console.log(reason)
});
