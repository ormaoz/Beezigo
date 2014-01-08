/**
 * Created by ranromano on 1/7/14.
 */
function get_busy() {
    $.ajax({
        method: 'POST',
        url : 'http://212.179.115.72:8888',
        data : {
            reqString : 'location_data',
            loc_name  : 'times square',
            lat       : '40.759101',
            long      : '73.984406',
            capacity  : '1000'
        },

        success: function(data) {


            alert(data.meter);

            // If we received a successful callback, parse the data, extract
            // the 'count' field and assign its value to the counter
            document.write('<p>data.meter</p>');


        },

        error : function() {
            alert("Error: Something went wrong!");
        }
    })
}