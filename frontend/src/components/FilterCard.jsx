import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🔍 Filter Jobs</h2>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((section, index) => (
          <div key={section.filterType} className="space-y-3">
            <h3 className="text-lg font-bold">{section.filterType}</h3>
            {section.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 pl-2">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="border-gray-400 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={itemId} className="cursor-pointer">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
