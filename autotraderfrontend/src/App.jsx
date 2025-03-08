import { useState } from 'react'
import './App.css';
import GetAllCars from './components/GetAllCars';

function App() {

  const [count, setCount] = useState(0)
  const handleCount = () => {
    setCount(count + 1)
  }

  console.log(count)

  return (
    <div className="container">
      <GetAllCars count={count} handleCount={handleCount} />
    </div>
  );
}

export default App;
