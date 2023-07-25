import connectDB from "../../../midleware/connectDB";
import User from "../../../models/User";
import ExpertPackage from "../../../models/ExpertPackage";
import Category from "../../../models/Category";
import Service from "../../../models/Service";
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
        let serviceList = await ExpertPackage.find({
          "services.service_id": fields.service_id,
        }).populate({
          path: "services.packages.package_id",
          populate: {
            path: "service_id",
            populate: {
              path: "options",
            },
          },
        });
        let price = 0;
        var optionStatus = false;
        var arrayofpackage = JSON.parse(fields.packages);
        for (const service of serviceList) {
          var expert;
          let packages = [];
          for (const pkg of arrayofpackage) {
            for (const packag of service.services.packages) {
              if (packag.package_id._id == pkg.toString()) {
                packages.push(packag);
              }
            }
          }
          if (packages.length === arrayofpackage.length) {
            var totalPakagesPrice = 0;
            var duration = 0;
            for (var packageprice of packages) {
              console.log(
                packageprice.package_id.service_id.options,
                "packageprice"
              );
              totalPakagesPrice = packageprice.price + totalPakagesPrice;
              duration = packageprice.duration + duration;

              var packageOption =
                packageprice.package_id.service_id.options.find(
                  (data, index) => {
                    if (
                      data._id.toString() ==
                      packageprice.package_id.option_id.toString()
                    ) {
                      return data;
                    }
                  }
                );

              if (packageOption.mandatory) {
                optionStatus = true;
              }
            }

            var servicePrice;
            if (optionStatus) {
              servicePrice = 0;
            } else {
              servicePrice = service.services.price;
            }
            if (totalPakagesPrice + servicePrice < price || price === 0) {
              expert = service.expert_id;
              duration = duration + service.services.duration;
              price = totalPakagesPrice + servicePrice;
            }
          }
        }
        return res.status(200).json({
          msg: "lowest price against this service",
          lowestPrice: price,
          service_duration: duration,
          expert_id: expert,
        });
      });
    } else if (req.method === "GET") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        let serviceList = await ExpertPackage.find({}).populate([
          {
            path: "services.service_id",
          },
          {
            path: "services.packages.package_id",
          },
        ]);

        return res.status(200).json({
          msg: "data against service",
          data: serviceList,
        });
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
