Number.prototype.formatMoney = function(places, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 0;
    thousand = thousand || " ";
    decimal = decimal || " ";
    var number = this,
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};


fader_double = function(sliderRange, input_min, input_max) {
    var max, min, price_from, price_to;
    sliderRange.fadeIn(300);
    price_from = parseInt(input_min.attr("value"));
    price_to = parseInt(input_max.attr("value"));

    min = sliderRange.data('min');
    max = sliderRange.data('max');
        sliderRange.slider( {
        range: true,
        min: min,
        max: max,
        values: [price_from, price_to],
        slide: function(event, ui) {
            input_min.val(parseInt(ui.values[0]).formatMoney());
            input_max.val(parseInt(ui.values[1]).formatMoney());
        }
    });

    input_min.val(price_from.formatMoney());
    input_max.val(price_to.formatMoney());

    update_input_on_keyup = function(input,sliderRange,input_min,input_max) {
        input_delay(function() {
            var from, to;
            from = Math.abs(parseInt(input_min.val().replace(' ', ''), 10));
            to = Math.abs(parseInt(input_max.val().replace(' ', ''), 10));
            min = sliderRange.data('min');
            max = sliderRange.data('max');
            if (input[0] == input_min[0]) {
                if (from > to) {
                    from = to - 1;
                }
            } else {
                if (to > max) {
                    to = max;
                }
            }
            input_min.val(from.formatMoney());
            input_max.val(to.formatMoney());
            if (from < to) {
                sliderRange.slider({values: [from, to]});
            }
        }, 500 );
    };

    input_min.on('keyup', function(){update_input_on_keyup($(this),sliderRange,input_min,input_max)});
    input_max.on('keyup', function(){update_input_on_keyup($(this),sliderRange,input_min,input_max)});
};



