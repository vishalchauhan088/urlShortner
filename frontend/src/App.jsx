import { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const copyRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCopyClick = () => {
    copyRef.current?.select();
    window.navigator.clipboard.writeText(outputValue);
    setCopied(true);
    setTimeout(() => {
      setCopied(false); // Reset copied state after 3 seconds
    }, 3000);
  };

  const handleApiCall = async () => {
    try {
      const response = await axios.post('/api/v1/shorturl', {
        originalUrl: inputValue
      });
      console.log(response);
      console.log('done');
      const data = response.data;
      if (data.status === 'success' && data.url) {
        setOutputValue(data.url);
        setError('');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError('Failed to fetch data');
      setOutputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-3xl font-bold mb-8">URL SHORTNER</header>
      <main className="bg-white p-8 rounded-lg shadow-md w-8/12">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Enter text"
            className="border border-gray-300 rounded-md px-6 py-2 w-full mr-2 focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleApiCall}
          >
            Fetch Result
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            id="readonlyInput"
            readOnly
            ref={copyRef}
            className="border border-gray-300 rounded-md px-6 py-2 w-full mr-2 focus:outline-none focus:border-blue-500"
            value={outputValue}
          />
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${copied ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={copied}
            onClick={handleCopyClick}
          >
            Copy Text
          </button>
        </div>
        {error && (
          <div className="text-red-500 mt-2">{error}</div>
        )}
      </main>
      {copied && (
        <div className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          <span>Text copied!</span>
        </div>
      )}
    </div>
  );
}

export default App;
