// import * as uuid from "uuid";
import dynamoDb from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {

    let date = new Date();

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            orderServiceId: event.orderServiceId,
            timestamp: date.toISOString(),
            coordinates: event.coordinates
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});