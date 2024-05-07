import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheckService = asyncHandler(async (req,res) => {
    return res
    .status(200)
    .json({ 
        success: true,
        message: "API services are running fine" 
    });

});

export { 
    healthCheckService
}