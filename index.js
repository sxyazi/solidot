const fs = require('fs')
const puppeteer = require('puppeteer')

const fetch = async (startID, endID) => {
  let html = ''
  const browser = await puppeteer.launch({
    // headless: false
  })

  const page = await browser.newPage()
  for (let i = startID; i < endID; i++) {
    console.log(`fetch: https://www.solidot.org/story?sid=${i}`)

    try {
      await page.goto(`https://www.solidot.org/story?sid=${i}`)
      html += await page.evaluate(
        () => document.querySelector('.block_m').outerHTML
      )
    } catch (e) {
      html += `<h1>${i} 抓取失败：<a href="https://www.solidot.org/story?sid=${i}"
        target="_black">https://www.solidot.org/story?sid=${i}</a></h1>`
    }
  }

  await browser.close()
  return html
}

const data = html => {
  return `<meta charset="utf-8">
  <base href="https://www.solidot.org/">
  <link rel="stylesheet" href="https://icon.solidot.org/css/default/common.css?v3.0">
  <link rel="stylesheet" href="https://icon.solidot.org/css/default/base.css?v3.0">
  <link rel="stylesheet" href="https://icon.solidot.org/css/green/index.css?v3.0">
  <style>
    body {
      padding: 0 50px;
    }
  
    body::before {
      content: 'Solidot';
      font-size: 35px;
      font-weight: bold;
      margin: 10px 0;
      display: block;
    }
  
    .block_m {
      margin-bottom: 30px;
    }
  
    .talk_time {
      visibility: hidden;
      height: 30px;
      position: relative;
    }
  
    .talk_time b {
      visibility: visible;
      position: absolute;
      top: 0;
      left: 0;
      background: #e9e9e9;
      width: 100%;
      padding: 8px 5px;
    }
  
    img[src='//img.solidot.org/0/446/liiLIZF8Uh6yM.jpg'] {
      display: none !important;
    }
  </style>
  ${html}`
}

const main = async () => {
  const html = await fetch(57878, 58178)
  fs.writeFileSync('result.html', data(html))
  console.log('ok')
}

main()
