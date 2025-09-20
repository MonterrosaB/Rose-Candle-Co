const ChartCard = ({ title, children, dropdown }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-md font-semibold mb-2">{title}</h3>
            {dropdown && <div className="mb-2">{dropdown}</div>}
            {children}
        </div>
    );
};
export default ChartCard;
