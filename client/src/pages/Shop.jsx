import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Shop.css";

const Shop = () => {
    const navigate = useNavigate();

    const [filteredProducts, setFilteredProducts] = useState([
        { id: 1, name: 'Shampoo', desc: 'Shampoo used to cleanse hair', price: "25.99", imageUrl: '/src/assets/images/products/shampoo.png', stock: 24, count: 0 },
        { id: 2, name: 'Conditioner', desc: 'Conditioner used to smooth out hair', price: "29.99", imageUrl: '/src/assets/images/products/conditioner.png', stock: 24, count: 0 },
        { id: 3, name: 'Scissors', desc: 'Scissors used to cut hair', price: "42.99", imageUrl: '/src/assets/images/products/scissors.png', stock: 5, count: 0 },
    ]);

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
                product.id === productId
                    ? { ...product, count: product.count < product.stock ? product.count + 1 : product.count }
                    : product
            )
        );
    };

    const handleDecreaseCount = (productId) => {
        setFilteredProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? { ...product, count: Math.max(0, product.count - 1) }
                    : product
            )
        );
    };

    return (
        <div>
            <h1>Shop</h1>
            <div className="shopMain">
                <div className="shopGrid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-container">
                            <div
                                className="product"
                                onClick={() => handleClick(product.id)}
                            >
                                <h2>{product.name}</h2>
                                <p>{product.desc} - ${product.price}</p>
                                <p>Stock available: {product.stock}</p>
                                <img src={product.imageUrl} alt={product.name} className='productImage' />
                            </div>
                            <div className="product-controls">
                                <button onClick={() => handleDecreaseCount(product.id)}>-</button>
                                <span>{product.count}</span>
                                <button onClick={() => handleIncreaseCount(product.id)}>+</button>
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