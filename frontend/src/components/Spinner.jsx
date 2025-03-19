import React from 'react'

const Spinner = () => {
  return (
    <svg className="text-indigo-500 m-auto" width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          @keyframes spinnerAnimation {
            0% { r: 0; opacity: 1; }
            100% { r: 11px; opacity: 0; }
          }
          .circle {
            animation: spinnerAnimation 1.2s cubic-bezier(0.52, 0.6, 0.25, 0.99) infinite;
          }
          .circle:nth-child(2) {
            animation-delay: 0.4s;
          }
          .circle:nth-child(3) {
            animation-delay: 0.8s;
          }
        `}
      </style>
      <circle className="circle" cx="12" cy="12" r="0" fill="currentColor" />
      <circle className="circle" cx="12" cy="12" r="0" fill="currentColor" />
      <circle className="circle" cx="12" cy="12" r="0" fill="currentColor" />
    </svg>
  );
};

export default Spinner;
