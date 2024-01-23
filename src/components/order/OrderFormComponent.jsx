/**
 * Copyright © 2023, Vendor CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Vendor CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Vendor CRM.
*/

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Checkbox, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";

import API from "../../apis";
import orderValidation from "./Validation";

import { useCommon } from "../hooks/common";
import { setWarehouses } from "../../redux/actions/WarehouseAction";
import { setVendors } from "../../redux/actions/VendorAction";
import { setProducts } from "../../redux/actions/ProductAction";



const initialValues = {
    warehouse_id: "",
    vendor_id: "",
    product_id: "",
    quantity: "",
    order_code: "",
    // delivery_date: "",
    status: "inactive"
};

const OrderFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [warehouseId, setWarehouseId] = useState(null);
    const warehouseInRedux = useSelector(state => state.allWarehouses);
    const [vendorId, setVendorId] = useState(null);
    const vendorInRedux = useSelector(state => state.allVendors);
    const [productId, setProductId] = useState(null);
    const productInRedux = useSelector(state => state.allProducts);

    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { getPaginatedData } = useCommon();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: orderValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm()
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false
            });
        };
    };

    useEffect(() => {
        if (reset) {
            formik.resetForm();
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        if (formik.dirty) {
            setDirty(true);
        }
    }, [formik.dirty]);

    useEffect(() => {
        if (updatedValues) {
            setInitialState(updatedValues);
        }
    }, [updatedValues]);

    useEffect(() => {
        if (!warehouseInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 100, setWarehouses, API.WarehouseAPI);
        }
    }, [warehouseInRedux?.listData?.rows]);
    useEffect(() => {
        if (!vendorInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 100, setVendors, API.VendorAPI);
        }
    }, [vendorInRedux?.listData?.rows]);
    useEffect(() => {
        if (!productInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 100, setProducts, API.ProductAPI);
        }
    }, [productInRedux?.listData?.rows]);

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.warehouse_id && !!formik.errors.warehouse_id}
                    >
                        <InputLabel id="warehouseField">--Select warehouse*--</InputLabel>
                        <Select
                            autoComplete="new-warehouse_id"
                            name="warehouse_id"
                            variant="filled"
                            value={formik.values.warehouse_id}
                            onChange={event => {
                                const getWarehouseId = event.target.value;
                                setWarehouseId(getWarehouseId);
                                formik.setFieldValue("warehouse_id", event.target.value);
                            }}
                        >
                            {warehouseInRedux?.listData?.rows?.length && warehouseInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.warehouse_id && formik.errors.warehouse_id}</FormHelperText>
                    </FormControl>

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.vendor_id && !!formik.errors.vendor_id}
                    >
                        <InputLabel id="vendorField">--Select Vendor--</InputLabel>
                        <Select
                            autoComplete="new-vendor_id"
                            name="vendor_id"
                            variant="filled"
                            value={formik.values.vendor_id}
                            onChange={event => {
                                const getVendorId = event.target.value;
                                setWarehouseId(getVendorId);
                                formik.setFieldValue("vendor_id", event.target.value);
                            }}
                        >
                            {vendorInRedux?.listData?.rows?.length && vendorInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.vendor_id && formik.errors.vendor_id}</FormHelperText>
                    </FormControl>

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.product_id && !!formik.errors.product_id}
                    >
                        <InputLabel id="productField">--Select Product--</InputLabel>
                        <Select
                            autoComplete="new-product_id"
                            name="product_id"
                            variant="filled"
                            value={formik.values.product_id}
                            onChange={event => {
                                const getProductId = event.target.value;
                                setWarehouseId(getProductId);
                                formik.setFieldValue("product_id", event.target.value);
                            }}
                        >
                            {productInRedux?.listData?.rows?.length && productInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.product_id && formik.errors.product_id}</FormHelperText>
                    </FormControl>
                  
                    {/* <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="product_id"
                        label="Product_Id"
                        autoComplete="new-product_id"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.product_id}
                        error={!!formik.touched.product_id && !!formik.errors.product_id}
                        helperText={formik.touched.product_id && formik.errors.product_id}
                        sx={{ gridColumn: "span 2" }}
                    /> */}
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="quantity"
                        label="Quantity"
                        autoComplete="new-quantity"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                        error={!!formik.touched.quantity && !!formik.errors.quantity}
                        helperText={formik.touched.quantity && formik.errors.quantity}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Order_Code"
                        name="order_code"
                        autoComplete="new-order_code"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.order_code}
                        error={!!formik.touched.order_code && !!formik.errors.order_code}
                        helperText={formik.touched.order_code && formik.errors.order_code}
                        sx={{ gridColumn: "span 1" }}
                    />
                    {/* <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Delivery_Date"
                        name="delivery_date"
                        autoComplete="new-delivery_date"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.delivery_date}
                        error={!!formik.touched.delivery_date && !!formik.errors.delivery_date}
                        helperText={formik.touched.delivery_date && formik.errors.delivery_date}
                    /> */}

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.status && !!formik.errors.status}
                    >
                        <InputLabel id="statusField">Status</InputLabel>
                        <Select
                            variant="filled"
                            labelId="statusField"
                            label="Status"
                            name="status"
                            autoComplete="new-status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
}

export default OrderFormComponent;
