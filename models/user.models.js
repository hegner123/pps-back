import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  avatar: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },

  recentProjects: [
    new Schema({
      recentID: String,
    }),
  ],
  userSettings: {
    completeColor: String,
    incompleteColor: String,
    themeName: String,
  },
  invitations: [
    {
      projectSlug: String,
      projectId: String,
      invitationStatus: String,
      hostUser: {
        userName: String,
        id: String,
      },
    },
  ],
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.hash;
  },
});

const User = mongoose.model("users", schema);

export { User };
