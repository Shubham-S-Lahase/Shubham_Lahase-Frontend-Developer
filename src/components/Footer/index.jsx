import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-2 gilroyb" style={{color: "rgba(255, 255, 255, 0.92)"}}>Swiggy</h3>
            <p className="text-sm ftcolor gilroy">&copy; 2024 Bundl Technologies Pvt. Ltd</p>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 gilroyb" style={{color: "rgba(255, 255, 255, 0.92)"}}>Company</h3>
            <ul className="space-y-2 text-sm">
              <li className='ftcolor gilroy'>About</li>
              <li className='ftcolor gilroy'>Careers</li>
              <li className='ftcolor gilroy'>Team</li>
              <li className='ftcolor gilroy'>Swiggy One</li>
              <li className='ftcolor gilroy'>Swiggy Instamart</li>
              <li className='ftcolor gilroy'>Swiggy Genie</li>
            </ul>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 gilroyb" style={{color: "rgba(255, 255, 255, 0.92)"}}>Contact us</h3>
            <ul className="space-y-2 text-sm">
              <li className='ftcolor gilroy'>Help & Support</li>
              <li className='ftcolor gilroy'>Partner with us</li>
              <li className='ftcolor gilroy'>Ride with us</li>
            </ul>
            <h3 className="text-lg font-bold mt-4 mb-2 gilroyb" style={{color: "rgba(255, 255, 255, 0.92)"}}>Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className='ftcolor gilroy'>Terms & Conditions</li>
              <li className='ftcolor gilroy'>Cookie Policy</li>
              <li className='ftcolor gilroy'>Privacy Policy</li>
              <li className='ftcolor gilroy'>Investor Relations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 gilroyb" style={{color: "rgba(255, 255, 255, 0.92)"}}>We deliver to:</h3>
            <ul className="space-y-2 text-sm">
              <li className='ftcolor gilroy'>Bangalore</li>
              <li className='ftcolor gilroy'>Gurgaon</li>
              <li className='ftcolor gilroy'>Hyderabad</li>
              <li className='ftcolor gilroy'>Delhi</li>
              <li className='ftcolor gilroy'>Mumbai</li>
              <li className='ftcolor gilroy'>Pune</li>
            </ul>
            <div className="mt-4">
              <select className="bg-black border border-white text-sm p-2 rounded w-full ftcolor gilroy">
                <option className='ftcolor gilroy'>589 cities</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;