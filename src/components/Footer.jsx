export const Footer = () => (
  <footer className="mt-16 pt-8 border-t border-gray-200">
    <div className="text-center text-gray-600 text-sm">
      <p>© {new Date().getFullYear()} 易經卜卦系統 版權所有</p>
      <p className="mt-2">
        如有問題請聯繫: {' '}
        <a href="https://exma-square.co/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">EXMA-Square</a>,{' '}
        <a href="https://facebook.com/clonncd" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a> 或{' '}
        <a href="https://github.com/clonn" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </div>
  </footer>
); 