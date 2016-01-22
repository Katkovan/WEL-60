var init_feedback = function(form_container, backdrop) {
    init_modalz(form_container, backdrop);

    var form = form_container.find("form");
    var message_container = form_container.find(".tmce");

    var form_inner = form_container.find(".form");

    form.find("input, textarea").each(function() {
        $(this).on("keydown",function() {
            $(this).removeClass("error");
        });
    });

    // костыль для ie6, пусть пока живёт
    var fake_form_data = function(form) {
        var fake_data = "{ ";
        form.find("input").each(function() {
            var em = '"' + $(this).attr("name")+'": "'+$(this).attr("value")+'", ';
            fake_data +=(em);
        });
        form.find("textarea").each(function() {
            var em = '"'+$(this).attr("name")+'": "'+$(this).val()+'", ';
            fake_data +=(em);
        });
        fake_data = fake_data.slice(0,-2) +" }";
        return $.parseJSON(fake_data);
    };

    var show_form = function() {
        form_container.fadeIn(150);
        form_container.css("position", "absolute");
        backdrop.fadeIn(150);

        var where = $(document).scrollTop()+($(window).height()-form.height())/2;
        if ( where < 0 ) {
            where = 0;
        }
        where = where+"px";
        form_container.animate({top: where},200);
    };


    var load_start = function(){
        form_inner.toggleClass("loading", true);
    };

    var load_end = function(){
        form_inner.toggleClass("loading", false);
    };

    form.submit(function(event) {
        event.preventDefault();
        var formURL = form.attr("action");
        var formData = form.serialize();
        load_start();
        return $.ajax({
            url: formURL,
            type: 'POST',
            data:  formData,
            success: function(data) {
                load_end();
                var response_data = data;
                var form_errors = response_data["form_errors"];

                form.find("input,textarea").each(function () {
                    $(this).removeClass("error");
                });

                for (var error_class in form_errors) {
                    var el_name = "[name='"+error_class+"']";
                    $(el_name).addClass("error");
                }

                if (response_data["success"] === true) {
                    form_inner.hide();
                    form[0].reset();
                    message_container.html(response_data["message"]);
                    window.setTimeout(function() {
                        form_container.hide();
                        backdrop.hide();
                        form_inner.show();
                        message_container.empty();
                    },2500);
                }
            },
            error: function(textStatus) {
                load_end();
                try { console.log(textStatus) } catch(e) {}
            }
        });
    });

    $('#show_form-header, #show_form-page').on("click",function(e) {
        e.preventDefault();
        show_form(false);
    });
};

$(document).ready(function() {
    init_feedback($("#feedback-popup"),$("#feedback-backdrop"));
    $(".sgallery").fancybox();
});

