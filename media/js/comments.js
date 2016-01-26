jQuery(document).ready(function(){

	$('.answer').click( function(event){
	    $(this).parents('.comment_item').after($('.commentform'));
	    $('.commentform').css({'border-top': '1px solid #d7d7d7'});
	    // $('.answer').hide();
	});

	// $('.commentform .butt').click( function(event){
	    // $('.pag_comment').after($('.commentform'));
	    // $('.answer').show();
	// });

	$('.commentform form').validate({
		errorElement: "span",
        errorClass: "help-block",
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 255,
			},
			email: {
				required: true,
				email: true,
			},	
			comment: {
				required: true,
				minlength: 2,
				maxlength: 1000,
			}

		},
		messages: {
			name: {
				required: 'Введите Ваше имя',
				minlength: 'Введите минимум 2 символа',
				maxlength: 'Превышен лимит 255 символов',
			},
			email: {
				required: 'Введите email адрес',
				email: 'Введите правильный email адрес',
			},	
			comment: {
				required: 'Это поле необходимо заполнить',
				minlength: 'Введите минимум 2 символа',
				maxlength: 'Превышен лимит 255 символов',
			}
		}
	});


    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    if (file_api === true) {
        var $input = $("#file-field");
        var formdata_file_key = $input.attr('name');

        var $form = $(".commentform form");
        var upload_link = $form.attr("action");

        var $preview_container = $(".inblock_photo");
        var current_files = {};
        var current_files_q = 0;
        var max_files_q = 5;
        var gcounter = 0;

        var validate_file = function(file) {
            return file.name.search(/^.*\.(?:jpg|jpeg|png)\s*$/ig) == 0 ? true : false;
        };

        var custom_submit = function() {

            var formData = new FormData($form[0]);

            $.each(current_files, function(key, value) {
                if (value !== null) {
                    formData.append(formdata_file_key, value);
                }
            });

            $.ajax({
                url: upload_link,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("uploaded");
                },
                error: function (jqXHR,textStatus,errorThrown) {
                    try {console.log(jqXHR.responseText);} catch (e) {}
                }
            });
        };

        var refresh = function() {
            $input.wrap('<form>').parent('form').trigger('reset');
            $input.unwrap();
        };

        var remove_file = function(index) {
            current_files[index] = null;
        };

        var make_new_file_widget = function(file, index) {
            var $file_container = $("<div>", { class: "inblock_photo_item"});
            var $button_remove = $("<a>", { class: "exit", href: "#"});
            var $img_preview = $("<img>", { src: file.url });

            $button_remove.html('&times;');


            $button_remove.on("click", function(event) {
                event.preventDefault();
                remove_file(index);
                $file_container.remove();
            });

            $file_container.append($img_preview);
            $file_container.append($button_remove);

            $preview_container.append($file_container);
        };

        var process_file = function(file) {
            if (validate_file(file) === true) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var file_object = {
                        url: e.target.result,
                        file: file
                    };
                    gcounter++;
                    current_files[gcounter] = file;
                    make_new_file_widget(file_object, gcounter);
                };

                reader.readAsDataURL(file);
            } else {
                current_files_q--;
            }
        };

        $form.on("submit", function(event) {
            event.preventDefault();
        	if( $(this).valid() ){
	            custom_submit();
	            $('.pag_comment').after($('.commentform'));
        	}
        });

        $input.on("change", function () {
            if ($input[0].files.length>0) {
                for (var i = 0; i < $input[0].files.length; i++) {


                    var files = $input[0].files;
                    var lim = files.length;
                    if ( lim > 0) {
                        for (var i=0;i<lim;i++) {
                            if (current_files_q < max_files_q) {
                                current_files_q++;
                                process_file(files[i]);
                            }
                        }
                    }
                }
                refresh();
            }
        });

    } else {
        alert("file api is not supported!");
    }


});
           