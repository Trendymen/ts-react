import React, { useEffect, useState, useCallback } from "react";
import { useChecked } from "./useChecked";
import CartItemFC from "./CartItem";
import { List, Typography, Row, Col, Checkbox } from "antd";

const { Text } = Typography;

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

// cartItems的价格总和
const sumPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, cur) => sum + cur.price, 0);
};

const getData = (): Promise<CartItem[]> => {
  return new Promise((resolve, reject) => {
    const cartItems = new Array(5).fill(5).map((value, i) => ({
      id: i,
      name: `商品${i}`,
      price: (i + 1) * Math.round(Math.random() * 100),
    }));
    resolve(cartItems);
  });
};

const Cart: React.FC = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  const {
    checkedMap,
    filterChecked,
    checkedAll,
    onCheckedChange,
    onCheckedAllChange,
  } = useChecked(cartData);

  const fetchData = useCallback(async function (): Promise<void> {
    console.log("getData");
    setCartData(await getData());
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const listRenderItem: React.FC<CartItem> = (item: CartItem) => (
    <List.Item className="list-item">
      <CartItemFC
        item={item}
        checked={checkedMap[item.id]}
        onCheckedChange={onCheckedChange}
      />
    </List.Item>
  );

  const footer = (
    <Row justify="space-between">
      <Col>
        <Checkbox
          checked={checkedAll}
          onChange={(e): void => onCheckedAllChange(e.target.checked)}
        >
          全选
        </Checkbox>
      </Col>
      <Col>
        价格总计：
        <Text code>${sumPrice(filterChecked())}</Text>
      </Col>
    </Row>
  );

  return (
    <div className="cart">
      <List
        bordered
        dataSource={cartData}
        header={<div className="title">购物车</div>}
        renderItem={listRenderItem}
        footer={footer}
      />
    </div>
  );
};
export default Cart;
