service SalesOrderService {
    action triggerSalesOrder() returns array of String;
}


// service SalesOrderService {
//     action triggerSalesOrder(
//         customerName: String,
//         orderNumber: String,
//         orderAmount: Integer,
//         orderDate: Date,
//         shippingCountry: String,
//         expectedDeliveryDate: Date
//     ) returns String;
// }
