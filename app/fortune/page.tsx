'use client';

import { useRouter } from 'next/navigation';

export default function FortunePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[#f8f7ff]">
      {/* 頂部導航欄 */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 pt-12">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => router.back()}
            className="mr-4 text-white"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-xl font-bold">卜卦結果詳解</h1>
        </div>
        <div className="text-sm opacity-90">2024年1月15日 · 農曆十二月初四</div>
      </header>

      {/* 主要內容區 */}
      <main className="flex-grow p-6 overflow-y-auto">
        {/* 卦象展示 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center border border-gray-200">
          <div className="w-[100px] h-[100px] mx-auto mb-4 bg-contain bg-center bg-no-repeat"
               style={{backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="20" width="80" height="10" fill="%23333"/><rect x="10" y="40" width="80" height="10" fill="%23333"/><rect x="10" y="60" width="35" height="10" fill="%23333"/><rect x="55" y="60" width="35" height="10" fill="%23333"/><rect x="10" y="80" width="80" height="10" fill="%23333"/></svg>')`}}>
          </div>
          <h2 className="text-xl font-bold mb-2">澤火革卦</h2>
          <p className="text-gray-600 mb-4">兌上離下</p>
          <div className="text-sm text-gray-500 mb-2">卦辭</div>
          <p className="text-lg font-medium mb-4">革，己日乃孚，元亨利貞，悔亡。</p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">卦象五行</div>
              <div className="font-medium">金火</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">卦象方位</div>
              <div className="font-medium">西南</div>
            </div>
          </div>
        </div>

        {/* 運勢評分 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">今日運勢評分</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">財運</span>
                <span className="text-yellow-500 font-bold">85%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">事業</span>
                <span className="text-green-500 font-bold">92%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">感情</span>
                <span className="text-red-500 font-bold">78%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-red-500 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">健康</span>
                <span className="text-blue-500 font-bold">88%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{width: '88%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 詳細解讀 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">詳細解讀</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-indigo-700 mb-2">總體運勢</h4>
              <p className="text-gray-700">今日澤火革卦顯示您正處於變革時期，適合做出改變和調整。整體運勢較好，尤其在事業方面有突破機會。</p>
            </div>
            <div>
              <h4 className="font-medium text-indigo-700 mb-2">事業財運</h4>
              <p className="text-gray-700">事業上有貴人相助，可能獲得意外的合作機會或項目推進。財運方面，投資宜穩健，不宜冒進，可能有小額收益。</p>
            </div>
            <div>
              <h4 className="font-medium text-indigo-700 mb-2">感情運勢</h4>
              <p className="text-gray-700">感情方面需要注意溝通方式，易產生誤會。單身者可能遇到新的緣分，但需要主動把握。已有伴侶的人應避免小事引發爭執。</p>
            </div>
            <div>
              <h4 className="font-medium text-indigo-700 mb-2">健康提示</h4>
              <p className="text-gray-700">健康狀況良好，但需注意休息，避免過度勞累。飲食宜清淡，多補充水分，適當運動有助於提升精神狀態。</p>
            </div>
          </div>
        </div>

        {/* 吉凶宜忌 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">吉凶宜忌</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">宜</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>談判合作</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>開展新項目</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>學習進修</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>短途旅行</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">忌</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-times text-red-500 mr-2"></i>
                  <span>大額投資</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-red-500 mr-2"></i>
                  <span>衝動決策</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-red-500 mr-2"></i>
                  <span>情緒爭執</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-red-500 mr-2"></i>
                  <span>熬夜加班</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 幸運提示 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">幸運提示</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">幸運色</div>
              <div className="font-medium">藍色、紫色</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">幸運數字</div>
              <div className="font-medium">3、8</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">幸運方位</div>
              <div className="font-medium">東南方</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">貴人生肖</div>
              <div className="font-medium">龍、蛇</div>
            </div>
          </div>
        </div>

        {/* 分享按鈕 */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
            分享結果
          </button>
          <button className="flex-1 bg-white border-2 border-indigo-500 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all duration-200">
            儲存圖片
          </button>
        </div>
      </main>
    </div>
  );
} 