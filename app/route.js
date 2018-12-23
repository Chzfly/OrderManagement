import React from "react";
import { Router, Route, Redirect} from 'dva/router';
import Index from "./views/Index/Index";
import DailyProcurement from "./views/Purchase/DailyProcurement";
import PurchasingAndPurchasingManagement from "./views/Purchase/PurchasingAndPurchasingManagement";
import PurchaseReturnManagement from "./views/Purchase/PurchaseReturnManagement";
import SupplierDocumentInquiry from "./views/Purchase/SupplierDocumentInquiry";
import OrderManagement from "./views/Sales/OrderManagement";
import CustomerRetention from "./views/Sales/CustomerRetention";
import PromotionManagement from "./views/Sales/PromotionManagement";

export default ({ history }) => {
    return (
        <Router history={history}>
            <div>
                <Route path="/" exact component={Index} />
                <Route path="/index" exact render={() => {
                    return <Redirect to="/" />
                }} />
                <Route path="/purchase" exact render={()=>{
                    return <Redirect to="/purchase/dailyprocurement" />
                }} />
                <Route path="/purchase/dailyprocurement" component={DailyProcurement} />
                <Route path="/purchase/purchasingandpurchasingmanagement" component={PurchasingAndPurchasingManagement} />
                <Route path="/purchase/purchasereturnmanagement" component={PurchaseReturnManagement} />
                <Route path="/purchase/supplierdocumentinquiry" component={SupplierDocumentInquiry} />
                <Route path="/sales" exact render={() => {
                    return <Redirect to="/sales/ordermanagement" />
                }} />
                <Route path="/sales/ordermanagement" component={OrderManagement} />
                <Route path="/sales/customerretention" component={CustomerRetention} />
                <Route path="/sales/promotionmanagement" component={PromotionManagement} />
            </div>
        </Router>
    );
}
