import { FaFacebookF,FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h4 className="text-white text-xl font-semibold mb-4">About Me ˶ᵔ ᵕ ᵔ˶</h4>
          <p className="text-sm">
            Hi! I'm Andrei, a 23-year-old IT student trying to find my place in this exciting and ever-evolving environment. I hope you enjoy the article website I created – it’s a small step in my journey to grow and share my passion with others. 😊
          </p>
        </div>

        
        <div>
          <h4 className="text-white text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/articles" className="hover:text-white transition">Articles</a></li>
            <li><a href="/login" className="hover:text-white transition">Log In</a></li>
            <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Me</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-white text-xl font-semibold mb-4">Follow Me ˶ᵔ ᵕ ᵔ˶</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/cosma.andrei.391/" className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition">
              <FaFacebookF size={16} />
            </a>
            <a href="https://www.instagram.com/cosma.andreii/" className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition">
              <FaInstagram size={16} />
            </a>
            <a href="https://www.linkedin.com/in/andrei-cornel-cosma-109019272/" className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-blue-500 pt-4 text-center text-s text-white/70">
        &copy; {new Date().getFullYear()} HOTNEWS. All rights reserved.
      </div>
    </footer>
  );
}
