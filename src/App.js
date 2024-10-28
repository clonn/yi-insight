import React, { useState } from "react";
import "./App.css";

const hexagrams8 = require('./hexagram/hexagram_8.json');
const hexagrams64 = require('./hexagram/hexagram_64.json');


// 功能函數
const getTrigram = (num) => {
  const remainder = num % 8;
  const trigramMapping = ["乾", "兌", "離", "震", "巽", "坎", "艮", "坤"];
  return trigramMapping[(remainder || 8) - 1];
};

const getHexagram = (lower, upper) => {
  console.log(lower, upper);
  const result =  hexagrams64.find(h => h.lowerTrigram === lower && h.upperTrigram === upper);
  console.log(result);
  return result;
};

const getBinaryFromTrigram = (trigram) => {
  return hexagrams8[trigram].binary;
};

// 主組件
const App = () => {
  const [question, setQuestion] = useState("");
  const [xiagua, setXiagua] = useState("");
  const [shanggua, setShanggua] = useState("");
  const [bianyao, setBianyao] = useState("");
  const [result, setResult] = useState("");
  const [aiInterpretation, setAiInterpretation] = useState("");

  const handleRandomize = (setter) => {
    setter(String(Math.floor(Math.random() * 1000)).padStart(3, "0"));
  };

  const handleReset = () => {
    setQuestion("");
    setXiagua("");
    setShanggua("");
    setBianyao("");
    setResult("");
    setAiInterpretation("");
  };

  const getGeminiInterpretation = async (question, originalHexagram, changedHexagram) => {
    try {
      if (!window.gemini) {
        throw new Error("Gemini API not available");
      }

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
    } catch (error) {
      console.error("Gemini interpretation error:", error);
      setAiInterpretation("無法使用 AI 解讀功能，請參考卦象本身的意義作為參考。");
    }
  };

  const calculate = async () => {
    const lowerTrigram = getTrigram(parseInt(xiagua));
    const upperTrigram = getTrigram(parseInt(shanggua));
    const originalHexagram = getHexagram(lowerTrigram, upperTrigram);
    const binaryString = getBinaryFromTrigram(lowerTrigram) + getBinaryFromTrigram(upperTrigram);

    const changedPosition = bianyao % 6 || 6;
    let changedBinary = binaryString.split("");
    changedBinary[changedPosition - 1] = changedBinary[changedPosition - 1] === "1" ? "0" : "1";
    changedBinary = changedBinary.join("");

    const changedLowerTrigram = Object.keys(hexagrams8).find(key => hexagrams8[key].binary === changedBinary.slice(0, 3));
    const changedUpperTrigram = Object.keys(hexagrams8).find(key => hexagrams8[key].binary === changedBinary.slice(3));
    const changedHexagram = getHexagram(changedLowerTrigram, changedUpperTrigram);

    // Build original hexagram details
    const originalHexagramDetails = {
      question: `<h3>問題：${question}</h3>`,
      name: `<h4>本卦：${originalHexagram ? originalHexagram.name : "未知"}</h4>`,
      trigrams: [
        `<p>${hexagrams8[upperTrigram].icon}（上卦：${upperTrigram}）</p>`,
        `<p>${hexagrams8[lowerTrigram].icon}（下卦：${lowerTrigram}）</p>`
      ],
      attributes: [
        `<p>屬性：${hexagrams8[upperTrigram].property}/${hexagrams8[lowerTrigram].property}</p>`,
        `<p>顏色：${hexagrams8[upperTrigram].color}/${hexagrams8[lowerTrigram].color}</p>`,
        `<p>角色：${hexagrams8[upperTrigram].role}/${hexagrams8[lowerTrigram].role}</p>`,
        `<p>本卦含義：${originalHexagram ? originalHexagram.meaning : "未知"}</p>`
      ]
    };

    // Build changed hexagram details
    const changedHexagramDetails = {
      position: `<h4>變爻：第 ${changedPosition} 爻</h4>`,
      name: `<h4>變卦：${changedHexagram ? changedHexagram.name : "未知"}</h4>`,
      trigrams: [
        `<p>${hexagrams8[changedUpperTrigram].icon}（上卦：${changedUpperTrigram}）</p>`,
        `<p>${hexagrams8[changedLowerTrigram].icon}（下卦：${changedLowerTrigram}）</p>`
      ],
      attributes: [
        `<p>屬性：${hexagrams8[changedUpperTrigram].property}/${hexagrams8[changedLowerTrigram].property}</p>`,
        `<p>顏色：${hexagrams8[changedUpperTrigram].color}/${hexagrams8[changedLowerTrigram].color}</p>`,
        `<p>角色：${hexagrams8[changedUpperTrigram].role}/${hexagrams8[changedLowerTrigram].role}</p>`,
        `<p>變卦含義：${changedHexagram ? changedHexagram.meaning : "未知"}</p>`
      ]
    };

    // Combine all sections
    const resultHTML = [
      originalHexagramDetails.question,
      originalHexagramDetails.name,
      ...originalHexagramDetails.trigrams,
      ...originalHexagramDetails.attributes,
      changedHexagramDetails.position,
      changedHexagramDetails.name,
      ...changedHexagramDetails.trigrams,
      ...changedHexagramDetails.attributes
    ].join('');
    
    setResult(resultHTML);
    await getGeminiInterpretation(question, originalHexagram, changedHexagram);
  };

  return (
    <div className="app">
      <h1>數字易經威力加強版 </h1>
      <div style={{ fontSize: "0.8em", color: "#999", marginTop: "-15px", marginBottom: "20px" }}>v0.1.0</div>
      <div className="section">
        <label>請輸入您的問題：</label>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="在此輸入您的問題（可使用鍵盤或語音輸入）"></textarea>
      </div>
      <div className="section">
        <label>下卦：</label>
        <input 
          type="number" 
          pattern="[0-9]*"
          inputMode="numeric"
          value={xiagua} 
          onChange={(e) => setXiagua(e.target.value)} 
        />
        <button onClick={() => handleRandomize(setXiagua)}>下卦偶然</button>
        <label>上卦：</label>
        <input
          type="number"
          pattern="[0-9]*" 
          inputMode="numeric"
          value={shanggua}
          onChange={(e) => setShanggua(e.target.value)}
        />
        <button onClick={() => handleRandomize(setShanggua)}>上卦偶然</button>
        <label>變爻：</label>
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric" 
          value={bianyao}
          onChange={(e) => setBianyao(e.target.value)}
        />
        <button onClick={() => handleRandomize(setBianyao)}>變爻偶然</button>
      </div>
      <div className="buttons" style={{ textAlign: "center", margin: "20px 0" }}>
        <button 
          onClick={() => {
            if (window.confirm("您確定要重置嗎？")) {
              handleReset();
            }
          }}
        >
          重置
        </button>
        <button onClick={calculate} style={{ margin: "0 10px" }}>計算結果</button>
      </div>
      <div className="result-section" dangerouslySetInnerHTML={{ __html: result }} />
      {aiInterpretation && (
        <div className="ai-interpretation">
          <h3>AI 解讀參考</h3>
          <div style={{ whiteSpace: "pre-line" }}>{aiInterpretation}</div>
        </div>
      )}
      <footer style={{ 
        textAlign: "center",
        padding: "20px",
        marginTop: "40px",
        borderTop: "1px solid #eee",
        color: "#666",
        fontSize: "0.9em"
      }}>
        <p>© {new Date().getFullYear()} 易經卜卦系統 版權所有</p>
        <p>如有問題請聯繫: <a href="https://exma-square.co/" target="_blank" rel="noopener noreferrer">EXMA-Square</a>, <a href="https://facebook.com/clonncd" target="_blank" rel="noopener noreferrer">Facebook</a> 或 <a href="https://github.com/clonn" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </footer>
    </div>
  );
};

export default App;
