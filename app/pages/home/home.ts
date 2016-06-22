import {Component, provide} from '@angular/core';
import {NavController, ionicBootstrap} from 'ionic-angular';
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    constructor(private nav:NavController) {
    }


}
class App {

    tokenSubscription:any;
    getThing:any;
    useJwtHelper:any;
    thing:string;

    constructor(public authHttp:AuthHttp) {
    }

    title = 'Tour of Heroes';

    jwtHelper:JwtHelper = new JwtHelper();

    useJwtHelper() {
        var token = localStorage.getItem('id_token');

        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        );
    }

    tokenSubscription = function () {
        this.authHttp.tokenStream.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    getThing = function () {
        var myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');

        this.authHttp.get('http://localhost/api/users/register', {headers: myHeader})
            .subscribe(
                data => this.thing = data,
                err => console.log(myHeader),
                () => console.log('Request Complete')
            );

        // Pass it after the body in a POST request
        this.authHttp.post('http://localhost/api/users/register', 'post body', {headers: myHeader})
            .subscribe(
                data => this.thing = data,
                err => console.log(myHeader),
                () => console.log('Request Complete')
            );
    }
}

ionicBootstrap(App, [
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: "YOUR_HEADER_NAME", // YOUR_HEADER_NAME
                headerPrefix: "YOUR_HEADER_PREFIX", // YOUR_HEADER_PREFIX
                tokenName: "YOUR_TOKEN_NAME", // YOUR_TOKEN_NAME
                tokenGetter: "YOUR_TOKEN_GETTER_FUNCTION", // YOUR_TOKEN_GETTER_FUNCTION
                globalHeaders: [{'Content-Type': 'application/json'}],
                noJwtError: true,
                noTokenScheme: true
            }), http);
        },
        deps: [Http]
    })
])