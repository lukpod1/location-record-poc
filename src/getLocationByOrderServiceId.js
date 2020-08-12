import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "orderServiceId = :osId",
        ExpressionAttributeValues: {
            ":osId": event.orderServiceId
        }

    };

    const result = await dynamoDb.query(params);
    if (!result.Items) {
        throw new Error('Items not found');
    }

    return result.Items;
});