/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Groups3Icon from "@mui/icons-material/Groups3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';


import { tokens, themeSettings } from "../../theme";
import StatBox from "../common/StatBox";
import { productData, lineData } from "../common/CustomCharts";
// import DropDown from "../common/DropDown";


const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");
  const colors = tokens(theme.palette.mode);
  const { typography } = themeSettings(theme.palette.mode);


  const options1 = {
    chart: {
      type: 'spline',
      backgroundColor: colors.blueAccent[500],
      borderRadius: 6,
      width: null,
    },
    title: {
      text: 'Product Data',
      style: {
        color: colors.blueAccent[100],
        fontSize: `${typography.h3.fontSize}px`,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: productData.map(dataPoint => dataPoint.month),
    },
    yAxis: {
      title: {
        text: 'Number of Products',
        style: {
          color: colors.greenAccent[400],
        },
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: 'Total Products',
        data: productData.map(dataPoint => dataPoint.products),
        color: colors.greenAccent[800],
      },
      {
        name: 'New Products',
        data: productData.map(dataPoint => dataPoint.newproducts),
        color: colors.redAccent[900],
      },
    ],
  };
  const option = {
    chart: {
      type: 'pie',  // Use 'line' for a line chart
      backgroundColor: colors.redAccent[800],
      borderRadius: 6,
      width: null,
    },
    title: {
      text: 'INVENTORY STORAGE OVER TIME',
      style: {
        color: colors.grey[100],
        fontSize: `${typography.h3.fontSize}px`,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          color: colors.grey[100],
        },
      },
    },
    yAxis: {
      title: {
        text: 'Attendance Percentage',
        style: {
          color: colors.grey[100],
        },
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        return `<strong>${Highcharts.dateFormat('%Y-%m-%d', this.x)}</strong><br>${this.series.name}: ${this.y}%`;
      },
    },
    series: [{
      name: 'Storage Percentage',
      colorByPoint: true,
      data: [
        { name: 'Inventory 1', y: 30, color: colors.blueAccent[600] },
        { name: 'Inventory 2', y: 40, color: colors.greenAccent[600] },
        { name: 'Inventory 3', y: 30, color: colors.redAccent[100] },
        { name: 'Inventory 4', y: 60, color: colors.blueAccent[100] },
        { name: 'Inventory 5', y: 50, color: colors.blueAccent[700] },
        // { name: 'Class 6', y: 70, color: colors.orangeAccent[100] },
        // { name: 'Class 7', y: 30, color: colors.redAccent[200] },
        // { name: 'Class 8', y: 70, color: colors.blueAccent[200] },
        // { name: 'Class 9', y: 60, color: colors.primary[800] },
        // { name: 'Class 10', y: 50, color: colors.primary[500] },
        // { name: 'Class 11', y: 80, color: colors.primary[600] },
      ],
      color: colors.blueAccent[600],
    }],
  };

  return (
    <Box m="10px"  >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          fontFamily={typography.fontFamily}
          fontSize={isMobile ? typography.h4.fontSize : typography.h2.fontSize}
          color={colors.grey[100]}
          fontWeight="bold"
          display="inline-block"
        >
          Dashboard
        </Typography>
        {/* <DropDown /> */}
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "repeat(2, minmax(0, 1fr))" :isTab? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))"}
        gridTemplateRows={isMobile? "0.1fr 0.1fr 0.2fr 0.2fr" : isTab? "1fr 1fr 2fr 2fr" : ""}
        gridTemplateAreas={isMobile? `"box1 box2" "box3 box4" "chart1 chart1" "chart2 chart2"` :isTab? `"box1 box2" "box3 box4" "chart1 chart1" "chart2 chart2"` : `"box1 box2 box3 box4" "chart1 chart1 chart2 chart2"`}
        gap={isMobile ? "15px" : "30px"}
        margin={isMobile ? "10px" : "20px"}
        flexWrap="wrap"
      >
        {/* ROW 1 */}
        <Box
          backgroundColor={colors.yellowAccent[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={isMobile? "8px" : "15px"}
          borderRadius="6px"
          gridArea="box1"

        >
          <StatBox
            title="150"
            subtitle="Vendors"
            progress="0.75"
            increase="+14%"
            yellowColor={colors.yellowAccent[100]}
            icon={
              <Groups3Icon
                sx={{ color: colors.primary[500], fontSize:isMobile?"10px" : "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.greenAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px"
          padding={isMobile? "8px" : "15px"}
          gridArea="box2"
        >
          <StatBox
            title="32,441"
            subtitle="Product"
            progress="0.30"
            increase="+5%"
            yellowColor={colors.greenAccent[700]}
            icon={
              <Inventory2OutlinedIcon
                sx={{ color: colors.primary[500], fontSize:isMobile?"10px" :"26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.blueAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px"
          padding={isMobile? "8px" : "15px"}
          gridArea="box3"
        >
          <StatBox
            title="15+"
            subtitle="Warehousees"
            progress="0.80"
            increase="+43%"
            yellowColor={colors.blueAccent[700]}
            icon={
              <WarehouseIcon
                sx={{ color: colors.primary[500], fontSize:isMobile?"10px" : "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.redAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px"
          padding={isMobile? "8px" : "15px"}
          gridArea="box4"
        >
          <StatBox

            title="50"
            subtitle="Inventory"
            progress="0.80"
            increase="+5%"
            yellowColor={colors.redAccent[700]}
            icon={
              <InventoryRoundedIcon
                sx={{ color: colors.primary[500], fontSize:isMobile?"10px" : "26px" }}
              />
            }
          />
        </Box>

        <Box sx={{ width: isMobile ? "100%" : isTab ? "100%" : "110vh",gridArea:"chart1", height:"100%"}}>
          <HighchartsReact highcharts={Highcharts} options={options1} /></Box>

        <Box sx={{ width: isMobile ? "100%" :isTab ? "100%" : "60vh", marginLeft: isMobile ? "0vh": isTab? "0vh": "24vh",gridArea:"chart2" }}>
          <HighchartsReact highcharts={Highcharts} options={option} /></Box>

      </Box>
    </Box>
  );
}

export default Dashboard;
