

export default function SelectCoin({handleAddCoin}: {handleAddCoin:(coin:string)=>void}) {

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
            {availableCoins.map((coin:string) => (
              <button
                key={coin}
                onClick={() => handleAddCoin(coin)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {coin}
              </button>
            ))}
          </div>
  )
}
