import models from '../models/index.js';
import db from '../config/connection.js';
import type { Model } from 'mongoose';

interface Models {
  Question: Model<any>;
  [key: string]: Model<any> | undefined;
}

export default async (modelName: keyof Models, collectionName: string) => {
  try {
    const model = (models as Models)[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }

    if (!model.db || !model.db.db) {
      throw new Error('Database connection not initialized');
    }

    // Now TypeScript knows model.db.db exists
    const collections = await model.db.db.listCollections({
      name: collectionName
    }).toArray();

    if (collections.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error('Error in cleanDB:', err);
    throw err;
  }
}