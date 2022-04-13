import "antd/dist/antd.css";
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CommonLayout from './CommonLayout'
import CampaignList from "./CampaignList";
import CreateCampaign from "./CreateCampaign";
import EditCampaign from "./EditCampaign";


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CommonLayout children={<CampaignList/>}/>}/>
                <Route path="/new-campaign" element={<CommonLayout children={<CreateCampaign/>}/>}/>
                <Route path="/edit-campaign/:id" element={<CommonLayout children={<EditCampaign/>}/>}/>
            </Routes>

        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
