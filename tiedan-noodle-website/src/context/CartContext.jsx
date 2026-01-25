import { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * CartContext - 购物车状态管理
 * 需求：4.1, 4.2, 4.3
 */

// 创建Context
const CartContext = createContext(null);

// Action类型
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  UPDATE_NOTES: 'UPDATE_NOTES'
};

// 初始状态
const initialState = {
  items: [] // { menuItem, quantity, notes }
};

/**
 * 购物车Reducer
 * @param {Object} state - 当前状态
 * @param {Object} action - 动作对象
 * @returns {Object} 新状态
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { menuItem, quantity = 1, notes = '' } = action.payload;
      
      // 检查购物车中是否已存在该商品
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItem.id
      );

      if (existingItemIndex > -1) {
        // 如果已存在，更新数量
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          notes: notes || newItems[existingItemIndex].notes
        };
        return { ...state, items: newItems };
      } else {
        // 如果不存在，添加新商品
        return {
          ...state,
          items: [...state.items, { menuItem, quantity, notes }]
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { itemId } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.menuItem.id !== itemId)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // 如果数量为0或负数，移除商品
        return {
          ...state,
          items: state.items.filter(item => item.menuItem.id !== itemId)
        };
      }

      const newItems = state.items.map(item =>
        item.menuItem.id === itemId
          ? { ...item, quantity }
          : item
      );
      return { ...state, items: newItems };
    }

    case CART_ACTIONS.UPDATE_NOTES: {
      const { itemId, notes } = action.payload;
      const newItems = state.items.map(item =>
        item.menuItem.id === itemId
          ? { ...item, notes }
          : item
      );
      return { ...state, items: newItems };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return initialState;
    }

    default:
      return state;
  }
};

/**
 * CartProvider组件
 * 提供购物车状态和操作方法
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 计算派生状态
  const derivedState = useMemo(() => {
    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
    const itemCount = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      totalPrice,
      itemCount
    };
  }, [state.items]);

  // Action creators
  const actions = useMemo(() => ({
    /**
     * 添加商品到购物车
     * @param {Object} menuItem - 菜单项对象
     * @param {number} quantity - 数量
     * @param {string} notes - 备注
     */
    addItem: (menuItem, quantity = 1, notes = '') => {
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        payload: { menuItem, quantity, notes }
      });
    },

    /**
     * 从购物车移除商品
     * @param {string} itemId - 商品ID
     */
    removeItem: (itemId) => {
      dispatch({
        type: CART_ACTIONS.REMOVE_ITEM,
        payload: { itemId }
      });
    },

    /**
     * 更新商品数量
     * @param {string} itemId - 商品ID
     * @param {number} quantity - 新数量
     */
    updateQuantity: (itemId, quantity) => {
      dispatch({
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { itemId, quantity }
      });
    },

    /**
     * 更新商品备注
     * @param {string} itemId - 商品ID
     * @param {string} notes - 备注内容
     */
    updateNotes: (itemId, notes) => {
      dispatch({
        type: CART_ACTIONS.UPDATE_NOTES,
        payload: { itemId, notes }
      });
    },

    /**
     * 清空购物车
     */
    clearCart: () => {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    }
  }), []);

  const value = useMemo(() => ({
    // 状态
    items: state.items,
    totalPrice: derivedState.totalPrice,
    itemCount: derivedState.itemCount,
    // 操作方法
    ...actions
  }), [state.items, derivedState, actions]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * useCart Hook
 * 在组件中使用购物车状态和方法
 * @returns {Object} 购物车状态和方法
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
