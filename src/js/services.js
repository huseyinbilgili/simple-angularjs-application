ajs.factory('jwtAuthentication', ['$localStorage', '$q', function ($localStorage, $q) {
    return {
        isExpired: function (exp_date) {
            if (exp_date < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        },
        parseJWT: function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
    };
}]);

ajs.factory('httpMethods', ['$http', '$localStorage', '$q', 'Endpoints', function ($http, $localStorage, $q, Endpoints) {
    return {
        get: function (url) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: "GET",
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                headers: {
                    "Authorization": Endpoints.tokenPrefix + $localStorage.authToken
                }
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        post: function (url, data) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: "POST",
                async: true,
                crossDomain: true,
                processData: false,
                dataType: "json",
                mimeType: "multipart/form-data",
                data: data,
                headers: {
                    "Authorization": Endpoints.tokenPrefix + $localStorage.authToken
                }
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}]);

ajs.factory('userAuthorization', ['$localStorage', function ($localStorage) {
    return {
        hasRole: function (r) {
            var roles = $localStorage.parsedToken.roles;
            if (roles.length >= 1) {
                role = r;
                return roles.some(function (item) {
                    if (typeof item.name !== 'string') {
                        return false;
                    }
                    return item.name === role;
                });
            } else {
                return false;
            }
        },
        hasPermission: function (p) {
            var perms = $localStorage.parsedToken.permissions;
            if (perms.length >= 1) {
                perm = p;
                return perms.some(function (item) {
                    if (typeof item.codename !== 'string') {
                        return false;
                    }
                    return item.codename === perm;
                });
            } else {
                return false;
            }
        }
    }
}]);

ajs.factory('utils', ['$localStorage', '$q', function ($localStorage, $q) {
    return {
        makeQueryString: function (params) {
            var queryString = Object.keys(params).map(function (key) {
                if (!_.isUndefined(params[key])) {
                    return key + '=' + params[key]
                }
            }).join('&');
            return queryString;
        },
        isImage: function (src) {
            var deferred = $q.defer();
            var image = new Image();
            image.onerror = function () {
                deferred.resolve(false);
            };
            image.onload = function () {
                deferred.resolve(true);
            };
            image.src = src;
            return deferred.promise;
        }
    }
}]);