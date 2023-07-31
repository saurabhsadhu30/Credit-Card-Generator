import React from 'react'
import '../CardComponents/Cardback.css';

function Cardback(props) {
    return (
        <div>
            <p>{props.cvc}</p>
        </div>
    )
}

export default Cardback