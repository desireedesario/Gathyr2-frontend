angular.module('gathyr2', ['satellizer', 'ngRoute', 'ngMessages'])
  .controller('MainCtrl', function($scope, $auth, $window, $http) {
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.currentUser;
    };

    $scope.pullInstagram = function() {
      return $http.get('http://localhost:3000/api/feed')
    };
  })
  .config(function($authProvider) {
    $authProvider.httpInterceptor = function() { return true; },
    $authProvider.withCredentials = false;
    $authProvider.tokenRoot = null;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';

    // Facebook
    $authProvider.facebook({
      clientId: '1610510365908520',
      name: 'facebook',
      url: 'http://localhost:3000/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin + '/',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 580, height: 400 }
    });

    // Instagram
    $authProvider.instagram({
      clientId: '8275245eeb284ad2a806eaccde1ee1d6',
      name: 'instagram',
      url: 'http://localhost:3000/auth/instagram',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
      redirectUri: window.location.origin,
      requiredUrlParams: ['scope'],
      scope: ['basic'],
      scopeDelimiter: '+',
      oauthType: '2.0'
    });

    // Twitter
    $authProvider.twitter({
      clientId: 'm9OtVTVnNXBNVJnkPNVnVjZBq',
      url: 'http://localhost:3000/auth/twitter',
      authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
      redirectUri: window.location.origin,
      oauthType: '1.0',
      popupOptions: { width: 495, height: 645 }
    });
    //
    // // Google
    // $authProvider.google({
    //   url: 'http://localhost:3000/auth/google',
    //   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    //   redirectUri: window.location.origin,
    //   requiredUrlParams: ['scope'],
    //   optionalUrlParams: ['display'],
    //   scope: ['profile', 'email'],
    //   scopePrefix: 'openid',
    //   scopeDelimiter: ' ',
    //   display: 'popup',
    //   oauthType: '2.0',
    //   popupOptions: { width: 452, height: 633 }
    // });
    //
    // // GitHub
    // $authProvider.github({
    //   url: 'http://localhost:3000/auth/github',
    //   authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    //   redirectUri: window.location.origin,
    //   optionalUrlParams: ['scope'],
    //   scope: ['user:email'],
    //   scopeDelimiter: ' ',
    //   oauthType: '2.0',
    //   popupOptions: { width: 1020, height: 618 }
    // });
    //
    // // LinkedIn
    // $authProvider.linkedin({
    //   url: 'http://localhost:3000/auth/linkedin',
    //   authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
    //   redirectUri: window.location.origin,
    //   requiredUrlParams: ['state'],
    //   scope: ['r_emailaddress'],
    //   scopeDelimiter: ' ',
    //   state: 'STATE',
    //   oauthType: '2.0',
    //   popupOptions: { width: 527, height: 582 }
    // });
    //
    // // Twitch
    // $authProvider.twitch({
    //   url: 'http://localhost:3000/auth/twitch',
    //   authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
    //   redirectUri: window.location.origin,
    //   requiredUrlParams: ['scope'],
    //   scope: ['user_read'],
    //   scopeDelimiter: ' ',
    //   display: 'popup',
    //   oauthType: '2.0',
    //   popupOptions: { width: 500, height: 560 }
    // });
    //
    // // Windows Live
    // $authProvider.live({
    //   url: 'http://localhost:3000/auth/live',
    //   authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
    //   redirectUri: window.location.origin,
    //   requiredUrlParams: ['display', 'scope'],
    //   scope: ['wl.emails'],
    //   scopeDelimiter: ' ',
    //   display: 'popup',
    //   oauthType: '2.0',
    //   popupOptions: { width: 500, height: 560 }
    // });
    //
    // // Yahoo
    // $authProvider.yahoo({
    //   url: 'http://localhost:3000/auth/yahoo',
    //   authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
    //   redirectUri: window.location.origin,
    //   scope: [],
    //   scopeDelimiter: ',',
    //   oauthType: '2.0',
    //   popupOptions: { width: 559, height: 519 }
    // });
    //
    // // Bitbucket
    // $authProvider.bitbucket({
    //   url: 'http://localhost:3000/auth/bitbucket',
    //   authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
    //   redirectUri: window.location.origin + '/',
    //   optionalUrlParams: ['scope'],
    //   scope: ['email'],
    //   scopeDelimiter: ' ',
    //   oauthType: '2.0',
    //   popupOptions: { width: 1020, height: 618 }
    // });
    //
    // // Spotify
    // $authProvider.spotify({
    //   url: 'http://localhost:3000/auth/spotify',
    //   authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    //   redirectUri: window.location.origin,
    //   optionalUrlParams: ['state'],
    //   requiredUrlParams: ['scope'],
    //   scope: ['user-read-email'],
    //   scopePrefix: '',
    //   scopeDelimiter: ',',
    //   oauthType: '2.0',
    //   popupOptions: { width: 500, height: 530 }
    // });
    //
    // // Generic OAuth 2.0
    // $authProvider.oauth2({
    //   name: null,
    //   url: null,
    //   clientId: null,
    //   redirectUri: null,
    //   authorizationEndpoint: null,
    //   defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
    //   requiredUrlParams: null,
    //   optionalUrlParams: null,
    //   scope: null,
    //   scopePrefix: null,
    //   scopeDelimiter: null,
    //   state: null,
    //   oauthType: null,
    //   popupOptions: null,
    //   responseType: 'code',
    //   responseParams: {
    //     code: 'code',
    //     clientId: 'clientId',
    //     redirectUri: 'redirectUri'
    //   }
    // });
    //
    // // Generic OAuth 1.0
    // $authProvider.oauth1({
    //   name: null,
    //   url: null,
    //   authorizationEndpoint: null,
    //   redirectUri: null,
    //   oauthType: null,
    //   popupOptions: null
    // });
})
