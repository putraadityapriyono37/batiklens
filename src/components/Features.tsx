import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Fitur-fitur Batiklens</h2>
        <div className="relative bg-orange-200 p-8 md:p-12 rounded-3xl shadow-xl -mt-20 md:-mt-24 mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="bg-white text-orange-600 px-8 py-5 rounded-full shadow-lg font-semibold text-lg md:text-xl text-center min-w-[200px]">
              FITUR 1
            </div>
            <div className="bg-white text-orange-600 px-8 py-5 rounded-full shadow-lg font-semibold text-lg md:text-xl text-center min-w-[200px]">
              FITUR 2
            </div>
            <div className="bg-white text-orange-600 px-8 py-5 rounded-full shadow-lg font-semibold text-lg md:text-xl text-center min-w-[200px]">
              FITUR 3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 md:mt-24">
          {/* Fitur 1 */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 bg-orange-300 rounded-2xl h-64 md:h-80 shadow-md flex-shrink-0">
              {/* Gambar atau ilustrasi terkait fitur 1 */}
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Judul Deskripsi Fitur 1</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec sapien nulla sit amet iaculis pulvinar.
              </p>
            </div>
          </div>

          {/* Fitur 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mt-12 md:mt-0">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Judul Deskripsi Fitur 2</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec sapien nulla sit amet iaculis pulvinar.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-orange-300 rounded-2xl h-64 md:h-80 shadow-md flex-shrink-0">
              {/* Gambar atau ilustrasi terkait fitur 2 */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;