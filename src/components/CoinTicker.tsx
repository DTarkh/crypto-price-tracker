import { useBinanceMiniTicker } from "../useData";

type CoinTickerProps = {
  symbol: string;
};

export default function CoinTicker({ symbol }: CoinTickerProps) {
  const ticker = useBinanceMiniTicker(symbol);

  if (!ticker) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-gray-500 animate-pulse">
          Loading {symbol} data...
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{ticker.s}</h2>

      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="text-sm">Price:</p>
          <p className="text-lg font-semibold text-green-600">
            ${Number(ticker.c).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm">Open Price:</p>
          <p className="text-lg">{Number(ticker.o).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm">High:</p>
          <p className="text-lg">{Number(ticker.h).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm">Low:</p>
          <p className="text-lg">{Number(ticker.l).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm">Base Volume:</p>
          <p className="text-lg">{Number(ticker.v).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm">Quote Volume:</p>
          <p className="text-lg">{Number(ticker.q).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
