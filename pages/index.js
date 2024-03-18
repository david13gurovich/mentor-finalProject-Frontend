import * as React from "react";
import ProductCategories from "/modules/views/ProductCategories";
import ProductSmokingHero from "/modules/views/ProductSmokingHero";
import AppFooter from "/modules/views/AppFooter";
import ProductHero from "/modules/views/ProductHero";
import ProductValues from "/modules/views/ProductValues";
import ProductHowItWorks from "/modules/views/ProductHowItWorks";
import ProductCTA from "/modules/views/ProductCTA";
import AppAppBar from "/modules/views/AppAppBar";
import withRoot from "/modules/withRoot";
import { useSelector } from "react-redux";
import { selectAuthState, setAuthState } from "/modules/model/auth";
// import appointments from "/public/demo_data/month_appointments.js";
// import Demo from '../modules/components/demo';

function Index() {
    const authState = useSelector(selectAuthState);
    console.log("Auth State INDEX", authState);
    // const [data, setData] = React.useState(appointments);
    return (
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <ProductHowItWorks />
            <ProductCategories />
            <AppFooter />
        </React.Fragment>
    );
    // return (
    //   <Demo data={data} setData={setData} />
    // );
}

export default withRoot(Index);
