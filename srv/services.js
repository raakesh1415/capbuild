// const triggerSalesOrder = require('./libs/triggerSalesOrder');
const triggerSalesOrderTest = require('./libs/triggerSalesOrderTest');

module.exports = (srv) => {
    srv.on('triggerSalesOrder', async (req) => {
        // const result = await triggerSalesOrder();
        const result = await triggerSalesOrderTest();
        return result;
    });
};