/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { combineReducers } from "redux";

import { displayToastReducer } from "./ToastReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { setVendorsReducer } from "./VendorReducer";
import { setOrdersReducer } from "./OrderReducer";
import { setInventoriesReducer } from "./InventoryReducer";
import { setWarehousesReducer } from "./WarehouseReducer";
import { setProductsReducer } from "./ProductReducer";

const reducers = combineReducers({
    allVendors: setVendorsReducer,
    allOrders: setOrdersReducer,
    allInventories: setInventoriesReducer,
    allWarehouses: setWarehousesReducer,
    allProducts: setProductsReducer,
    menuItem: menuItemReducer,
    toastInfo: displayToastReducer
});

export default reducers;
