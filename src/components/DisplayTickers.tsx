
import CoinTicker from "./CoinTicker";

interface Props {
  selectedCoins: string[];
  handleRemoveCoin: (coin: string) => void;
}

export default function DisplayTickers({
  selectedCoins,
  handleRemoveCoin,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {selectedCoins.map((coin) => (
        <div key={coin} className="relative">
          <CoinTicker symbol={coin} />
          <button
            onClick={() => handleRemoveCoin(coin)}
            className="absolute top-4 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition hover:cursor-pointer"
            title="Remove"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
