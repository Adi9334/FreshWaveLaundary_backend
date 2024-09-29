const { sequelize, Sequelize } = require('../config/dbconfig');
const express = require('express');
//const db = require('../index.js');
//const { Sequelize } = require('sequelize');


const getAddressDetailsService = async (user_id) => {
    try {
      console.log("User ID:", user_id);
  
      // Ensure user_id is defined and is a number
      if (!user_id || isNaN(user_id)) {
        throw new Error("Invalid or undefined user_id");
      }
  
      const data = await sequelize.query(
        `SELECT 
          *
        FROM
          Address
        WHERE 
          user_id = ? order by id DESC;`,
        {
          replacements: [user_id],
          type: sequelize.QueryTypes.SELECT
        }
      );
  
      console.log("Query Result:", data);
  
      return data;
    } catch (e) {
      console.error("Error in getAddressDetailsService:", e);
      return e;
    }
  };
  


module.exports = {getAddressDetailsService}