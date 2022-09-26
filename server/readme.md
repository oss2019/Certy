# Certy Api
For this api to work, python and following python libraries must be installed on your machine:

-   pandas
-   json
-   pymongo
-   bson

### Get Credentials
To use Google Sheets link, you will require a service account and a credentials file. Visit the following link for further details.
[Create Credentials for Service Account](https://developers.google.com/workspace/guides/create-credentials#create_credentials_for_a_service_account)

Paste the credentials file in Routes>GoogleSheetsAPI>creds.json.

### Database Handling
Go to Routes>MongoDB, replace the database link with your own database link.

```
mongoose.connect("your databse link", {
    useNewUrlParser: true,
});
```

The above changes should be done in both the files 'certificate.js' and 'certy_zips.js' inside Routes>MongoDB folder.

### Certificate Template
These are stored in Templates/ and the respective templateID is the name of the image file.
For Exaple:
Template.jpg has the templateID as "Template"

### Generating certificates using post requests
For generating a certficate, you will require either the google sheet link or the excel file containing data and also a template ID. The ID for each template in the name of the certificate templates stored inside the 'Templates' folder (without the extention name).
Make a post request on the route `/certy_googleSheet`

Using Axios:

```
const data = new FormData();
data.append("link", "Google Sheet link as string");
data.append("templateID", "Template id String");
axios({
    method: "post",
    url: "http://localhost:5000/certy_googleSheet",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
})
    .then(function (response) {
        //handle success
        console.log(response.data);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
```

Using simple html form:

```
<form action="http://localhost:5000/certy_googleSheet" method="post" enctype="multipart/form-data">
        <input type="text" name="link">
        <input type="text" name="templateID">
        <button type="submit">Get pdfs</button>
</form>
```

Response Obtained if Link is Invalid

```
{
    "error": {
        "status": 500,
        "message": "Requested entity was not found."
    }
}
```

Response obtained if read access to spredsheet is not given to the service Account

```
{
    "error": {
        "status": 500,
        "message": "The caller does not have permission"
    }
}
```



Using file upload:
Make a post request on the `/certy_upload` route.
For Example:

```
<form action="http://localhost:5000/certy_upload" method="post" enctype="multipart/form-data">
        <input type="file" name="excel" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <button type="submit">Upload File</button>
</form>
```

Respective Certificate Zip file will be directly downloaded

### Verification
Each generated certificate will have a 16 character id printed at some corner of the certificate. For verifying a certifcate make a get request on `/verifiy` route with query as `uid=certificateID`

For Example:
`http://localhost:5000/verify?uid=62e5637f47224c5fedf88387`

Corresponding certificate will be displayed in the browser window

Response if certificate with corresponding id does not exists:

```
{
    "error": {
        "status": 404,
        "message": "Certificate with this ID does not Exists"
    }
}
```

Response if the certificate id is invalid

```
{
    "error": {
        "status": 400,
        "message": "Invalid Certificate ID"
    }
}
```
