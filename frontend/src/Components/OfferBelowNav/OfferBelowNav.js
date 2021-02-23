import React from 'react'
import styles from './style.module.css';

export const OfferBelowNav = () => {
    return (
        <div>
            <div className={styles.discountDiv}>
                    <div className={styles.discountDivLeft}>
                        <p>EXTRA 15% OFF OUTLET & SALE* <br/> (UP TO 70% OFF ALREADY!) <br/> With code: SAVEMORE</p>
                    </div>
                    <div className={styles.discountDivRight}>
                        <p>PREMIER DELIVERY<br/>Unlimited free Next-Day Delivery for a whole year <br/> for £9.95. Ts&Cs  apply</p>
                    </div>
            </div>
        </div>
    )
}
export { OfferBelowNav }
