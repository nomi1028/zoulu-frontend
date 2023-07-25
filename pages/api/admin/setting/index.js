import connectDB from "../../../../midleware/connectDB";
import Setting from "../../../../models/Setting";
import Formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.companyPercentage)
          return res.status(400).json({ msg: "companyPercentage is required" });
        
        Setting.findOneAndUpdate({}, {
          company_percentage: fields.companyPercentage,
        }, {upsert: true, new: true}, async(err, updatedSetting) => {
          if(err) return res.status(500).json({ msg: "error occurred while updating setting" });
          return res.status(200).json({ msg: "setting updated successfully", data: updatedSetting });
        });
      });
    } else if (req.method === "GET") {
      let setting = await Setting.find();
      return res.status(200).json({ msg: "get settings", data: setting });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
