module.exports = triggerSalesOrderTest;
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const { getDestination } = require('@sap-cloud-sdk/connectivity');

async function triggerSalesOrderTest() {
    console.log('---Triggering SAP Build Sales Order Workflow---');
    try {
        const payload = {
            definitionId: 'eu10.crossfunctional-dev-56c89xus.salesordersapi.orderProcessing',
            context: {
                salesorderdetails: {
                    customerName: 'test env',
                    orderNumber: '156789',
                    orderAmount: 40000,
                    orderDate: '2025-11-23',
                    shippingCountry: 'Japan',
                    expectedDeliveryDate: '2025-12-25'
                }
            }
        };
        
        // console.log('Workflow Payload:', JSON.stringify(payload));

        const destinationName = 'TEST_SALESORDER_DESTINATION';
        const destination = await getDestination({ destinationName });

        if (!destination) {
            throw new Error(`Destination '${destinationName}' not found`);
        }

        // Extract irpa_api_key from destination originalProperties.destinationConfiguration
        const irpa_api_key = destination?.originalProperties?.destinationConfiguration?.['irpa_api_key'];

        if (!irpa_api_key) {
            const destConfig = destination?.originalProperties?.destinationConfiguration;
            console.error('destinationConfiguration keys:', Object.keys(destConfig || {}));
            throw new Error(`Missing irpa_api_key in destination '${destinationName}'. Available keys: ${Object.keys(destConfig || {}).join(', ')}`);
        }

        const result = await executeHttpRequest(
            { destinationName },
            {
                method: 'POST',
                url: '',
                headers: {
                    'Content-Type': 'application/json',
                    'irpa-api-key': irpa_api_key
                },
                data: payload
            }
        );

        // console.log('Response:', JSON.stringify(result.data));

        console.log('---End SAP Build Sales Order Workflow---');

        return {
            success: true,
            message: 'Sales order workflow triggered successfully (test env)',
            data: result.data
        };

    } catch (error) {
        console.error(`Error triggering workflow: ${error.message}`);
        return {
            success: false,
            message: `Error triggering workflow: ${error.message}`
        };
    }
}