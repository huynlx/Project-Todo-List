import { useEffect, useState } from 'react';
import './App.css';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { randomString } from './utils/randomString';

const App = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);

  const handleAddData = (value) => {
    setData([...data, value])
  }

  const handleRemoveData = (value) => {
    if (Array.isArray(value)) {
      var ids = value.map(val => val.id);
      var temp = data;
      for (let i = 0; i < ids.length; i++) {
        temp = temp.filter(item => item.id != ids[i])
      }
      setData(temp);
    } else {
      setData(data.filter(item => item.id != value))
    }
  }

  const handleUpdateDate = (value) => {
    let result = window.confirm("Update ?");
    if (result) {
      const update = data.map((item, index) => {
        if (index == data.findIndex(item => item.id == value.id)) {
          return { ...item, ...value }
        }
        return item
      })
      setData(update)
    }
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data])

  return (
    <div className="App">
      <main>
        {/* left */}
        <LeftSide handleAddData={handleAddData} />

        {/* right */}
        <RightSide
          data={data}
          handleRemoveData={handleRemoveData}
          handleUpdateDate={handleUpdateDate}
        />
      </main>
    </div>
  );
}

export default App;
