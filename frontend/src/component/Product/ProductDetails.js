import React, {useEffect} from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStarts from 'react-rating-stars-component';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {loading, product, error } = useSelector((state) => state.productDetails)
    console.log(error);
    console.log(loading);
    useEffect(() => {
      dispatch(getProductDetails(id))
    }, [dispatch, id]);

    const options = {
        edit: false,
        color : "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    }
    
    
  return (
    <>
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images && 
                        product.images.map((item,i) => (
                            <img
                                className='CarouselImage'
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))
                    }
                </Carousel>
            </div>

            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStarts {...options} />
                    <span> ({product.numOfReviews} Reviews) </span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input type="number" name="" value="1" id="" />
                            <button>+</button>
                        </div>{" "}
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status:{" "}
                        <b
                            className={product.stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? "OutOfStock" : "Instock"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                </div>
                <button className="submitReview">Submit Review</button>
            </div>
        </div>
    </>
  )
}

export default ProductDetails
