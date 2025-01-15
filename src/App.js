import './App.css';
import { Routes, Route } from 'react-router-dom';
import LayoutComponent from './components/layout/Layout';
import AuthComponent from './components/auth/Auth';
import ProductDetailComponent from './components/product-detail/ProductDetail';
import NotFoundErrorComponent from './components/error/NotFoundError';
import MapboxComponent from './components/mapbox/Mapbox';
import { useState } from 'react';
import ResultsComponent from './components/results/Results';

function App() {

  const [params, setParams] = useState({ latitude: 0.0, longitude: 0.0 });
  const [searchResults, setSearchResults] = useState([]);

  const updateParams = (p) => setParams(p);
  const updateSearchResults = (d) => setSearchResults(d);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutComponent updateParams={updateParams} updateSearchResults={updateSearchResults} />}>
          <Route index element={<ResultsComponent searchResults={searchResults} />}></Route>
          <Route path="/map" element={<MapboxComponent params={params} />}></Route>
          <Route path="/product" element={<ProductDetailComponent />}></Route>
          <Route path='*' element={<NotFoundErrorComponent />}></Route>
        </Route>
        <Route path="/auth" element={<AuthComponent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
