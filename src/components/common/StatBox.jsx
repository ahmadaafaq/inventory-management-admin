/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";



import ProgressCircle from "./ProgressCircle";
import { tokens } from "../../theme";

const StatBox = ({ title, subtitle, icon, progress, increase, yellowColor }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery("(max-width:480px)");


    return (
        <Box width="100%" m={isMobile?"0px" : "0 30px"}>
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography
                        variant={isMobile ? "h6" : "h4"}
                        fontWeight="bold"
                        sx={{ color: colors.primary[500] }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} yellowColor={yellowColor} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant={isMobile?"h6":"h5" }sx={{ color: colors.primary[500] }}>
                    {subtitle}
                </Typography>
                <Typography
                    variant={isMobile?"h6":"h5"}
                    fontStyle="italic"
                    sx={{ color: colors.primary[500] }}
                >
                    {increase}
                </Typography>
            </Box>
        </Box>
    );
};

export default StatBox;
