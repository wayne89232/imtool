# ImTools


## Layout
    
    app.js             
    package.json        
    public/             --> files used on the client side
    node_modules/
    routes/
    settings/
    views/
      index.ejs        --> main page
      partials/
        partial.ejs


## Setup notes
    1. Install nodejs (LTS will do)
    2. clone this repo
    3. Run npm install
    4. Go to ./setting and create a file db.js with the instructions in readme file
        (add a table for this in phpmyadmin)
    5. Go to ./models/index.js to comment all relations before syncing
    6. Run node init.js (The table should be constructed then)
    7. Uncomment the relations in step 4
    8. Run node app.js