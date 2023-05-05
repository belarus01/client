import React, { useCallback, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import enUS from 'antd/lib/locale/en_US';
import ruRu from 'antd/lib/locale/ru_RU';
import GlobalStyle from './styles/GlobalStyle';
import 'typeface-montserrat';
import 'typeface-lato';
import { AppRouter } from './components/router/AppRouter';
import { useLanguage } from './hooks/useLanguage';
import { usePWA } from './hooks/usePWA';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import { useAppSelector } from './hooks/reduxHooks';
import { themeObject } from './styles/themes/themeVariables';
import useGeolocation from "react-hook-geolocation";
import { sendGeolocation } from './api/geolocation.api';
import { useGeolocated } from "react-geolocated";

const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  usePWA();

  useThemeWatcher();
  useEffect(() => {
    console.log(navigator.geolocation);
    
    // if (isEnabled && navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(updateCoordinates, setError);
    //   watchId = navigator.geolocation.watchPosition(
    //     updateCoordinates,
    //     setError,
    //     {
    //       enableHighAccuracy,
    //       maximumAge,
    //       timeout,
    //     }
    //   );
    // }

    // return () => {
    //   if (watchId) {
    //     navigator.geolocation.clearWatch(watchId);
    //   }
    // };
  }, [
  ]);


//   const sendCoords = (coords) => {
//     console.log(coords);
    
//   }

//   const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
//         useGeolocated({
//             positionOptions: {
//                 enableHighAccuracy: false,
//             },
//             userDecisionTimeout: 5000,
          
//         });

const success =(position)=>{
  console.log(position);
  
}
const error = (e) => {
  console.log('error', e);
}
useEffect(()=>{
 const timer = setInterval(()=>{
  navigator.geolocation.getCurrentPosition(success, error);
  
 }, 5000)
 return()=>{
  clearInterval(timer)
 }
}, [])


  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <HelmetProvider>
        <ConfigProvider locale={ruRu}>
          <AppRouter />
        </ConfigProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
