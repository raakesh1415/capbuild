module.exports = triggerSalesOrder;
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

async function triggerSalesOrder() {
    console.log('---Triggering SAP Build Sales Order Workflow---');
    try {
        // Hardcoded test data
        const payload = {
            definitionId: 'eu10.crossfunctional-dev-56c89xus.salesordersapi.orderProcessing',
            context: {
                salesorderdetails: {
                    customerName: 'ABC Widgets',
                    orderNumber: '156789',
                    orderAmount: 40000,
                    orderDate: '2025-11-23',
                    shippingCountry: 'Germany',
                    expectedDeliveryDate: '2025-12-25'
                }
            }
        };

        console.log('Workflow Payload:', JSON.stringify(payload, null, 2));

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

        console.log('Workflow triggered successfully');
        console.log('Response:', JSON.stringify(result.data, null, 2));
        
        return [`Sales order workflow triggered successfully`];
        // return [
        //     JSON.stringify({ success: true, message: 'Sales order workflow triggered successfully', data: result.data })
        // ];

    } catch (error) {
        console.error(`Error triggering workflow: ${error.message}`);
        return [
            JSON.stringify({ success: false, message: `Error triggering workflow: ${error.message}`, data: null })
        ];
    }
}