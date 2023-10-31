import React, { useEffect, useState } from 'react';
import InventoryCard from '../components/Inventory/InventoryCard';
import { createPortal } from 'react-dom';

import axios from '../api/AxiosUrl';
import Button from '../components/UI/Button';
import AddInventoryItem from '../components/Inventory/AddInventoryItem';

const Inventory = (props) => {
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInventoryProductsAvailable, setIsInventoryProductsAvailable] =
    useState(false);

  const [isAddProductsShown, setIsAddProductsShown] = useState(false);

  const showAddProductsHandler = () => {
    setIsAddProductsShown(true);
  };
  const hideAddProductsHandler = () => {
    setIsAddProductsShown(false);
  };
  const addToInventoryHandler=()=>{

  }

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('api/inventory');
        const data = await result.data.inventory;
        console.log(data);

        if (data.length) setIsInventoryProductsAvailable(true);
        else setIsInventoryProductsAvailable(false);
        setInventoryProducts(data);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='mx-8 mt-4'>
      {isLoading && (
        <div className='text-xl my-auto text-center '>Loading...</div>
      )}
      {!isLoading && !isInventoryProductsAvailable && (
        <div className='text-3xl text-center '>Products is not available</div>
      )}

      {!isLoading && isInventoryProductsAvailable && (
        <>
          <div>
            <h1 className='text-6xl font-light'>Inventory</h1>
          </div>
          <div className='flex flex-wrap justify-center my-6'>
            {inventoryProducts.map((val) => (
              <InventoryCard
                key={val._id}
                name={val.name}
                description={val.description}
                company={val.company}
                category={val.category}
                imageUrl={val.imageUrl}
                quantity={val.quantity}
                inventoryId={val._id}
                setInventoryProducts={setInventoryProducts}
              />
            ))}
          </div>

          <div className=' text-center'>
            <Button onClick={showAddProductsHandler}>Add Item</Button>
          </div>

          {isAddProductsShown && (
            <AddInventoryItem onClose={hideAddProductsHandler} onAdd={addToInventoryHandler} />
          )}
        </>
      )}
    </div>
  );
};

export default Inventory;
