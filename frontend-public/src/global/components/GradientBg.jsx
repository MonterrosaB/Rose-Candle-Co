const Gradient = () => {
  return (
    <div style={{
            width: '130%',
            height: '120%',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%)',
            position: 'fixed',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 0
        }}>
    </div>
  );
};
 
export default Gradient;