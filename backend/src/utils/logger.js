// utils/logger.js
import Log from "../models/Logs.js";

export const createLog = async ({
  userId,
  action,
  collectionAffected,
  targetId,
  description,
}) => {
  try {
    await Log.create({
      user: userId,
      action,
      collectionAffected,
      targetId,
      description,
    });
  } catch (error) {
    console.error("Error guardando log:", error);
  }
};
