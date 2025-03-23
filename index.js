const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors({
  origin: [
    'http://localhost:3000',        // 開発時
    'https://gundamwar.net'  
  ], // Reactを起動しているローカルURL
  credentials: true
}));
app.use(express.json());

// MySQL 接続設定
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 簡易チェック用エンドポイント
app.get('/', (req, res) => {
  res.send('GundamWar API is running!');
});

// 起動
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 APIサーバー起動中: http://localhost:${PORT}`);
});

// traits1の各カラムに対応するラベル（traits1テーブルのカラム名と照合）
const traitLabels = {
  mobileSuits: "MS",
  mobileArmor: "MA",
  mobileFighter: "MF",
  mobileHorse: "モビルホース",
  mobileDoll: "MD",
  superDeformed: "SD",
  combi: "コンビ",
  largeSize: "Lサイズ",
  warship: "艦艇",
  flagship: "旗艦",
  supplyShip: "補給艦",
  transportShip: "輸送艦",
  dockShip: "ドッグ艦",
  fighter: "戦闘機",
  recon: "偵察機",
  transport: "輸送機",
  airship: "飛行船",
  tank: "戦車",
  bike: "バイク",
  orbitalElevator: "軌道エレベーター",
  male: "男性",
  female: "女性",
  adult: "大人",
  child: "子供",
  newType: "NT",
  coordinator: "CO",
  gundamFighter: "GF",
  boostedMan: "ブーステッドマン",
  extended: "エクステンデッド",
  innovator: "イノベイター",
  superSoldier: "超兵",
  observer: "監視者",
  move: "移動",
  recover: "回復",
  enhance: "強化",
  regenerate: "再生",
  control: "支配",
  bind: "束縛",
  counter: "対抗",
  deploy: "展開",
  destroy: "破壊",
  reinforce: "補強",
  equipment: "兵装"
};

// setの各カラムに対応するラベル（setテーブルのカラム名と照合）
const setLabels = {
  "1st": "GUNDAM WAR",
  "2nd": "撃墜王出撃",
  "3rd": "宇宙の記憶",
  "4th": "新しき翼",
  "5th": "永久の絆",
  "6th": "新世紀の鼓動",
  "7th": "革新の波濤",
  "8th": "月下の戦塵",
  "9th": "相剋の軌跡",
  "10th": "刻の末裔",
  "11th": "蒼海の死闘",
  "12th": "宿命の螺旋",
  "13th": "烈火の咆哮",
  "14th": "果てなき運命",
  "15th": "禁忌の胎動",
  "16th": "覇王の紋章",
  "17th": "不敗の流派",
  "18th": "戦慄の兵威",
  "19th": "変革の叛旗",
  "20th": "流転する世界",
  "21st": "放たれた刃",
  "22nd": "武神降臨",
  "23rd": "栄光の戦史",
  "24th": "宇宙を駆逐する光",
  "25th": "双極の閃光",
  "26th": "戦いという名の対話",
  "27th": "雷鳴の使徒",
  "28th": "絶対戦力",
  "BB1": "ベースドブースター",
  "BB2": "ベースドブースター2",
  "BB3": "ベースドブースター3",
  "EB1": "エクステンションブースター",
  "EB2": "エクステンションブースター2",
  "EB3": "エクステンションブースター3",
  "DS1_1": "決戦！星一号作戦",
  "DS1_2": "宇宙要塞ア・バオア・クー",
  "DS2_1": "正義の創痕",
  "DS2_2": "黒い覇道",
  "DS2_3": "赤き脅威",
  "DS3": "ギレンの野望編",
  "DS4": "ガンダムSEED編「栄光のザフト」",
  "DS5": "ガンダムSEED DESTINY編「閃光のミネルバ」",
  "DB1": "一年戦争編",
  "DB2": "ウイング",
  "DB3": "ガンダムSEED編",
  "DB4": "戦場の女神",
  "DB5": "ガンダムSEED DESTINY編",
  "DB6": "機動戦士ZガンダムTHE Movie",
  "DB7": "ガンダム・ザ・ガンダム編",
  "DB8": "前線のフォトグラフ",
  "DB9": "戦場の女神2",
  "DB10": "乱世に生きる漢たち",
  "DB11": "戦場の女神ADVENT",
  "TS1_1": "疾風の砲火",
  "TS1_2": "戦乱の兇刃",
  "TS2": "爆炎の決闘場",
  "TS3_1": "知略の猛将",
  "TS3_2": "迅雷の騎兵",
  "TS4_1": "破壊と再生の剣",
  "TS4_2": "異世界からの使者",
  "TR1_1": "白き光芒",
  "TR1_2": "猛き濁流",
  "WS1": "蒼空の覇者",
  "WS2": "純白の鋼翼",
  "WB": "ウィナーズブースター01",
  "SB": "赤い彗星シャア編",
  "CB1": "ガンダムエース編",
  "CB2": "ガンプラ30thメモリアルエディション",
  "EX1": "拡張シート",
  "EX2": "拡張シートVer.2",
  "EX3": "覇王の紋章 ジャンボカードダスVer.",
  "BS": "入門用スターター",
  "EV": "オールウェイズビギニングセット",
  "BG": "BIGガンスリンガーカード",
  "PR": "プロモーションカード",
  "joke": "大会使用不可"
};

  
// ------------------------------
// ヘルパー関数群
// ------------------------------

// 戦闘・射撃・防御条件生成用関数
function addStatRangeCondition(field1, field2, alt1, alt2, min, max, includeAltStats) {
  const conditions = [];
  const params = [];
  
  // 入力が空文字またはundefinedの場合は「指定なし」とみなす
  const isMinSpecified = (min !== "" && min !== undefined);
  const isMaxSpecified = (max !== "" && max !== undefined);

  if (isMinSpecified && isMaxSpecified) {
    if (min === "*" && max === "*") {
      // ルール1: "*" ≦ 条件 ≦ "*" → "*"のみ
      conditions.push(`(${field1} = '*' OR ${field2} = '*'${includeAltStats ? ` OR ${alt1} = '*' OR ${alt2} = '*'` : ''})`);
    } else if (min === "*" && max !== "*") {
      // ルール2: "*" ≦ 条件 ≦ 数字 → "*"または数値が max 以下
      conditions.push(`((${field1} = '*' OR ${field2} = '*') OR ((${field1} IS NOT NULL AND ${field1} <= ?) OR (${field2} IS NOT NULL AND ${field2} <= ?))${includeAltStats ? ` OR ((${alt1} IS NOT NULL AND ${alt1} <= ?) OR (${alt2} IS NOT NULL AND ${alt2} <= ?))` : ''})`);
      params.push(max, max);
      if (includeAltStats) {
        params.push(max, max);
      }
    } else if (min !== "*" && max !== "*") {
      // ルール3: 数字 ≦ 条件 ≦ 数字 → BETWEEN で範囲指定
      conditions.push(`(((${field1} IS NOT NULL AND ${field1} BETWEEN ? AND ?) OR (${field2} IS NOT NULL AND ${field2} BETWEEN ? AND ?))${includeAltStats ? ` OR ((${alt1} IS NOT NULL AND ${alt1} BETWEEN ? AND ?) OR (${alt2} IS NOT NULL AND ${alt2} BETWEEN ? AND ?))` : ''})`);
      params.push(min, max, min, max);
      if (includeAltStats) {
        params.push(min, max, min, max);
      }
    } else if (min !== "*" && max === "*") {
      // ルール4: 数字 ≦ 条件 ≦ 指定なし → stat が min 以上
      conditions.push(`(((${field1} IS NOT NULL AND ${field1} >= ?) OR (${field2} IS NOT NULL AND ${field2} >= ?))${includeAltStats ? ` OR ((${alt1} IS NOT NULL AND ${alt1} >= ?) OR (${alt2} IS NOT NULL AND ${alt2} >= ?))` : ''})`);
      params.push(min, min);
      if (includeAltStats) {
        params.push(min, min);
      }
    }
  } else if (isMinSpecified && !isMaxSpecified) {
    // ルール4: 指定なし ≦ 条件 ≦ 指定なしの場合は、min が指定されていれば stat >= min
    if (min === "*") {
      conditions.push(`(${field1} = '*' OR ${field2} = '*'${includeAltStats ? ` OR ${alt1} = '*' OR ${alt2} = '*'` : ''})`);
    } else {
      conditions.push(`(((${field1} IS NOT NULL AND ${field1} >= ?) OR (${field2} IS NOT NULL AND ${field2} >= ?))${includeAltStats ? ` OR ((${alt1} IS NOT NULL AND ${alt1} >= ?) OR (${alt2} IS NOT NULL AND ${alt2} >= ?))` : ''})`);
      params.push(min, min);
      if (includeAltStats) {
        params.push(min, min);
      }
    }
  } else if (!isMinSpecified && isMaxSpecified) {
    // ルール5/6: 指定なし ≦ 条件 ≦ 数字 または "*" → 
    // max が "*" の場合は "*" のみ、そうでなければ stat <= max
    if (max === "*") {
      conditions.push(`(${field1} = '*' OR ${field2} = '*'${includeAltStats ? ` OR ${alt1} = '*' OR ${alt2} = '*'` : ''})`);
    } else {
      conditions.push(`(((${field1} IS NOT NULL AND ${field1} <= ?) OR (${field2} IS NOT NULL AND ${field2} <= ?))${includeAltStats ? ` OR ((${alt1} IS NOT NULL AND ${alt1} <= ?) OR (${alt2} IS NOT NULL AND ${alt2} <= ?))` : ''})`);
      params.push(max, max);
      if (includeAltStats) {
        params.push(max, max);
      }
    }
  }
  
  return { condition: conditions.join(' '), params };
}

function extractSetInclusion(row) {
  const includedSets = [];
  for (const code in setLabels) {
    if (row[code] === 1) {
      includedSets.push(setLabels[code]);
    }
  }
  return includedSets;
}

// traits1 のデータをカード単位に変換する関数
function convertT1RowToTraits(row) {
  const traits = [];
  // traitLabels の各カラムについて、値が 1 ならラベルを追加
  for (const col in traitLabels) {
    if (row[col] === 1) {
      traits.push(traitLabels[col]);
    }
  }
  return traits;
}

// traits2 の抽出（JOIN結果からセットにまとめる）
function extractTraits2(rows) {
  const map = {};
  for (const row of rows) {
    if (!row.cardId || !row.traitsName) continue;
    if (!map[row.cardId]) map[row.cardId] = new Set();
    map[row.cardId].add(row.traitsName);
  }
  return map;
}

// card_text のマージ処理
function mergeCardTexts(texts) {
  let result = '';
  let tempLine = [];
  for (const t of texts) {
    const timing = Number(t.timing);
    if (timing === 0) {
      tempLine.push(t.text);
    } else {
      if (tempLine.length > 0) {
        result += tempLine.join(' ') + '\n';
        tempLine = [];
      }
      result += t.text + '\n';
    }
  }
  if (tempLine.length > 0) {
    result += tempLine.join(' ');
  }
  return result.trim();
}

// 結果をカード単位にグループ化・整形する関数
function formatCardResults(results) {
  const grouped = {};
  for (const row of results) {
    const id = row.cardId;
    if (!grouped[id]) {
      grouped[id] = {
        ...row,
        text_normal: '',
        text_alt: '',
        texts_normal_raw: [],
        texts_alt_raw: [],
        sets:[]
      };
    }
    if (row.text_raw == null) continue;
    const timing = Number(row.text_timing);
    const branch = Number(row.text_branch);
    const isAlt = Number(row.text_alt) === 1;
    const targetList = isAlt ? grouped[id].texts_alt_raw : grouped[id].texts_normal_raw;
    const exists = targetList.some(t =>
      Number(t.branch) === branch &&
      Number(t.timing) === timing &&
      t.text.trim() === row.text_raw.trim()
    );
    if (!exists) {
      targetList.push({ branch: branch, timing: timing, text: row.text_raw });
    }
  }
  for (const id in grouped) {
    const card = grouped[id];
    const sortedNormal = card.texts_normal_raw.sort((a, b) => Number(a.branch) - Number(b.branch));
    const sortedAlt = card.texts_alt_raw.sort((a, b) => Number(a.branch) - Number(b.branch));
    card.text_normal = mergeCardTexts(sortedNormal);
    card.text_alt = mergeCardTexts(sortedAlt);
    delete card.texts_normal_raw;
    delete card.texts_alt_raw;
    card.sets = extractSetInclusion(card);
  }
  return Object.values(grouped).map(card => {
    const result = { ...card };
    if (!result.text_normal || !result.text_normal.trim()) {
      delete result.text_normal;
    }
    if (!result.text_alt || !result.text_alt.trim()) {
      delete result.text_alt;
    }
    // traits2は後で追加するので、ここで traits は t1 のみ
    result.traits = [];
    return result;
  });
}

// ------------------------------
// 検索APIエンドポイント
// ------------------------------
app.post('/api/search', (req, res) => {
  const { 
    name, 
    cardType, 
    colorInclude, 
    colorExclude, 
    colorMulti, 
    text, 
    fightMin,
    fightMax,
    shootMin,
    shootMax,
    defenseMin,
    defenseMax,
    includeAltStats,
    terrain,
    unitFeature,
    unitFeatureExtra,
    charFeature,
    charFeatureExtra,
    otherFeature,
    traits_logic,
    traitText,
    setIncluded,
    setFeatureExtraBB,
    setFeatureExtraST,
    setFeatureExtraDB,
    setFeatureExtraEX,
    deckRangeType,
    deckRangeDetail,
    page: rawPage,
    pageSize: rawPageSize
  } = req.body;

  let conditions = [];
  let params = [];

  // カード名検索
  if (name) {
    conditions.push(`cd.name LIKE ?`);
    params.push(`%${name}%`);
  }

  // カードタイプ検索
  if (cardType && cardType.length > 0) {
    let expandedCardType = [];
    cardType.forEach(val => {
      if (val === 4 || val === "4") {
        expandedCardType.push(4, 5, 6, 7, 8, 9);
      } else {
        expandedCardType.push(Number(val));
      }
    });
    expandedCardType = [...new Set(expandedCardType)];
    const placeholders = expandedCardType.map(() => '?').join(',');
    conditions.push(`cd.cardType IN (${placeholders})`);
    params.push(...expandedCardType);
  }

  // 色検索（含む）
  if (colorInclude && colorInclude.length > 0) {
    const includeConditions = colorInclude.map(() => `(cd.spPowerColor1 = ? OR cd.spPowerColor2 = ?)`);
    conditions.push(`(${includeConditions.join(' OR ')})`);
    colorInclude.forEach(c => {
      params.push(c, c);
    });
  }

  // 色検索（除外）
  if (colorExclude && colorExclude.length > 0) {
    const placeholders = colorExclude.map(() => '?').join(',');
    conditions.push(`((cd.spPowerColor1 NOT IN (${placeholders}) OR cd.spPowerColor1 IS NULL) AND (cd.spPowerColor2 NOT IN (${placeholders}) OR cd.spPowerColor2 IS NULL))`);
    params.push(...colorExclude, ...colorExclude);
  }

  // 色多様性
  if (colorMulti === 'not') {
    conditions.push(`(cd.spPowerColor2 IS NULL OR cd.spPowerColor1 = cd.spPowerColor2)`);
  }

  // テキスト検索
  if (text && text.trim()) {
    const keywords = text.trim().split(/\s+/);
    keywords.forEach(keyword => {
      conditions.push(`EXISTS (SELECT 1 FROM card_text ct_sub WHERE ct_sub.cardId = cd.cardId AND ct_sub.cardText LIKE ?)`);
      params.push(`%${keyword}%`);
    });
  }

  // 格闘、射撃、防御条件
  const meleeCond = addStatRangeCondition('cd.melee1', 'cd.melee2', 'cd.altMelee1', 'cd.altMelee2', fightMin, fightMax, includeAltStats);
  if (meleeCond.condition) { conditions.push(meleeCond.condition); params.push(...meleeCond.params); }
  const shootingCond = addStatRangeCondition('cd.shooting1', 'cd.shooting2', 'cd.altShooting1', 'cd.altShooting2', shootMin, shootMax, includeAltStats);
  if (shootingCond.condition) { conditions.push(shootingCond.condition); params.push(...shootingCond.params); }
  const defenseCond = addStatRangeCondition('cd.defense1', 'cd.defense2', 'cd.altDefense1', 'cd.altDefense2', defenseMin, defenseMax, includeAltStats);
  if (defenseCond.condition) { conditions.push(defenseCond.condition); params.push(...defenseCond.params); }

  // 地形検索
  if (terrain && terrain.length > 0) {
    const terrainMap = { "宇宙": "ts.space", "地球": "ts.earth" };
    terrain.forEach(t => {
      if (terrainMap[t]) { conditions.push(`${terrainMap[t]} = 1`); }
    });
  }

  // react-select からのオブジェクト配列の値抽出
  const unitFeatureExtraRaw = unitFeatureExtra || [];
  const unitFeatureExtraValue = unitFeatureExtraRaw.map(opt => opt.value);
  const charFeatureExtraRaw = charFeatureExtra || [];
  const charFeatureExtraValue = charFeatureExtraRaw.map(opt => opt.value);

  // 全特徴（traits1 は後で別途取得するので、JOIN条件に含める場合のみ）
  const allTraits = [
    ...(unitFeature || []),
    ...unitFeatureExtraValue,
    ...(charFeature || []),
    ...charFeatureExtraValue,
    ...(otherFeature || [])
  ];
  if (allTraits.length > 0) {
    const traitConds = allTraits.map(trait => `${trait} = 1`);
    const traitJoiner = traits_logic === 'or' ? ' OR ' : ' AND ';
    conditions.push(`cd.cardId IN (SELECT cardId FROM traits1 WHERE ${traitConds.join(traitJoiner)})`);
  }

  // traitText 検索（traits2）
  if (traitText && traitText.trim() !== "") {
    const keywords = traitText.trim().split(/\s+/);
    const keywordConds = keywords.map(kw => `EXISTS (SELECT 1 FROM traits2 t2 WHERE t2.cardId = cd.cardId AND t2.traitsName LIKE ?)`);
    const keywordJoiner = traits_logic === 'or' ? ' OR ' : ' AND ';
    conditions.push(`(${keywordConds.join(keywordJoiner)})`);
    params.push(...keywords.map(k => `%${k}%`));
  }
  // 収録弾フィルタ（card_set_inclusionテーブル）
  const allSetValues = [
    ...(setIncluded || []),
    ...(setFeatureExtraBB || []).map(opt => opt.value),
    ...(setFeatureExtraST || []).map(opt => opt.value),
    ...(setFeatureExtraDB || []).map(opt => opt.value),
    ...(setFeatureExtraEX || []).map(opt => opt.value),
  ];

  if (allSetValues.length > 0) {
    const setConds = allSetValues.map(set => `si.\`${set}\` = 1`);
    // si: card_set_inclusion のエイリアス
    conditions.push(`cd.cardId IN (SELECT si.cardId FROM card_set_inclusion si WHERE ${setConds.join(' OR ')})`);
  }

  // 🔽 deckRangeType/deckRangeDetail による構築範囲フィルタ
  if (deckRangeType === 'tensaku' && deckRangeDetail) {
    // deckRangeDetail は "2008-02-28" のような日付文字列
    conditions.push(`cd.releaseDate IS NOT NULL AND cd.releaseDate <= ?`);
    params.push(deckRangeDetail);
}

  // ページングパラメータ
  const page = Number(rawPage || 1);
  const pageSize = Number(rawPageSize || 50);
  const offset = (page - 1) * pageSize;

  const baseWhere = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
  const whereParams = [...params];

  // count クエリ（全体件数取得）
  const countSql = `
    SELECT COUNT(DISTINCT cd.cardId) AS total
    FROM card_data cd
    LEFT JOIN terrain_suitability ts ON cd.cardId = ts.cardId
    LEFT JOIN card_text ct ON cd.cardId = ct.cardId
    LEFT JOIN traits1 t1 ON cd.cardId = t1.cardId
    LEFT JOIN traits2 t2 ON cd.cardId = t2.cardId
    ${baseWhere}
  `;

// 🔽 検索APIエンドポイント本体の中で、mainQuery の代わりに2段階取得

// 1. 抽出対象の cardId を先に取得
const idQuery = `
  SELECT DISTINCT cd.cardId
  FROM card_data cd
  LEFT JOIN terrain_suitability ts ON cd.cardId = ts.cardId
  LEFT JOIN card_text ct ON cd.cardId = ct.cardId
  LEFT JOIN traits1 t1 ON cd.cardId = t1.cardId
  LEFT JOIN traits2 t2 ON cd.cardId = t2.cardId
  ${baseWhere}
  ORDER BY cd.cardId
  LIMIT ? OFFSET ?
`;
const idQueryParams = [...whereParams, pageSize, offset];

pool.query(idQuery, idQueryParams, (err, idResults) => {
  if (err) {
    console.error('cardId抽出エラー:', err);
    return res.status(500).json({ error: 'Database query failed' });
  }

  const cardIds = idResults.map(row => row.cardId);
  if (cardIds.length === 0) {
    return res.json({ total: 0, page: page, pageSize: pageSize, data: [] });
  }

  // 2. 上記 cardId に基づいて詳細データ取得
  const placeholders = cardIds.map(() => '?').join(',');
  const mainQuery = `
    SELECT
      cd.cardId,
      cd.name,
      ctd.cardTypeName AS card_type_name,
      actd.cardTypeName AS alt_card_type_name,
      c1.colorName AS sp_power_color1_name,
      c2.colorName AS sp_power_color2_name,
      cd.spPowerCost1,
      cd.spPowerCost2,
      cd.totalCost,
      cd.resourceCost,
      cd.modelNumber1,
      cd.modelNumber2,
      cd.cardNumber1,
      cd.cardNumber2,
      cd.melee1,
      cd.melee2,
      cd.shooting1,
      cd.shooting2,
      cd.defense1,
      cd.defense2,
      cd.altName,
      cd.altMelee1,
      cd.altMelee2,
      cd.altShooting1,
      cd.altShooting2,
      cd.altDefense1,
      ct.altFlag AS text_alt,
      ct.branch AS text_branch,
      ct.timing AS text_timing,
      ct.cardText AS text_raw,
      ts.space,
      ts.earth,
      t2.traitsName AS t2_traitsName,
      si.*
    FROM card_data cd
    LEFT JOIN card_type_list ctd ON cd.cardType = ctd.cardTypeId
    LEFT JOIN card_type_list actd ON cd.altCardType = actd.cardTypeId
    LEFT JOIN color_list c1 ON cd.spPowerColor1 = c1.colorId
    LEFT JOIN color_list c2 ON cd.spPowerColor2 = c2.colorId
    LEFT JOIN card_text ct ON cd.cardId = ct.cardId
    LEFT JOIN terrain_suitability ts ON cd.cardId = ts.cardId
    LEFT JOIN traits2 t2 ON cd.cardId = t2.cardId
    LEFT JOIN card_set_inclusion si ON cd.cardId = si.cardId
    WHERE cd.cardId IN (${placeholders})
    ORDER BY cd.cardId, ct.altFlag, ct.branch
  `;

  // 1. メインクエリ実行
  pool.query(mainQuery, cardIds, (err, mainResults) => {
    if (err) {
      console.error('メインデータ取得エラー:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    console.log('メインデータ件数:', mainResults.length);
    const cardIds = mainResults.map(row => row.cardId);
    if (cardIds.length === 0) {
      return res.json({ total: 0, page: page, pageSize: pageSize, data: [] });
    }

    // 2. traits1 のデータをカード単位で取得（全カラムを取得して後で変換）
    const t1Query = `
      SELECT *
      FROM traits1
      WHERE cardId IN (${cardIds.map(() => '?').join(',')})
    `;
    pool.query(t1Query, cardIds, (err, t1Results) => {
      if (err) {
        console.error('traits1データ取得エラー:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      // カードIDごとに traits1 の値を変換してマップに格納
      const t1Map = {};
      t1Results.forEach(row => {
        t1Map[row.cardId] = convertT1RowToTraits(row);
      });

      // 3. メイン結果をグループ化・整形
      const formatted = formatCardResults(mainResults);
      // traits2 のデータを事前に抽出
      const t2Map = extractTraits2(mainResults);

      // traits1 + traits2 を結合してマージ
      formatted.forEach(card => {
        const t1 = t1Map[card.cardId] || [];
        const t2 = t2Map[card.cardId] ? Array.from(t2Map[card.cardId]) : [];
        card.traits = [...t1, ...t2];
      });

      // 4. count クエリ実行
      pool.query(countSql, whereParams, (err, countResults) => {
        if (err) {
          console.error('件数取得エラー:', err);
          return res.status(500).json({ error: 'Database query failed' });
        }
        const total = countResults[0].total;
        res.json({
          total: total,
          page: page,
          pageSize: pageSize,
          data: formatted
        });
      });
    });
  });
});
});
