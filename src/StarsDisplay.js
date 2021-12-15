const StarsDisplay = (props) => {
    return ( 
        <>
        {props.utilRange(1, props.stars).map(starId =>
            <div key={starId} className="star" />
            )}
        </>
        
     );
}
 
export default StarsDisplay;