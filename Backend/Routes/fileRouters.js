import express from 'express';
import { uploadFiles, getAllFiles, downloadFile, sendEmailWithDownloadLink } from '../Controllers/fileControllers.js';
import upload from '../middleware/upload.js';


const FileRouter = express.Router();

FileRouter.post('/uploadFiles',upload.single('file'),uploadFiles);
FileRouter.get('/', getAllFiles);
FileRouter.get('/files/download/:uuid', downloadFile);
FileRouter.post("/files/send", sendEmailWithDownloadLink);

export default FileRouter;