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

import productValidation from "./Validation";

const initialValues = {
    name: "",
    code: "",
    status: "inactive",
    barcode: "",
    description: "",
    quantity: "",
    category: ""
};

const ProductFormComponent = ({
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
        validationSchema: productValidation,
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
                        label="Code"
                        name="code"
                        autoComplete="new-code"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.code}
                        error={!!formik.touched.code && !!formik.errors.code}
                        helperText={formik.touched.code && formik.errors.code}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="name"
                        label="Name*"
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
                        type="text"
                        label="Barcode"
                        name="barcode"
                        autoComplete="new-barcode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.barcode}
                        error={!!formik.touched.barcode && !!formik.errors.barcode}
                        helperText={formik.touched.barcode && formik.errors.barcode}
                    />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        name="description"
                        autoComplete="new-description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={!!formik.touched.description && !!formik.errors.description}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity"
                        name="quantity"
                        autoComplete="new-quantity"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                        error={!!formik.touched.quantity && !!formik.errors.quantity}
                        helperText={formik.touched.quantity && formik.errors.quantity}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Category"
                        name="category"
                        autoComplete="new-category"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        error={!!formik.touched.category && !!formik.errors.category}
                        helperText={formik.touched.category && formik.errors.category}
                    />
                    {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        name="email"
                        autoComplete="new-email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={!!formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Contact Number*"
                        name="contact_no"
                        autoComplete="new-contact"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.contact_no}
                        error={!!formik.touched.contact_no && !!formik.errors.contact_no}
                        helperText={formik.touched.contact_no && formik.errors.contact_no}
                    /> */}
                    {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        name="email"
                        autoComplete="new-email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={!!formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ gridColumn: "span 2" }}
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

export default ProductFormComponent;
