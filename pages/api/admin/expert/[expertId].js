import { data } from "jquery";
import connectDB from "../../../../midleware/connectDB";
import ExpertPackage from "../../../../models/ExpertPackage";
import ExpertProfile from "../../../../models/ExpertProfile";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let checkExpert = await ExpertProfile.findOne({
        user_id: req.query.expertId,
      }).populate([
        {
          path: "treatments.category_id",
          populate: { path: "services", populate: { path: "packages" } },
        },
      ]);
      if (!checkExpert)
        return res
          .status(404)
          .json({ msg: `no expert exists against id: ${req.query.expertId}` });

      ExpertProfile.findOneAndUpdate(
        { user_id: req.query.expertId },
        {
          $set: {
            approved: true,
            "treatments.$[].approved": true,
          },
        },
        {
          new: true,
        },
        async (err, updatedExpert) => {
          console.log(err);
          if (err)
            return res
              .status(500)
              .json({ msg: "error occurred while approving request" });
          await updatedExpert.populate([
            { path: "user_id" },
            { path: "treatments.category_id" },
          ]);
          return res
            .status(200)
            .json({ msg: "expert approved successfully", data: updatedExpert });
        }
      );
      // let array = [];
      // let value = [];
      // let serviceID = [];
      // let dataa;
      // for (const obj of checkExpert.treatments) {
      //   if (obj.approved) {
      //     for (const service of obj.category_id.services) {
      //       serviceID.push({ service_id: service._id });
      //       for (const pkgs of service.packages) {
      //         array.push({
      //           package_id: pkgs._id,
      //         });
      //       }
      //       dataa = { service_id: service._id, packages: array };
      //       array = [];
      //       value.push(dataa);
      //     }
      //   }
      // }
      // for (const obj of value) {
      //   let ExpertPackages = await ExpertPackage.create({
      //     expert_id: req.query.expertId.toString(),
      //     services: obj,
      //   });
      // }
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
