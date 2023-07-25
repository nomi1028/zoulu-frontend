import connectDB from "../../../../midleware/connectDB";
import ExpertProfile from "../../../../models/ExpertProfile";
const paginator = require("../../../../utils/paginator");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      if(req.query.type === "requests") {
        const total = await ExpertProfile.countDocuments({approved: false, "treatments.0": {$exists: true}});
        const pagination = paginator(req.query.page, req.query.limit, total);
        let requests = await ExpertProfile.find({approved: false, "treatments.0": {$exists: true}})
          .populate([{path: "user_id"}, {path: "treatments.category_id"}])
          .sort({created_at: -1})
          .skip(pagination.start_index)
          .limit(pagination.records_per_page);
        return res.status(200).json({msg: "list of all expert applications", pagination, data: requests});
      }
      if(req.query.type === "all") {
        const total = await ExpertProfile.countDocuments({approved: true, "treatments.0": {$exists: true}});
        const pagination = paginator(req.query.page, req.query.limit, total);
        let experts = await ExpertProfile.find({approved: true, "treatments.0": {$exists: true}})
          .populate([{path: "user_id"}, {path: "treatments.category_id"}])
          .sort({created_at: -1})
          .skip(pagination.start_index)
          .limit(pagination.records_per_page);
        return res.status(200).json({msg: "list of all expert", pagination, data: experts});
      }
      if(req.query.type === "updated") {
        const total = await ExpertProfile.countDocuments({approved: true, treatments: { $elemMatch: { approved: false } }});
        const pagination = paginator(req.query.page, req.query.limit, total);
        let updatedRequests = await ExpertProfile.find({approved: true, treatments: { $elemMatch: { approved: false } }})
          .populate([{path: "user_id"}, {path: "treatments.category_id"}])
          .sort({created_at: -1})
          .skip(pagination.start_index)
          .limit(pagination.records_per_page);
        return res.status(200).json({msg: "request for all experts updated services", pagination, data: updatedRequests});
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
