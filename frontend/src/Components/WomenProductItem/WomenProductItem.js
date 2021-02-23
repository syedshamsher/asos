import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './WomenProductItem.module.css'

export const WomenProductItem = ({id, imgURL, title, price}) => {
    let history = useHistory();
    const url = history.location.pathname
    
    const viewProduct = (id) => {
        history.push(`.${url}/${id}`)
    }
    return (
        <div onClick={() => viewProduct(id)} style={{marginTop: "20px"}}>
          <div style={{ position: "relative"}}>
              <img src={`http://${imgURL}`} alt={id} width="290" height="372" />
          </div>
          <div className={styles.title}>
            <div>{title}</div>
          </div>
          <div className={styles.price}>
            <div>₹ {price}</div>
          </div>
       </div>
    )
}
