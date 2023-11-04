import React, { useState } from "react";
import Button from "../UI/Button";

import axios from "../../api/AxiosUrl";

const InventoryCard = (props) => {
  const [availableItems, setAvailableItems] = useState(props.quantity);
  const [isEditing, setIsEditing] = useState(false);
  // console.log(props.inventoryId);

  const handleUpdateClick = () => {
    setIsEditing(!isEditing);
    setAvailableItems(props.quantity);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const res = await axios.put("api/inventory", {
        updatedQuantity: availableItems,
        inventoryId: props.inventoryId,
      });
      // console.log(res.data);
      props.getInventoryItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItemHandler = async () => {
    // console.log('delete');
    console.log(props);
    try {
      const res = await axios.delete(`api/inventory/${props.inventoryId}`);
      console.log(res);

      props.getInventoryItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg m-4">
        <img
          className="p-8 rounded-t-lg h-48 m-auto"
          src={props.imageUrl}
          alt="inventory"
        />
        <div className="px-5 pb-5 mt-4">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {props.name}
          </h5>
          <p className="text-gray-500 text-sm my-2">{props.description}</p>

          <div className="flex flex-col gap-1 items-center justify-between my-2 mb-0">
            <div className="flex justify-evenly gap-2">
              <label className="text-lg font-semibold" htmlFor={props.id}>
                Quantity
              </label>
              {isEditing ? (
                <input
                  id={props.id}
                  name="quantity"
                  type="number"
                  className="border-2 border-gray-700 w-12 p-0 text-center rounded-lg"
                  min={1}
                  value={availableItems}
                  onChange={(e) => setAvailableItems(e.target.value)}
                />
              ) : (
                <span className="my-auto">{props.quantity}</span>
              )}
            </div>

            <div className="mt-2 mx-2 flex gap-2">
              {isEditing ? (
                <Button bg="bg-green-500" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button bg="bg-blue-500" onClick={handleUpdateClick}>
                  Update
                </Button>
              )}
              <Button bg="bg-red-500" onClick={deleteItemHandler}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryCard;
