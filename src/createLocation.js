import * as uuid from "uuid";
import dynamoDb from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            orderServiceId: event.body.orderServiceId,
            locationId: uuid.v1(),
            deliveryId: event.body.deliveryId,
            position: event.body.position,
            createdAt: Date.now()
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});