import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  MutableRefObject,
} from "react";
import CartItemFC from "./CartItem";
import { List, Typography, Row, Col, Checkbox } from "antd";

const { Text } = Typography;

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

type CheckedMap = {
  [id: number]: boolean;
};

export type OnCheckedChangeRef = MutableRefObject<
  (cartItem: CartItem, checked: boolean) => void
>;

// cartItems的价格总和
const sumPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, cur) => sum + cur.price, 0);
};

const filterChecked = (
  cartItems: CartItem[],
  checkedMap: CheckedMap
): CartItem[] => {
  return cartItems.filter((cartItem) => checkedMap[cartItem.id]);
};

// 商品勾选
const useCheckedMap = (
  cartItems: CartItem[]
): [CheckedMap, OnCheckedChangeRef, Function, boolean] => {
  const [checkedMap, setCheckedMap] = useState<CheckedMap>({});
  const onCheckedChange = (cartItem: CartItem, checked: boolean): void => {
    const { id } = cartItem;
    const newCheckedMap: CheckedMap = Object.assign({}, checkedMap, {
      [id]: checked,
    });
    setCheckedMap(newCheckedMap);
  };

  const onCheckedChangeRef: OnCheckedChangeRef = useRef(onCheckedChange);
  onCheckedChangeRef.current = onCheckedChange;

  const onCheckedAllChange = (
    cartData: CartItem[],
    newCheckedAll: boolean
  ): void => {
    // 构造新的勾选map
    const newCheckedMap: CheckedMap = {};
    // 全选
    newCheckedAll &&
      cartData.forEach((cartItem) => {
        newCheckedMap[cartItem.id] = true;
      });
    // 取消全选的话 直接把map赋值为空对象
    setCheckedMap(newCheckedMap);
  };

  const checkedAll = !cartItems.some((item) => !checkedMap[item.id]);

  return [checkedMap, onCheckedChangeRef, onCheckedAllChange, checkedAll];
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
  const [
    checkedMap,
    onCheckedChangeRef,
    onCheckedAllChange,
    checkedAll,
  ] = useCheckedMap(cartData);

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
        onCheckedChangeRef={onCheckedChangeRef}
      />
    </List.Item>
  );

  const footer = (
    <Row justify="space-between">
      <Col>
        <Checkbox
          checked={checkedAll}
          onChange={(e): void => onCheckedAllChange(cartData, e.target.checked)}
        >
          全选
        </Checkbox>
      </Col>
      <Col>
        价格总计：
        <Text code>${sumPrice(filterChecked(cartData, checkedMap))}</Text>
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
