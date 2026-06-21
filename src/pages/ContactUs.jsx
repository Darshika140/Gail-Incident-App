// 1. IMPORT BOTH IMAGES HERE
import gailLogo from '../assets/gail.png';
import vijaypurImage from '../assets/vijaypur.png';

export default function ContactUs() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      
      {/* Header Banner */}
      <div className="bg-[#0072C6] h-32 flex items-end p-6">
        <h2 className="text-5xl font-black text-[#ffde00]">Contact Us</h2>
      </div>
      <div className="bg-[#ffde00] px-6 py-2 text-sm font-bold text-[#0072C6]">
        Home {'>'} Contact Us
      </div>

      {/* Content Card */}
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 rounded-2xl overflow-hidden shadow-md">
          
          {/* Left Side: Address Info */}
          <div className="p-8 lg:p-10 bg-white">
            
            {/* FIRST IMAGE: GAIL LOGO */}
            <img 
              src={gailLogo} 
              alt="GAIL Logo" 
              className="h-16 object-contain mb-6" 
            />

            <div className="bg-[#0072C6] text-white inline-block px-5 py-2.5 rounded font-bold mb-8 shadow-sm">
              GAIL Vijaipur Branch :
            </div>
            
            <div className="flex items-start space-x-4 mb-8">
              <span className="text-red-600 text-2xl mt-1">📍</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">GAIL (India) Limited</h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  GAIL Complex, Vijaipur<br/>
                  Distt. Guna, Madhya Pradesh - 473112
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-red-600 text-2xl mt-1">📞</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Phone No:</h3>
                <p className="text-gray-600 mt-1 font-medium">07544-274210</p>
              </div>
            </div>
          </div>

          {/* Right Side: Vijaipur Image */}
          <div className="bg-gray-100 flex flex-col min-h-[350px] border-l border-gray-200">
            {/* SECOND IMAGE: VIJAIPUR BUILDING */}
            <img 
              src={vijaypurImage} 
              alt="GAIL Vijaipur Complex" 
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}