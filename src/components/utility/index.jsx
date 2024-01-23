/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import API from "../../apis";
import { displayToast } from "../../redux/actions/ToastAction";

export const Utility = () => {
    /** Get initials of logged in user
     */
    // const getInitials = () => {
    //     let firstNameInitial = '';
    //     let lastNameInitial = '';
    //     const authInfo = getLocalStorage("auth");

    //     let fullName = authInfo?.username?.split(" ");
    //     if (fullName?.length) {
    //         firstNameInitial = fullName[0][0].toUpperCase();
    //         if (fullName[1]?.[0] !== undefined) {
    //             lastNameInitial = fullName[1][0].toUpperCase();
    //         };
    //     };
    //     return `${firstNameInitial} ${lastNameInitial}`;
    // };

    // /** Get the formatted name and role of the logged in user
    //  */
    // const getNameAndType = (roleName) => {
    //     const authInfo = getLocalStorage("auth");
    //     const fullName = (authInfo?.username || '').split(" ");
    //     const firstName = fullName[0]?.charAt(0).toUpperCase() + fullName[0]?.slice(1) || '';
    //     const lastName = fullName[1]?.charAt(0).toUpperCase() + fullName[1]?.slice(1) || '';
    //     const formattedRole = (roleName || '').charAt(0).toUpperCase() + (roleName || '').slice(1);

    //     return {
    //         username: `${firstName} ${lastName}`.trim(),
    //         role: formattedRole,
    //     };
    // };

    /** Set local storage with specified key value pair
     */
    const setLocalStorage = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error(`Error setting ${key} in localStorage:`, err);
        }
    };

    /** Get the specified key from browser's local storage if it is present
     */
    const getLocalStorage = (key) => {
        const storedValue = localStorage.getItem(key);
        if (typeof storedValue !== 'undefined' && storedValue !== null && storedValue !== 'undefined') {
            return JSON.parse(storedValue);
        }
        // handling the absence of the key in localStorage
        return null;
    };

    /** Set local storage with specified key value pair
     */
    const remLocalStorage = (key) => {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error(`Error removing ${key} from localStorage:`, err);
        }
    };

    /** Verifying the token authenticity by making API call
     */
    // const verifyToken = async () => {
    //     return API.CommonAPI.verifyToken()
    //         .then(verified => {
    //             if (verified) {
    //                 return verified.data === "Verified";
    //             }
    //         })
    //         .catch(err => {
    //             return err;
    //         });
    // };

    /** Display toast message and navigate to the path if provided 
     */
    const toastAndNavigate = (dispatch, display, severity, msg, navigateTo, path = null) => {
        dispatch(displayToast({ toastAlert: display, toastSeverity: severity, toastMessage: msg }));

        setTimeout(() => {
            dispatch(displayToast({ toastAlert: !display, toastSeverity: "", toastMessage: "" }));
            if (path) {
                navigateTo(path);
            }
        }, 2000);
    };

    /** Get user role from localStorage 
    */
    // const getRole = () => {
    //     const authData = getLocalStorage("auth");
    //     if (authData && authData.role !== undefined) {
    //         return authData.role;
    //     }
    //     return null;
    // };

    /** Fetches role and priority by the id of the user logged in
     */
    // const getRoleAndPriorityById = async () => {
    //     return API.UserRoleAPI.getRoleById({ id: getRole() })
    //         .then(res => {
    //             if (res.status === 'Success') {
    //                 console.log(res.data, 'api');
    //                 return res.data;
    //             } else if (res.status === 'Error') {
    //                 console.log('error')
    //             }
    //         })
    //         .catch(err => {
    //             console.error('Error fetching user role and priority:', err);
    //         })
    // };

    return {
        getLocalStorage,
        remLocalStorage,
        setLocalStorage,
        toastAndNavigate
    };
};
