import React from 'react';

function AppButton({text, width = "50%", onClick = (() => console.log("Button handle not set"))}) {
    return (
        <button style={{
            width: {width},
            backgroundColor: "#1e90ff",
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            maxHeight: 75,
            }} onClick={onClick}>
            {text}
        </button>
    );
}

export default AppButton