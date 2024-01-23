/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { Utility } from "../../utility";

export const useCommon = () => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.menuItem.selected);
    // const { getLocalStorage } = Utility();

    /** Get data for pagination according to given parameters to be used in API call
     */
    const getPaginatedData = useCallback((page = 0, size, action, api, condition = false, search = false) => {
        // const authInfo = getLocalStorage("auth");

        api.getAll(condition, page, size, search, false)
            .then(res => {
                if (res.status === 'Success') {
                    dispatch(action({ listData: res.data, loading: false }));
                } else if (res.status === 'Error') {
                    dispatch(action({ listData: [], loading: false }));
                }
            })
            .catch(err => {
                console.error("An error occurred: ", err);
                dispatch(action({ listData: [], loading: false }));
            });
    }, [selected]);

    return {
        getPaginatedData
    };
};
