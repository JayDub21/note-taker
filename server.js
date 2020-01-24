var express = require("express");
var mysql = require("mysql");
var path = require("path");

// express app set up
var app = express();
var PORT = process.env.PORT || 3000;