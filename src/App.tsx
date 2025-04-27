import { useState } from "react";
import SelectCoin from "./components/SelectCoin";
import Header from "./components/Header";
import DisplayTickers from "./components/DisplayTickers";

const InitialItems = JSON.parse(localStorage.getItem("ticker") ?? "[]");

function App() {
  const [selectedCoins, setSelectedCoins] = useState<string[]>(InitialItems);

  const handleAddCoin = (symbol: string) => {
    if (!selectedCoins.includes(symbol)) {
      setSelectedCoins((prev) => [symbol, ...prev]);
    }

    const existingTickers = JSON.parse(localStorage.getItem("ticker") ?? "[]");
    if (!existingTickers.includes(symbol)) {
      localStorage.setItem(
        "ticker",
        JSON.stringify([symbol, ...existingTickers])
      );
    }
  };

  const handleRemoveCoin = (symbol: string) => {
    setSelectedCoins((prev) => prev.filter((coin) => coin !== symbol));

    const existingTickers =
      JSON.parse(localStorage.getItem("ticker") ?? "[]") || [];
    localStorage.setItem(
      "ticker",
      JSON.stringify(existingTickers.filter((coin: string) => coin !== symbol))
    );
  };

  return (
    <>
    <div className="h-screen p-6 m-auto max-w-[1100px]">
      <Header />
      <SelectCoin handleAddCoin={handleAddCoin} selectedCoins={selectedCoins}/>
      <DisplayTickers
        selectedCoins={selectedCoins}
        handleRemoveCoin={handleRemoveCoin}
      />
    </div>
    </>
  );
}

export default App;
