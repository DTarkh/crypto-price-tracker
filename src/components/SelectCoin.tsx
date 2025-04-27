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
    <div className="flex flex-wrap justify-center gap-4 mb-7">
      {availableCoins.map((coin: string) => {
        let clss = "px-4 py-2 text-stone-200 rounded-lg transition hover:cursor-pointer";
        if (selectedCoins.includes(coin)){
          clss += " bg-red-600" 
        } else {
          clss += " bg-stone-950"
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
