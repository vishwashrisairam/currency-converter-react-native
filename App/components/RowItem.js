const { ImagePropTypes } = require("react-native");
import React from 'react';
import {TouchableOpacity,Text,StyleSheet,View} from 'react-native';

import colors from '../constants/colors';

const styles = StyleSheet.create({
    row:{
        paddingHorizontal:20,
        paddingVertical: 20,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
    },
    text:{
        fontSize: 16,
        color:colors.text
    },
    seperator:{
        backgroundColor:colors.border,
        height:StyleSheet.hairlineWidth,
        marginLeft:20
    }
});

export const RowItem = ({text,rightIcon,onPress}) => {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            {/* <Entypo name="chevron-right" size={20} color={colors.blue}/> */}
            {rightIcon}
        </TouchableOpacity>
    );
}

export const RowSeparator = () => <View style={styles.seperator}></View>;