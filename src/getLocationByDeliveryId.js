import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.tableName,
        Key: {
            "orderServiceId": event.pathParameters.orderServiceId,
            "deliveryId": event.pathParameters.deliveryId
        }
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error('Item not found');
    }

    return result.Item;
});