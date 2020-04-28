import React from "react";
import { Typography, Checkbox, Row, Col } from "antd";
import { CartItem } from "./";
import "./index.css";
import { OnCheckedChange } from "./useChecked";

const { Text } = Typography;

interface Props {
  item: CartItem;
  checked: boolean;
  onCheckedChange: OnCheckedChange<CartItem>;
}

const isEqual = (preProps: Props, nextProps: Props): boolean => {
  return preProps.checked === nextProps.checked;
};

const CartItemFC: React.FC<Props> = React.memo(
  ({ item, checked, onCheckedChange }: Props) => {
    return (
      <Row className="cart-item">
        <Col span={4}>
          <Checkbox
            checked={checked}
            onChange={(e) => onCheckedChange(item, e.target.checked)}
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
