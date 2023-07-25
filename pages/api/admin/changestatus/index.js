import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import Formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.id || !fields.block) return res.status(400).json({ msg: "id block are required" });
        const { id, block } = fields;
        const checkUser = await User.findById(id);
        if (!checkUser) return res.status(400).json({ msg: `No user exist against id : ${id}` });
        const updateUser = await User.findOneAndUpdate({ _id: id }, { block: JSON.parse(block) });
        return res.status(200).json({ msg: `user '${JSON.parse(block) ? "block" : "Unblock"}' successfully.` });
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
