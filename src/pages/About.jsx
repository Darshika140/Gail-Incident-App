export default function About() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      
      {/* Vision Banner (Yellow) */}
      <div className="bg-[#ffde00] py-10 px-8 flex flex-col md:flex-row items-center justify-center md:space-x-12 text-center md:text-left">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <h2 className="text-5xl font-black text-[#0072C6]">Vision</h2>
        </div>
        <p className="text-gray-900 font-medium max-w-2xl text-lg leading-relaxed">
          Be the leader in natural gas value-chain and beyond, with global presence, creating value for stakeholders with environmental responsibility.
        </p>
      </div>

      {/* Mission Banner (Blue) */}
      <div className="bg-[#0072C6] py-10 px-8 flex flex-col md:flex-row items-center justify-center md:space-x-12 text-center md:text-left">
        <p className="text-white font-medium max-w-2xl text-lg mb-4 md:mb-0 order-2 md:order-1 leading-relaxed">
          Enhancing quality of life through clean energy and beyond.
        </p>
        <div className="flex items-center space-x-3 order-1 md:order-2 mb-4 md:mb-0">
          <h2 className="text-5xl font-black text-[#ffde00]">Mission</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-10 md:p-16 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8 pb-2">
          GAIL– Energizing Possibilities
        </h2>
        
        <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
          <p>
            GAIL (India) Limited is India's leading natural gas company, with a robust and diversified presence across the entire natural gas value chain and beyond. Its operations encompass the transmission and marketing of Natural Gas, production of Liquefied Petroleum Gas (LPG) and other liquid hydrocarbons, LPG transmission, Polymer production and marketing, City Gas Distribution, LNG sourcing, shipping and regasification.
          </p>
          <p className="mt-6">
            This internal Safety Tracking Dashboard is an extension of our core values, ensuring operational anomalies are reported, tracked, and resolved with utmost efficiency.
          </p>
        </div>
      </div>

    </div>
  );
}