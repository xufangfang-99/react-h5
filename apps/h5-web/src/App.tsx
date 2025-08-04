function App() {
  return (
    <div className="mobile-container">
      <header className="bg-primary-500 text-white p-4 safe-area-top">
        <h1 className="text-lg font-bold text-center">React H5 Admin</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg p-4 mb-4 border-1px">
          <h2 className="text-base font-semibold mb-2">欢迎使用</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            这是一个基于 Vite + React + TypeScript + UnoCSS 构建的现代化 H5
            项目模板。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-1px flex-center flex-col">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex-center mb-2">
              <span className="text-primary-500 text-lg">📱</span>
            </div>
            <span className="text-sm text-gray-700">移动端优化</span>
          </div>

          <div className="bg-white rounded-lg p-4 border-1px flex-center flex-col">
            <div className="w-12 h-12 bg-green-100 rounded-full flex-center mb-2">
              <span className="text-green-500 text-lg">⚡</span>
            </div>
            <span className="text-sm text-gray-700">极速开发</span>
          </div>

          <div className="bg-white rounded-lg p-4 border-1px flex-center flex-col">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex-center mb-2">
              <span className="text-blue-500 text-lg">🎨</span>
            </div>
            <span className="text-sm text-gray-700">UnoCSS</span>
          </div>

          <div className="bg-white rounded-lg p-4 border-1px flex-center flex-col">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex-center mb-2">
              <span className="text-purple-500 text-lg">🚀</span>
            </div>
            <span className="text-sm text-gray-700">现代工具链</span>
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-primary w-full py-3 text-base">
            开始使用
          </button>
        </div>
      </main>

      <footer className="bg-gray-50 p-4 text-center safe-area-bottom">
        <p className="text-xs text-gray-500">
          Powered by Vite + React + UnoCSS
        </p>
      </footer>
    </div>
  );
}

export default App;
