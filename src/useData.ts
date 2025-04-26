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
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connectWebSocket = () => {
    wsRef.current = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

    wsRef.current.onopen = () => {
      console.log('WebSocket connected ✅');
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data: MiniTicker[] = JSON.parse(event.data);
        const coinData = data.find((item) => item.s === symbol.toUpperCase());
        if (coinData) {
          setTicker(coinData);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      wsRef.current?.close();
    };

    wsRef.current.onclose = (event: CloseEvent) => {
      console.warn('WebSocket closed. Attempting to reconnect...', event.reason);
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [symbol]);

  return ticker;
}