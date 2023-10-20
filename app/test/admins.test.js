const request = require('supertest');
const app = require('../../server');

const db = require("../models/index")

const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const secret = 'jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225'

it('should retrieve a list of admins when GET /admins with admin role', async () => {

    // Buat token JWT dengan role "admin"
    const adminToken = jwt.sign({ role: 'admin' }, secret); // Gantilah secret dengan kunci rahasia yang sesuai

    const response = await request(app)
      .get('/admins')
      .set('Authorization',  adminToken); // Ganti adminToken dengan token yang sesuai
      
      // Cetak respons (opsional)
    console.log('Response:', response.body);
    console.log('berhail menangkap Data');

    // Harap pastikan bahwa respons memiliki status kode 200 dan data adalah array
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  