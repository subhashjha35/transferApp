# TransferApp

Transfer App is a CRUD application using Angular and NgRx for UI and Express JS and OpenAPI for creating the REST APIs. This application is made keeping in mind of the mobile nativity. For this, the application is made using Ionic 6.x. This application in addition to CRUD operation also features searching and sorting of the transaction details. It doesnot make use of any database as the data is cached in a JSON file on the server. The UI has been tested thoroughly with Unit Tests using Jasmine/Karma and Spectator.

<hr>
<BR><BR>

## SERVER
<<<<<<< HEAD

The server part has been created with the help of NodeJS ExpressJS and the documentation of the API has been done with `OpenAPI`. For running the server, reach the root directory of the backend which is `server` and run the following command.
=======
The server part has been created with the help of NodeJS ExpressJS and the documentation of the API has been done with `Swagger`. For running the server, reach the root directory of the backend which is `server` and run the following command.
>>>>>>> d9107d30c09bd7532f58c16b3825149a9e1bfd12

```
yarn install
yarn run dev
```

The first command installs the dependencies, and the second command run the server on port `3000`. you can access the `API Documentation` on http://localhost:3000/docs/.
You can navigate to http://localhost:3000/api/transaction/getAll to see if you are receiving any transactions list or not.

## CLIENT

The client part was made with Angular, Ionic, NgRx, RxJS and

To run the project, reach out to the root directory, which is `transfer-app-client`. Here, you have to first install dependencies using

```
yarn install
yarn run generate-client-sdk
```

Here, first command installs the dependencies packages from `package.json`.
The second command `generate-client-sdk` generates the `OpenAPI` services in `src/app/services` directory. Make sure that the `REST Server` is running in order to get the services generated.

After the generation of services, we can now run the UI on port `8100` with the following command:

```
ionic serve
```
