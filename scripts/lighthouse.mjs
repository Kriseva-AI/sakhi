import fs from 'node:fs/promises';
import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {chromium} from '@playwright/test';
const chrome=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox']});
try {
  const result=await lighthouse('http://127.0.0.1:8787/en-IN/',{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices'],formFactor:'mobile',throttlingMethod:'simulate'});
  await fs.writeFile('docs/evidence/lighthouse-mobile.json',JSON.stringify(result.lhr,null,2));
  console.log(JSON.stringify({scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),profile:result.lhr.configSettings,metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,result.lhr.audits[k]?.displayValue]))},null,2));
}finally{await chrome.kill();}
