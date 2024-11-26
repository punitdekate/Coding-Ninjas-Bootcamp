// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from "mongoose";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { jobSchema } from "./schema/newJob.schema.js";
import { applyJobSchema } from "./schema/applyJob.schema.js";
import { ObjectId } from "mongoose";

const JobModel = mongoose.model("Job", jobSchema);
const ApplicationModel = mongoose.model('Application', applyJobSchema);
export const createNewJob = async(job) => {
    // Write your code here
    try {
        const newJob = new JobModel(job);
        const savedJob = await newJob.save();
        return savedJob;
    } catch (error) {
        console.log(error);
        throw new customErrorHandler(400, "Someting wrong with database");
    }
};

export const applyJobRepo = async(jobId, userId) => {
    // Write your code here
    try {
        const job = await findJobRepo(jobId);
        if (job.applicants.includes(userId)) {
            throw new customErrorHandler(400, "User has already applied for this job");
        }
        const application = new ApplicationModel({
            jobId: jobId,
            userId: userId
        });
        const savedApplication = await application.save();
        job.applicants.push(userId);
        const savedJob = await job.save();
        return savedJob;
    } catch (error) {
        console.log(error);
        throw new customErrorHandler(400, "Something wrong with database")
    }
};
export const findJobRepo = async(_id) => {
    // Write your code here
    const job = await JobModel.findById(_id);
    return job;
};