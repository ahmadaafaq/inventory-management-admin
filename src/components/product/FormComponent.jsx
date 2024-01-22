/**
 * Copyright © 2023, vendor CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of vendor CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with vendor CRM.
 */

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from "@mui/material";

import API from "../../apis";
import AddressFormComponent from "../address/AddressFormComponent";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import ProductFormComponent from "./ProductFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        productData: { values: null, validated: false },
        addressData: { values: null, validated: false }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const productFormRef = useRef();
    const addressFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);

    const selected = useSelector(state => state.menuItem.selected);
    const toastInfo = useSelector(state => state.toastInfo);
    const { state } = useLocation();
    const { getLocalStorage, toastAndNavigate } = Utility();

    //after page refresh the id in router state becomes undefined, so getting product id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateProductAndAddress = useCallback(formData => {
        setLoading(true);

        const paths = ["/update-product", "/update-address"];
        const dataFields = [
            { ...formData.productData.values },
            { ...formData.addressData.values }
        ];
        console.log(dataFields, 'datafields')

        API.CommonAPI.multipleAPICall("PATCH", paths, dataFields)
            .then(responses => {
                let status = true;
                console.log(responses, 'response update')
                responses.forEach(response => {
                    if (response.data.status !== "Success") {
                        status = false;
                    };
                });
                if (status) {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/${selected.toLowerCase()}/listing`);
                };
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, [formData]);

    const populateProductData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/product/${id}`, `/get-address/product/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                console.log('Responses', responses);
                const dataObj = {
                    productData: responses[0].data.data,
                    addressData: responses[1]?.data?.data
                };
                console.log('form component', dataObj)
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch(err => {
                console.log('error', err);
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    const createProduct = () => {
        setLoading(true);
        console.log('formData', formData)

        API.ProductAPI.createProduct({ ...formData.productData.values })
            .then(({ data: product }) => {
                if (product?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: product.data.id,
                        parent: 'product'
                    })
                        .then(address => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/${selected.toLowerCase()}/listing`);
                        })
                        .catch(err => {
                            console.log('errooorr', err)
                            setLoading(false);
                            toastAndNavigate(dispatch, true, err ? err : "An Error Occurred");
                            throw err;
                        });
                };
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    //Create/Update/Populate product
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateProductData(id);
        }
        if (formData.productData.validated && formData.addressData.validated) {
            formData.productData.values?.id ? updateProductAndAddress(formData) : createProduct();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await productFormRef.current.Submit();
        await addressFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        form === 'product' ? setFormData({ ...formData, productData: data }) :
            setFormData({ ...formData, addressData: data });
    };

    return (
        <Box m="10px">
            <Typography
                fontFamily={typography.fontFamily}
                fontSize={typography.h2.fontSize}
                color={colors.grey[100]}
                fontWeight="bold"
                display="inline-block"
                marginLeft="20px"
            >
                {`${title} ${selected}`}
            </Typography>
            <ProductFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'product');
                }}
                refId={productFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.productData}
            />
            <AddressFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'address');
                }}
                refId={addressFormRef}
                update={id ? true : false}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                updatedValues={updatedValues?.addressData}
            />

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on product update
                    title === "Update" ? null :
                        <Button type="reset" color="warning" variant="contained" sx={{ mr: 3 }}
                            disabled={!dirty || submitted}
                            onClick={() => {
                                if (window.confirm("Do You Really Want To Reset?")) {
                                    setReset(true);
                                };
                            }}
                        >
                            Reset
                        </Button>
                }
                <Button color="error" variant="contained" sx={{ mr: 3 }}
                    onClick={() => navigateTo(`/${selected.toLowerCase()}/listing`)}>
                    Cancel
                </Button>
                <Button type="submit" onClick={() => handleSubmit()} disabled={!dirty}
                    color={title === "Update" ? "info" : "success"} variant="contained"
                >
                    Submit
                </Button>
                <Toast alerting={toastInfo.toastAlert}
                    severity={toastInfo.toastSeverity}
                    message={toastInfo.toastMessage}
                />
            </Box>
            {/* {loading === true ? <Loader /> : null} */}
        </Box>
    );
};

export default FormComponent;
