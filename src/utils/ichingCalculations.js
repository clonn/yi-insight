const hexagrams8 = require('../hexagram/hexagram_8.json');
const hexagrams64 = require('../hexagram/hexagram_64.json');

export const getTrigram = (num) => {
  const remainder = num % 8;
  const trigramMapping = ["乾", "兌", "離", "震", "巽", "坎", "艮", "坤"];
  return trigramMapping[(remainder || 8) - 1];
};

export const getHexagram = (lower, upper) => {
  return hexagrams64.find(h => h.lowerTrigram === lower && h.upperTrigram === upper);
};

export const getBinaryFromTrigram = (trigram) => {
  return hexagrams8[trigram].binary;
};

export const calculateResult = async ({
  question,
  xiagua,
  shanggua,
  bianyao,
  setResult,
  setAiInterpretation
}) => {
  try {
    // 計算本卦
    const lowerTrigram = getTrigram(parseInt(xiagua));
    const upperTrigram = getTrigram(parseInt(shanggua));
    const originalHexagram = getHexagram(lowerTrigram, upperTrigram);

    // 計算變卦
    const binaryString = getBinaryFromTrigram(lowerTrigram) + getBinaryFromTrigram(upperTrigram);
    const changedPosition = bianyao % 6 || 6;
    let changedBinary = binaryString.split("");
    changedBinary[changedPosition - 1] = changedBinary[changedPosition - 1] === "1" ? "0" : "1";
    changedBinary = changedBinary.join("");

    const changedLowerTrigram = Object.keys(hexagrams8).find(key => 
      hexagrams8[key].binary === changedBinary.slice(0, 3)
    );
    const changedUpperTrigram = Object.keys(hexagrams8).find(key => 
      hexagrams8[key].binary === changedBinary.slice(3)
    );
    const changedHexagram = getHexagram(changedLowerTrigram, changedUpperTrigram);

    // 構建結果 HTML
    const resultHTML = `
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-xl font-semibold mb-2">問題</h3>
          <p>${question}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">本卦：${originalHexagram ? originalHexagram.name : "未知"}</h3>
          <div class="space-y-2">
            <p class="text-2xl">${hexagrams8[upperTrigram].icon}（上卦：${upperTrigram}）</p>
            <p class="text-2xl">${hexagrams8[lowerTrigram].icon}（下卦：${lowerTrigram}）</p>
            <p>屬性：${hexagrams8[upperTrigram].property}/${hexagrams8[lowerTrigram].property}</p>
            <p>顏色：${hexagrams8[upperTrigram].color}/${hexagrams8[lowerTrigram].color}</p>
            <p>角色：${hexagrams8[upperTrigram].role}/${hexagrams8[lowerTrigram].role}</p>
            <p class="mt-4">本卦含義：${originalHexagram ? originalHexagram.meaning : "未知"}</p>
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-xl font-semibold mb-4">變卦</h3>
          <p class="mb-4">變爻：第 ${changedPosition} 爻</p>
          <div class="space-y-2">
            <h4 class="text-lg font-medium">變卦：${changedHexagram ? changedHexagram.name : "未知"}</h4>
            <p class="text-2xl">${hexagrams8[changedUpperTrigram].icon}（上卦：${changedUpperTrigram}）</p>
            <p class="text-2xl">${hexagrams8[changedLowerTrigram].icon}（下卦：${changedLowerTrigram}）</p>
            <p>屬性：${hexagrams8[changedUpperTrigram].property}/${hexagrams8[changedLowerTrigram].property}</p>
            <p>顏色：${hexagrams8[changedUpperTrigram].color}/${hexagrams8[changedLowerTrigram].color}</p>
            <p>角色：${hexagrams8[changedUpperTrigram].role}/${hexagrams8[changedLowerTrigram].role}</p>
            <p class="mt-4">變卦含義：${changedHexagram ? changedHexagram.meaning : "未知"}</p>
          </div>
        </div>
      </div>
    `;

    // 更新結果
    setResult(resultHTML);

    // 獲取 AI 解讀
    try {
      if (window.gemini) {
        const prompt = `作為易經專家，請針對以下問題和卦象提供正面且具有建設性的解讀與建議：

問題：${question}

本卦：${originalHexagram.name}
本卦含義：${originalHexagram.meaning}

變卦：${changedHexagram.name}
變卦含義：${changedHexagram.meaning}

請提供：
1. 現況分析（基於本卦）
2. 發展趨勢（基於變卦）
3. 具體建議（請給予正面、建設性的建議）

請用溫和積極的語氣，給予實用的參考建議。內容要避免過於具體或限制性的斷言，而是提供啟發性的思考方向。`;

        const result = await window.gemini.generateText({
          prompt: prompt,
          max_output_tokens: 800,
        });

        setAiInterpretation(result.response.text());
      }
    } catch (error) {
      console.error('AI interpretation error:', error);
      setAiInterpretation("AI 解讀暫時無法使用，請參考卦象本身的意義。");
    }

    return true;
  } catch (error) {
    console.error('Calculation error:', error);
    throw new Error('計算過程發生錯誤，請稍後再試');
  }
}; 