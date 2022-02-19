import React, { Component, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';


//Charting the data *Get original at https://codesandbox.io/s/9inkb?file=/src/index.js by DominicTobias*
const Charting = props => {
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();
  
    useEffect(() => {
      chart.current = createChart(chartContainerRef.current, {
        height: 300,
        width: 400,
        layout: {
          backgroundColor: '#18181b',
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
  
      //Charting candlesticks
      const candleSeries = chart.current.addCandlestickSeries({
        upColor: '#4bffb5',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#4bffb5',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1',
      });
  
      //Logs prices and charts it
      console.log("candlestick prices", props.prices)
      candleSeries.setData(props.prices);
  
  
      //Unnecessary right now
      // const areaSeries = chart.current.addAreaSeries({
      //   topColor: 'rgba(38,198,218, 0.56)',
      //   bottomColor: 'rgba(38,198,218, 0.04)',
      //   lineColor: 'rgba(38,198,218, 1)',
      //   lineWidth: 2
      // });
  
      // areaSeries.setData(areaData);
  
      //Charting Volume
      const volumeSeries = chart.current.addHistogramSeries({
        color: '#182233',
        lineWidth: 2,
        priceFormat: {
          type: 'volume',
        },
        overlay: true,
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
  
      //Logs volume and charts it
      console.log("volumes", props.volumes)
      volumeSeries.setData(props.volumes);
    }, []);
  
    // Resize chart on container resizes.
    useEffect(() => {
      resizeObserver.current = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect;
        chart.current.applyOptions({ width, height });
        setTimeout(() => {
  
          //Removed fit content so that user can scroll through data and chart does not minimize candles when displaying at first
          // chart.current.timeScale().fitContent();
          chart.current.timeScale();
        }, 0);
      });
  
      resizeObserver.current.observe(chartContainerRef.current);
  
      return () => resizeObserver.current.disconnect();
    }, []);
  
    return (
      <div className="App">
        <div>
        <div ref={chartContainerRef} className="chart-container" />
        </div>
      </div>
    );
  }

  export default Charting;