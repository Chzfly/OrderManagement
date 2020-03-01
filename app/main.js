import React from "react";
import Dva from "dva";
import logger from "redux-logger";
//路由文件
import route from "./route.js";
//引入model
import DailyProcurementModel from "./model/dailyProcurementModel";
import updateProcurementDrawerModel from "./model/updateProcurementDrawerModel";
import purchasingAndPurchasingManagementModel from "./model/purchasingAndPurchasingManagementModel";
import supplierDocumentInquiryModel from "./model/supplierDocumentInquiryModel";
import sdim_model from "./model/sdim_model";
import staffListModel from "./model/staffListModel";
import indexModel from "./model/indexModel";
//创建app
const app = Dva({
    // onAction: logger
});
//路由
app.router(route);
//模型
app.model(DailyProcurementModel);
app.model(updateProcurementDrawerModel);
app.model(purchasingAndPurchasingManagementModel);
app.model(supplierDocumentInquiryModel);
app.model(sdim_model);
app.model(staffListModel);
app.model(indexModel);
//挂载
app.start("#app");