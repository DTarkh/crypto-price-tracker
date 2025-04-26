import { useState } from "react";
import SelectCoin from "./components/SelectCoin";
import Header from "./components/Header";
import DisplayTickers from "./components/DisplayTickers";

function App() {
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

  const handleAddCoin = (symbol: string) => {
    if (!selectedCoins.includes(symbol)) {
      setSelectedCoins((prev) => [...prev, symbol]);
    }
  };

  const handleRemoveCoin = (symbol: string) => {
    setSelectedCoins((prev) => prev.filter((coin) => coin !== symbol));
  };

  return (
    <div className="min-h-screen p-6">
      <Header />
      <SelectCoin handleAddCoin={handleAddCoin} />
      <DisplayTickers
        selectedCoins={selectedCoins}
        handleRemoveCoin={handleRemoveCoin}
      />
    </div>
  );
}

export default App;
