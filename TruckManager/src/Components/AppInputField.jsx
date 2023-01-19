import React from 'react';

function AppInputField({ placeholder, onChangeText, value, onKeyPress, type }) {
    return (
        <input style={{
            flex: 1,
            width: "100%",
            height: "100%",
            borderRadius: 10,
            backgroundColor: "#D3D3D3",
            paddingLeft: 10,
            paddingRight: 10,
            color: colors.dark,
            maxHeight: 75,
        }} 
            placeholder={placeholder} onChangeText={onChangeText} value={value} onKeyDown={onKeyPress} type={type} />
    );
}

export default AppInputField;