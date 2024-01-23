/**
 * Copyright © 2023, Vendor CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Vendor CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Vendor CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, Checkbox, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";

import inventoryValidation from "./Validation";

const initialValues = {
    name:"",
    available_quantity: "",
    min_stock_level: "",
    max_stock_level: "",
    reorder_point:"",
    status: "inactive"
};

const InventoryFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: inventoryValidation,
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
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="name"
                        label="NAME"
                        autoComplete="new-name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={!!formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="available_quantity"
                        label="AVAILABLE_QUANTITY*"
                        autoComplete="new-available_quantity"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.available_quantity}
                        error={!!formik.touched.available_quantity && !!formik.errors.available_quantity}
                        helperText={formik.touched.available_quantity && formik.errors.available_quantity}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="MIN_STOCK_LEVEL"
                        name="min_stock_level"
                        autoComplete="new-min_stock_level"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.min_stock_level}
                        error={!!formik.touched.min_stock_level && !!formik.errors.min_stock_level}
                        helperText={formik.touched.min_stock_level && formik.errors.min_stock_level}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="MAX_STOCK_LEVEL"
                        name="max_stock_level"
                        autoComplete="new-max_stock_level"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.max_stock_level}
                        error={!!formik.touched.max_stock_level && !!formik.errors.max_stock_level}
                        helperText={formik.touched.max_stock_level && formik.errors.max_stock_level}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="REORDER_POINT"
                        name="reorder_point"
                        autoComplete="new-reorder_point"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.reorder_point}
                        error={!!formik.touched.reorder_point && !!formik.errors.reorder_point}
                        helperText={formik.touched.reorder_point && formik.errors.reorder_point}
                    />

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

export default InventoryFormComponent;
