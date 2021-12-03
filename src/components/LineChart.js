import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { dummyPriceData } from './priceData';
//import { volumeData } from './volumeData';
//import { areaData } from './areaData';

import '../App.css';

const processData = (data) => {
  let all_entries = data["data"]["entries"];
  let result = []

  all_entries.forEach(element => {
      let temp_obj = {
          time: new Date(element[0]).toISOString().slice(0,10),
          open: element[1],
          high: element[2],
          low: element[3],
          close: element[4]
      }
      result.push(temp_obj)
  });

  return result;
}
  


export default function LineChart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  const cors_head = "https://observable-cors.glitch.me/"

  const api_url =
"https://production.api.coindesk.com/v2/price/values/BTC?start_date=2021-01-01T00:00&end_date=2021-12-01T00:00&ohlc=true";
  
  //const priceData = useCdPriceData(api_url)
  //console.log(priceData)
  //console.log(dummyPriceData)

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#262626',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#00D964',
      downColor: '#FF0000',
      borderDownColor: '#FF0000',
      borderUpColor: '#00D964',
      wickDownColor: '#939598',
      wickUpColor: '#939598',
    });

    fetch(api_url)
      .then((response) => {
          return response.json().then((data) => {
              candleSeries.setData(processData(data));
          });
    });
    

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    // const volumeSeries = chart.current.addHistogramSeries({
    //   color: '#182233',
    //   lineWidth: 2,
    //   priceFormat: {
    //     type: 'volume',
    //   },
    //   overlay: true,
    //   scaleMargins: {
    //     top: 0.8,
    //     bottom: 0,
    //   },
    // });

    // volumeSeries.setData(volumeData);
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;

      //console.log(entries)

      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
      <div ref={chartContainerRef} className="chart-container" />
  );
}
