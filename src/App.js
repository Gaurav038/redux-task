import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import SelectPlan from "./pages/SelectPlan";
import AddOns from "./pages/AddOns";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";

import {store} from './redux/store';
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-white mt-[100px] sm:mt-0 rounded-xl shadow-xl p-4 flex flex-col sm:flex sm:flex-row justify-between h-screen">
          <Sidebar />
          <div className="sm:basis-[64%] w-[300px] sm:w-[100%] h-[100%] sm:pr-[80px]">
            <Routes>
              <Route path="/" element={<PersonalInfo />} />
              <Route path="/selectplan" element={<SelectPlan />} />
              <Route path="/addons" element={<AddOns />} />
              <Route path="/summary" element={<Summary />} /> 
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;