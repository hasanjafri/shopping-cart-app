import React, { useState, useEffect } from "react";
import { DeliveryDate } from "../models/delivery-date";
import { LineItem } from "../models/line-item";
import LineItemModal from "./LineItemModal";
import ShoppingCartSummary from "./ShoppingCartSummary";
import Swatch from "./Swatch";

function ShoppingCart() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userPostal, setUserPostal] = useState("");
  const [items, setItems] = useState<LineItem[]>([]);
  const [deliveryDates, setDeliveryDates] = useState<DeliveryDate[]>([]);
  const [fees, setFees] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 15,
    total: 15,
  });

  useEffect(() => {
    fetch("/api/line-items")
      .then((res) => res.json())
      .then((lineItemsRes) => {
        setItems(lineItemsRes.lineItems);
        setDeliveryDates(lineItemsRes.deliveryDates);
      });
  }, []);

  const addItem = (item: LineItem) => {
    setItems([...items, item]);
  };

  const removeLineItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateFees = () => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const taxes = subtotal * 0.13;
    const shipping = 15;
    const total = subtotal + taxes + shipping;

    return {
      subtotal,
      taxes,
      shipping,
      total,
    };
  };

  const getDeliveryDate = (postal: string, id: number): string => {
    const defaultDeliveryDate = "Estimated Delivery Date: Dec 2 - Dec 15";
    if (id > 0 && id <= 3) {
      const deliveryDatesByPostal = deliveryDates.filter(
        (p) => p.postal.toLowerCase() === postal.toLowerCase()
      );
      const deliveryDate = deliveryDatesByPostal.find(
        (p) => p.ids.indexOf(id) !== -1
      );
      return deliveryDate?.estimatedDeliveryDate || defaultDeliveryDate;
    }
    return defaultDeliveryDate;
  };

  useEffect(() => {
    const fees = calculateFees();
    setFees(fees);
  }, [items]);

  return (
    <div className="shopping-cart">
      <h1>Your Cart</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="item">
            <img src={item.image} alt={item.title} />
            <div style={{ width: "100%" }}>
              <div className="title-row">
                <h4>{item.swatchTitle} / Without Ottoman / 3</h4>
                <div>
                  <h4>Price: ${item.price}</h4>
                </div>
              </div>
              <div className="swatch">
                <Swatch color={item.swatchColor} /> {item.swatchTitle}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  flexDirection: "column",
                }}
              >
                <p>{getDeliveryDate(userPostal, item.id)}</p>
                <div className="break" />
                <a
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={() => removeLineItem(index)}
                >
                  Remove
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          lineHeight: 1,
        }}
      >
        <div style={{ display: "flex" }}>
          <h5 style={{ marginRight: "10px" }}>Postal Code: </h5>
          <input onChange={(e) => setUserPostal(e.target.value)} />
        </div>
        <button onClick={() => setModalVisible(true)}>Add New Item</button>
      </div>
      <LineItemModal
        visible={modalVisible}
        onOk={(values: LineItem) => {
          values["price"] = Number(values["price"]);
          addItem({ ...values, id: Math.random() });
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
      <ShoppingCartSummary
        subtotal={fees.subtotal}
        taxes={fees.taxes}
        shipping={fees.shipping}
        total={fees.total}
      />
    </div>
  );
}

export default ShoppingCart;
