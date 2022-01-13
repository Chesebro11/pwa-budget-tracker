const { request } = require("express");

let db;

const request = indexedDB.open('budget', 1);

request.onupdradeneeded = function (arg) {
    const db = arg.target.result;
    db.createObjectStore('new_budget', { autoIncrement: true });
};

request.onsuccess = function (arg) {
    db = arg.target.result;

    if (navigator.onLine) {
        uploadBudget();
    }
}