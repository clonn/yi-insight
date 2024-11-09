export const CrystalAds = () => (
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
          src={`yi-insight/images/ads/ads_cristal_202411${Math.random() < 0.5 ? '_2' : ''}.png`}
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
); 