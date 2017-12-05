var config  = require('./config');
var cors    = require('cors');

init = function(){
    let corsOptions = {
        origin: function(origin, callback){
            let isWhiteListed = (config.originWhiteList.indexOf(origin) !== -1);
            callback(null, isWhiteListed);
        },
        allowedHeaders: config.allowedHeaders
    };

    return cors(corsOptions);
};

module.exports.init = init;