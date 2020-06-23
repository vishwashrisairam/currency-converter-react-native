import React,{createContext,useState,useEffect} from 'react';
import { Alert } from 'react-native';

import { api } from './api';
const DEFAULT_BASE_CURRENCY ="USD";
const DEFAULT_QUOTE_CURRENCY ="INR";

export const ConversionContext = createContext();

export const ConversionContextProvider = ({children}) => {

    const [baseCurrency,_setBaseCurrency]=useState(DEFAULT_BASE_CURRENCY);
    const [quoteCurrency,setQuoteCurrency]=useState(DEFAULT_QUOTE_CURRENCY);
    const [date, setDate] = useState();
    const [rates, setRates] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    
    const setBaseCurrency = currency => {
        setIsLoading(true);
        return api(`/latest?base=${currency}`)
            .then(res=>{
                // console.log(res)
                _setBaseCurrency(currency);
                setDate(res.date)
                setRates(res.rates)
            })
            .catch(err=>{
                Alert.alert('Sorry, something went wrong.',err.message)
            })
            .finally(()=>{
                setIsLoading(false);
            });
        
    }

    const swapCurrency = () =>{
        setBaseCurrency(quoteCurrency);
        setQuoteCurrency(baseCurrency);
    }

    const contextValue = {
      baseCurrency,
      quoteCurrency,
      swapCurrency,
      setBaseCurrency,
      setQuoteCurrency,
      date,
      rates,
      isLoading
    };

    useEffect(()=>{
        setBaseCurrency(DEFAULT_BASE_CURRENCY);
    },[])

    return (
        <ConversionContext.Provider value ={contextValue}>
            {children}
        </ConversionContext.Provider>
    )
};