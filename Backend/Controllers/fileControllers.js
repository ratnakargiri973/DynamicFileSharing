import FileUpload from "../Model/fileModel.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";
import { sendEmail } from "../Services/emailService.js";
import "dotenv/config";
import e from "cors";

export async function uploadFiles(req, res){
     try {
        const {filename, size, path } = req.file;
        const uuid = generateUniqueId();
        const dataToSave = new FileUpload({filename, size, path, uuid});
        await dataToSave.save();

        res.status(201).json(
            {
                message: "File uploaded successfully",
                uuid,
                downloadLink: `${req.protocol}://${req.get("host")}/api/files/${uuid}`,
              }
        )
     } catch (error) {
        res.status(500).json({ error: "Server error" });
     }
}

export async function getAllFiles(req, res){
     try {
       const data = await FileUpload.find({}, "filename uuid createdAt");
       const dataToSend = data.map((file)=>{
         return{
            ...file._doc,
            downloadLink:`${req.protocol}://${req.get("host")}/api/files/download/${file.uuid}`,
         };
       });
       res.json(dataToSend);
     } catch (error) {
        res.status(500).json("There is a problem. Contact Server Admin");
     }
}

export async function downloadFile(req, res){
   try {
      const file = await FileUpload.findOne({uuid: req.params.uuid});
      if(!file){
         res.status(404).json({ error: "Requested file was not found on the server" })
      }
      res.download(file.path, file.filename);
   } catch (error) {
      res.status(500).json({error: "Could not download this file. Contact System Admin"});
   }
}

const EMAIL = process.env.EMAIL;


export async function sendEmailWithDownloadLink(req, res){
   try {
      const {email, uuid} = req.body;
      if(!email || !uuid) res.status(404).json({ error: "UUID & Email are required" });

      const file = await FileUpload.findOne({uuid});
      if (!file)
         res.status(404).json({ error: "File with given UUID not found" });
   
       const downloadLink = `${req.protocol}://${req.get(
         "host"
       )}/api/files/download/${file.uuid}`;

       const mailOptions = {
         from: EMAIL,
         to: email,
         subject: "Email Download Link",
         text: "Here's your download link: " + downloadLink,
      html:
        "<h3>Here's your download link: <a href='" +
        downloadLink +
        "'>Download File </a></h3>",
       };

       await sendEmail(mailOptions);
       res.json({ message: "Email sent successfully" });
   } catch (error) {
      res.status(500).json({ error: "Error in sending email" });  
   }
}