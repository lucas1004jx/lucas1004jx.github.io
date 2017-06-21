$(function () {

    

var options = {
        url: "city.list.min.json",
        getValue: "name",
    theme:"dark",
        list: {
            match: {
                enabled: true
            }
        },
    template:{
        type:"description",
        fields:{
        description:"country"
    }
    }
    
    };
    
    $("#cityName").easyAutocomplete(options);


});
