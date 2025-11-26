module.exports = triggerSalesOrderWithParams;
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

async function triggerSalesOrderWithParams(params) {
    try {
        const payload = {
            definitionId: 'eu10.crossfunctional-dev-56c89xus.salesordersapi.orderProcessing',
            context: {
                salesorderdetails: { ...params }
            }
        };
        
        const result = await executeHttpRequest(
            {
                destinationName: 'PUBLIC_SALESORDER_DESTINATION'
            },
            {
                method: 'POST',
                url: '',
                headers: {
                    'content-type': 'application/json'
                },
                data: payload
            }
        );

        // console.log('Response:', JSON.stringify(result.data));

        console.log('---End SAP Build Sales Order Workflow---');

        return {
            success: true,
            message: `Workflow triggered for ${params.customerName}`,
            data: result.data
        };
        // return `Workflow triggered for ${params.customerName}`;

    } catch (err) {
        console.error(`Error triggering workflow: ${error.message}`);
        return {
            success: false,
            message: `Error triggering workflow: ${error.message}`
        };
    }
}
