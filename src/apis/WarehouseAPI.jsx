/**
 * Copyright © 2023, Vendor CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Vendor CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Vendor CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";
// import { Utility } from "../components/utility";

// const { getLocalStorage } = Utility();

export const WarehouseAPI = {
  /** Get Warehouses from the database that meets the specified query parameters
   */
  getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
    const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { data: response } = await api.request({
      url: `/get-warehouses?page=${page}&size=${size}${queryParam}${searchParam}`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth")?.token
      // },
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    });
    return response;
  },

  /** Create Warehouse in the database
   */
  createWarehouse: async (warehouse, cancel = false) => {
    return await api.request({
      url: `/create-warehouse`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth").token
      // },
      method: "POST",
      data: warehouse,
      signal: cancel ? cancelApiObject[this.createWarehouse.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Update Warehouse in the database
   */
  updateWarehouse: async (fields, cancel = false) => {
    return await api.request({
      url: `/update-warehouse`,
      // headers: {
      //   "x-access-token": getLocalStorage("auth").token
      // },
      method: "PATCH",
      data: fields,
      signal: cancel ? cancelApiObject[this.updateWarehouse.name].handleRequestCancellation().signal : undefined,
    });
  }
}

// defining the cancel API object for WarehouseAPI
const cancelApiObject = defineCancelApiObject(WarehouseAPI);
