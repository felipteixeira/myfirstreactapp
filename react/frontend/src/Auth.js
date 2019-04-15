import auth0 from 'auth0-js';

class Auth {
    constructor() {
this.auth0 = new auth0.WebAuth({
    domain: 'dev-w1pbqe3k.auth0.com',
    audience: 'https://dev-w1pbqe3k.auth0.com/userinfo',
    clientID: 'jQfSq71rJOKOTeOI4uz32FRXeMMwQlC8',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'id_token',
    scope: 'openid profile'
  });

  this.getProfile = this.getProfile.bind(this);
  this.handleAuthentication = this.handleAuthentication.bind(this);
  this.isAuthenticated = this.isAuthenticated.bind(this);
  this.signIn = this.signIn.bind(this);
  this.signOut = this.signOut.bind(this);
    }

    getProfile(){
    return this.profile;
}
    getIdToken(){
    return this.getIdToken;
}
    isAuthenticated(){
    return new Date().getTime() < this.expireAt;
}
    signIn(){
    this.auth0.authorize();
}

    handleAuthentication(){
    return new Promise((resolve, reject) => {
    this.auth0.parseHash((err, authResult) => {
    if (err) return reject(err);
    if (!authResult || !authResult.idToken){
    return reject(err);  
    }

    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    //time expired
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
    resolve();
    });
})
}
signOut(){
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
}
}
const auth0Client = new Auth();
export default auth0Client