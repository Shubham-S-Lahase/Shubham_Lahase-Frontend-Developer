import React, { useState, useEffect } from 'react';

const FilterSection = ({ setAreaFilter, sortItems }) => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [activeDropdown, setActiveDropdown] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Fetch available areas on component mount
    const fetchAreas = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();
        setAreas(data.meals || []);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

 // Handle applying area filter
  const handleApplyFilter = () => {
    setAreaFilter(selectedArea);
    setActiveDropdown('');
  };

   // Handle selecting sort option
  const handleSortOption = (option) => {
    setSortOption(option);
    sortItems(option);
    setActiveDropdown('');
  };

   // Toggle active dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? '' : dropdown));
  };

  return (
    <div className="flex flex-wrap p-4 pt-8 space-x-4 space-y-2 items-center">
      <div className="relative mt-2">
        <button onClick={() => toggleDropdown('filter')} className="flex justify-center items-center gap-2 py-2 px-4 rounded-3xl font-medium" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Filter <img src="/filter.png" alt="" className='w-4 h-4 mt-1' /></button>
        {activeDropdown === 'filter' && (
          <div className="absolute bg-white border mt-2 p-4 rounded shadow-lg z-10 w-40 h-96 overflow-y-auto custom-scrollbar">
            <h3 className="font-bold mb-2">Filter By Area</h3>
            {areas.map((area) => (
              <div key={area.strArea} className="mb-2">
                <input
                  type="radio"
                  id={area.strArea}
                  name="area"
                  value={area.strArea}
                  checked={selectedArea === area.strArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={area.strArea}>{area.strArea}</label>
              </div>
            ))}
            <button onClick={handleApplyFilter} className="mt-2 p-2 bg-blue-500 text-white rounded">Apply</button>
          </div>
        )}
      </div>
      <div className="relative">
        <button onClick={() => toggleDropdown('sort')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>
          {sortOption ? `Sort By: ${sortOption}` : "Sort By"}
          <img src="/da.png" alt="" className="w-4 h-4 mt-1" />
        </button>
        {activeDropdown === 'sort' && (
          <div className="absolute bg-white border mt-2 p-4 rounded shadow-lg z-10">
            <div className="cursor-pointer mb-2" onClick={() => handleSortOption("default")}>Default</div>
            <div className="cursor-pointer mb-2" onClick={() => handleSortOption("alphabetical")}>Alphabetical</div>
          </div>
        )}
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('fastDelivery')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Fast Delivery</button>
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('newOnSwiggy')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>New on Swiggy</button>
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('ratings')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Ratings 4.0+</button>
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('pureVeg')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Pure Veg</button>
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('offers')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Offers</button>
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('priceRange')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Rs. 300-Rs. 600</button>
      </div>
      <div className='relative'>
        <button onClick={() => toggleDropdown('lessThan300')} className="py-2 px-4 rounded-2xl font-medium flex justify-center items-center gap-2" style={{ border: "1px solid rgba(2, 6, 12, 0.15)", color: "rgba(2, 6, 12, 0.75)" }}>Less than 300</button>
      </div>
    </div>
  );
};

export default FilterSection;