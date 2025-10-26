import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectorProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  disabled?: boolean;
}

export const Selector: React.FC<SelectorProps> = ({ label, value, onChange, options, disabled = false }) => {
  const selectId = `selector-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={selectId} className="mb-2 text-sm font-medium text-gray-400">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 appearance-none bg-no-repeat bg-right-3"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="%239ca3af"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>')`,
          backgroundSize: '1.5em 1.5em',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};