import express from "express";
import { createAlert, 
  getAllAlerts, 
  getAlertsByProductId, 
  updateAlertStatus, 
  deleteAlert 
} from "../Controllers/alertController.js";

const router = express.Router()

router.route("/")
.post(createAlert) //create alerts
.get(getAllAlerts);  //get all alerts

// Get alerts for a specific product
router.get("/:productId", getAlertsByProductId);


// Update alert status
router.put("/:id", updateAlertStatus);

// Delete alert
router.delete("/:id", deleteAlert);


export default router;