// import * as uuid from "uuid";
import dynamoDb from "../libs/dynamodb-lib";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {

    const orderService = await getLocation(event);
    if (orderService === null) {
        const coordinates = [];
        coordinates.push(event.coordinates);

        const params = {
            TableName: process.env.tableName,
            Item: {
                orderServiceId: event.orderServiceId,
                deliveryId: event.deliveryId,
                coordinates: coordinates
            }
        };

        await dynamoDb.put(params);
        return params.Item;
    } else {
        const params = {
            TableName: process.env.tableName,
            Key: {
                orderServiceId: event.orderServiceId,
                deliveryId: event.deliveryId
            },
            UpdateExpression: "SET coordinates = list_append(coordinates, :newCoordinate)",
            ExpressionAttributeValues: {
                ":newCoordinate": [event.coordinates]
            },
            ReturnValues: "ALL_NEW"
        };
        const result = await dynamoDb.update(params);
        return { status: true, result: result.Attributes };
    }

});

const getLocation = async (event) => {
    const params = {
        TableName: process.env.tableName,
        Key: {
            orderServiceId: event.orderServiceId,
            deliveryId: event.deliveryId
        }
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        return null;
    }

    return result.Item;
};