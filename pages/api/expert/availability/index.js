import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import Category from "../../../../models/Category";
import ExpertProfile from "../../../../models/ExpertProfile";
import Booking from "../../../../models/Booking";
import Formidable from "formidable";
import moment from "moment";
import "moment/locale/de";
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
        const timeSlots = {
          "00:01": [],
          "00:30": [],
          "01:00": [],
          "01:30": [],
          "02:00": [],
          "02:30": [],
          "03:00": [],
          "03:30": [],
          "04:00": [],
          "04:30": [],
          "05:00": [],
          "05:30": [],
          "06:00": [],
          "06:30": [],
          "07:00": [],
          "07:30": [],
          "08:00": [],
          "08:30": [],
          "09:00": [],
          "09:30": [],
          "10:00": [],
          "10:30": [],
          "11:00": [],
          "11:30": [],
          "12:00": [],
          "12:30": [],
          "13:00": [],
          "13:30": [],
          "14:00": [],
          "14:30": [],
          "15:00": [],
          "15:30": [],
          "16:00": [],
          "16:30": [],
          "17:00": [],
          "17:30": [],
          "18:00": [],
          "18:30": [],
          "19:00": [],
          "19:30": [],
          "20:00": [],
          "20:30": [],
          "21:00": [],
          "21:30": [],
          "22:00": [],
          "22:30": [],
          "23:00": [],
          "23:30": [],
          "24:00": [],
        };

        const days = [
          "Sonntag",
          "Montag",
          "Dienstag",
          "Mittwoch",
          "Donnerstag",
          "Freitag",
          "Samstag",
        ];
        let coordinates = JSON.parse(fields.coordinates);
        var completedBookings = await Booking.find({
          status: "checkedOut",
          products: {
            $elemMatch: {
              status: { $eq: "confirmed" },
            },
          },
        });
        var bookings = await Booking.find({
          status: "checkedOut",
          products: {
            $elemMatch: {
              date: fields.date,
              status: "pending",
            },
          },
        });
        let categoryExperts = await ExpertProfile.find({
          treatments: {
            $elemMatch: {
              category_id: fields.categoryId,
              // "services.service_id": fields.serviceId,
              approved: true,
            },
          },
        });
        let expertsInRadius = new Array();
        for (const categoryExpert of categoryExperts) {
          expertsInRadius = await ExpertProfile.find({
            treatments: {
              $elemMatch: {
                category_id: fields.categoryId,
                // "services.service_id": fields.serviceId,
                approved: true,
              },
            },
            availability: { $ne: [] },
            location: {
              $near: {
                $maxDistance: categoryExpert.radius * 1000,
                $geometry: {
                  type: "Point",
                  coordinates: [coordinates.long, coordinates.lat],
                },
              },
            },
          }).populate([
            { path: "treatments.category_id", populate: { path: "services" } },
            { path: "user_id" },
            { path: "expert_services" },
          ]);
        }
        let rating = 0;
        let ratingCount = 0;
        let expertHavingRadius = [];
        for (let expert of expertsInRadius) {
          var expertss = expert.expert_services.find((e) => {
            if (
              e.services.service_id.toString() === fields.serviceId.toString()
            ) {
              return e;
            }
          });

          if (!expertss) {
            continue;
          }
          if (JSON.parse(fields.packages).length > 0) {
            let foundPackage = false;
            for (const packageid of JSON.parse(fields.packages)) {
              var expertspackage = expertss.services.packages.find((e) => {
                if (e.package_id.toString() === packageid.toString()) {
                  return e.package_id.toString();
                }
              });

              if (!expertspackage) {
                foundPackage = false;
                break;
              } else {
                foundPackage = true;
              }
            }
            if (!foundPackage) {
              continue;
            }
          }
          expert = expert.toObject();

          for (const booking of completedBookings) {
            for (const product of booking.products) {
              if (
                product.expert_id.toString() ===
                  expert.user_id._id.toString() &&
                product.status === "confirmed" &&
                product.rating > 0
              ) {
                rating += product.rating;
                ratingCount++;
                expert.rating = ratingCount > 0 ? rating / ratingCount : 0;
              }
            }
          }

          expertHavingRadius.push(expert);
        }

        const selectedDate = new Date(`${fields.date}`);

        for (const expert of expertHavingRadius) {
          const day = selectedDate.getDay();

          const availability = expert.availability.find(
            (e) => e.available === true && days[day] === e.day
          );

          if (!availability) {
            continue;
          }

          const startMinutes = parseInt(availability.start_time.split(":")[1]);

          const start =
            parseInt(availability.start_time.split(":")[0]) +
            (startMinutes === 30 ? 0.5 : 0);

          const end = parseInt(availability.end_time.split(":")[0]);
          var flag;
          for (let i = start * 60; i <= end * 60; i += 30) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;

            let time = `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}`;

            flag = false;
            bookings.map((b) => {
              if (!flag) {
                b.products.find((data) => {
                  if (
                    data.start_time == time &&
                    data.expert_id.toString() == expert.user_id._id.toString()
                  ) {
                    flag = true;
                    return b;
                  }
                });
              }
            });

            if (flag) {
              continue;
            }

            const now = new Date();
            const localTime = new Date(
              now.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
            );
            // testing
            const timestamp = localTime.getTime();

            let selectedTime = new Date(`${fields.date} ${time}`);
            if (timestamp > selectedTime.getTime()) {
              continue;
            }

            if (time == "00:00") {
              time = "00:01";
            }

            timeSlots[time].push(expert);
          }
        }
        let slots = Object.entries(timeSlots).reduce(
          (a, [k, v]) => (v.length === 0 ? a : ((a[k] = v), a)),
          {}
        );
        return res.status(200).json({
          msg: "list of available slots with experts",
          data: slots,
          // bookings: bookings,
          // expertHavingRadius: expertHavingRadius,
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
