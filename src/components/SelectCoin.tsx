interface Props {
  selectedCoins: string[];
  handleAddCoin: (coin: string) => void;
}

export default function SelectCoin({ handleAddCoin, selectedCoins }: Props) {
  const availableCoins = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "XRPUSDT",
    "ADAUSDT",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {availableCoins.map((coin: string) => {
        let clss = "px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer";
        if (selectedCoins.includes(coin)){
          clss += " bg-red-600" 
        } else {
          clss += " bg-black"
        }
          
          return (
            <button
              key={coin}
              onClick={() => handleAddCoin(coin)}
              className={clss}
            >
              {coin}
            </button>
          );
      })}
    </div>
  );
}
