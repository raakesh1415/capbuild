const triggerSalesOrder = require('./libs/triggerSalesOrder');

module.exports = (srv) => {
    srv.on('triggerSalesOrder', async (req) => {
        const result = await triggerSalesOrder();
        return result;
    });
};