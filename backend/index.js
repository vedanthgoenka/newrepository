// server.js

// price.forEach(({ minPrice, maxPrice }) => {
    //   console.log("min price:", minPrice, "max price: ", maxPrice);
    //   if (!isNaN(minPrice)) {
    //     request.input(`minPrice${minPrice}`, sql.Decimal, minPrice);
    //   }
    //   if (!isNaN(maxPrice)) {
    //     request.input(`maxPrice${maxPrice}`, sql.Decimal, maxPrice);
    //   }
    // });

    // console.log("Request :", request)

// Execute the query (replace with your actual query)

    // const query = `
    //   SELECT * 
    //   FROM item i 
    //   JOIN gift g ON i.item_id = g.item_id 
    //   JOIN dmd d ON d.item_id = i.item_id 
    //   WHERE type = @title 
    //     AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
    //     AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
    //     AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
    //     AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
    //     ${priceConditions ? 'AND ' + priceConditions : ''}
    // `;

// console.log("title1>>", title);
    // const result = await sql.query(query, [title, ...diamond_type, ...metal_type, ...gifts, ...gender]);
    // // const result = await sql.query`select * from item i join gift g on i.item_id=g.item_id join dmd d on d.item_id=i.item_id where type=${title} and clarity in (${diamond_type}) and m_type in (${metal_type}) and occasion in (${gifts}) and gender in (${gender}) and ${priceConditions}  `;

    // // Send the query result as the API response
    // console.log("1",title)

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sql  from 'mssql';

const app = express();
const port = 5000; // or any port you prefer

const config = {
  user: 'sa',
  password: 'sa@123',
  server: 'DESKTOP-654M47J',
  database: 'HK',
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: true // Use the trust certificate
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to MSSQL database');
  } catch (error) {
    console.error('Error connecting to MSSQL database:', error);
  }
}

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/api/messages', (req, res) => {a
//   // console.log("in the api")
//   const data = [
//     { id: 1, text: 'Message 1' },
//     { id: 2, text: 'Message 2' },
//     { id: 3, text: 'Message 3' },
//   ];
//   res.setHeader('Content-Type', 'application/json');
//   res.json(data);
// });

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

app.get('/api/category', async (req, res) => {
  let pool
  try {
    // Get a connection from the pool
    pool = await poolPromise;
    const request = pool.request();

    const parameterValue = req.query.parameter;
    const length = parameterValue.length;
    const firstChar = parameterValue.charAt(0); // Get the first character
    const restOfString = parameterValue.slice(1, length - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
    const title = [firstChar + restOfString];
    const byStyle= req.query.style;
    const relation= req.query.relation;

    let type;
    let title2=[];
    type=req.query.type.split(',');
    type.forEach((item)=>{
      const length2 = item.length;
      const firstChar2 = item.charAt(0); // Get the first character
      const restOfString2 = item.slice(1, length2 - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
      title2.push(firstChar2 + restOfString2);
    });

    console.log("title>>", title);
    console.log("style:",byStyle);
    console.log("relation",relation)
    console.log("Req query:", req.query);

    if(req.query.type!==''){
      title2.forEach((type)=>{
        title.push(type);
      })
    }

    console.log("title before new title",title);

    let titleNew;
    if (title[0]==='' && title.length===1) {
      const result = await request.query('SELECT type FROM item');
      titleNew = result.recordset.map(row => row.type);
    } else {
      titleNew = title;
    }
    

    console.log("title new: ", titleNew);

    let diamond_type;
    if (req.query.dtype === '') {
      const result = await request.query('SELECT clarity FROM dmd');
      diamond_type = result.recordset.map(row => row.clarity);
    } else {
      diamond_type = req.query.dtype.split(',');
    }

    let metal_type;
    if (req.query.mtype === '') {
      const result = await request.query('SELECT m_type FROM dmd');
      metal_type = result.recordset.map(row => row.m_type);
    } else {
      metal_type = req.query.mtype.split(',');
    }

    console.log("metal type is :", metal_type);

    let gifts;
    if (req.query.gifts === '') {
      const result = await request.query('SELECT occasion FROM gift');
      gifts = result.recordset.map(row => row.occasion);
    } else {
      gifts = req.query.gifts.split(',');
    }

    console.log("Gifts received", gifts);

    let gender;
    if (req.query.gender === '') {
      const result = await request.query('SELECT gender FROM item');
      gender = result.recordset.map(row => row.gender);
    } else {
      gender = req.query.gender.split(',');
    }


    let bestseller = req.query.bestseller === '1';
    let newArrival = req.query.new === '1';
    let ship = req.query.rts === '1';

    let price;
    if (req.query.price === '') {
      const result = await request.query('SELECT price FROM item');
      price = result.recordset.map(row => row.price);
    } else {
      const cleanRanges = req.query.price.replace(/[^\d.,-]/g, ''); // Remove non-numeric characters except comma and dash
      price = cleanRanges.split(',').map(range => {
        const [minPriceStr, maxPriceStr] = range.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        return { minPrice, maxPrice };
      });
    }

    const priceConditions = price.map(({ minPrice, maxPrice }) => {
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
      } else if (!isNaN(minPrice)) {
        return `(price >= ${minPrice} )`;
      } else if (!isNaN(maxPrice)) {
        return `(price <= ${maxPrice} )`;
      } else {
        return ''; // Handle invalid price ranges as needed
      }
    }).filter(condition => condition !== '').join(' OR ');

    console.log("Price is:", price);

    let query = `
      SELECT * 
      FROM item i 
      JOIN gift g ON i.item_id = g.item_id 
      JOIN dmd d ON d.item_id = i.item_id 
      WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')})  
        AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
        AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
        AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
        AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
        ${priceConditions ? `AND (${priceConditions})` : ''}
        ${bestseller ? `AND i.bestseller = 1` : ''}
        ${newArrival ? `AND i.date_released between DATEADD(month,-6,getdate()) and getdate()` : ''}
        ${ship ? `AND i.ship = 1` : ''}
    `;

    // console.log("query1>>", query);


    if (byStyle) {
      query += ` AND style = @style`;
      request.input(`style`, sql.NVarChar, byStyle);
    }

    if (relation) {
      query += ` AND relation = @relation`;
      request.input(`relation`, sql.NVarChar, relation);
    }

    // request.input(`style`, sql.NVarChar, byStyle);
    // request.input(`relation`, sql.NVarChar, relation);


    
    titleNew.forEach((type, index) => {
      request.input(`titleNew${index}`, sql.NVarChar, type);
      console.log("Injected title parameter:", `@titleNew${index}`, "with value:", type);
    });

    diamond_type.forEach((type, index) => {
      request.input(`diamondType${index}`, sql.NVarChar, type);
    });

    metal_type.forEach((type, index) => {
      request.input(`metalType${index}`, sql.NVarChar, type);
      console.log("Injected metal type parameter:", `@metalType${index}`, "with value:", type);  // Verify parameter injection
    });

    gifts.forEach((gift, index) => {
      request.input(`gift${index}`, sql.NVarChar, gift);
    });

    gender.forEach((gen, index) => {
      request.input(`gender${index}`, sql.NVarChar, gen);
    });
    console.log("query1>>", query);
    const result = await request.query(query);
    console.log("Query executed successfully.");

    res.json(result.recordset);
    // console.log(result)
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // }finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});

// app.get('/api/category', async (req, res) => {
//   let pool;

//   try {
//     // Connect to the database
//     pool = await sql.connect(config);

//     // Extract query parameters
//     const parameterValue = req.query.parameter;
//     const length = parameterValue.length;
//     const firstChar = parameterValue.charAt(0); // Get the first character
//     const restOfString = parameterValue.slice(1, length - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
//     const title = firstChar + restOfString;

//     // Prepare arrays for dynamic input parameters
//     let titleNew;
//     if (title === '') {
//       const result = await pool.request().query`SELECT type FROM item`;
//       titleNew = result.recordset.map(row => row.type);
//     } else {
//       titleNew = [title];
//     }

//     let diamond_type;
//     if (req.query.dtype === '') {
//       const result = await pool.request().query`SELECT clarity FROM dmd`;
//       diamond_type = result.recordset.map(row => row.clarity);
//     } else {
//       diamond_type = req.query.dtype.split(',');
//     }

//     let metal_type;
//     if (req.query.mtype === '') {
//       const result = await pool.request().query`SELECT m_type FROM dmd`;
//       metal_type = result.recordset.map(row => row.m_type);
//     } else {
//       metal_type = req.query.mtype.split(',');
//     }

//     let gifts;
//     if (req.query.gifts === '') {
//       const result = await pool.request().query`SELECT occasion FROM gift`;
//       gifts = result.recordset.map(row => row.occasion);
//     } else {
//       gifts = req.query.gifts.split(',');
//     }

//     let gender;
//     if (req.query.gender === '') {
//       const result = await pool.request().query`SELECT gender FROM item`;
//       gender = result.recordset.map(row => row.gender);
//     } else {
//       gender = req.query.gender.split(',');
//     }

//     let price;
//     if (req.query.price === '') {
//       const result = await pool.request().query`SELECT price FROM item`;
//       price = result.recordset.map(row => row.price);
//     } else {
//       const cleanRanges = req.query.price.replace(/[^\d.,-]/g, ''); // Remove non-numeric characters except comma and dash
//       price = cleanRanges.split(',').map(range => {
//         const [minPriceStr, maxPriceStr] = range.split('-');
//         const minPrice = parseInt(minPriceStr);
//         const maxPrice = parseInt(maxPriceStr);
//         return { minPrice, maxPrice };
//       });
//     }

//     // Build the dynamic SQL query
//     const priceConditions = price.map(({ minPrice, maxPrice }) => {
//       if (!isNaN(minPrice) && !isNaN(maxPrice)) {
//         return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
//       } else if (!isNaN(minPrice)) {
//         return `(price >= ${minPrice} )`;
//       } else if (!isNaN(maxPrice)) {
//         return `(price <= ${maxPrice} )`;
//       } else {
//         return ''; // Handle invalid price ranges as needed
//       }
//     }).filter(condition => condition !== '').join(' OR ');

//     const query = `
//       SELECT * 
//       FROM item i 
//       JOIN gift g ON i.item_id = g.item_id 
//       JOIN dmd d ON d.item_id = i.item_id 
//       WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')})  
//         AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
//         AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
//         AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
//         AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
//         ${priceConditions ? `AND (${priceConditions})` : ''}
//     `;

//     const request = pool.request();

//     // Add parameters to the request
//     titleNew.forEach((type, index) => {
//       request.input(`titleNew${index}`, sql.NVarChar, type);
//     });

//     diamond_type.forEach((type, index) => {
//       request.input(`diamondType${index}`, sql.NVarChar, type);
//     });

//     metal_type.forEach((type, index) => {
//       request.input(`metalType${index}`, sql.NVarChar, type);
//     });

//     gifts.forEach((gift, index) => {
//       request.input(`gift${index}`, sql.NVarChar, gift);
//     });

//     gender.forEach((gen, index) => {
//       request.input(`gender${index}`, sql.NVarChar, gen);
//     });

//     // Execute the query using request.query(query)
//     const result = await request.query(query);
//     console.log("Query executed successfully.");

//     // Send JSON response with the query result
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   } finally {
//     // Close the database connection pool
//     if (pool) {
//       try {
//         await pool.close();
//         console.log('Connection pool closed.');
//       } catch (err) {
//         console.error('Error closing connection pool:', err.message);
//       }
//     }
//   }
// });

app.get('/api/category/htl', async (req, res) => {
  let pool
  try {
    pool = await poolPromise;
    const request = pool.request();
    const parameterValue = req.query.parameter;
    const length = parameterValue.length;
    const firstChar = parameterValue.charAt(0); // Get the first character
    const restOfString = parameterValue.slice(1, length - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
    const title = [firstChar + restOfString];
    

    let type;
    let title2=[];
    type=req.query.type.split(',');
    type.forEach((item)=>{
      const length2 = item.length;
      const firstChar2 = item.charAt(0); // Get the first character
      const restOfString2 = item.slice(1, length2 - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
      title2.push(firstChar2 + restOfString2);
    });

    // Execute the query (replace with your actual query)
    console.log("Req query:", req.query);
    const byStyle= req.query.style;
    const relation= req.query.relation;
    if(req.query.type!==''){
      title2.forEach((type)=>{
        title.push(type);
      })
    }

    console.log("title before new title",title);

    let titleNew;
    if (title[0]==='' && title.length===1) {
      const result = await request.query('SELECT type FROM item');
      titleNew = result.recordset.map(row => row.type);
    } else {
      titleNew = title;
    }

    let bestseller;
    if (req.query.bestseller === '1') {
      bestseller = true;
    } else {
      bestseller = false;
    }

    let newArrival;
    if (req.query.new === '1') {
      newArrival = true;
      console.log("new arrival:", newArrival)
    } else {
      newArrival = false;
    }

    let ship;
    if (req.query.rts === '1') {
      ship = true;
    } else {
      ship = false;
    }

    let diamond_type;
    if (req.query.dtype === '') {
      const result = await pool.request().query('SELECT clarity FROM dmd');
      diamond_type = result.recordset.map(row => row.clarity);
    } else {
      diamond_type = req.query.dtype.split(',');
    }

    let metal_type;
    if (req.query.mtype === '') {
      const result = await pool.request().query('SELECT m_type FROM dmd');
      metal_type = result.recordset.map(row => row.m_type);
    } else {
      metal_type = req.query.mtype.split(',');
    }

    let gifts;
    if (req.query.gifts === '') {
      const result = await pool.request().query('SELECT occasion FROM gift');
      gifts = result.recordset.map(row => row.occasion);
    } else {
      gifts = req.query.gifts.split(',');
    }

    let gender;
    if (req.query.gender === '') {
      const result = await pool.request().query('SELECT gender FROM item');
      gender = result.recordset.map(row => row.gender);
    } else {
      gender = req.query.gender.split(',');
    }

    let price;
    if (req.query.price === '') {
      const result = await pool.request().query`SELECT price FROM item`;
      price = result.recordset.map(row => row.price);
    } else {
      const cleanRanges = req.query.price.replace(/[^\d.,-]/g, '');
      price = cleanRanges.split(',').map(range => {
        const [minPriceStr, maxPriceStr] = range.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        return { minPrice, maxPrice };
      });
    }

    const priceConditions = price.map(({ minPrice, maxPrice }) => {
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
      } else if (!isNaN(minPrice)) {
        return `(price >= ${minPrice})`;
      } else if (!isNaN(maxPrice)) {
        return `(price <= ${maxPrice})`;
      } else {
        return '';
      }
    }).filter(condition => condition !== '').join(' OR ');
    
    console.log("Price conditions:", priceConditions); // Debugging output to inspect the price conditions
    
    const query = `
      SELECT * 
      FROM item i 
      JOIN gift g ON i.item_id = g.item_id 
      JOIN dmd d ON d.item_id = i.item_id 
      WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')}) 
        AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
        AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
        AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
        AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
        ${priceConditions ? `AND (${priceConditions})` : ''}
        ${bestseller ? `AND i.bestseller = 1` : ''}
        ${newArrival ? `AND i.date_released BETWEEN DATEADD(month,-6,GETDATE()) AND GETDATE()` : ''}
        ${ship ? `AND i.ship = 1` : ''}
        ${byStyle ? `AND style = ${`@style`}` : ''}
        ${relation ? `AND relation = ${`@relation`}` : ''}
        ORDER BY price DESC
    `;
    
    console.log("Query:", query);
    request.input(`style`, sql.NVarChar, byStyle);
    request.input(`relation`, sql.NVarChar, relation);
    
    titleNew.forEach((type, index) => {
      request.input(`titleNew${index}`, sql.NVarChar, type);
    });
    
    diamond_type.forEach((type, index) => {
      request.input(`diamondType${index}`, sql.NVarChar, type);
    });
    
    metal_type.forEach((type, index) => {
      request.input(`metalType${index}`, sql.NVarChar, type);
    });
    
    gifts.forEach((gift, index) => {
      request.input(`gift${index}`, sql.NVarChar, gift);
    });
    
    gender.forEach((gen, index) => {
      request.input(`gender${index}`, sql.NVarChar, gen);
    });
    
    const result = await request.query(query);
    console.log("Query executed successfully.");
    
    res.json(result.recordset);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    // }finally {
    //   try {
    //     if (pool) {
    //       await pool.close(); // Close the connection pool
    //     }
    //   } catch (error) {
    //     console.error('Error closing connection pool:', error);
    //   }
    // }
    });
    


app.get('/api/category/lth', async (req, res) => {
  let pool;
  try {
    pool = await poolPromise;
    const request = pool.request();

    const parameterValue = req.query.parameter;
    const length = parameterValue.length;
    const firstChar = parameterValue.charAt(0); // Get the first character
    const restOfString = parameterValue.slice(1, length - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
    const title = [firstChar + restOfString];
    const byStyle= req.query.style;
    const relation= req.query.relation;
    console.log("Req query:", req.query);

    let type;
    let title2=[];
    type=req.query.type.split(',');
    type.forEach((item)=>{
      const length2 = item.length;
      const firstChar2 = item.charAt(0); // Get the first character
      const restOfString2 = item.slice(1, length2 - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
      title2.push(firstChar2 + restOfString2);
    });

    if(req.query.type!==''){
      title2.forEach((type)=>{
        title.push(type);
      })
    }

    console.log("title before new title",title);

    let titleNew;
    if (title[0]==='' && title.length===1) {
      const result = await request.query('SELECT type FROM item');
      titleNew = result.recordset.map(row => row.type);
    } else {
      titleNew = title;
    }

    let bestseller;
    if (req.query.bestseller === '1') {
      bestseller = true;
    } else {
      bestseller = false;
    }

    let newArrival;
    if (req.query.new === '1') {
      newArrival = true;
      console.log("new arrival:", newArrival);
    } else {
      newArrival = false;
    }

    let ship;
    if (req.query.rts === '1') {
      ship = true;
    } else {
      ship = false;
    }

    let diamond_type;
    if (req.query.dtype === '') {
      const result = await pool.request().query('SELECT clarity FROM dmd');
      diamond_type = result.recordset.map(row => row.clarity);
    } else {
      diamond_type = req.query.dtype.split(',');
    }

    let metal_type;
    if (req.query.mtype === '') {
      const result = await pool.request().query('SELECT m_type FROM dmd');
      metal_type = result.recordset.map(row => row.m_type);
    } else {
      metal_type = req.query.mtype.split(',');
    }

    let gifts;
    if (req.query.gifts === '') {
      const result = await pool.request().query('SELECT occasion FROM gift');
      gifts = result.recordset.map(row => row.occasion);
    } else {
      gifts = req.query.gifts.split(',');
    }

    let gender;
    if (req.query.gender === '') {
      const result = await pool.request().query('SELECT gender FROM item');
      gender = result.recordset.map(row => row.gender);
    } else {
      gender = req.query.gender.split(',');
    }

    let price;
    if (req.query.price === '') {
      const result = await pool.request().query('SELECT price FROM item');
      price = result.recordset.map(row => row.price);
    } else {
      const cleanRanges = req.query.price.replace(/[^\d.,-]/g, '');
      price = cleanRanges.split(',').map(range => {
        const [minPriceStr, maxPriceStr] = range.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        return { minPrice, maxPrice };
      });
    }

    const priceConditions = price.map(({ minPrice, maxPrice }, index) => {
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
      } else if (!isNaN(minPrice)) {
        return `(price >= ${minPrice})`;
      } else if (!isNaN(maxPrice)) {
        return `(price <= ${maxPrice})`;
      } else {
        return ''; // Handle invalid price ranges as needed
      }
    }).filter(condition => condition !== '').join(' OR ');

    const query = `
      SELECT * 
      FROM item i 
      JOIN gift g ON i.item_id = g.item_id 
      JOIN dmd d ON d.item_id = i.item_id 
      WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')}) 
        AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
        AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
        AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
        AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
        ${priceConditions ? `AND (${priceConditions})` : ''}
        ${bestseller ? `AND i.bestseller = 1` : ''}
        ${newArrival ? `AND i.date_released BETWEEN DATEADD(month,-6,GETDATE()) AND GETDATE()` : ''}
        ${ship ? `AND i.ship = 1` : ''}
        ${byStyle ? `AND style = ${`@style`}` : ''}
        ${relation ? `AND relation = ${`@relation`}` : ''}
        
        ORDER BY price ASC
    `;

    
    request.input(`style`, sql.NVarChar, byStyle);
    request.input(`relation`, sql.NVarChar, relation);
    titleNew.forEach((type, index) => {
      request.input(`titleNew${index}`, sql.NVarChar, type);
    });

    diamond_type.forEach((type, index) => {
      request.input(`diamondType${index}`, sql.NVarChar, type);
    });

    metal_type.forEach((type, index) => {
      request.input(`metalType${index}`, sql.NVarChar, type);
    });

    gifts.forEach((gift, index) => {
      request.input(`gift${index}`, sql.NVarChar, gift);
    });

    gender.forEach((gen, index) => {
      request.input(`gender${index}`, sql.NVarChar, gen);
    });

    const result = await request.query(query);
    console.log("Query executed successfully.");

    res.json(result.recordset);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    
  // }finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});

app.get('/api/category/new', async (req, res) => {
  let pool;
  try {
    pool = await poolPromise; // Connect using the pool
    const request = pool.request();
    const parameterValue = req.query.parameter;
    const length = parameterValue.length;
    const firstChar = parameterValue.charAt(0);
    const restOfString = parameterValue.slice(1, length - 1).toLowerCase();
    const title = [firstChar + restOfString];
    const byStyle= req.query.style;
    const relation= req.query.relation;

    let type;
    let title2=[];
    type=req.query.type.split(',');
    type.forEach((item)=>{
      const length2 = item.length;
      const firstChar2 = item.charAt(0); // Get the first character
      const restOfString2 = item.slice(1, length2 - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
      title2.push(firstChar2 + restOfString2);
    });

        if(req.query.type!==''){
      title2.forEach((type)=>{
        title.push(type);
      })
    }

    console.log("title before new title",title);

    let titleNew;
    if (title[0]==='' && title.length===1) {
      const result = await request.query('SELECT type FROM item');
      titleNew = result.recordset.map(row => row.type);
    } else {
      titleNew = title;
    }

    let bestseller = req.query.bestseller === '1';
    let newArrival = req.query.new === '1';
    let ship = req.query.rts === '1';

    let diamond_type;
    if (req.query.dtype === '') {
      const result = await pool.request().query`SELECT clarity FROM dmd`;
      diamond_type = result.recordset.map(row => row.clarity);
    } else {
      diamond_type = req.query.dtype.split(',');
    }

    let metal_type;
    if (req.query.mtype === '') {
      const result = await pool.request().query`SELECT m_type FROM dmd`;
      metal_type = result.recordset.map(row => row.m_type);
    } else {
      metal_type = req.query.mtype.split(',');
    }

    let gifts;
    if (req.query.gifts === '') {
      const result = await pool.request().query`SELECT occasion FROM gift`;
      gifts = result.recordset.map(row => row.occasion);
    } else {
      gifts = req.query.gifts.split(',');
    }

    let gender;
    if (req.query.gender === '') {
      const result = await pool.request().query`SELECT gender FROM item`;
      gender = result.recordset.map(row => row.gender);
    } else {
      gender = req.query.gender.split(',');
    }

    let price;
    if (req.query.price === '') {
      const result = await pool.request().query`SELECT price FROM item`;
      price = result.recordset.map(row => row.price);
    } else {
      const cleanRanges = req.query.price.replace(/[^\d.,-]/g, '');
      price = cleanRanges.split(',').map(range => {
        const [minPriceStr, maxPriceStr] = range.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        return { minPrice, maxPrice };
      });
    }

    const priceConditions = price.map(({ minPrice, maxPrice }) => {
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
      } else if (!isNaN(minPrice)) {
        return `(price >= ${minPrice})`;
      } else if (!isNaN(maxPrice)) {
        return `(price <= ${maxPrice})`;
      } else {
        return '';
      }
    }).filter(condition => condition !== '').join(' OR ');

    const query = `
      SELECT * 
      FROM item i 
      JOIN gift g ON i.item_id = g.item_id 
      JOIN dmd d ON d.item_id = i.item_id 
      WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')}) 
        AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
        AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
        AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
        AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
        ${priceConditions ? `AND (${priceConditions})` : ''}
        ${byStyle ? `AND style = ${`@style`}` : ''}
        ${bestseller ? `AND i.bestseller = 1` : ''}
        ${ship ? `AND i.ship = 1` : ''}
        ${relation ? `AND relation = ${`@relation`}` : ''}
        AND i.date_released BETWEEN DATEADD(month, -6, GETDATE()) AND GETDATE()
    `;

    console.log("query new arrivals>>",query)
    
    
    request.input(`style`, sql.NVarChar, byStyle);
    request.input(`relation`, sql.NVarChar, relation);
    titleNew.forEach((type, index) => {
      request.input(`titleNew${index}`, sql.NVarChar, type);
    });

    diamond_type.forEach((type, index) => {
      request.input(`diamondType${index}`, sql.NVarChar, type);
    });

    metal_type.forEach((type, index) => {
      request.input(`metalType${index}`, sql.NVarChar, type);
    });

    gifts.forEach((gift, index) => {
      request.input(`gift${index}`, sql.NVarChar, gift);
    });

    gender.forEach((gen, index) => {
      request.input(`gender${index}`, sql.NVarChar, gen);
    });

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // } finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});



app.get('/api/category/discount', async (req, res) => {
  let pool;
  try {
    pool= await poolPromise // Connect using the pool
    const request = pool.request();
    const parameterValue = req.query.parameter;
    const length = parameterValue.length;
    const firstChar = parameterValue.charAt(0);
    const restOfString = parameterValue.slice(1, length - 1).toLowerCase();
    const title = [firstChar + restOfString];
    const byStyle= req.query.style;
    const relation= req.query.relation;

    let type;
    let title2=[];
    type=req.query.type.split(',');
    type.forEach((item)=>{
      const length2 = item.length;
      const firstChar2 = item.charAt(0); // Get the first character
      const restOfString2 = item.slice(1, length2 - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
      title2.push(firstChar2 + restOfString2);
    });

    if(req.query.type!==''){
      title2.forEach((type)=>{
        title.push(type);
      })
    }

    console.log("title before new title",title);

    let titleNew;
    if (title[0]==='' && title.length===1) {
      const result = await request.query('SELECT type FROM item');
      titleNew = result.recordset.map(row => row.type);
    } else {
      titleNew = title;
    }

    let bestseller = req.query.bestseller === '1';
    let newArrival = req.query.new === '1';
    let ship = req.query.rts === '1';

    let diamond_type;
    if (req.query.dtype === '') {
      const result = await pool.request().query`SELECT clarity FROM dmd`;
      diamond_type = result.recordset.map(row => row.clarity);
    } else {
      diamond_type = req.query.dtype.split(',');
    }

    let metal_type;
    if (req.query.mtype === '') {
      const result = await pool.request().query`SELECT m_type FROM dmd`;
      metal_type = result.recordset.map(row => row.m_type);
    } else {
      metal_type = req.query.mtype.split(',');
    }

    let gifts;
    if (req.query.gifts === '') {
      const result = await pool.request().query`SELECT occasion FROM gift`;
      gifts = result.recordset.map(row => row.occasion);
    } else {
      gifts = req.query.gifts.split(',');
    }

    let gender;
    if (req.query.gender === '') {
      const result = await pool.request().query`SELECT gender FROM item`;
      gender = result.recordset.map(row => row.gender);
    } else {
      gender = req.query.gender.split(',');
    }

    let price;
    if (req.query.price === '') {
      const result = await pool.request().query`SELECT price FROM item`;
      price = result.recordset.map(row => row.price);
    } else {
      const cleanRanges = req.query.price.replace(/[^\d.,-]/g, '');
      price = cleanRanges.split(',').map(range => {
        const [minPriceStr, maxPriceStr] = range.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        return { minPrice, maxPrice };
      });
    }

    const priceConditions = price.map(({ minPrice, maxPrice }) => {
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
      } else if (!isNaN(minPrice)) {
        return `(price >= ${minPrice})`;
      } else if (!isNaN(maxPrice)) {
        return `(price <= ${maxPrice})`;
      } else {
        return '';
      }
    }).filter(condition => condition !== '').join(' OR ');

    const query = `
      SELECT * 
      FROM item i 
      JOIN gift g ON i.item_id = g.item_id 
      JOIN dmd d ON d.item_id = i.item_id 
      WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')}) 
        AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
        AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
        AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
        AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
        ${priceConditions ? `AND (${priceConditions})` : ''}
        ${bestseller ? `AND i.bestseller = 1` : ''}
        ${newArrival ? `AND i.date_released BETWEEN DATEADD(month, -6, GETDATE()) AND GETDATE()` : ''}
        ${ship ? `AND i.ship = 1` : ''}
        ${byStyle ? `AND style = ${`@style`}` : ''}
        ${relation ? `AND relation = ${`@relation`}` : ''}
        AND discounted_price IS NOT NULL
    `;

    
    request.input(`style`, sql.NVarChar, byStyle);
    request.input(`relation`, sql.NVarChar, relation);
    titleNew.forEach((type, index) => {
      request.input(`titleNew${index}`, sql.NVarChar, type);
    });

    diamond_type.forEach((type, index) => {
      request.input(`diamondType${index}`, sql.NVarChar, type);
    });

    metal_type.forEach((type, index) => {
      request.input(`metalType${index}`, sql.NVarChar, type);
    });

    gifts.forEach((gift, index) => {
      request.input(`gift${index}`, sql.NVarChar, gift);
    });

    gender.forEach((gen, index) => {
      request.input(`gender${index}`, sql.NVarChar, gen);
    });

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // } finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});


app.get('/api/category/bestsellers', async (req, res) => {
  let pool;
  try {
    pool = await poolPromise; // Connect using the pool
    const request = pool.request();
    const parameterValue = req.query.parameter;
    const length = parameterValue.length;
    const firstChar = parameterValue.charAt(0);
    const restOfString = parameterValue.slice(1, length - 1).toLowerCase();
    const title = [firstChar + restOfString];
    const byStyle= req.query.style;
    const relation= req.query.relation;

    let type;
    let title2=[];
    type=req.query.type.split(',');
    type.forEach((item)=>{
      const length2 = item.length;
      const firstChar2 = item.charAt(0); // Get the first character
      const restOfString2 = item.slice(1, length2 - 1).toLowerCase(); // Get the rest of the string and convert to lowercase
      title2.push(firstChar2 + restOfString2);
    });

    if(req.query.type!==''){
      title2.forEach((type)=>{
        title.push(type);
      })
    }

    console.log("title before new title",title);

    let titleNew;
    if (title[0]==='' && title.length===1) {
      const result = await request.query('SELECT type FROM item');
      titleNew = result.recordset.map(row => row.type);
    } else {
      titleNew = title;
    }

    let bestseller = req.query.bestseller === '1';
    let newArrival = req.query.new === '1';
    let ship = req.query.rts === '1';

    let diamond_type;
    if (req.query.dtype === '') {
      const result = await pool.request().query`SELECT clarity FROM dmd`;
      diamond_type = result.recordset.map(row => row.clarity);
    } else {
      diamond_type = req.query.dtype.split(',');
    }

    let metal_type;
    if (req.query.mtype === '') {
      const result = await pool.request().query`SELECT m_type FROM dmd`;
      metal_type = result.recordset.map(row => row.m_type);
    } else {
      metal_type = req.query.mtype.split(',');
    }

    let gifts;
    if (req.query.gifts === '') {
      const result = await pool.request().query`SELECT occasion FROM gift`;
      gifts = result.recordset.map(row => row.occasion);
    } else {
      gifts = req.query.gifts.split(',');
    }

    let gender;
    if (req.query.gender === '') {
      const result = await pool.request().query`SELECT gender FROM item`;
      gender = result.recordset.map(row => row.gender);
    } else {
      gender = req.query.gender.split(',');
    }

    let price;
    if (req.query.price === '') {
      const result = await pool.request().query`SELECT price FROM item`;
      price = result.recordset.map(row => row.price);
    } else {
      const cleanRanges = req.query.price.replace(/[^\d.,-]/g, '');
      price = cleanRanges.split(',').map(range => {
        const [minPriceStr, maxPriceStr] = range.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        return { minPrice, maxPrice };
      });
    }

    const priceConditions = price.map(({ minPrice, maxPrice }) => {
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return `(price BETWEEN ${minPrice} AND ${maxPrice})`;
      } else if (!isNaN(minPrice)) {
        return `(price >= ${minPrice})`;
      } else if (!isNaN(maxPrice)) {
        return `(price <= ${maxPrice})`;
      } else {
        return '';
      }
    }).filter(condition => condition !== '').join(' OR ');

    const query = `
      SELECT * 
      FROM item i 
      JOIN gift g ON i.item_id = g.item_id 
      JOIN dmd d ON d.item_id = i.item_id 
      WHERE type IN (${titleNew.map((_, index) => `@titleNew${index}`).join(',')}) 
        AND clarity IN (${diamond_type.map((_, index) => `@diamondType${index}`).join(',')}) 
        AND m_type IN (${metal_type.map((_, index) => `@metalType${index}`).join(',')}) 
        AND occasion IN (${gifts.map((_, index) => `@gift${index}`).join(',')}) 
        AND gender IN (${gender.map((_, index) => `@gender${index}`).join(',')})
        ${priceConditions ? `AND (${priceConditions})` : ''}
        ${newArrival ? `AND i.date_released BETWEEN DATEADD(month, -6, GETDATE()) AND GETDATE()` : ''}
        ${ship ? `AND i.ship = 1` : ''}
        ${byStyle ? `AND style = ${`@style`}` : ''}
        ${relation ? `AND relation = ${`@relation`}` : ''}
        AND bestseller = 1
    `;

    
    request.input(`style`, sql.NVarChar, byStyle);
    request.input(`relation`, sql.NVarChar, relation);
    titleNew.forEach((type, index) => {
      request.input(`titleNew${index}`, sql.NVarChar, type);
    });

    diamond_type.forEach((type, index) => {
      request.input(`diamondType${index}`, sql.NVarChar, type);
    });

    metal_type.forEach((type, index) => {
      request.input(`metalType${index}`, sql.NVarChar, type);
    });

    gifts.forEach((gift, index) => {
      request.input(`gift${index}`, sql.NVarChar, gift);
    });

    gender.forEach((gen, index) => {
      request.input(`gender${index}`, sql.NVarChar, gen);
    });

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // } finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});

app.get('/api/item', async (req, res) => {
  try {
    const pool = await poolPromise; // Connect using the pool

    const title = req.query.parameter;
    console.log("Item title:", title);
    console.log("Req query:", req.query);

    const query = `
      SELECT *
      FROM item i
      JOIN dmd d ON i.item_id = d.item_id
      JOIN category c ON i.Category_id = c.Category_id
      WHERE i.name = @title
    `;
    console.log("Query:", query);

    const request = pool.request();
    request.input('title', sql.VarChar, title);

    const result = await request.query(query);
    console.log("Query executed successfully.");
    console.log(result.recordset);
    res.json(result.recordset);
    
  } catch (error) {
    console.error("Error executing item query:", error.message);
    res.status(500).send("Error fetching item data.");
  }
  // } finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});

app.get('/api/similar', async (req, res) => {
  let pool
  try {
    pool =await poolPromise; // Connect using the pool

    const catId = req.query.catId;
    console.log("Category ID:", catId);
    console.log("Req query:", req.query);

    const query = `SELECT * FROM item WHERE Category_id = @catId`;
    console.log("query6>>", query);

    const request = pool.request();
    request.input('catId', sql.Int, catId);

    const result = await request.query(query);
    console.log("Query executed successfully.");
    console.log(result.recordset);
    res.json(result.recordset);
    
  } catch (error) {
    console.error("Error executing similar items query:", error.message);
    res.status(500).send("Error fetching similar items data.");
  }
  // } finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});

app.get('/api/review', async (req, res) => {
  let pool
  try {
    pool=await poolPromise; // Connect using the pool

    const itemId = req.query.itemId;
    console.log("Item ID:", itemId);
    console.log("Req query:", req.query);

    const query = `SELECT * FROM review WHERE item_id = @itemId`;
    console.log("query10>>", query);

    const request = pool.request();
    request.input('itemId', sql.Int, itemId);

    const result = await request.query(query);
    console.log("Query executed successfully.");
    console.log(result.recordset);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  }
  // } finally {
  //   try {
  //     if (pool) {
  //       await pool.close(); // Close the connection pool
  //     }
  //   } catch (error) {
  //     console.error('Error closing connection pool:', error);
  //   }
  // }
});

app.post('/api/reviews', async (req, res) => {
  let pool;
  try {
    const { name, Rating, itemId, itemName, review } = req.body;
    console.log("Review body:", req.body);
    console.log("Name:", name, "Rating:", Rating, "Item ID:", itemId, "Item Name:", itemName, "Review:", review);

    // Ensure all required fields are present
    if (!name || !Rating || !review || !itemId || !itemName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    pool = await poolPromise; // Connect using the pool

    const query = `INSERT INTO review (Cust_name, rating, review, item_id) VALUES (@cName, @cRating, @cReview, @itemId)`;
    console.log("Query:", query);

    const request = pool.request();
    request.input('cName', sql.VarChar, name);
    request.input('cRating', sql.Int, Rating);
    request.input('cReview', sql.VarChar, review);
    request.input('itemId', sql.Int, itemId);

    await request.query(query);
    console.log("Query executed successfully.");

    res.json({ redirectUrl: `/api/item?parameter=${encodeURIComponent(itemName)}` });
    console.log("res.json: ",{redirectUrl: `/api/item?parameter=${encodeURIComponent(itemName)}`})
  } catch (error) {
    console.error('Error inserting review:', error.message);
    res.json({ redirectUrl: `/api/item?parameter=${encodeURIComponent(itemName)}` });
  }
});

app.post('/api/cart-details', async (req, res) => {
  let pool;
  try {
    const { itemId, price, color, d_type, m_type, size,name } = req.body;
    console.log("Cart body:", req.body);
    console.log("item id: ", itemId, "Price: ", price, "Color: ", color, "D_type", d_type, "M_type", m_type, "Size: ", size,"name: ",name);

    // Ensure all required fields are present
    pool = await poolPromise; // Connect using the pool

    // Check if the item with the same item_id, color, d_type, m_type, and size already exists in the cart
    const checkQuery = `
      SELECT COUNT(*) as count 
      FROM Cart_details 
      WHERE item_id = @itemId 
        AND color = @color 
        AND d_type = @d_type 
        AND m_type = @m_type 
        AND size = @size`;
    const checkRequest = pool.request();
    checkRequest.input('itemId', sql.Int, itemId);
    checkRequest.input('color', sql.VarChar, color);
    checkRequest.input('d_type', sql.VarChar, d_type);
    checkRequest.input('m_type', sql.VarChar, m_type);
    checkRequest.input('size', sql.Int, size);

    const checkResult = await checkRequest.query(checkQuery);
    const itemCount = checkResult.recordset[0].count;

    if (itemCount > 0) {
      // Item already exists in the cart
      res.json({ response: "item already in cart" });
      console.log("response: ", { response: "item already in cart" });
    } else {
      // Item does not exist, proceed with the insert
      const insertQuery = `
        INSERT INTO Cart_details (price, item_id, color, d_type, m_type, size,name) 
        VALUES (@price, @itemId, @color, @d_type, @m_type, @size,@name)`;
      console.log("Insert Query:", insertQuery);

      const insertRequest = pool.request();
      insertRequest.input('price', sql.Int, price);
      insertRequest.input('itemId', sql.Int, itemId);
      insertRequest.input('color', sql.VarChar, color);
      insertRequest.input('d_type', sql.VarChar, d_type);
      insertRequest.input('m_type', sql.VarChar, m_type);
      insertRequest.input('size', sql.Int, size);
      insertRequest.input('name', sql.VarChar, name);

      await insertRequest.query(insertQuery);
      console.log("Query executed successfully.");

      res.json({ response: "data inserted" });
      console.log("response: ", { response: "data inserted" });
    }
  } catch (error) {
    console.error('Error inserting cart item:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cart-details',async(req,res)=>{
  let pool;
  try{
    pool = await poolPromise;
    // const itemId=req.body.itemId;
    // console.log("Item ID:", itemId);
    // console.log("Req query:", req.query);

    const query = `SELECT * FROM Cart_details`;
    console.log("query10>>", query);
    const request= pool.request();
    const result =  await request.query(query);
    console.log("Query executed successfully.");
    console.log(result.recordset);

    res.json(result.recordset);

  }catch(error){
    console.log("error getting cart details from database",error);
  }
})

app.delete('/api/cart-details',async(req,res)=>{
  let pool;
  try {
    const { itemId, color, d_type, m_type, size } = req.query;
    console.log("Delete body:", req.query);
    console.log("item id: ", itemId, "Color: ", color, "D_type", d_type, "M_type", m_type, "Size: ", size);

    // Ensure all required fields are present
    pool = await poolPromise; // Connect using the pool

    // Check if the item with the same item_id, color, d_type, m_type, and size already exists in the cart
   

   
      // Item does not exist, proceed with the insert
      const insertQuery = `
        DELETE FROM Cart_details
        where item_id=@itemId and color=@color and d_type=@d_type and m_type=@m_type and size = @size`;
      console.log("Delete Query:", insertQuery);

      const insertRequest = pool.request();
      insertRequest.input('itemId', sql.Int, itemId);
      insertRequest.input('color', sql.VarChar, color);
      insertRequest.input('d_type', sql.VarChar, d_type);
      insertRequest.input('m_type', sql.VarChar, m_type);
      insertRequest.input('size', sql.Int, size);

      await insertRequest.query(insertQuery);
      console.log("Query executed successfully.");

      res.json({ response: "data deleted" });
      console.log("response: ", { response: "data deleted" });
    }
   catch (error) {
    console.error('Error inserting cart item:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
