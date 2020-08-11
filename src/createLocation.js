import * as uuid from "uuid";
import dynamoDb from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {

    let date = new Date();

    let coordinates = event.coordinates[0];
    coordinates.craetedAt = date.toISOString();

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            orderServiceId: "06b09eba-dbdc-11ea-87d0-0242ac130003",
            deliveryId: uuid.v1(),
            coordinates: coordinates
        }
    };

    const locations = await dynamoDb.scan(params);

    await dynamoDb.put(params);

    return params.Item;
});