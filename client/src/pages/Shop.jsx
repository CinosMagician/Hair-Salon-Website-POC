import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import "./Shop.css";
import { GET_PRODUCTS } from '../utils/queries';

const Shop = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (data && data.products) {
            // Initialize filteredProducts with products from the query
            const productsWithCount = data.products.map(product => ({
                ...product,
                count: 0 // Initialize count to 0 for each product
            }));
            setFilteredProducts(productsWithCount);
        }
    }, [data]);

    const [cart, setCart] = useState([]);

    const handleClick = (productId) => {
        alert(productId + " selected");
    };

    const handleAddToCart = (product) => {
        const quantityToAdd = product.count > 0 ? product.count : 1;

        if (quantityToAdd > product.stock) {
            alert(`Only ${product.stock} ${product.name}(s) available in stock.`);
            return;
        }

        const newCartItem = { ...product, quantity: quantityToAdd };

        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantityToAdd;

                if (updatedCart[existingProductIndex].quantity > product.stock) {
                    alert(`Cannot add more than ${product.stock} ${product.name}(s) to the cart.`);
                    updatedCart[existingProductIndex].quantity = product.stock;
                }

                return updatedCart;
            } else {
                return [...prevCart, newCartItem];
            }
        });

        alert(`${product.name} added to your cart (${quantityToAdd} item${quantityToAdd > 1 ? 's' : ''})`);
    };

    const handleIncreaseCount = (productId) => {
        setFilteredProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId
                    ? { ...product, count: product.count < product.stock ? product.count + 1 : product.count }
                    : product
            )
        );
    };

    const handleDecreaseCount = (productId) => {
        setFilteredProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId
                    ? { ...product, count: Math.max(0, product.count - 1) }
                    : product
            )
        );
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error fetching products: {error.message}</p>;

    return (
        <div>
            <h1>Shop</h1>
            <div className="shopMain">
                <div className="shopGrid">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="product-container">
                            <div
                                className="product"
                                onClick={() => handleClick(product._id)}
                            >
                                <h2>{product.name}</h2>
                                <p>{product.desc} - ${product.price}</p>
                                <p>Stock available: {product.stock}</p>
                                <img src={product.imageUrl} alt={product.name} className='productImage' />
                            </div>
                            <div className="product-controls">
                                <button onClick={() => handleDecreaseCount(product._id)}>-</button>
                                <span>{product.count}</span>
                                <button onClick={() => handleIncreaseCount(product._id)}>+</button>
                            </div>
                            <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
