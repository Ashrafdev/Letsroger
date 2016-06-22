import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';

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

    tokenSubscription: any;
    getThing: any;
    thing:string;

    constructor(public authHttp:AuthHttp) {
    }

    let
    tokenSubscription = function () {
        this.authHttp.tokenStream.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    let
    getThing = function () {
        var myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');

        this.authHttp.get('http://example.com/api/thing', {headers: myHeader})
            .subscribe(
                data => this.thing = data,
                err => console.log(error),
                () => console.log('Request Complete')
            );

        // Pass it after the body in a POST request
        this.authHttp.post('http://example.com/api/thing', 'post body', {headers: myHeader})
            .subscribe(
                data => this.thing = data,
                err => console.log(error),
                () => console.log('Request Complete')
            );


    }
}

bootstrap(App, [
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                headerName: YOUR_HEADER_NAME,
                headerPrefix: YOUR_HEADER_PREFIX,
                tokenName: YOUR_TOKEN_NAME,
                tokenGetter: YOUR_TOKEN_GETTER_FUNCTION,
                globalHeaders: [{'Content-Type': 'application/json'}],
                noJwtError: true,
                noTokenScheme: true
            }), http);
        },
        deps: [Http]
    })
])