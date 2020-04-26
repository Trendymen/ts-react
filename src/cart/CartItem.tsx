import React from "react";
import { Typography, Checkbox, Row, Col } from "antd";
import { CartItem, OnCheckedChangeRef } from "./";
import "./index.css";

const { Text } = Typography;

interface Props {
  item: CartItem;
  checked: boolean;
  onCheckedChangeRef: OnCheckedChangeRef;
}

const isEqual = (preProps: Props, nextProps: Props): boolean => {
  return preProps.checked === nextProps.checked;
};

const CartItemFC: React.FC<Props> = React.memo(
  ({ item, checked, onCheckedChangeRef }: Props) => {
    return (
      <Row className="cart-item">
        <Col span={4}>
          <Checkbox
            checked={checked}
            onChange={(e) => onCheckedChangeRef.current(item, e.target.checked)}
          />
        </Col>
        <Col span={20}>
          <Row className="item-info" justify="space-between">
            <Col>
              <Text>{item.name}</Text>
            </Col>
            <Col>
              <Text code>${item.price}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  },
  isEqual
);

export default CartItemFC;
