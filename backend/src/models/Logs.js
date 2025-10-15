/*

User - Who made the action
Action - Actions that was made "create", "update", "delete", "login"
Collection - Collection were the change ocurred
TargetId - ID that was affected
Description - Short description that was made

*/
import { Schema, model } from "mongoose";

const logSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    }, // quién hizo la acción
    action: {
      type: String,
      required: true,
    }, // tipo de acción: "create", "update", "delete", "login", etc.
    collectionAffected: {
      type: String,
      required: true,
    }, // en qué colección ocurrió
    targetId: {
      type: Schema.Types.ObjectId,
    }, // ID del registro afectado
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
    strict: true, // Rechaza cualquier campo no definido en el esquema
  }
);

export default model("Logs", logSchema);
