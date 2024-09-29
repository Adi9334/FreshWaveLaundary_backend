const { sequelize, Sequelize } = require('../config/dbconfig');

//const sequelize = require('../config/dbconfig.js');
const express = require('express');
//const db = require('../index.js');
//const { Sequelize } = require('sequelize');


const getslotService = async (weekday) => {
    try {
      let query = `
        SELECT start_time, end_time 
        FROM Pickup_Schedule_Master 
        WHERE is_active = 1`;
      if (weekday && weekday.length > 0) {
        query += ` AND weekday IN (:weekday)`;
      }
  
      const data = await sequelize.query(query, {
        replacements: { weekday },
        type: sequelize.QueryTypes.SELECT
      });
  
      console.log("Query Result:", data);
  
      return data;
    } catch (e) {
      console.error("Error in getslotService:", e);
      throw e;
    }
  };
  


module.exports = {getslotService}