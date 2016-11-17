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
    3. Go to ./setting and create a file db.js with the instructions in readme file
        (add a table for this in phpmyadmin)
    4. Go to ./models/index.js to comment all relations before syncing
    5. Run node init.js (The table should be constructed then)
    6. Uncomment the relations in step 4
    7. Run node app.js