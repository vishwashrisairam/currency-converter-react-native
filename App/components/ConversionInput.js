import React from 'react';
import { TouchableOpacity,Text,TextInput,View,StyleSheet } from 'react-native';
import colors from '../constants/colors';


const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        marginVertical:10,
        marginHorizontal:20,
        borderRadius:5,
        flexDirection:"row",
        flex:1
    },
    containerDisabled:{
        backgroundColor:colors.offWhite
    },
    button:{
        backgroundColor:colors.white,
        padding:15,
        borderColor:colors.border,
        borderWidth:1,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        flex:0.15
    },
    buttonText:{
        fontSize:18,
        color:colors.blue,
        fontWeight:"bold",
    },
    input:{
        flex:1,
        padding:10,
        color:colors.textLight
    }
});

export const ConversionInput = ({text,value,onButtonPress,...props}) => {
    const containerStyle = [styles.container];
    if(props.editable===false){
        containerStyle.push(styles.containerDisabled);
    }
    
    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput 
                style={styles.input} 
                value={value}
                {...props}
            />
        </View>
    )
};