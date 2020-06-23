import React, {useState,useContext} from 'react';
import { View, Text,StyleSheet,StatusBar,Image, Dimensions ,ScrollView, TouchableOpacity,ActivityIndicator} from 'react-native';


import {format} from 'date-fns';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';
import {ConversionInput} from '../components/ConversionInput';
import {Button} from '../components/Button';
import {KeyboardSpacer} from '../components/KeyboardSpacer';
import { ConversionContext } from '../util/ConversionContext';



const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.blue,
        flex:1,
    },
    content:{
        paddingTop:screen.height*0.2

    },
    logoContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    logoBackground:{
        width:screen.width*0.45,
        height:screen.width*0.45
    },
    logo:{
        position:'absolute',
        width:screen.width*0.25,
        height:screen.width*0.25
    },
    textHeader:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:30,
        marginVertical:20,
        textAlign:"center"
    },
    text:{
        color:colors.white,
        fontSize:14,
        textAlign:"center"
    },
    inputContainer: {
        marginBottom: 10,
    },
    header: {
        alignItems: 'flex-end',
        marginHorizontal: 20,
    },
});

export default Home = ({navigation})=> {
    const {
      baseCurrency,
      setBaseCurrency,
      quoteCurrency,
      setQuoteCurrency,
      swapCurrency,
      date,
      rates,
      isLoading,
    } = useContext(ConversionContext);
    const [value,setValue] = useState("100");
    const conversionRate=rates[quoteCurrency];


    // const date =new Date();

    const [scrollEnabled, setScrollEnabled] = useState(false);

    // useEffect(()=>{
    //     const showListener = Keyboard.addListener('keyboardDidShow',()=>{
    //         setScrollEnabled(true);
    //     });

    //     const hideListener = Keyboard.addListener('keyboardDidHide',()=>{
    //         setScrollEnabled(false);
    //     });

    //     return () =>{
    //         showListener.remove();
    //         hideListener.remove();
    //     }
    // },[]);

    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <StatusBar barStyle="light-content" backgroundColor={colors.blue} />

          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.push("Options")}>
              <Entypo name="cog" size={32} color={colors.white} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/background.png")}
                style={styles.logoBackground}
                resizeMode="contain"
              />
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.textHeader}>Currency Converter</Text>

            {isLoading ? (
              <ActivityIndicator color={colors.white} size="large" />
            ) : (
              <>
                <ConversionInput
                  text={baseCurrency}
                  value={value}
                  onButtonPress={() =>
                    navigation.push("CurrencyList", {
                      title: "Base Currency",
                      isBaseCurrency: true,
                    })
                  }
                  onChangeText={(text) => setValue(text)}
                  keyboardType="numeric"
                />
                <ConversionInput
                  text={quoteCurrency}
                  value={
                    value &&
                    `${(parseFloat(value) * conversionRate).toFixed(2)}`
                  }
                  onButtonPress={() =>
                    navigation.push("CurrencyList", {
                      title: "Quote Currency",
                      isBaseCurrency: false,
                    })
                  }
                  // onChangeText={text=>console.log("text",text)}
                  keyboardType="numeric"
                  editable={false}
                />

                <Text style={styles.text}>
                  {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
                    date && format(new Date(date), "MMM do, yyyy")
                  }`}
                </Text>

                <Button
                  text="Reverse Currencies"
                  onPress={() => swapCurrency()}
                />
              </>
            )}

            {/* <View style={{height:screen.height}}/> */}
            <KeyboardSpacer
              onToggle={(keyboardIsVisible) =>
                setScrollEnabled(keyboardIsVisible)
              }
            />
          </View>
        </ScrollView>
      </View>
    );
};