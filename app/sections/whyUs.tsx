import React from 'react';

const WhyUs = () => {
  return (
    <div id="whyus" className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-[90%] mx-auto">
        {/* Container for flex layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Header Section */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center px-6 py-2 rounded-full border border-orange-200 bg-white mb-8">
              <span className="text-orange-600 font-medium">Why Us</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              GROW YOUR BRAND<br />
              TO SOCIAL MEDIA
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl">
              Partner With Us To Experience Unparalleled Digital Marketing Expertise, 
              Drive Measurable Results, And Unlock New Growth Opportunities
            </p>
          </div>

          {/* Features Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Innovation At Our Core */}
            <div className="p-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation At Our Core</h3>
              <p className="text-gray-600">
                We Stay Ahead Of Trends To Provide Cutting-Edge Solutions.
              </p>
            </div>

            {/* Results Driven */}
            <div className="p-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Results Driven</h3>
              <p className="text-gray-600">
                Our Strategies Are Focused On Achieving Your Business Goals.
              </p>
            </div>

            {/* Customization */}
            <div className="p-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1a2 2 0 112 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customization</h3>
              <p className="text-gray-600">
                Tailored Services To Meet Your Unique Needs.
              </p>
            </div>

            {/* Expert Team */}
            <div className="p-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Team</h3>
              <p className="text-gray-600">
                A Skilled Team Dedicated To Your Success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
