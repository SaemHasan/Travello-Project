// import React from 'react';

import React, { useEffect, useState } from 'react';
import './styles.css';
import ComparisonAPI from "../../../../ComparisonAPI";

const api_path = "http://127.0.0.1:8000/media/";
const ListItem = ({
  item: { coverSrc, title, desc, price, deliveryFee, serviceTime, rating },
}) =>{
    const MAX_LENGTH = 150;
    console.log(api_path + coverSrc);
    const [places, setPlaces] = useState([
    { id: 1, checked: false, label: 'Mountain' },
    { id: 2, checked: false, label: 'Waterfall' },
    { id: 3, checked: false, label: 'Forest' },
  ]);

    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-comp' >


            <ul>
                <li>
                    <img src={api_path + coverSrc} alt="adventure"/>
      <span className="large-comp">
          <div className="div-color-comp">

              <img src={api_path + coverSrc} className="large-image-comp" alt="adventure" />


              <div>
                      <div>
      {desc.length > MAX_LENGTH ?
        (
          <div className="heading-des">
            {`${desc.substring(0, MAX_LENGTH)}...`}<p style={{color:"blue"}}><u>Read more</u></p>
          </div>
        ) :
        <p>{desc}</p>
      }
    </div>
              </div>
            </div>
          </span>
        </li>
      </ul>

      <header>
        <h4>{title}</h4>
        <span>🌟{rating}</span>
      </header>
    </div>
  );
};

export default ListItem;
