import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Loader from './Loader/Loader';
import { useState} from 'react';
const HomePage = lazy(() =>
  import('./HomePage'),
);
const Favorite = lazy(() =>
import('./Favorite'),
);
export const App = () => {
  const [array, setArray] = useState([]);
  const filterArray = (values, img) => {
  let num = values.find(item => item.id === img);
   setArray(prev => [...prev, num])
   localStorage.setItem(`${img}`,JSON.stringify(num));
  };
  return (
    <>
     <Navigation />

      <Suspense fallback={<Loader/>}>
      <Routes>
          <Route path="/" element={<HomePage filterArray={filterArray}/>} />
          <Route path="/favorite" element={<Favorite array={array}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
     
    </>
   
  );
};
