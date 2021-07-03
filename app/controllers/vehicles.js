const TRIPS = "trips";
const VEHICLES = "vehicles";
const model = require("../models/index");
const { ObjectId } = require('mongodb')

module.exports.create = async (req, res) => {
    try {
        await _createVehicleLogs(req, res)
        console.info('Vehicle logs created successfully.')
    } catch (error) {
        console.error(error)
        return error
    }
}

const _createVehicleLogs = async (req, res) => {
    try {
        const { options } = req.headers;
        const vehicles = Object.assign({}, req.body)
        const { vehicle_id, trip_id } = vehicles;
        let body = null;
        if (vehicle_id && trip_id) {
            const { lat, long, ignition, bat_volt, speed } = vehicles;
            body = { vehicle_id, trip_id, lat, long, bat_volt, speed, ignition };
            await model.insert(VEHICLES, body, options);
            res.send({ status: 200, message: "Vehicle logs inserted successfully." });
        } else {
            res.send({ status: 403, message: "Vehicle id and trip id are mandatory." });
        }
    } catch (ex) {
        console.error(ex);
        res.send({ status: 500, message: new Error(ex).message });
    }
}

module.exports.fetch = async () => {
    try {
        const { options } = req.headers;
        const latest_log_vehicle = await model.fetchLatest(VEHICLES, {}, options);
        const selectionCriteria = { _id: ObjectId(latest_log_vehicle._id) };
        const filterCriteria = { start_time: { $gte: _computeToday() } };
        const latest_log_trip = await model.findOne(TRIPS, selectionCriteria, options);
        const perday_bookings = await model.findOne(TRIPS, filterCriteria, options);
        const response = { latest_log_trip, latest_log_vehicle, perday_bookings };
        res.send({ status: 200, data: response, message: "Vehicle data fetched successfully." })
    } catch (ex) {
        console.error(ex);
        res.send({ status: 403, message: new Error(ex).message })
    }
}

const _computeToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}