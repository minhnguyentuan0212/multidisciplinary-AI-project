import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import App from '../App';
import Insights from '../pages/InSight';

function WebRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App></App>}>
                    <Route path='InSights' element={<Insights></Insights>}/>
                    <Route index element={<Home></Home>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default WebRouter;