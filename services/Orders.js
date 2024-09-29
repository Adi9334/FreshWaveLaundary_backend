const { sequelize, Sequelize } = require('../config/dbconfig');

const express = require('express');
const db = require('../server.js');
const Orders_Models = require('../models/orders_Model.js');
//const { Sequelize } = require('sequelize');


const getOrderDetailsService = async (id) =>{
    try{    

        const data = await sequelize.query(`SELECT 
  o.id,
  o.order_tax,
  o.order_mrp,
  o.order_total_afterdis,
  o.order_discount,
  o.order_promocode,
  o.order_delivery_charges,
  o.order_handling_charges,
  o.order_payment_mode,
  o.order_delivery_type,
  o.order_delivery_slot,
  o.order_delivered_at,
  sm.service_name,
  sim.service_item_name as order_item_name, 
  sim.service_item_imageURL as order_item_imageURL,
  oi.order_item_quantity, 
  oi.order_item_price,
  o.order_item_price as total_price, 
  o.order_total_price,
  o.created_at as order_date,
  o.order_status
  
FROM 
  Orders o
  JOIN Order_Item oi on oi.order_id = o.id
  JOIN Service_master sm ON sm.id = o.service_id
  JOIN Service_Items_master sim ON sim.id = oi.order_item_id
WHERE 
  o.user_id = ?;`, {
    replacements: [id],
    type : Sequelize.QueryTypes.SELECT})
    // console.log(data);
    const oderdetails = data.reduce((acc,row)=>{
        let orders = acc.find(o=>o.id === row.id);
        if(!orders){
            orders = {
                id:row.id,
                service_name:row.service_name,
                order_date:row.order_date,
                total_price:row.total_price,
                order_status:row.order_status,
                order_items:[],
                total_price:row.total_price,
                order_promocode:row.order_promocode,
                order_discount:row.order_discount,
                order_tax:row.order_tax,
                order_mrp:row.order_mrp,
                order_total_afterdis:row.order_total_afterdis,
                order_handling_charges:row.order_handling_charges,
                order_delivery_charges:row.order_delivery_charges,
                order_total_price:row.order_total_price,
                order_payment_mode:row.order_payment_mode,
                order_delivery_type:row.order_delivery_type,
                order_delivered_at:row.order_delivered_at,
                order_delivery_slot:row.order_delivery_slot,
            };
            acc.push(orders);
        }
       
            orders.order_items.push({
                id:row.id,
                order_item_name:row.order_item_name,
                order_item_quantity:row.order_item_quantity,
                order_item_price:row.order_item_price,
                order_item_imageURL:row.order_item_imageURL
            });

        return acc;
    },[]);

  return oderdetails;

    }catch(e){
        console.error(e);
        return e;
    }
}

const getallOrderDetailsService = async () =>{
    try{    

        const data = await sequelize.query(`SELECT DISTINCT 
  o.id,
  u.username,
  u.email,
  o.order_tax,
  o.order_mrp,
  o.order_total_afterdis,
  o.order_discount,
  o.order_promocode,
  o.order_delivery_charges,
  o.order_handling_charges,
  o.order_payment_mode,
  o.order_delivery_type,
  o.order_delivery_slot,
  o.order_delivered_at,
  o.order_address_id,
  sm.service_name,
  sim.service_item_name as order_item_name, 
  sim.service_item_imageURL as order_item_imageURL,
  oi.order_item_quantity, 
  oi.order_item_price,
  o.order_item_price as total_price, 
  o.order_total_price,
  o.created_at as order_date,
  o.order_status
  
FROM 
  Orders o
  JOIN Order_Item oi on oi.order_id = o.id
  JOIN Service_master sm ON sm.id = o.service_id
  JOIN Service_Items_master sim ON sim.id = oi.order_item_id
  JOIN Users u ON u.id = o.user_id`
  , {
    type : Sequelize.QueryTypes.SELECT})
    // console.log(data);
    const oderdetails = data.reduce((acc,row)=>{
        let orders = acc.find(o=>o.id === row.id);
        if(!orders){
            orders = {
                id:row.id,
                service_name:row.service_name,
                username:row.username,
                email:row.email,
                address_id:row.order_address_id,
                order_date:row.order_date,
                total_price:row.total_price,
                order_status:row.order_status,
                order_items:[],
                total_price:row.total_price,
                order_promocode:row.order_promocode,
                order_discount:row.order_discount,
                order_tax:row.order_tax,
                order_mrp:row.order_mrp,
                order_total_afterdis:row.order_total_afterdis,
                order_handling_charges:row.order_handling_charges,
                order_delivery_charges:row.order_delivery_charges,
                order_total_price:row.order_total_price,
                order_payment_mode:row.order_payment_mode,
                order_delivery_type:row.order_delivery_type,
                order_delivered_at:row.order_delivered_at,
                order_delivery_slot:row.order_delivery_slot,
            };
            acc.push(orders);
        }
       
            orders.order_items.push({
                id:row.id,
                order_item_name:row.order_item_name,
                order_item_quantity:row.order_item_quantity,
                order_item_price:row.order_item_price,
                order_item_imageURL:row.order_item_imageURL
            });
        return acc;
    },[]);

  return oderdetails;

    }catch(e){
        console.error(e);
        return e;
    }
}


const getAssignedOrderDetailsService = async (id) =>{
    try{    

        const data = await sequelize.query(`SELECT DISTINCT 
  o.id,
  u.username,
  u.email,
  o.order_tax,
  o.order_mrp,
  o.order_total_afterdis,
  o.order_discount,
  o.order_promocode,
  o.order_delivery_charges,
  o.order_handling_charges,
  o.order_payment_mode,
  o.order_delivery_type,
  o.order_delivery_slot,
  o.order_delivered_at,
  sm.service_name,
  o.order_address_id,
  sim.service_item_name as order_item_name, 
  sim.service_item_imageURL as order_item_imageURL,
  oi.order_item_quantity, 
  oi.order_item_price,
  o.order_item_price as total_price, 
  o.order_total_price,
  o.created_at as order_date,
  o.order_status
FROM 
  Orders o
  JOIN Order_Item oi on oi.order_id = o.id
  JOIN Service_master sm ON sm.id = o.service_id
  JOIN Service_Items_master sim ON sim.id = oi.order_item_id
  JOIN Users u ON u.id = o.user_id
  JOIN assigned_orders ao  ON ao.order_id  = o.id 
WHERE
  ao.rider_id = ?;`, {
    replacements: [id],
    type : Sequelize.QueryTypes.SELECT})
    // console.log(data);
    const oderdetails = data.reduce((acc,row)=>{
        let orders = acc.find(o=>o.id === row.id);
        if(!orders){
            orders = {
                id:row.id,
                service_name:row.service_name,
                username:row.username,
                email:row.email,
                address_id:row.order_address_id,
                order_date:row.order_date,
                total_price:row.total_price,
                order_status:row.order_status,
                order_items:[],
                total_price:row.total_price,
                order_promocode:row.order_promocode,
                order_discount:row.order_discount,
                order_tax:row.order_tax,
                order_mrp:row.order_mrp,
                order_total_afterdis:row.order_total_afterdis,
                order_handling_charges:row.order_handling_charges,
                order_delivery_charges:row.order_delivery_charges,
                order_total_price:row.order_total_price,
                order_payment_mode:row.order_payment_mode,
                order_delivery_type:row.order_delivery_type,
                order_delivered_at:row.order_delivered_at,
                order_delivery_slot:row.order_delivery_slot,
            };
            acc.push(orders);
        }
       
            orders.order_items.push({
                id:row.id,
                order_item_name:row.order_item_name,
                order_item_quantity:row.order_item_quantity,
                order_item_price:row.order_item_price,
                order_item_imageURL:row.order_item_imageURL
            });

        return acc;
    },[]);

  return oderdetails;

    }catch(e){
        console.error(e);
        return e;
    }
}

// const getallOrderDetailsService = async (id)=>{
//     try{
//         const data = await sequelize.query(`SELECT 
//             o.id,
//             sm.service_name,
//             sim.service_item_name as order_item_name, 
//             oi.order_item_quantity, 
//             oi.order_item_price,
//             o.order_item_price as total_price, 
//             o.created_at as order_date,
//             o.order_status
//           FROM 
//             Orders o
//             join Order_Item oi on oi.order_id = o.id
//             JOIN Service_master sm ON sm.id = o.service_id
//             JOIN Service_Items_master sim ON sim.id = oi.order_item_id
//           WHERE 
//             o.user_id = ?;`, {
//               replacements: [id],
//               type : Sequelize.QueryTypes.SELECT})
//     }
//     catch(e){
//         console.error(e);
//     }
// }

module.exports = {getOrderDetailsService,getallOrderDetailsService,getAssignedOrderDetailsService}