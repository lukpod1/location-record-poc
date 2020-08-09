import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    let date = new Date();

    const params = {
        TableName: process.env.TABLE_NAME,
        ProjectionExpression:"coordinates",
        KeyConditionExpression: "orderServiceId = :orderServiceId and #time between :past and :now",
        ExpressionAttributeNames:{
            "#time":"timestamp"
        },
        ExpressionAttributeValues: {
            ":orderServiceId": event.orderServiceId,
            ":now": date.toISOString(),
            ":past": event.contractDate
        }
    };

    const result = await dynamoDb.query(params);
    const coordinates = result.Items.map(item => {
        return item.coordinates;
    });

    return coordinates;
});