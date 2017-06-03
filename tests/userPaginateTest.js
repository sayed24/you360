const should = require('should');
const request = require('supertest');
const app = require('../app');
const URI = require('./spec_helper').URI;
const mongoose = require('mongoose');

const Users = {
      "email": "manar@manar.manar",
      "password": "$2a$05$8IhvH6OpAUDgaILB/Rp.CeX6VlxIdMr3FpfK.UrRFLSx1SApauJyW",
      "firstName": "manar",
      "lastName": "manars"
    },
    {      
      "firstName": "manar",
      "lastName": "manars",
      "email": "manar@manr.manar",
      "password": "$2a$05$Xl/jKXVqQYzyNXsSsqpFhOnGE0z9JL5OxS1.mxjPGgHRmXXI5uFyS"
    }
  ];

describe('************* Users Pagination *************', () => {
	
}

