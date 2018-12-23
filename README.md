## 内部订单管理系统

------

React、dva、antd、echarts、mockjs、immutable

> * 首页展示：echarts图表
> * 日常采购管理：table列表展示，支持排序、筛选、检索功能，侧边抽屉可以修改单个订单条目
> * 采购进货管理：表单信息收集提交，使用antd组件，正则验证表单内容。身份证、票据图片预览上传
> * 供应商单据查询：单据信息卡片展示、筛选、检索，多层嵌套模态框编辑管理员信息。
### 项目总结
> * 样式：使用css预处理器sass编写样式
> * 通用组件：在components中进行封装
> * 主要部分：在app/views文件夹下进行编写
> * 路由：dva/router
> * 接口：使用了mockjs进行接口模拟
> * 状态管理： 大量的状态数据存放在dva的model中，部分组件含有不需要和其他组件进行交互的状态，存放在组件state中
#### index 首页
> * Index：首页展示组件，使用图表将数据可视化
> * <img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/index-1.png">
> * <img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/index-2.png">
#### Purchase: 采购管理部分
> * components：通用组件，包括：浮层-更新订单、图片上传预览组件、条目编辑抽屉组件
<img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/editor.png" width="300">
> * PAP_steps: 分布表单的步骤集合
<img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/step-1.png" width="300">
<img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/step-2.png" width="300">
> * DailyProcurement: 日常采购订单组件
<img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/purchase-1.png" width="300">
> * PurchaseReturnManagement: 退货管理组件
> * PurchasingAndPurchasingManagement: 进货管理组件
> * SupplierDocumentInquiry: 供应商单据查询组件
<img src="https://github.com/Chzfly/OrderManagement/blob/master/captures/modal-1.png" width="300">
#### Sales 销售管理部分
