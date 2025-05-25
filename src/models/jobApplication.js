const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const JobApplication = sequelize.define(
  "JobApplication",
  {
    applicationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Job ID is required",
        },
        isInt: {
          msg: "Job ID must be an integer",
        },
      },
    },
    expertId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Expert ID is required",
        },
        isInt: {
          msg: "Expert ID must be an integer",
        },
      },
    },
    applicationStatus: {
      type: Sequelize.ENUM(
        "interview scheduled",
        "shortlisted",
        "rejected",
        "accepted"
      ),
      defaultValue: "shortlisted",
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First Name is required",
        },
        isAlpha: {
          msg: "First Name must only contain letters",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last Name is required",
        },
        isAlpha: {
          msg: "Last Name must only contain letters",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Email must be a valid email address",
        },
      },
    },
    resume: {
      type: Sequelize.BLOB("long"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Resume is required",
        },
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["jobId", "expertId"],
      },
    ],
  }
);

JobApplication.associate = (models) => {
  JobApplication.belongsTo(models.JobPosting, {
    foreignKey: "jobId",
    as: "job",
  });
  JobApplication.belongsTo(models.Expert, {
    // Ensure the model name matches the actual model
    foreignKey: "expertId",
    as: "expert",
  });
};

module.exports = JobApplication;
