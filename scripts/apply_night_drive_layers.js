const fs = require('fs');
const path = require('path');

const targetFile = 'd:/workspace/eclipse/season-map-clean/index.html';
let html = fs.readFileSync(targetFile, 'utf-8');

console.log('Original html length:', html.length);

// 1. CSS 추가 (ski-pin 뒤에 추가)
const cssAnchor = '    .ski-pin.active .pin-dot {\n      background: #0891b2;\n    }';
const newCss = `    .ski-pin.active .pin-dot {
      background: #0891b2;
    }

    /* Night View & Light Festival Pin Styling */
    .night-pin .pin-title {
      background: #d97706;
      color: #ffffff;
    }
    .night-pin .pin-data {
      border-color: #fde68a;
    }
    .night-pin .pin-dot {
      background: #f59e0b;
    }
    .night-pin .spa-pin-badge {
      font-size: 10px;
      font-weight: 800;
      color: #b45309;
    }
    .night-pin:hover .pin-title {
      background: #f59e0b;
    }
    .night-pin:hover .pin-data {
      border-color: #f59e0b;
    }
    .night-pin.active .pin-title {
      background: #d97706 !important;
    }
    .night-pin.active .pin-data {
      border-color: #d97706 !important;
    }
    .night-pin.active .pin-dot {
      background: #d97706;
    }

    /* Drive Course Pin Styling */
    .drive-pin .pin-title {
      background: #0284c7;
      color: #ffffff;
    }
    .drive-pin .pin-data {
      border-color: #bae6fd;
    }
    .drive-pin .pin-dot {
      background: #0ea5e9;
    }
    .drive-pin .spa-pin-badge {
      font-size: 10px;
      font-weight: 800;
      color: #0369a1;
    }
    .drive-pin:hover .pin-title {
      background: #0ea5e9;
    }
    .drive-pin:hover .pin-data {
      border-color: #0ea5e9;
    }
    .drive-pin.active .pin-title {
      background: #0284c7 !important;
    }
    .drive-pin.active .pin-data {
      border-color: #0284c7 !important;
    }
    .drive-pin.active .pin-dot {
      background: #0284c7;
    }`;

if (!html.includes(cssAnchor)) {
  console.error('Cannot find cssAnchor');
  process.exit(1);
}
html = html.replace(cssAnchor, newCss);
console.log('1. CSS injected.');

// 2. 헤더 레이어 탭 버튼 추가 (#tabSkiSledBtn 뒤에 추가)
const tabAnchor = `      <button type="button" class="layer-tab active" id="tabSkiSledBtn" data-layer-btn="skiSled" aria-pressed="true" onclick="toggleLayer('skiSled')">
        <span>⛷️</span> <span id="tabSkiSledLabel">스키·눈썰매 (20선)</span> <span class="layer-state-pill" id="skiSledStatePill">ON</span>
      </button>`;

const newTabs = `      <button type="button" class="layer-tab active" id="tabSkiSledBtn" data-layer-btn="skiSled" aria-pressed="true" onclick="toggleLayer('skiSled')">
        <span>⛷️</span> <span id="tabSkiSledLabel">스키·눈썰매 (20선)</span> <span class="layer-state-pill" id="skiSledStatePill">ON</span>
      </button>
      <button type="button" class="layer-tab active" id="tabNightViewBtn" data-layer-btn="nightView" aria-pressed="true" onclick="toggleLayer('nightView')">
        <span>🌃</span> <span id="tabNightViewLabel">야경·빛축제 (10선)</span> <span class="layer-state-pill" id="nightViewStatePill">ON</span>
      </button>
      <button type="button" class="layer-tab active" id="tabDriveCourseBtn" data-layer-btn="driveCourse" aria-pressed="true" onclick="toggleLayer('driveCourse')">
        <span>🚗</span> <span id="tabDriveCourseLabel">드라이브 코스 (10선)</span> <span class="layer-state-pill" id="driveCourseStatePill">ON</span>
      </button>`;

if (!html.includes(tabAnchor)) {
  console.error('Cannot find tabAnchor');
  process.exit(1);
}
html = html.replace(tabAnchor, newTabs);
console.log('2. Header tabs injected.');

// 3. 지도 핀 컨테이너 추가
const containerAnchor = '      <div id="skiSledPinsContainer"></div>';
const newContainers = `      <div id="skiSledPinsContainer"></div>

      <!-- 전국 야경 & 불꽃·빛축제 10선 컨테이너 -->
      <div id="nightViewPinsContainer"></div>

      <!-- 전국 오션뷰 & 설경 드라이브 코스 10선 컨테이너 -->
      <div id="driveCoursePinsContainer"></div>`;

if (!html.includes(containerAnchor)) {
  console.error('Cannot find containerAnchor');
  process.exit(1);
}
html = html.replace(containerAnchor, newContainers);
console.log('3. Pin containers injected.');

// 4. JS 데이터셋 추가 (SKI_SLED_DATA 뒤에 추가)
const dataAnchor = '  const SKI_SLED_MAP = new Map(SKI_SLED_DATA.map(s => [s.id, s]));';
const newDatasets = `  const SKI_SLED_MAP = new Map(SKI_SLED_DATA.map(s => [s.id, s]));

  // ==========================================================
  // 전국 야경 & 불꽃·빛축제 10선 (nightView)
  // ==========================================================
  const NIGHT_VIEW_DATA = [
    { id: 'pin-night-01', num: 1, region: 'gyeonggi', icon: '🌃', nameKo: 'N서울타워 & 남산 야경', nameEn: 'N Seoul Tower & Namsan Night View', shortKo: 'N서울타워', shortEn: 'N Seoul Tower', subKo: '서울 용산구 남산공원길', subEn: 'Yongsan, Seoul', catKo: '도심·타워 야경', catEn: 'City & Tower Night View', feature: '서울 도심 360도 파노라마', featureEn: '360° Panoramic Cityscape', descKo: '해발 480m 남산 정상에서 서울 전경을 360도 파노라마로 굽어보는 대한민국 대표 랜드마크 야경 명소입니다.', descEn: 'Korea’s premier landmark overlooking Seoul’s panoramic skyline from atop Mt. Namsan.', top: 275, left: 275 },
    { id: 'pin-night-02', num: 2, region: 'gyeonggi', icon: '✨', nameKo: '광화문 & 청계천 빛초롱축제', nameEn: 'Gwanghwamun & Cheonggyecheon Lantern Festival', shortKo: '서울빛초롱', shortEn: 'Lantern Fest', subKo: '서울 종로구 광화문광장·청계천', subEn: 'Jongno, Seoul', catKo: '빛축제·미디어아트', catEn: 'Light Festival', feature: '대형 한지 등불 & 미디어아트', featureEn: 'Hanji Lanterns & Media Art', descKo: '겨울밤 청계천과 광화문광장을 은은한 한지 등불과 화려한 미디어파사드로 수놓는 서울 대표 겨울 빛축제입니다.', descEn: 'Seoul’s iconic winter night festival illuminating Cheonggyecheon stream with traditional lanterns and modern media art.', top: 265, left: 270 },
    { id: 'pin-night-03', num: 3, region: 'gyeonggi', icon: '🌉', nameKo: '송도 센트럴파크 & 트라이보울', nameEn: 'Songdo Central Park & Tri-bowl Night View', shortKo: '송도센트럴파크', shortEn: 'Songdo Park', subKo: '인천 연수구 송도동', subEn: 'Yeonsu, Incheon', catKo: '도심·수변 야경', catEn: 'Waterfront Skyline', feature: '미래도시 마천루 & 한옥 반영', featureEn: 'Futuristic Skyline & Hanok Reflection', descKo: '해수 인공호수 위로 펼쳐지는 미래지향적 초고층 빌딩과 한옥호텔의 고즈넉한 불빛이 환상적인 반영을 이룹니다.', descEn: 'Futuristic skyscrapers reflecting along seawater canals alongside traditional Korean hanok rooflines.', top: 295, left: 215 },
    { id: 'pin-night-04', num: 4, region: 'gyeonggi', icon: '✨', nameKo: '아침고요수목원 오색별빛정원전', nameEn: 'The Garden of Morning Calm Light Festival', shortKo: '아침고요빛축제', shortEn: 'Morning Calm Lights', subKo: '경기 가평군 상면', subEn: 'Gapyeong, Gyeonggi', catKo: '빛축제·수목원', catEn: 'Botanical Light Show', feature: '10만 평 정원 은하수 조명', featureEn: '100,000 Pyeong Galaxy Illuminations', descKo: '한국 자연미를 담은 정원 위에 수만 개의 친환경 LED 전구가 불을 밝혀 겨울밤 동화 같은 은하수를 만듭니다.', descEn: 'Korea’s flagship botanical garden transformed into a winter fairytale wonderland covered in millions of jewel-toned lights.', top: 215, left: 345 },
    { id: 'pin-night-05', num: 5, region: 'gangwon', icon: '🌃', nameKo: '춘천 구봉산 전망대 카페거리', nameEn: 'Chuncheon Gubongsan Mountain Observatory', shortKo: '구봉산전망대', shortEn: 'Gubongsan View', subKo: '강원 춘천시 동면', subEn: 'Chuncheon, Gangwon', catKo: '전망대·카페거리', catEn: 'Mountain Ridge Cafe View', feature: '해발 441m 춘천 시가지 파노라마', featureEn: 'High-Altitude City Lights', descKo: '산등성이를 따라 감각적인 전망 카페들이 모여 있어, 따뜻한 커피 한 잔과 함께 춘천 시내 야경을 감상할 수 있습니다.', descEn: 'A scenic ridge lined with aesthetic cafes overlooking the shimmering lights of Chuncheon city and lakes below.', top: 210, left: 425 },
    { id: 'pin-night-06', num: 6, region: 'gyeongbuk', icon: '✨', nameKo: '대구 이월드 83타워 별빛축제', nameEn: 'Daegu E-World 83 Tower Starlight Festival', shortKo: '이월드 83타워', shortEn: '83 Tower Lights', subKo: '대구 달서구 두류공원로', subEn: 'Dalseo, Daegu', catKo: '타워·테마파크 야경', catEn: 'Theme Park & Tower Night', feature: '천만 개 전구 & 83타워 전망대', featureEn: '10 Million Lights & Tower Observatory', descKo: '대구 도심의 상징 83타워 전망대 야경과 유럽풍 테마파크를 물들이는 천만 개 별빛 라이팅 쇼가 펼쳐집니다.', descEn: 'Daegu’s landmark tower offering sweeping cityscape views above an expansive European-style light theme park.', top: 520, left: 515 },
    { id: 'pin-night-07', num: 7, region: 'gyeongbuk', icon: '🌉', nameKo: '포항 영일대 해상누각 & 스페이스워크', nameEn: 'Pohang Yeongildae & Space Walk Night View', shortKo: '영일대·스페이스워크', shortEn: 'Yeongildae Night', subKo: '경북 포항시 북구', subEn: 'Buk-gu, Pohang', catKo: '해상누각·조형 야경', catEn: 'Ocean Pavilion & Space Walk', feature: '영일만 바다 위 누각 & 포스코 야경', featureEn: 'Seaborne Pavilion & Posco Lights', descKo: '바다 한가운데 떠 있는 전통 누각과 밤하늘 철제 궤도를 걷는 스페이스워크, 맞은편 포스코 불빛이 환상적입니다.', descEn: 'Korea’s first ocean pavilion Yeongildae paired with the illuminated Space Walk rollercoaster-style sky walkway.', top: 505, left: 630 },
    { id: 'pin-night-08', num: 8, region: 'gyeongbuk', icon: '🏮', nameKo: '경주 동궁과 월지 & 월정교 야경', nameEn: 'Gyeongju Donggung & Wolji & Woljeonggyo', shortKo: '동궁과월지·월정교', shortEn: 'Donggung Palace', subKo: '경북 경주시 인왕동·교동', subEn: 'Gyeongju, Gyeongbuk', catKo: '고궁·한옥 야경', catEn: 'Historic Palace & Bridge', feature: '연못에 비치는 황금빛 신라 궁궐', featureEn: 'Golden Shilla Palace Water Reflection', descKo: '신라 왕실의 별궁 연못에 비치는 누각 반영과 남천 위에 웅장하게 서 있는 월정교의 목조 야경이 백미입니다.', descEn: 'The crown jewel of Korean historic night views, showcasing mirror-like reflections of Shilla royal pavilions.', top: 540, left: 590 },
    { id: 'pin-night-09', num: 9, region: 'gyeongnam', icon: '🌉', nameKo: '부산 광안리 드론라이트쇼 & 광안대교', nameEn: 'Busan Gwangalli Drone Light Show & Bridge', shortKo: '광안리·광안대교', shortEn: 'Gwangalli Drone', subKo: '부산 수영구 광안해변로', subEn: 'Suyeong, Busan', catKo: '드론쇼·해상교량', catEn: 'Drone Show & Sea Bridge', feature: '상설 드론쇼 & 바다 야경', featureEn: 'Weekly Saturday Drone Show & Ocean Bridge', descKo: '광안대교 다이아몬드 브릿지의 화려한 조명과 매주 토요일 밤바다 상공을 수놓는 수백 대의 드론 아트 쇼입니다.', descEn: 'Busan’s premier night oceanfront, highlighted by the illuminated suspension bridge and weekly drone performance.', top: 645, left: 585 },
    { id: 'pin-night-10', num: 10, region: 'jeonnam', icon: '🌉', nameKo: '여수 돌산공원 & 여수 밤바다', nameEn: 'Yeosu Dolsan Park & Romantic Ocean Night', shortKo: '여수 돌산공원', shortEn: 'Yeosu Night Sea', subKo: '전남 여수시 돌산읍', subEn: 'Yeosu, Jeonnam', catKo: '해양공원·케이블카', catEn: 'Harbor Park & Cable Car', feature: '돌산대교 & 하버 파노라마', featureEn: 'Dolsan Bridge & Harbor Panorama', descKo: '돌산공원 전망대에서 돌산대교와 해상케이블카, 여수 구도심 포구의 낭만적인 밤바다 불빛을 한눈에 담을 수 있습니다.', descEn: 'The ultimate viewpoint for Korea’s beloved Yeosu Night Sea, gazing down upon illuminated bridges and harbors.', top: 715, left: 440 }
  ];
  const NIGHT_VIEW_MAP = new Map(NIGHT_VIEW_DATA.map(s => [s.id, s]));

  // ==========================================================
  // 전국 오션뷰 & 설경 드라이브 코스 10선 (driveCourse)
  // ==========================================================
  const DRIVE_COURSE_DATA = [
    { id: 'pin-drive-01', num: 1, region: 'gangwon', icon: '🌊', nameKo: '강릉 헌화로 해안 드라이브', nameEn: 'Gangneung Heonhwa-ro Coastal Drive', shortKo: '강릉 헌화로', shortEn: 'Heonhwa-ro Drive', subKo: '강원 강릉시 옥계면', subEn: 'Gangneung, Gangwon', catKo: '오션뷰 해안도로', catEn: 'Ocean Coastal Road', feature: '바다와 가장 가까운 해안길', featureEn: 'Closest Road to Ocean in Korea', descKo: '깎아지른 바위 절벽과 도로 바로 옆까지 하얗게 부서지는 동해 파도를 끼고 달리는 국내 최고의 바닷길입니다.', descEn: 'Korea’s closest road to the sea, carved between dramatic sea cliffs and crashing East Sea waves.', top: 245, left: 590 },
    { id: 'pin-drive-02', num: 2, region: 'jeonnam', icon: '🌅', nameKo: '영광 백수해안도로 노을길', nameEn: 'Yeonggwang Baeksu Coastal Sunset Drive', shortKo: '백수해안도로', shortEn: 'Baeksu Coast Road', subKo: '전남 영광군 백수읍', subEn: 'Yeonggwang, Jeonnam', catKo: '노을·일몰 드라이브', catEn: 'Sunset Coastal Drive', feature: '16.8km 서해 칠산바다 절벽 노을', featureEn: '16.8km Sunset Cliff Coastal Scenic Highway', descKo: '한국의 아름다운 길 100선에 빛나는 16.8km 해안 절벽 도로로, 서해 칠산바다를 붉게 물들이는 낙조가 장관입니다.', descEn: 'A scenic 16.8 km cliff highway acclaimed as one of Korea’s most stunning coastal sunset driving routes.', top: 630, left: 245 },
    { id: 'pin-drive-03', num: 3, region: 'gyeongbuk', icon: '🌊', nameKo: '영덕 강축해안도로 (블루로드 C코스)', nameEn: 'Yeongdeok Gangchuk Coastal Highway', shortKo: '영덕 강축해안로', shortEn: 'Yeongdeok Coast', subKo: '경북 영덕군 강구면~축산면', subEn: 'Yeongdeok, Gyeongbuk', catKo: '오션뷰 해안도로', catEn: 'Ocean Coastal Road', feature: '동해 파도 & 블루로드 드라이브', featureEn: 'Blue Road Ocean Vista Scenic Drive', descKo: '강구항에서 축산항까지 시원하게 뻗은 동해 해안선을 따라 오징어 건조대와 등대, 푸른 파도를 감상하는 코스입니다.', descEn: 'A thrilling coastal route winding past harbors, white lighthouses, and the deep azure waters of Yeongdeok.', top: 450, left: 635 },
    { id: 'pin-drive-04', num: 4, region: 'gangwon', icon: '🏔️', nameKo: '평창 대관령 옛길 & 선자령 와인딩', nameEn: 'Daegwallyeong Historic Mountain Pass', shortKo: '대관령 옛길', shortEn: 'Daegwallyeong Pass', subKo: '강원 평창군 대관령면', subEn: 'Pyeongchang, Gangwon', catKo: '설경·고갯길 와인딩', catEn: 'Snow Pass & Winding Route', feature: '아흔아홉 구비 백두대간 설경', featureEn: 'Snowy Alpine Mountain Ridge Route', descKo: '영동과 영서를 잇던 역사 깊은 아흔아홉 굽이 고갯길로, 겨울이면 은빛 설원과 거대한 풍차 능선이 눈앞에 펼쳐집니다.', descEn: 'The historic 99-turn pass through the Baekdudaegan mountain ridge, offering breathtaking alpine winter snowscapes.', top: 228, left: 565 },
    { id: 'pin-drive-05', num: 5, region: 'chungbuk', icon: '🏔️', nameKo: '단양 보발재 와인딩 고갯길', nameEn: 'Danyang Bobaljae Scenic Mountain Pass', shortKo: '단양 보발재', shortEn: 'Bobaljae Pass', subKo: '충북 단양군 가곡면', subEn: 'Danyang, Chungbuk', catKo: '설경·고갯길 와인딩', catEn: 'Scenic Mountain Pass', feature: '소백산 자락 굽이치는 S자 파노라마', featureEn: 'Scenic S-Curved Mountain Pass', descKo: '소백산 연화봉 아래를 굽이굽이 휘감아 도는 해발 540m 드라이브 명소로, 구인사로 이어지는 환상적인 곡선미를 자랑합니다.', descEn: 'A famous serpentine mountain road winding up Mt. Sobaeksan, offering stunning aerial perspectives and snow scenery.', top: 320, left: 515 },
    { id: 'pin-drive-06', num: 6, region: 'gyeongnam', icon: '🌊', nameKo: '남해 물미해안도로 (미조~물건)', nameEn: 'Namhae Mulmi Coastal Highway', shortKo: '남해 물미해안로', shortEn: 'Namhae Mulmi', subKo: '경남 남해군 삼동면·미조면', subEn: 'Namhae, Gyeongnam', catKo: '오션뷰 해안도로', catEn: 'Ocean Coastal Road', feature: '쪽빛 다도해 절벽 & 독일마을 코스', featureEn: 'Emerald Archipelago Cliffs & German Village', descKo: '다랭이논과 독일마을, 기암절벽 사이로 쪽빛 남해 바다가 끊임없이 차창 밖으로 스쳐 지나가는 남도 대표 드라이브입니다.', descEn: 'One of southern Korea’s most poetic coastal roads, hugging emerald sea cliffs and charming village vistas.', top: 720, left: 475 },
    { id: 'pin-drive-07', num: 7, region: 'gyeongnam', icon: '🏙️', nameKo: '부산 산복도로 & 황령산 순환로', nameEn: 'Busan Sanbok-doro & Hwangnyeongsan Drive', shortKo: '부산 산복도로', shortEn: 'Sanbok-doro Route', subKo: '부산 중구·동구·부산진구', subEn: 'Busan', catKo: '고지대 전망 드라이브', catEn: 'Highland Skyline Route', feature: '부산항·광안대교 한눈에 품는 고지대', featureEn: 'Harbor & Marine Bridge Skyline View', descKo: '산허리를 가로지르는 산복도로와 황령산 봉수대로 이어지는 코스로, 부산 도심과 바다, 다리가 빚어내는 입체적 풍경을 달립니다.', descEn: 'A unique hillside mountain circuit overlooking Busan Port, dense hillside communities, and marine bridges.', top: 640, left: 575 },
    { id: 'pin-drive-08', num: 8, region: 'jeju', icon: '🌅', nameKo: '제주 신창풍차해안도로', nameEn: 'Jeju Sinchang Windmill Coastal Drive', shortKo: '신창풍차해안로', shortEn: 'Sinchang Windmill', subKo: '제주 제주시 한경면', subEn: 'Hangyeong, Jeju', catKo: '노을·일몰 드라이브', catEn: 'Sunset Windmill Drive', feature: '에메랄드 바다 위 거대 풍차 & 일몰', featureEn: 'Giant Offshore Windmills & Sunset', descKo: '제주 서쪽 에메랄드빛 바다 위에 줄지어 서 있는 거대한 해상 풍력발전기와 황금빛 노을이 이국적인 장관을 이룹니다.', descEn: 'Jeju’s signature sunset road where massive white wind turbines rise gracefully from crystal-clear coastal waters.', top: 885, left: 225 },
    { id: 'pin-drive-09', num: 9, region: 'gyeonggi', icon: '🏔️', nameKo: '포천 산정호수 & 백운계곡 카라멜고개', nameEn: 'Pocheon Sanjeong Lake & Baegun Valley Pass', shortKo: '포천 백운고개', shortEn: 'Baegun Pass Drive', subKo: '경기 포천시 이동면', subEn: 'Pocheon, Gyeonggi', catKo: '설경·호수 드라이브', catEn: 'Winter Lake & Valley Route', feature: '겨울 빙벽과 호수, 수도권 와인딩', featureEn: 'Winter Ice Wall & Lake Mountain Pass', descKo: '호젓한 산정호수 둘레를 지나 광덕산 카라멜고개로 이어지는 와인딩 코스로, 백운계곡의 웅장한 빙벽 축제를 함께 만납니다.', descEn: 'A beloved winter weekend driving escape from northern Seoul, featuring pristine alpine lakes and frozen waterfall cliffs.', top: 175, left: 325 },
    { id: 'pin-drive-10', num: 10, region: 'chungnam', icon: '🌉', nameKo: '태안 안면도 꽃지~영목항 원산안면대교', nameEn: 'Taean Anmyeon-do & Wonsan Bridge Highway', shortKo: '안면도 해안도로', shortEn: 'Anmyeon-do Bridge', subKo: '충남 태안군 안면읍·고남면', subEn: 'Taean, Chungnam', catKo: '해상교량·오션 드라이브', catEn: 'Coastal Highway & Bridge', feature: '울창한 안면송 숲길과 서해 낙조', featureEn: 'Pine Forest & Marine Bridge Sunset', descKo: '피톤치드 가득한 소나무 숲길을 지나 서해안 3대 낙조 꽃지해변과 원산안면대교 바다 위를 시원하게 질주하는 코스입니다.', descEn: 'Driving through famed Anmyeon pine forests towards scenic sunset beaches and the grand Wonsan-Anmyeon sea bridge.', top: 380, left: 215 }
  ];
  const DRIVE_COURSE_MAP = new Map(DRIVE_COURSE_DATA.map(s => [s.id, s]));`;

if (!html.includes(dataAnchor)) {
  console.error('Cannot find dataAnchor');
  process.exit(1);
}
html = html.replace(dataAnchor, newDatasets);
console.log('4. Datasets injected.');

// 5. appState.layers 에 nightView: true, driveCourse: true 추가
const layersAnchor = `      skiSled: true,    // 전국 스키·눈썰매장 (20선) ON/OFF
      userPlaces: true  // 사용자 추천 장소 ON/OFF`;
const newLayers = `      skiSled: true,    // 전국 스키·눈썰매장 (20선) ON/OFF
      nightView: true,  // 전국 야경 & 불꽃·빛축제 (10선) ON/OFF
      driveCourse: true,// 전국 오션뷰 & 설경 드라이브 코스 (10선) ON/OFF
      userPlaces: true  // 사용자 추천 장소 ON/OFF`;

if (!html.includes(layersAnchor)) {
  console.error('Cannot find layersAnchor');
  process.exit(1);
}
html = html.replace(layersAnchor, newLayers);
console.log('5. appState.layers updated.');

// 6. renderNightViewPins & renderDriveCoursePins 함수 추가
const renderAnchor = '  function renderSkiSledPins() {';
const newRenderFns = `  function renderNightViewPins() {
    const container = document.getElementById('nightViewPinsContainer');
    if (!container || container.childElementCount > 0) return;

    const isEn = appState.lang === 'en';
    const isLayerOn = Boolean(appState.layers.nightView);
    const frag = document.createDocumentFragment();

    NIGHT_VIEW_DATA.forEach(s => {
      const safePos = typeof clampToProvinceLand === 'function'
        ? clampToProvinceLand(s.left, s.top, s.region)
        : { top: s.top, left: s.left };

      const pinEl = document.createElement('div');
      pinEl.className = 'pin night-pin' + (isLayerOn ? '' : ' hidden-layer');
      pinEl.id = s.id;
      pinEl.setAttribute('data-layer', 'nightView');
      pinEl.setAttribute('data-region', s.region);
      pinEl.setAttribute('data-name-ko', s.nameKo);
      pinEl.setAttribute('data-name-en', s.nameEn);
      pinEl.setAttribute('data-sub-ko', s.subKo);
      pinEl.setAttribute('data-sub-en', s.subEn);
      pinEl.setAttribute('data-cat-ko', s.catKo);
      pinEl.setAttribute('data-cat-en', s.catEn);
      pinEl.setAttribute('data-icon', s.icon);
      pinEl.style.top = safePos.top + 'px';
      pinEl.style.left = safePos.left + 'px';

      const titleText = isEn ? s.shortEn : s.shortKo;
      const badgeText = isEn ? s.featureEn : s.feature;
      pinEl.innerHTML = \`
        <span class="pin-title">\${titleText}</span>
        <div class="pin-data"><span class="spa-pin-badge">\${s.icon} \${badgeText}</span></div>
        <div class="pin-dot"></div>
      \`;
      frag.appendChild(pinEl);
    });
    container.appendChild(frag);
  }

  function renderDriveCoursePins() {
    const container = document.getElementById('driveCoursePinsContainer');
    if (!container || container.childElementCount > 0) return;

    const isEn = appState.lang === 'en';
    const isLayerOn = Boolean(appState.layers.driveCourse);
    const frag = document.createDocumentFragment();

    DRIVE_COURSE_DATA.forEach(s => {
      const safePos = typeof clampToProvinceLand === 'function'
        ? clampToProvinceLand(s.left, s.top, s.region)
        : { top: s.top, left: s.left };

      const pinEl = document.createElement('div');
      pinEl.className = 'pin drive-pin' + (isLayerOn ? '' : ' hidden-layer');
      pinEl.id = s.id;
      pinEl.setAttribute('data-layer', 'driveCourse');
      pinEl.setAttribute('data-region', s.region);
      pinEl.setAttribute('data-name-ko', s.nameKo);
      pinEl.setAttribute('data-name-en', s.nameEn);
      pinEl.setAttribute('data-sub-ko', s.subKo);
      pinEl.setAttribute('data-sub-en', s.subEn);
      pinEl.setAttribute('data-cat-ko', s.catKo);
      pinEl.setAttribute('data-cat-en', s.catEn);
      pinEl.setAttribute('data-icon', s.icon);
      pinEl.style.top = safePos.top + 'px';
      pinEl.style.left = safePos.left + 'px';

      const titleText = isEn ? s.shortEn : s.shortKo;
      const badgeText = isEn ? s.featureEn : s.feature;
      pinEl.innerHTML = \`
        <span class="pin-title">\${titleText}</span>
        <div class="pin-data"><span class="spa-pin-badge">\${s.icon} \${badgeText}</span></div>
        <div class="pin-dot"></div>
      \`;
      frag.appendChild(pinEl);
    });
    container.appendChild(frag);
  }

  function renderSkiSledPins() {`;

if (!html.includes(renderAnchor)) {
  console.error('Cannot find renderAnchor');
  process.exit(1);
}
html = html.replace(renderAnchor, newRenderFns);
console.log('6. Render functions added.');

// 7. showDetailCard 에 nightView & driveCourse 분기 추가
const detailAnchor = `    } else if (layer === 'skiSled') {
      const ski = SKI_SLED_MAP.get(pin.id);
      if (!ski) return;

      const displayFeature = isEn ? (ski.featureEn || ski.feature) : ski.feature;
      const displayDesc = isEn ? (ski.descEn || ski.descKo) : ski.descKo;
      const badgePrefix = ski.type === 'sled'
        ? (isEn ? 'Snow Sled #' : '전국 눈썰매장 #')
        : (isEn ? 'Ski Resort #' : '전국 스키장 #');

      badgesEl.innerHTML = \`
        <span class="detail-badge-num" style="background: #0891b2;">\${badgePrefix}\${ski.num}</span>
        <span class="detail-badge-cat">\${ski.icon} \${isEn ? ski.catEn : ski.catKo}</span>
        <span class="detail-badge-loc">📍 \${isEn ? ski.subEn : ski.subKo}</span>
      \`;
      titleEl.textContent = isEn ? ski.nameEn : ski.nameKo;
      subEl.textContent = \`\${ski.icon} \${displayFeature} · \${isEn ? ski.subEn : ski.subKo}\`;
      descEl.textContent = displayDesc;
      descEl.style.display = 'block';
      card.classList.add('visible');`;

const newDetailBranches = `${detailAnchor}
    } else if (layer === 'nightView') {
      const night = NIGHT_VIEW_MAP.get(pin.id);
      if (!night) return;

      const displayFeature = isEn ? (night.featureEn || night.feature) : night.feature;
      const displayDesc = isEn ? (night.descEn || night.descKo) : night.descKo;

      badgesEl.innerHTML = \`
        <span class="detail-badge-num" style="background: #d97706;">\${isEn ? 'Night View #' : '전국 야경·빛축제 #'}\${night.num}</span>
        <span class="detail-badge-cat">\${night.icon} \${isEn ? night.catEn : night.catKo}</span>
        <span class="detail-badge-loc">📍 \${isEn ? night.subEn : night.subKo}</span>
      \`;
      titleEl.textContent = isEn ? night.nameEn : night.nameKo;
      subEl.textContent = \`\${night.icon} \${displayFeature} · \${isEn ? night.subEn : night.subKo}\`;
      descEl.textContent = displayDesc;
      descEl.style.display = 'block';
      card.classList.add('visible');
    } else if (layer === 'driveCourse') {
      const drive = DRIVE_COURSE_MAP.get(pin.id);
      if (!drive) return;

      const displayFeature = isEn ? (drive.featureEn || drive.feature) : drive.feature;
      const displayDesc = isEn ? (drive.descEn || drive.descKo) : drive.descKo;

      badgesEl.innerHTML = \`
        <span class="detail-badge-num" style="background: #0284c7;">\${isEn ? 'Drive Course #' : '전국 드라이브 #'}\${drive.num}</span>
        <span class="detail-badge-cat">\${drive.icon} \${isEn ? drive.catEn : drive.catKo}</span>
        <span class="detail-badge-loc">📍 \${isEn ? drive.subEn : drive.subKo}</span>
      \`;
      titleEl.textContent = isEn ? drive.nameEn : drive.nameKo;
      subEl.textContent = \`\${drive.icon} \${displayFeature} · \${isEn ? drive.subEn : drive.subKo}\`;
      descEl.textContent = displayDesc;
      descEl.style.display = 'block';
      card.classList.add('visible');`;

if (!html.includes(detailAnchor)) {
  console.error('Cannot find detailAnchor');
  process.exit(1);
}
html = html.replace(detailAnchor, newDetailBranches);
console.log('7. showDetailCard branches added.');

// 8. syncLayersUI 에 layerDomMap 과 렌더링 호출 추가
const syncAnchor = `      skiSled: ['tabSkiSledBtn', 'skiSledStatePill'],
      userPlaces: ['tabUserPlacesBtn', 'userPlacesStatePill']`;
const newSyncMap = `      skiSled: ['tabSkiSledBtn', 'skiSledStatePill'],
      nightView: ['tabNightViewBtn', 'nightViewStatePill'],
      driveCourse: ['tabDriveCourseBtn', 'driveCourseStatePill'],
      userPlaces: ['tabUserPlacesBtn', 'userPlacesStatePill']`;

if (!html.includes(syncAnchor)) {
  console.error('Cannot find syncAnchor');
  process.exit(1);
}
html = html.replace(syncAnchor, newSyncMap);

const renderCallsAnchor = `    renderSkiSledPins();
    renderUserPins();`;
const newRenderCalls = `    renderSkiSledPins();
    renderNightViewPins();
    renderDriveCoursePins();
    renderUserPins();`;

if (!html.includes(renderCallsAnchor)) {
  console.error('Cannot find renderCallsAnchor');
  process.exit(1);
}
html = html.replace(renderCallsAnchor, newRenderCalls);
console.log('8. syncLayersUI updated.');

// 9. updatePinLabelsForLang 에 night & drive 라벨 갱신 추가
const pinLabelsAnchor = `    // 전국 스키장·눈썰매장 핀 타이틀 및 배지 갱신
    document.querySelectorAll('.ski-pin').forEach(pin => {
      const titleEl = pin.querySelector('.pin-title');
      const badgeEl = pin.querySelector('.spa-pin-badge');
      const ski = SKI_SLED_MAP.get(pin.id);
      if (titleEl && ski) {
        titleEl.textContent = isEn ? ski.shortEn : ski.shortKo;
      }
      if (badgeEl && ski) {
        badgeEl.textContent = \`\${ski.icon} \${isEn ? ski.featureEn : ski.feature}\`;
      }
    });`;

const newPinLabels = `${pinLabelsAnchor}

    // 전국 야경·빛축제 핀 타이틀 및 배지 갱신
    document.querySelectorAll('.night-pin').forEach(pin => {
      const titleEl = pin.querySelector('.pin-title');
      const badgeEl = pin.querySelector('.spa-pin-badge');
      const night = NIGHT_VIEW_MAP.get(pin.id);
      if (titleEl && night) {
        titleEl.textContent = isEn ? night.shortEn : night.shortKo;
      }
      if (badgeEl && night) {
        badgeEl.textContent = \`\${night.icon} \${isEn ? night.featureEn : night.feature}\`;
      }
    });

    // 전국 드라이브 코스 핀 타이틀 및 배지 갱신
    document.querySelectorAll('.drive-pin').forEach(pin => {
      const titleEl = pin.querySelector('.pin-title');
      const badgeEl = pin.querySelector('.spa-pin-badge');
      const drive = DRIVE_COURSE_MAP.get(pin.id);
      if (titleEl && drive) {
        titleEl.textContent = isEn ? drive.shortEn : drive.shortKo;
      }
      if (badgeEl && drive) {
        badgeEl.textContent = \`\${drive.icon} \${isEn ? drive.featureEn : drive.feature}\`;
      }
    });`;

if (!html.includes(pinLabelsAnchor)) {
  console.error('Cannot find pinLabelsAnchor');
  process.exit(1);
}
html = html.replace(pinLabelsAnchor, newPinLabels);
console.log('9. updatePinLabelsForLang updated.');

// 10. updateI18nUI 에 타이틀, 범례 칩, 단일/복수 분기 추가
const i18nFlagsAnchor = `    const hasSkiSled = Boolean(appState.layers.skiSled);
    const hasUser = Boolean(appState.layers.userPlaces);`;
const newI18nFlags = `    const hasSkiSled = Boolean(appState.layers.skiSled);
    const hasNight = Boolean(appState.layers.nightView);
    const hasDrive = Boolean(appState.layers.driveCourse);
    const hasUser = Boolean(appState.layers.userPlaces);`;

if (!html.includes(i18nFlagsAnchor)) {
  console.error('Cannot find i18nFlagsAnchor');
  process.exit(1);
}
html = html.replace(i18nFlagsAnchor, newI18nFlags);

const activeListAnchor = `    if (hasSkiSled) activeList.push('skiSled');
    if (hasUser) activeList.push('userPlaces');`;
const newActiveList = `    if (hasSkiSled) activeList.push('skiSled');
    if (hasNight) activeList.push('nightView');
    if (hasDrive) activeList.push('driveCourse');
    if (hasUser) activeList.push('userPlaces');`;

if (!html.includes(activeListAnchor)) {
  console.error('Cannot find activeListAnchor');
  process.exit(1);
}
html = html.replace(activeListAnchor, newActiveList);

// 탭 버튼 라벨
const tabLabelAnchor = `    const skiSledLabel = document.getElementById('tabSkiSledLabel');
    if (skiSledLabel) skiSledLabel.textContent = isEn ? 'Ski & Sled (20)' : '스키·눈썰매 (20선)';`;
const newTabLabels = `${tabLabelAnchor}
    const nightViewLabel = document.getElementById('tabNightViewLabel');
    if (nightViewLabel) nightViewLabel.textContent = isEn ? 'Night Views (10)' : '야경·빛축제 (10선)';
    const driveCourseLabel = document.getElementById('tabDriveCourseLabel');
    if (driveCourseLabel) driveCourseLabel.textContent = isEn ? 'Drive Scenic (10)' : '드라이브 코스 (10선)';`;

if (!html.includes(tabLabelAnchor)) {
  console.error('Cannot find tabLabelAnchor');
  process.exit(1);
}
html = html.replace(tabLabelAnchor, newTabLabels);

// 단일 레이어 분기
const singleLayerAnchor = `      } else if (singleLayer === 'userPlaces') {`;
const newSingleLayers = `      } else if (singleLayer === 'nightView') {
        headerTitle.textContent = isEn ? '2026 Korea Night Views & Light Festivals (Top 10)' : '2026 전국 야경 & 불꽃·빛축제 (10선) 명소 지도';
        legendBar.innerHTML = isEn
          ? '<span class="legend-chip" data-cat-query="City" data-legend-tag="night-city" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌃 City & Tower</span><span class="legend-chip" data-cat-query="Light Fest" data-legend-tag="night-light" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">✨ Light Festival</span><span class="legend-chip" data-cat-query="Bridge" data-legend-tag="night-water" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌉 Ocean & Bridge</span><span class="legend-chip" data-cat-query="Palace" data-legend-tag="night-palace" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🏮 Palace & Heritage</span>'
          : '<span class="legend-chip" data-cat-query="도심·타워" data-legend-tag="night-city" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌃 도심·타워 야경</span><span class="legend-chip" data-cat-query="빛축제" data-legend-tag="night-light" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">✨ 빛축제·미디어아트</span><span class="legend-chip" data-cat-query="교량·해양" data-legend-tag="night-water" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌉 교량·해양 야경</span><span class="legend-chip" data-cat-query="고궁·한옥" data-legend-tag="night-palace" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🏮 고궁·한옥 야경</span>';
        headerHint.textContent = isEn
          ? '🔍 Korea top 10 night views, drone shows, and light festivals. Click a pin to view details and map directions.'
          : '🔍 인스타그램에서 가장 뜨거운 전국 대표 야경·빛축제 10곳을 확인하고 4대 지도로 바로 찾아가보세요.';
        footerSource.textContent = isEn
          ? 'Source: Nationwide Curated Night Tourism & Light Festivals Directory'
          : '데이터 출처: 전국 주요 지자체 야간관광 특화도시 및 대표 빛축제 안내';
      } else if (singleLayer === 'driveCourse') {
        headerTitle.textContent = isEn ? '2026 Korea Scenic Ocean View & Mountain Drive Courses (Top 10)' : '전국 오션뷰 & 설경 드라이브 코스 (10선) 명소 지도';
        legendBar.innerHTML = isEn
          ? '<span class="legend-chip" data-cat-query="Ocean" data-legend-tag="drive-ocean" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌊 Ocean Coast</span><span class="legend-chip" data-cat-query="Mountain" data-legend-tag="drive-mountain" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🏔️ Mountain & Pass</span><span class="legend-chip" data-cat-query="Sunset" data-legend-tag="drive-sunset" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌅 Sunset & Windmill</span><span class="legend-chip" data-cat-query="Bridge" data-legend-tag="drive-bridge" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌉 Sea Bridge</span>'
          : '<span class="legend-chip" data-cat-query="해안도로" data-legend-tag="drive-ocean" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌊 오션뷰 해안도로</span><span class="legend-chip" data-cat-query="설경·고갯길" data-legend-tag="drive-mountain" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🏔️ 설경·고갯길 와인딩</span><span class="legend-chip" data-cat-query="노을·일몰" data-legend-tag="drive-sunset" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌅 노을·풍차 드라이브</span><span class="legend-chip" data-cat-query="해상교량" data-legend-tag="drive-bridge" onclick="filterByLegendCategory(this.dataset.catQuery, this.dataset.legendTag)">🌉 해상교량 드라이브</span>';
        headerHint.textContent = isEn
          ? '🔍 Korea top 10 scenic driving routes. Click a pin to launch one-click Naver or TMAP navigation.'
          : '🔍 주말 나들이와 겨울 힐링을 위한 전국 대표 10대 드라이브 코스를 네이버·티맵 내비게이션으로 바로 연결하세요.';
        footerSource.textContent = isEn
          ? 'Source: Ministry of Land, Infrastructure and Transport Scenic Roads & Tourism Guides'
          : '데이터 출처: 국토교통부 선정 한국의 아름다운 도로 및 지자체 명품 드라이브 코스';
      } else if (singleLayer === 'userPlaces') {`;

if (!html.includes(singleLayerAnchor)) {
  console.error('Cannot find singleLayerAnchor');
  process.exit(1);
}
html = html.replace(singleLayerAnchor, newSingleLayers);

// 복수 레이어 타이틀 조립
const multiTitleAnchor = `      if (hasSkiSled) { titleNamesKo.push('스키·눈썰매(20선)'); titleNamesEn.push('Ski & Sled (20)'); }
      if (hasUser) { titleNamesKo.push('추천 장소'); titleNamesEn.push('User Spots'); }`;
const newMultiTitles = `      if (hasSkiSled) { titleNamesKo.push('스키·눈썰매(20선)'); titleNamesEn.push('Ski & Sled (20)'); }
      if (hasNight) { titleNamesKo.push('야경·빛축제(10선)'); titleNamesEn.push('Night Views (10)'); }
      if (hasDrive) { titleNamesKo.push('드라이브(10선)'); titleNamesEn.push('Drive Scenic (10)'); }
      if (hasUser) { titleNamesKo.push('추천 장소'); titleNamesEn.push('User Spots'); }`;

if (!html.includes(multiTitleAnchor)) {
  console.error('Cannot find multiTitleAnchor');
  process.exit(1);
}
html = html.replace(multiTitleAnchor, newMultiTitles);
console.log('10. updateI18nUI updated.');

// 11. buildSpotList 에 isPinNightView & isPinDriveCourse 분기 추가
const spotListAnchor = `      const isPinSpa = pinLayer === 'winterSpa';
      const isPinSauna = pinLayer === 'sauna';
      const isPinSkiSled = pinLayer === 'skiSled';
      const isPinUser = pinLayer === 'userPlaces';`;

const newSpotListFlags = `      const isPinSpa = pinLayer === 'winterSpa';
      const isPinSauna = pinLayer === 'sauna';
      const isPinSkiSled = pinLayer === 'skiSled';
      const isPinNight = pinLayer === 'nightView';
      const isPinDrive = pinLayer === 'driveCourse';
      const isPinUser = pinLayer === 'userPlaces';`;

if (!html.includes(spotListAnchor)) {
  console.error('Cannot find spotListAnchor');
  process.exit(1);
}
html = html.replace(spotListAnchor, newSpotListFlags);

const spotBranchAnchor = `      } else if (isPinUser) {`;
const newSpotBranches = `      } else if (isPinNight) {
        const night = NIGHT_VIEW_MAP.get(pinId);
        const nameKo = pin.getAttribute('data-name-ko') || '';
        const nameEn = pin.getAttribute('data-name-en') || '';
        const subKo = pin.getAttribute('data-sub-ko') || '';
        const subEn = pin.getAttribute('data-sub-en') || '';
        const feature = night ? night.feature : '';
        const featureEn = night ? (night.featureEn || '') : '';
        const descKo = night ? night.descKo : '';
        const descEn = night ? (night.descEn || '') : '';
        displayTitle = isEn ? nameEn : nameKo;
        regionTagText = isEn ? (subEn.split(',')[0] || REGION_SHORT_I18N.en[region]) : (subKo.split(' ')[0] || REGION_SHORT_I18N.ko[region]);
        rightBadgeText = night ? \`\${night.icon} #\${night.num}\` : '🌃 야경';
        dateScore = night ? night.num : 50;
        legendTags.push('layer-nightView');
        if (['pin-night-01', 'pin-night-05', 'pin-night-06'].includes(pinId)) legendTags.push('night-city');
        if (['pin-night-02', 'pin-night-04'].includes(pinId)) legendTags.push('night-light');
        if (['pin-night-03', 'pin-night-07', 'pin-night-09', 'pin-night-10'].includes(pinId)) legendTags.push('night-water');
        if (['pin-night-08'].includes(pinId)) legendTags.push('night-palace');
        searchCorpus = \`\${nameKo} \${nameEn} \${subKo} \${subEn} \${feature} \${featureEn} \${descKo} \${descEn} 야경 빛축제 드론쇼 불꽃 축제 night view light festival\`.toLowerCase();
      } else if (isPinDrive) {
        const drive = DRIVE_COURSE_MAP.get(pinId);
        const nameKo = pin.getAttribute('data-name-ko') || '';
        const nameEn = pin.getAttribute('data-name-en') || '';
        const subKo = pin.getAttribute('data-sub-ko') || '';
        const subEn = pin.getAttribute('data-sub-en') || '';
        const feature = drive ? drive.feature : '';
        const featureEn = drive ? (drive.featureEn || '') : '';
        const descKo = drive ? drive.descKo : '';
        const descEn = drive ? (drive.descEn || '') : '';
        displayTitle = isEn ? nameEn : nameKo;
        regionTagText = isEn ? (subEn.split(',')[0] || REGION_SHORT_I18N.en[region]) : (subKo.split(' ')[0] || REGION_SHORT_I18N.ko[region]);
        rightBadgeText = drive ? \`\${drive.icon} #\${drive.num}\` : '🚗 드라이브';
        dateScore = drive ? drive.num : 50;
        legendTags.push('layer-driveCourse');
        if (['pin-drive-01', 'pin-drive-03', 'pin-drive-06'].includes(pinId)) legendTags.push('drive-ocean');
        if (['pin-drive-04', 'pin-drive-05', 'pin-drive-09'].includes(pinId)) legendTags.push('drive-mountain');
        if (['pin-drive-02', 'pin-drive-08'].includes(pinId)) legendTags.push('drive-sunset');
        if (['pin-drive-07', 'pin-drive-10'].includes(pinId)) legendTags.push('drive-bridge');
        searchCorpus = \`\${nameKo} \${nameEn} \${subKo} \${subEn} \${feature} \${featureEn} \${descKo} \${descEn} 드라이브 해안도로 와인딩 노을 설경 drive course scenic road\`.toLowerCase();
      } else if (isPinUser) {`;

if (!html.includes(spotBranchAnchor)) {
  console.error('Cannot find spotBranchAnchor');
  process.exit(1);
}
html = html.replace(spotBranchAnchor, newSpotBranches);
console.log('11. buildSpotList branches updated.');

// 12. initApp() 호출 시 초기 렌더링 호출 추가
const initAppAnchor = `    renderSkiSledPins();
    renderUserPins();
    bindPinClickListeners();`;
const newInitApp = `    renderSkiSledPins();
    renderNightViewPins();
    renderDriveCoursePins();
    renderUserPins();
    bindPinClickListeners();`;

if (html.includes(initAppAnchor)) {
  html = html.replace(initAppAnchor, newInitApp);
  console.log('12. initApp updated.');
}

fs.writeFileSync(targetFile, html, 'utf-8');
console.log('🎉 Successfully patched index.html! New length:', html.length);
