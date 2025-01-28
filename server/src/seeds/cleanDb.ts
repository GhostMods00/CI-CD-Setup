import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Type checking for models
    if (!models[modelName]) {
      throw new Error(`Model ${modelName} not found`);
    }

    // Add type assertion to handle possible undefined
    const model = models[modelName]!;
    
    let modelExists = await model.db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}