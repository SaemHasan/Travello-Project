// import React from 'react';
import React, { useEffect, useState } from 'react';
import './styles.css';


const ListItem = ({
  item: { coverSrc, title, price, deliveryFee, serviceTime, rating },
}) =>{

    const [places, setPlaces] = useState([
    { id: 1, checked: false, label: 'Mountain' },
    { id: 2, checked: false, label: 'Waterfall' },
    { id: 3, checked: false, label: 'Forest' },
  ]);

    return(
        <div className='listItem-wrap'>
            <img src={coverSrc} alt=''/>
            <header>
                <h4>{title}</h4>
                <span>🌟{rating}</span>
            </header>
            <footer>
                <p>
                    <b>{serviceTime}</b> <span> Delivery Fee ${deliveryFee}</span>
                </p>
                <p>
                    <b>${price}</b>
                </p>
            </footer>
        </div>
    );
};


export default ListItem;
