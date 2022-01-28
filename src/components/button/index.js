import React from "react";
let Button = (props) => {
    return (
        <button
            style={
                {
                    backgroundColor: props.bgColor,
                    color: props.ButtonTextColor,
                    height: props.ButtonHeight,
                    width: props.CustomWidth ? props.ButtonWidth : "200px",

                }
            }>
            {props.ButtonTitle}
        </button>
    )
}
export default Button;