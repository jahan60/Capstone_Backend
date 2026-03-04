import Alert from "../Models/alertSchema.js";

//Create a new alert
const createAlert = async (req, res) =>{
    try{
        const { Id, ProductId, AlertType, Message, Status } = req.body;

        const alert = await Alert.create({
            Id,
            ProductId,
            AlertType,
            Message,
            Status
        });

        res.status(201).json({
        message: "Alert created successfully",
        alert
        });
    }catch (error){
        res.status(400).json({ error: error.message });
    }
};

//Get all alerts
const getAllAlerts = async (req, res) =>{
    try{
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    }catch (error){
        res.status(400).json({ error: error.message });
    }
};

//Get alerts by productId

const getAlertsByProductId = async (req, res) =>{
    try{
        const alerts = await Alert.find({ ProductId: req.params.ProductId });

        if(!alerts || alerts.lenght === 0){
            return res.status(404).json ({ error: "No alerts found for ths product" });
         }
         res.status(200).json(alerts);
    }catch (error){
        res.status(400).json ({ error: error.message });

    }
};

//Update alert status 
const updateAlertStatus = async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({ error: "Alert not found" });
    }

    res.status(200).json({
      message: "Alert updated successfully",
      alert: updatedAlert
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete alert
const deleteAlert = async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.id);

    if (!deletedAlert) {
      return res.status(404).json({ error: "Alert not found" });
    }

    res.status(200).json({
      message: "Alert deleted successfully",
      alert: deletedAlert
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { createAlert, getAllAlerts, getAlertsByProductId, updateAlertStatus, deleteAlert }






    
