const Loader = ({
    width = 35,
    height = 35,
    thickness = 3,
    color = "#64748b",
}) => {
    return (
        <div
            className="loader"
            style={{
                width,
                height,
                borderColor: color,
                borderBottomColor: "transparent",
                borderWidth: thickness,
            }}
        ></div>
    );
};

export default Loader;
