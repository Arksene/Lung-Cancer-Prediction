import React from "react";

const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center max-w-md mx-auto mt-6 mb-8">
      <div className="flex items-center w-2xl">
        {/* Step 1 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 ${
              currentStep === 0
                ? "bg-[#00B7E0] text-white border-[#00B7E0]"
                : currentStep > 0
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            {currentStep > 0 ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              "1"
            )}
          </div>
          <p
            className={`text-sm font-medium mt-2 ${
              currentStep >= 0 ? "text-[#00B7E0]" : "text-gray-400"
            }`}
          >
            Data Diri
          </p>
        </div>

        {/* Progress Line */}
        <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full">
          <div
            className={`h-full bg-[#00B7E0] rounded-full ${
              currentStep > 0 ? "w-full" : "w-0"
            }`}
          />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 ${
              currentStep === 1
                ? "bg-[#00B7E0] text-white border-[#00B7E0]"
                : currentStep > 1
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            {currentStep > 1 ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              "2"
            )}
          </div>
          <p
            className={`text-xs font-medium mt-2 ${
              currentStep >= 1 ? "text-[#00B7E0]" : "text-gray-400"
            }`}
          >
            Riwayat Kesehatan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
