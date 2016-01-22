var setup_map = function()
{
var address = "г. Москва, ул. Годовикова, 9, строение 3.";
var newLatLng = new google.maps.LatLng(55.806711,37.629124);

var mapOptions = {
    zoom: 17,
    center: newLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    'scrollwheel': false
    }
var map = new google.maps.Map(document.getElementById('map-inner'), mapOptions);
var marker = new MarkerWithLabel({
    map: map,
    labelContent: address,
    position: newLatLng,
    labelClass: "mapa-labels",
    labelAnchor: new google.maps.Point(-22, 34),
    labelVisible: false,
//    icon: "/media/images/icon-map.png"
});
google.maps.event.addListener(marker, "mouseover", function (e) {
    marker.set("labelVisible", true);
});
google.maps.event.addListener(marker, "mouseout", function (e) {
    marker.set("labelVisible", false);
});
function center_map()
{
    map.setCenter(newLatLng);
};
function check_is_in_or_out(marker){
    return map.getBounds().contains(marker.getPosition());
}
var centermap_but = $("#center-map");
$(document).ready(function()
{
    google.maps.event.addListener(map, "center_changed", function ()
    {
        if (check_is_in_or_out(marker))
        {
            centermap_but.hide();
        }
        else
        {
            centermap_but.show();
        }
    });
});
center_map();
$("#center-map").on("click",function(){map.panTo(newLatLng);});
};