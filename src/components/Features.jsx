import { FaPlane, FaBolt, FaLock, FaCreditCard, FaMobileAlt, FaBullseye } from "react-icons/fa";


const features = [
  { icon: FaPlane, title: "Multi-Purpose Booking", text: "From flights and trains to concerts and sports events, book any ticket type with ease." },
  { icon: FaBolt, title: "Lightning Fast", text: "Instant booking confirmations and digital tickets delivered directly to your device." },
  { icon: FaLock, title: "Secure & Trusted", text: "Bank-level encryption and secure payment processing for your peace of mind." },
  { icon: FaCreditCard, title: "Easy Payment", text: "Multiple payment options including cards, wallets, and buy-now-pay-later." },
  { icon: FaMobileAlt, title: "Mobile Ready", text: "Access your tickets anytime, anywhere with our responsive mobile experience." },
  { icon: FaBullseye, title: "Best Prices", text: "Compare prices across providers and get exclusive deals and early-bird offers." },
];

const Features = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose Tix?
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need for booking tickets, all in one place
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, index) => (
            <div
              key={index}
              className="bg-white flex flex-col items-center p-10 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center text-2xl rounded-full mb-6 bg-purple-900 text-white">
                  {typeof f.icon === 'string' ? f.icon : <f.icon />}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {f.title}
              </h3>
              <p className="text-gray-500">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
