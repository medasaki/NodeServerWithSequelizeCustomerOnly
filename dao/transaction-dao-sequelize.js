const { Transaction, Account } = require('../db/sequelize');
var logger = require('../util/logging/winston-logger');

exports.getById = function getById(id, callback) {
    Transaction.findById(id)
    .then((transaction) => {
        return callback(null, transaction);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getAll = function getAll(callback) {
    Transaction.findAll({
        include:[Account]
    })
    .then((transaction) => {
        return callback(null, transaction);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    transaction = data;
    if(transaction.account==null && transaction.account_number==null){
        res.json('account kosong');
    }else{
        if(transaction.account_number==null){
            transaction.account_number = transaction.account.accountNumber;
        }
    }

    Transaction.create(transaction)
    .then(transaction => {
        return callback(null, transaction);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.update = function update(id, data, callback) {
    transaction = data;
    if(transaction.account==null && transaction.account_number==null){
        res.json('account kosong');
    }else{
        if(transaction.account_number==null){
            transaction.account_number = transaction.account.accountNumber;
        }
    }
    
    Transaction.update(data, {
        where: { idTransaction: data.idTransaction },
        returning: true,
        plain: true
      })
    .then(result => {
        logger.info('result  update:');
        logger.info(result);
        return callback(null, data);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.del = function del(id, callback) {
    Transaction.destroy({
        where: { idTransaction: id }
      })
    .then(result => {
        logger.info('result  update:');
        logger.info(result);
        return callback(null, id);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};
