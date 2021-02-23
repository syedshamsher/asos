import React from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'

export const CarouselItem = ({data}) => {
  let history = useHistory();
  const menProducts = useSelector(state => state.menProducts.menProducts)
  const womenProducts = useSelector(state => state.womenProducts.womenProducts)
  const url = data.imgURL

  const viewProduct = (id) => {
  menProducts?.find((prod) => prod.id === id && history.push(`./men/${id}`))
  womenProducts?.find((prod) => prod.id === id && history.push(`./women/${id}`))

}
    return (
      <>
        <div onClick={() => viewProduct(data.id)}>
          <img width="100%" src={`https://${url}`} alt=""/>
        </div>
      </>
    )
}