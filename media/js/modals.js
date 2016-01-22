var init_modalz = function(el,mask, destroy) {
    destroy = (typeof destroy === "undefined") ? false : destroy;

    var hide_modal = function() {
        if (destroy === true) {
            mask.remove();
            el.remove();
        } else {
            mask.hide();
            el.hide();
        }
    }

    el.find(".close-it").on("click", function(e) {
        e.preventDefault();
        hide_modal();
    });

    mask.on("click", function(e) {
        e.preventDefault();
        hide_modal();
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            hide_modal();
        }
    });
};