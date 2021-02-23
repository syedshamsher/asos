import React from "react";
import { CarouselItem } from "./CarouselItem";
import styles from "./Carousel.module.css";
import Carousel from "react-elastic-carousel";
export const CarouselContainer = ({ breakPoints, allProducts }) => {
   
const data = allProducts.splice(0,7)

    return (
        <div className={styles.carousel_wrapper}>
            <Carousel breakPoints={breakPoints} pagination = {false}>
                {data.map((item, i) => {
                        return (
                            <div key = {i} style = {{border: "1px solid grey"}}
                                className={styles.mainContainer}
                                
                            >
                                <CarouselItem data={item} />
                            </div>
                        );
                    })}
            </Carousel>
        </div>
    );
};
