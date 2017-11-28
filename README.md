# angular-node-chat

## Credentials
This app use passport for authenticate users. See more info `http://www.passportjs.org/docs/`
You will need a credentials in facebook, twitter and google to be able to login in the app.

### Google
`https://console.developers.google.com` to create your app. Enable the Google+ API to allow the app access the user profile information.
Create a valid credentials. Be sure 'Authorized JavaScript origins' and 'Authorized redirect URIs' is set up with your correct app url.

### Facebook
`https://developers.facebook.com/apps` to create your app.
Go to 'Oauth configuration' and be sure the redirects callbacks is set up with your correct app url.

### Twitter
`https://apps.twitter.com` to create your app.
Go to 'Settings' and be sure the redirects callbacks and website is set up with your correct app url.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `node src/server/bin/www` for dev server API.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
