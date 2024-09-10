import React from "react";

const Card = (props) => {
    const { className, children, ...otherProps } = props;
    return (
        <div {...otherProps} className={`${className} rounded-lg p-3`}>
            {children}
        </div>
    );
};

export default Card;
