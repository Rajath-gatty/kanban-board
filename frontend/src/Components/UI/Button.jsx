const Button = ({ children, className, ...rest }) => {
    return (
        <button
            {...rest}
            className={`${className} p-3 rounded-md border border-gray-300`}
        >
            {children}
        </button>
    );
};

export default Button;
