import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './AllProductItem.module.css';

export const AllProductItem = ({id, imgURL, title, price}) => {
    let history = useHistory();
    const menProducts = useSelector(state => state.menProducts.menProducts)
    const womenProducts = useSelector(state => state.womenProducts.womenProducts)
    
    const viewProduct = (id) => {
      menProducts?.find((prod) => prod.id === id && history.push(`./men/${id}`))
      womenProducts?.find((prod) => prod.id === id && history.push(`./women/${id}`))
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
