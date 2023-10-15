# contact-book-demo-krom - Follow the below steps
First import the database provided to your local machine then follow the steps below

1. git clone https://github.com/jorgezMburu/contact-book-demo-krom.git
2. cd contact-book-demo-krom
3. npm install
4. Change the database credentials in the directory `src/db_config/config.json` to your own database credentials
5. Run the nodejs app using `NODE_ENV=development node app.js`
6. Navigate to your browser or using your preffered rest client to the url: `http://localhost:2000/`
7. Available routes
    - GET `http://localhost:2000/contact/index` - lists all available contacts
    - POST `http://localhost:2000/contact/create` - create a new contact.
        Request body
        `{
          "full_name": "Test Krom Contact",
          "phone_number": "254707030720"
        }`
    - POST `http://localhost:2000/contact/update` - updates an existing contact by phone number.
        Request body
        `{
          "full_name": "Test Krom Update",
          "phone_number": "254707030720"
        }`
    - POST `http://localhost:2000/contact/delete` - deletes an existing contact by phone number.
        Request body
        `{
          "phone_number": "254707030720"
        }`
