import { useState, useEffect, useRef } from 'react';

type MiniTicker = {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
};

export function useBinanceMiniTicker(symbol: string) {
  const [ticker, setTicker] = useState<MiniTicker | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<number | null>(null);

  useEffect(() => {
    let isAlive = true;    // ← are we still “in business”?

    const connect = () => {
      // 👇 switch to single‐symbol stream for lighter traffic:
      const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@miniTicker`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WS open:', url);
      };

      ws.onmessage = (evt) => {
        try {
          const data: MiniTicker = JSON.parse(evt.data);
          setTicker(data);
        } catch (e) {
          console.error('parse error', e);
        }
      };

      ws.onerror = (err) => {
        console.error('WS error', err);
        // You can ws.close() here if you want to treat errors as closures
      };

      ws.onclose = (evt) => {
        console.warn('WS closed', evt.code, evt.reason);
        // only reconnect if we didn’t explicitly tear it down
        if (isAlive && evt.code !== 1000 /* 1000 = “normal closure” */) {
          reconnectRef.current = window
            .setTimeout(connect, 3000);
        }
      };
    };

    connect();

    return () => {
      // tell onclose not to reconnect, and clear any pending timer
      isAlive = false;
      if (reconnectRef.current) {
        clearTimeout(reconnectRef.current);
      }
      wsRef.current?.close(1000);  // code 1000 = “normal closure”
    };
  }, [symbol]);

  return ticker;
}