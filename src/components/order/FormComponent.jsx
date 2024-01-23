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
// import AddressFormComponent from "../address/AddressFormComponent";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import OrderFormComponent from "./OrderFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        orderData: { values: null, validated: false }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const orderFormRef = useRef();
   // const addressFormRef = useRef();

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

    //after page refresh the id in router state becomes undefined, so getting order id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateOrder = useCallback(formData => {
        setLoading(true);

        const paths = ["/update-order"];
        const dataFields = [
            { ...formData.orderData.values }
        ];
        console.log(dataFields, 'datafields')

        API.CommonAPI.multipleAPICall("PATCH", paths, dataFields)
            .then(response => {
                let status = true;
                console.log(response, 'response update')
                response.forEach(response => {
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

    const populateOrderData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/order/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(response => {
                console.log('Responses', response);
                const dataObj = {
                    orderData: response[0].data.data
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

    const createOrder = () => {
        setLoading(true);
        console.log('formData', formData)

        API.OrderAPI.createOrder({ ...formData.orderData.values })
        .then(({ data: order }) => {
            if (order.status === 'Success') {
                setLoading(false);
                toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/${selected.toLowerCase()}/listing`);
            } else {
                setLoading(false);
                toastAndNavigate(dispatch, true, "An Error Occurred");
            };
        })
        .catch(err => {
            setLoading(false);
            toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
            throw err;
        });
};

    //Create/Update/Populate order
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateOrderData(id);
        }
        if (formData.orderData.validated) {
            formData.orderData.values?.id ? updateOrder(formData) : createOrder();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await orderFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        form === 'order' ? setFormData({ ...formData, orderData: data }) :
            null;
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
            <OrderFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'order');
                }}
                refId={orderFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.orderData}
            />
            {/* <AddressFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'address');
                }}
                refId={addressFormRef}
                update={id ? true : false}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                updatedValues={updatedValues?.addressData}
            /> */}

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on Order update
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
