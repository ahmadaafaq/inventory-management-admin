/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
*
* This software is the confidential information of School CRM Inc., and is licensed as
* restricted rights software. The use,reproduction, or disclosure of this software is subject to
* restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar/dist";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
import TuneOutlined from '@mui/icons-material/TuneOutlined'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';

import API from "../../apis";
import { SidebarItem } from "./SidebarItem";
import { tokens } from "../../theme";

// import { Utility } from "../utility";
import logo from "../image/InventoryMangement.png"
import "./index.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const selected = useSelector(state => state.menuItem.selected);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: theme.palette.mode === 'light' ? '#ffffff' : `${colors.primary[400]} !important`,
          overflow: isMobile ? "hidden" : ""
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`
        },
        "& .pro-inner-item": {
          padding: `4px 35px 4px 15px !important`
        },
        "& .pro-inner-item:hover": {
          color: `#868dfb !important`
        },
        "& .pro-menu-item.active": {
          color: `#6870fa !important`
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <TuneOutlined /> : undefined}
            style={{
              color: colors.grey[100],
              margin: isMobile ? `10px 0px 10px 0` : `10px 0px 10px 20px !important`
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Inventory Management
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <TuneOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="15px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  src={logo}
                  style={{ cursor: "pointer", borderRadius: "10%", width: "60%" }}
                />
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Dashboard"
              to="/"
              icon={<GridViewRoundedIcon />}
              selected={selected}
              menuVisibility={2}
            />
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Vendor"
              to="/vendor/listing"
              icon={<PeopleAltRoundedIcon />}
              selected={selected}
            />
            <Divider />
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Product"
              to="/product/listing"
              icon={<Inventory2RoundedIcon />}
              selected={selected}
            />
            <Divider />
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Warehouse"
              to="/warehouse/listing"
              icon={<WarehouseRoundedIcon />}
              selected={selected}
            />
            <Divider />
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Inventory"
              to="/inventory/listing"
              icon={<InventoryRoundedIcon />}
              selected={selected}
            />
            <Divider />
          </Box>
        </Menu>
      </ProSidebar>
    </Box >
  );
};

export default Sidebar;
