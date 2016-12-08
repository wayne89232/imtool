exports.express_validators = {

    isPositive: function(n) {
        return parseInt(n) > 0
    },

    isGender: function(n){
        return n == 'B' || n == 'G'
    },

    isMissionState: function(state){
        var stateList = ['Recruiting','Tooling','Done'];

        return stateList.indexOf(state) >= 0
    }
}

