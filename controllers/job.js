const jwt = require("jsonwebtoken");
const job = require("../models/job");
const {
  NotFound,
  Unauthorized,
  CustomError,
  BadRequest,
} = require("../errors");

const createJob = async (req, res, next) => {
  const { company, position, userId } = req.body;
  // try {
  const singleJob = await job.create({
    company: company,
    position: position,
    createdBy: userId,
  });
  if (singleJob) {
    res.status(200).json({ singleJob });
  }
};

const getAllJobs = async (req, res) => {
  const { userId } = req.body;
  let allJobs = await job.find({
    createdBy: userId,
  });
  res.status(200).json({ allJobs, length: allJobs.length });
};
const getJob = async (req, res, next) => {
  const { userId } = req.body;
  const { id } = req.params;

  try {
    const one = await job.findOne({ _id: id, createdBy: userId });
    res.json({ one });
  } catch (error) {
    next(error);
  }
};
const updateJob = async (req, res) => {
  const { userId, company, position } = req.body;
  const { id } = req.params;
  const one = await job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { company, position }
  );
  res.status(200).json({ one });
};
const deleteJob = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  const one = await job.findOneAndDelete({ _id: id, createdBy: userId });
  res.status(200).json({ one });
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
