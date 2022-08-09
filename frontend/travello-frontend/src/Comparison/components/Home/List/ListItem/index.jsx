// import React from 'react';
import React, { useEffect, useState } from 'react';
import './styles.css';
import ComparisonAPI from "../../../../ComparisonAPI";


const ListItem = ({
  item: { coverSrc, title, desc, price, deliveryFee, serviceTime, rating },
}) =>{
    const [is_activity, set_is_activity] = useState(false);

    const [places, setPlaces] = useState([
    { id: 1, checked: false, label: 'Mountain' },
    { id: 2, checked: false, label: 'Waterfall' },
    { id: 3, checked: false, label: 'Forest' },
  ]);
    useEffect(() => {
      async function fetchData() {
          if (is_activity) {
              console.log("running");
              // You can await here

                const response = await ComparisonAPI.getAllActivity(2);

                //set_place_list(response)
                  console.log(response)
                // ...
            }
          else
          {
              console.log("running");
              // You can await here

                const response = await ComparisonAPI.getAllFood(2);

                //set_place_list(response)
                  console.log(response)
                // ...

          }

      }
      fetchData();

    }, []);

    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-comp' >


            <ul>
                <li>
                    <img src={coverSrc} alt="adventure"/>
      <span className="large-comp">
          <div className="div-color-comp">

              <img src={coverSrc} className="large-image-comp" alt="adventure" />
              <div>
          <p className="heading-des-comp"> Sylhet is a region with stunning natural beauty. Situated in the northeast of Bangladesh, this ancient township is rich in forest, minerals, and fisheries and is rich in natural beauty.</p>



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
