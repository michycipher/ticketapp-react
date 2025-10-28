const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-12 bottom-0 left-0 w-full">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tix</h3>
            <p className="text-gray-400">
              Your trusted partner for all ticketing needs. Book with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Features</a></li>
              <li><a href="#" className="hover:text-purple-400">Pricing</a></li>
              {/* <li><a href="#" className="hover:text-purple-400">Mobile App</a></li>
              <li><a href="#" className="hover:text-purple-400">API</a></li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              {/* <li><a href="#" className="hover:text-purple-400">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400">Press</a></li> */}
              <li><a href="#" className="hover:text-purple-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              {/* <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li> */}
              <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
              {/* <li><a href="#" className="hover:text-purple-400">Refund Policy</a></li> */}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} Tix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
