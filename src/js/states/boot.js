function BootState() {
};

BootState.prototype = {

    // Load the preloader resources
    preload: function () {

        // To be able to download the Publisher logo as a WebGL texture
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
            this.game.load.crossOrigin = "true";
        else
            this.game.load.crossOrigin = "anonymous";

        // To set the background image for the game page
        //document.body.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url('background.png')";

        // Load game resources (sounds/textures)

        // ...
    },

    // The preloader resources are loaded, setup the game view and proceed to the next state: Preloader
    create: function () {

        // Set the background color of the game view
        this.game.canvas.style.backgroundColor = "#000000";

        // Prevent Safari from scrolling on touch
        window.addEventListener('scroll', function () {

            if (document.activeElement === document.body && window.scrollY > 0) {
                document.body.scrollTop = 0;
            }
        }, true);

        // Prevent every browser from scrolling
        document.ontouchmove = function (e) {
            e.preventDefault()
        };
        this.game.input.touch.consumeDocumentTouches();

        // Prevent the right click context
        this.game.canvas.oncontextmenu = function (event) {
            event.preventDefault();
        };

        // Disable multi-touch
        this.input.maxPointers = 1;

        // Stop the game when switched to another tab
        this.game.stage.disableVisibilityChange = false;

        // No bounds for camera
        this.game.world.setBounds(Math.NEGATIVE_INFINITY, Math.NEGATIVE_INFINITY, Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY);

        // Stretch the game to cover the full web page without changing the aspect ratio
        if (this.game.device.desktop)
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        // Place the game view in the center of the page
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        // Remove the browser search bar
        window.scrollTo(0, 1);

        this.game.state.add('Preloader', PreloaderState);
        this.game.state.start('Preloader', true);
    },
};