import connectDB from "../../../midleware/connectDB";
import User from "../../../models/User";
import Category from "../../../models/Category";

import ExpertPackage from "../../../models/ExpertPackage";
const paginator = require("../../../utils/paginator");
// import ExpertPackage from "../../../models/ExpertPackage";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const total = await Category.countDocuments({ deleted: false });
      const pagination = paginator(req.query.page, req.query.limit, total);
      let categories = await Category.find({ deleted: false })
        .populate([
          {
            path: "services",
            populate: [
              { path: "packages" },
              {
                path: "service_experts",
                populate: [
                  { path: "expert_id" },
                  { path: "services.service_id" },
                ],
                options: { sort: { "services.price": 1 } },
              },
            ],
          },
          {
            path: "sub_categories",
            populate: {
              path: "services",
              populate: [
                { path: "packages" },
                {
                  path: "service_experts",
                  populate: [
                    { path: "expert_id" },
                    { path: "services.service_id" },
                  ],
                  options: { sort: { "services.price": 1 } },
                },
              ],
            },
          },
        ])
        .sort({ created_at: -1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);
      let serviceList = await ExpertPackage.find({}).populate([
        {
          path: "services.service_id",
        },
        {
          path: "services.packages.package_id",
        },
      ]);
      // for (const category of categories) {
      //   for (var service of category.services) {
      //     var price = -1;
      //     var pkgPrice = 0;
      //     for (const pkgData of serviceList) {
      //       for (const packages of pkgData.services.packages) {
      //         if (
      //           packages.package_id.service_id.toString() ==
      //           service._id.toString()
      //         ) {
      //           var pkgoption = service.options.find((e) => {
      //             if (
      //               packages.package_id.option_id.toString() ===
      //                 e._id.toString() &&
      //               e.mandatory == true
      //             ) {
      //               return e;
      //             }
      //           });
      //           if (pkgoption) {
      //             console.log(pkgoption, packages.price, "pkgoption");
      //             if (packages.price < pkgPrice || price == -1) {
      //               pkgPrice = packages.price;
      //               price = packages.price;

      //               service.price_per_minute = pkgPrice;
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }

      return res.status(200).json({
        msg: "list of all categories",
        pagination,
        data: categories,
        expertPackage: serviceList,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
