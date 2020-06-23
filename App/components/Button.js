import React from 'react';
import { TouchableOpacity,Image,Text, StyleSheet } from 'react-native';
import {Entypo} from '@expo/vector-icons';



import colors from '../constants/colors';

const styles = StyleSheet.create({
    button:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginVertical:20

    },
    buttonIcon:{
        marginRight:20,
        width:20,
        height:20
    },
    buttonText:{
        fontSize:16,
        color:colors.white
    }
});

export const Button = ({text,onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            {/* <Image
                source={require('../assets/images/logo.png')}
                style={styles.buttonIcon}
                resizeMode="contain"
            /> */}
            <Entypo name="swap" size={30} color={colors.white}/>
            <Text style={styles.buttonText}>{text}</Text>

        </TouchableOpacity>
    );
};