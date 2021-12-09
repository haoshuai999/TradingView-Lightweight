//import './App.css';
import LineChart from './components/LineChart';
import Menu from './components/Menu';
import { useState } from 'react';

const options = [
  "BTC",
  "ETH",
  "XRP",
  "BCH",
  "LTC",
  "XTZ",
  "EOS",
  "LINK",
  "BSV",
  "ETC",
  "XLM",
  "ZRX",
  "XMR",
  "ZEC",
  "DASH",
  "BAT",
  "TRX",
  "OXT",
  "ADA",
  "OMG",
  "ALGO",
  "KNC",
  "ATOM",
  "AAVE",
  "FIL",
  "GRT",
  "NU",
  "DOT",
  "UNI",
  "YFI",
  "MATIC",
  "DOGE",
  "ICP",
  "SOL"
]

const init = "BTC";

function App() {
  const [asset, setAsset] = useState(init)

  return (
    <div className="App">
      <div className="title">TradingView Lightweight Chart</div>
      <label for="asset-select">Choose a crypto asset:</label>
      <Menu options={options} selectedAsset={asset} onAssetChange={setAsset}/>
      <LineChart asset={asset}/>
    </div>
  );
}

export default App;
