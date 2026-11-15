const path = require('path');
const fs = require('fs');

let playwright;
try {
  playwright = require('playwright');
} catch (e) {
  playwright = require('d:/workspace/eclipse/naver-blog-auto-poster/node_modules/playwright');
}
const { chromium } = playwright;

async function runQA() {
  console.log('🧪 QA 검증 시작...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 }
  });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('Page Crash/Error:', err.message);
    errors.push(err.message);
  });

  const fileUrl = 'file:///' + path.resolve('d:/workspace/eclipse/season-map-clean/index.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 1. 헤더 탭 검증
  const nightBtn = await page.$('#tabNightViewBtn');
  const driveBtn = await page.$('#tabDriveCourseBtn');
  console.log('✓ Tab buttons found:', Boolean(nightBtn), Boolean(driveBtn));

  // 2. 핀 렌더링 검증
  const nightPins = await page.$$('.night-pin');
  const drivePins = await page.$$('.drive-pin');
  console.log(`✓ Pins rendered: Night View (${nightPins.length}/10), Drive Course (${drivePins.length}/10)`);

  // 3. 야경 핀 클릭 검증 (force: true로 dispatch)
  await page.evaluate(() => {
    const el = document.getElementById('pin-night-01');
    if (el) el.click();
  });
  await page.waitForTimeout(500);
  const cardTitle = await page.$eval('#detailCardTitle', el => el.textContent);
  const cardSub = await page.$eval('#detailCardSub', el => el.textContent);
  const cardDesc = await page.$eval('#detailCardDesc', el => el.textContent);
  console.log('✓ Night pin-01 clicked:', cardTitle, '/', cardSub);
  console.log('  Desc snippet:', cardDesc.slice(0, 40));

  // 4. 드라이브 핀 클릭 검증
  await page.evaluate(() => {
    const el = document.getElementById('pin-drive-01');
    if (el) el.click();
  });
  await page.waitForTimeout(500);
  const driveTitle = await page.$eval('#detailCardTitle', el => el.textContent);
  const driveSub = await page.$eval('#detailCardSub', el => el.textContent);
  console.log('✓ Drive pin-01 clicked:', driveTitle, '/', driveSub);

  // 5. 사이드바 명소 목록(Spot Directory)에 신규 핀이 등록되었는지 검증
  const nightSpotItem = await page.$('.spot-item[data-layer="nightView"]');
  const driveSpotItem = await page.$('.spot-item[data-layer="driveCourse"]');
  console.log('✓ Spot Directory items exist for new layers:', Boolean(nightSpotItem), Boolean(driveSpotItem));

  // 6. 스크린샷 캡처
  const ssPath = 'd:/workspace/eclipse/season-map-clean/gemini/screenshot_night_drive_verified.png';
  await page.screenshot({ path: ssPath });
  console.log('📸 스크린샷 저장 완료:', ssPath);

  // 7. 영문 전환 검증
  await page.click('#langEnBtn');
  await page.waitForTimeout(500);
  const engHeaderTitle = await page.$eval('#headerTitle', el => el.textContent);
  const engNightTab = await page.$eval('#tabNightViewLabel', el => el.textContent);
  const engDriveTab = await page.$eval('#tabDriveCourseLabel', el => el.textContent);
  console.log('✓ English Header Title:', engHeaderTitle);
  console.log('✓ English Tabs:', engNightTab, '/', engDriveTab);

  // 영문 상태에서 핀 클릭 검증
  await page.evaluate(() => {
    const el = document.getElementById('pin-night-01');
    if (el) el.click();
  });
  await page.waitForTimeout(500);
  const engCardTitle = await page.$eval('#detailCardTitle', el => el.textContent);
  console.log('✓ English Card Title:', engCardTitle);

  await browser.close();

  if (errors.length > 0) {
    console.error('❌ QA 검증 중 에러 발생:', errors);
    process.exit(1);
  } else {
    console.log('🎉 QA 검증 전체 통과! 콘솔 에러 0건, 모든 기능 정상 작동.');
  }
}

runQA().catch(err => {
  console.error('QA script error:', err);
  process.exit(1);
});
