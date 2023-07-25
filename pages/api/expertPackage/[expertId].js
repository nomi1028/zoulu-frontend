import connectDB from "../../../midleware/connectDB";

import ExpertPackage from "../../../models/ExpertPackage";

import Formidable from "formidable";
import User from "../../../models/User";

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
        let checkExpert = await User.findById(req.query.expertId.toString());
        if (!checkExpert)
          return res.status(404).json({
            msg: `no expert exists against id: ${req.query.expertId.toString()}`,
          });
        if (checkExpert) {
          var serviceData = JSON.parse(fields.serviceData);

          let serviceList = await ExpertPackage.find({
            expert_id: req.query.expertId.toString(),
            "services.service_id": serviceData.service_id,
          });
          if (serviceList.length > 0) {
            var array = JSON.parse(fields.array);
            var serviceData = JSON.parse(fields.serviceData);
            if (
              fields.serviceData &&
              fields.serviceData !== undefined &&
              serviceData.service_price.length == 0
            ) {
              ExpertPackage.deleteOne(
                {
                  expert_id: req.query.expertId.toString(),
                  "services.service_id": serviceData.service_id,
                },
                function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Record deleted successfully!");
                  }
                }
              );
            } else {
              if (
                fields.serviceData &&
                fields.serviceData !== undefined &&
                serviceData.service_price.length > 0 &&
                array.length === 0
              ) {
                var ExpertPackages = await ExpertPackage.findOneAndUpdate(
                  {
                    expert_id: req.query.expertId.toString(),
                    "services.service_id": serviceData.service_id,
                  },
                  {
                    "services.price": serviceData.service_price,
                    "services.duration": serviceData.service_duration,
                  }
                );
              }

              for (const packageData of array) {
                for (const service of serviceList) {
                  let updatedData = service.services.packages.find(
                    (packages) => {
                      if (packageData._id === packages.package_id.toString()) {
                        return packages;
                      }
                    }
                  );
                  if (updatedData) {
                    if (packageData.price.length == 0) {
                      await ExpertPackage.findOneAndUpdate(
                        {
                          expert_id: req.query.expertId.toString(),
                          "services.service_id": serviceData.service_id,
                        },
                        {
                          "services.service_id": serviceData.service_id,
                          "services.price": serviceData.service_price,
                          "services.duration": serviceData.service_duration,
                          $pull: {
                            "services.packages": {
                              package_id: packageData._id,
                            },
                          },
                        }
                      );
                    } else {
                      await ExpertPackage.updateOne(
                        { _id: packageData.pkgid },
                        {
                          $set: {
                            "services.packages.$[elem].price": parseInt(
                              packageData.price
                            ),
                            "services.packages.$[elem].duration": parseInt(
                              packageData.duration
                            ),
                          },
                        },
                        {
                          arrayFilters: [
                            { "elem.package_id": packageData._id },
                          ],
                        }
                      );
                    }

                    if (
                      fields.serviceData &&
                      fields.serviceData !== undefined
                    ) {
                      var ExpertPackages = await ExpertPackage.findOneAndUpdate(
                        {
                          expert_id: req.query.expertId.toString(),
                          "services.service_id": serviceData.service_id,
                        },
                        {
                          "services.price": serviceData.service_price,
                          "services.duration": serviceData.service_duration,
                        }
                      );
                    }
                  } else {
                    let options = {
                      package_id: packageData._id,
                      price: packageData.price,
                      duration: packageData.duration,
                    };

                    await ExpertPackage.findOneAndUpdate(
                      {
                        expert_id: req.query.expertId.toString(),
                        "services.service_id": serviceData.service_id,
                      },
                      {
                        "services.service_id": serviceData.service_id,
                        "services.price": serviceData.service_price,
                        "services.duration": serviceData.service_duration,

                        $push: { "services.packages": options },
                      }
                    );
                  }
                }
              }
            }
          } else {
            let payload = [];
            var array = JSON.parse(fields.array);
            var serviceData = JSON.parse(fields.serviceData);
            for (let i = 0; i < array.length; i++) {
              payload.push({
                package_id: array[i]._id,
                price: array[i].price,
                duration: array[i].duration,
              });
            }
            let dataa = {
              service_id: serviceData.service_id,
              price: serviceData.service_price,
              duration: serviceData.service_duration,
              packages: payload,
            };
            var ExpertPackages = await ExpertPackage.create({
              expert_id: req.query.expertId.toString(),
              services: dataa,
            });
          }

          return res.status(200).json({
            msg: "price Updated Successfully successfully",
            data: ExpertPackages,
          });
        }
      });
    } else {
      if (req.method === "GET") {
        const form = new Formidable.IncomingForm();
        form.parse(req, async (err, fields, files, query) => {
          let checkExpert = await User.findById(req.query.expertId.toString());
          if (!checkExpert)
            return res.status(404).json({
              msg: `no expert exists against id: ${req.query.expertId.toString()}`,
            });
          if (checkExpert) {
            let ExpertPackages = await ExpertPackage.find({
              expert_id: req.query.expertId.toString(),
            }).populate([
              { path: "expert_id" },
              // {
              //   path: "services.service_id",
              // },
              {
                path: "services.service_id",
              },
              {
                path: "services.packages.package_id",
              },
            ]);

            return res.status(200).json({
              msg: "service added successfully",
              data: ExpertPackages,
            });
          }
        });
      }
    }
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
