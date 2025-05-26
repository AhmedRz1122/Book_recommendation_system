import { motion } from 'framer-motion';
import { FaBookOpen, FaHeart, FaTwitter, FaInstagram, FaGoodreads } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4"
            >
              <FaBookOpen className="text-amber-400 text-3xl mr-3" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">
                BookVoyage
              </span>
            </motion.div>
            <p className="text-gray-300 mb-4">
              Discover your next literary adventure with our intelligent recommendation system. 
              We help you find books that match your unique taste and reading mood.
            </p>
            <div className="flex space-x-4">
              {[FaTwitter, FaInstagram, FaGoodreads].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, color: "#f59e0b" }}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Explore</h3>
            <ul className="space-y-2">
              {['Recommendations', 'Genres', 'Popular', 'New Releases'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">hello@brs.com</li>
              <li className="text-gray-300">+92 (555) 123-4567</li>
              <li className="text-gray-300">123 Book Lane, Islamabad</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Book Recommendation System. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center text-gray-400 text-sm">
              <FaHeart className="text-red-500 mr-1" />
              Made with love for readers
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;