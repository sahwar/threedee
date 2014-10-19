(function() {
'use strict';

    var cameraSet = new CameraSet().init();
    var $output;
    var $input;
    var $message;
    
    function shoot() {
        $message.removeClass('off');
        cameraSet.record(2).then(function(images) {
            gifshot.createGIF({
                images: images,
                gifWidth: 960,
                gifHeight: 720
            }, function(obj) {
                displayImage(obj.image);
                saveImage(obj.image);
            });

        });

    }

    function displayImage(image) {
        $message.addClass('off');
        $output.attr('src', image);
        $input.removeClass('on');
        $input.addClass('off');
        $output.removeClass('off');
        $output.addClass('on');
        setTimeout(function() {
            $input.removeClass('off');
            $input.addClass('on');
            $output.removeClass('on');
            $output.addClass('off');
        }, 5000);
    }

    function saveImage(dataUrl) {
        document.location.href = dataUrl.replace('image/gif', 'image/octet-stream');
    }

    function setup() {
        $input = $('#input');
        $output = $('#output');
        $message = $('#message');

        cameraSet.discover().then(cameraSet.setupSlowVideo.bind(cameraSet));

        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
                shoot();
            } else if (e.keyCode == 38) {
                
            }
            
        }, false);
    }

    $(document).ready(setup);

    var $button = $('button');
    $button.on('click', shoot);

})();
