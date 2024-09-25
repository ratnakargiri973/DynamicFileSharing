import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
}, {timestamps: true});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);
export default FileUpload;