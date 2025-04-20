export function CrystalAds() {
  return (<>
    <div className="mt-26 mb-6">
      <div className="flex items-center mt-12 my-6">
        <div className="flex-1 border-t-2 border-gray-200"></div>
        <div className="px-4 text-sm text-gray-500">增強能量的法則</div>
        <div className="flex-1 border-t-2 border-gray-200"></div>
      </div>
      <a 
        href="https://www.instagram.com/unijane_crystal?igsh=MXdibWl4cnc3YTg0eA%3D%3D&utm_source=yi_source"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-5/5 mx-auto"
      >
        <div className="relative">
          <img
            src={`images/ads/ads_cristal_202411${Math.random() < 0.5 ? '_2' : ''}.png`}
            alt="UniJane．有你珍好｜輕珠寶｜生命靈數水晶設計"
            className="w-full"
          />
        </div>
      </a>
      <div className="flex items-center my-6">
        <div className="flex-1 border-t-2 border-gray-200"></div>
        <div className="px-4 text-sm text-gray-500">AD</div>
        <div className="flex-1 border-t-2 border-gray-200"></div>
      </div>
    </div>
    <div className="text-center">
      
      <p className="text-emerald-600 text-sm font-medium mb-4">
        如占卜進行遇到任何問題，歡迎加入LINE@ 官方帳號，我們將會盡快處理。
      </p>
      <a 
        href="https://lin.ee/wolgX7K" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block hover:opacity-90 transition-opacity"
      >
        <img 
          src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" 
          alt="加入好友" 
          height="24"
          width="40%"
          className="inline-block"
        />
      </a>
    </div>
  </>
    
  );
} 