export function FooterV2() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-xl mb-2">WebCraft</div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-black">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              LinkedIn
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
