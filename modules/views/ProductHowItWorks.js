import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";

import Image from "next/image";
import productHowItWorks1 from "/public/images/productHowItWorks1.svg";
import magic from "/public/images/magic.svg";
import schedule from "/public/images/schedule.svg";
import productCurvyLines from "/public/images/productCurvyLines.png";

const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: "default",
    color: "secondary.main",
    fontWeight: "medium",
};

const image = {
    height: 100,
    my: 4,
};

function ProductHowItWorks() {
    return (
        <Box
            component="section"
            sx={{
                display: "flex",
                bgcolor: "secondary.light",
                overflow: "hidden",
            }}
        >
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component={Image}
                    src={productCurvyLines}
                    alt="curvy lines"
                    sx={{
                        pointerEvents: "none",
                        position: "absolute",
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography
                    variant="h4"
                    marked="center"
                    component="h2"
                    sx={{ mb: 7 }}
                >
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1. </Box>
                                <Box
                                    component={Image}
                                    src={productHowItWorks1}
                                    alt="suitcase"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center">
                                    Add your activties to MENTOR.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component={Image}
                                    src={magic}
                                    alt="graph"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center">
                                    Let MENTOR schedule them according to all of
                                    your preferences.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component={Image}
                                    src={schedule}
                                    alt="clock"
                                    sx={image}
                                />
                                <Typography variant="h5" align="center">
                                    Build better schedule that suitable to you
                                    and save time!
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    component="a"
                    href="/in/sign-up/"
                    sx={{ mt: 8 }}
                >
                    Get started
                </Button>
            </Container>
        </Box>
    );
}

export default ProductHowItWorks;