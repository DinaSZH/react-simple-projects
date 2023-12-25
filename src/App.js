import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const[fromCurrency, setFromCurrency] = useState('KZT');
  const[toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({});


  useEffect( () => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
          // setRates(json.rates);
          ratesRef.current = json.rates;
          onChangeToPrice(1);
        }
    )
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency]; 
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency]/ratesRef.current[toCurrency])*value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue={onChangeFromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice}  onChangeValue={onChangeToPrice} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
