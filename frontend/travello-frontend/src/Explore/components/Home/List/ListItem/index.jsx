// import React from 'react';
import React, { useEffect, useState } from 'react';
import './styles.css';


const ListItem = ({
  item: { coverSrc, title, price, deliveryFee, serviceTime, rating, category },
}) =>{

    const isPlace = true;
    const [places, setPlaces] = useState([
    { id: 1, checked: false, label: 'Mountain' },
    { id: 2, checked: false, label: 'Waterfall' },
    { id: 3, checked: false, label: 'Forest' },
  ]);

    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-explore' >


            <ul>
                <li>
                    <img src={coverSrc} alt="adventure"/>
      <span className="large-explore">
          <div className="div-color-explore">

              <img src={coverSrc} className="large-image-explore" alt="adventure" />
              <div>
          <p className="heading-des"> Sylhet is a region with stunning natural beauty. Situated in the northeast of Bangladesh, this ancient township is rich in forest, minerals, and fisheries and is rich in natural beauty.</p>
                  <p className="heading-des"> It’s known for its Sufi shrines, like the ornate tomb and mosque of 14th-century saint Hazrat Shah Jalal, now a major pilgrimage site near Dargah Gate. The tiny Museum of Rajas contains belongings of the local folk poet Hasan Raja.</p>


              </div>


          </div>

      </span>
                </li>


  </ul>















            {/*<img src={coverSrc} alt=''/>*/}
            <header>
                <h4>{title}</h4>
                <span>🌟{rating}</span>
            </header>
            {/*<footer>*/}
            {/*    <p>*/}
            {/*        <b>{serviceTime}</b> <span> Delivery Fee ${deliveryFee}</span>*/}
            {/*    </p>*/}
            {/*    <p>*/}
            {/*        <b>${price}</b>*/}
            {/*    </p>*/}
            {/*</footer>*/}
        </div>
    );
};


export default ListItem;
