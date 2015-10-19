window.onload = function () {
    var defaultRenderingMode = Phaser.Device.isAndroidStockBrowser() ? Phaser.CANVAS : Phaser.AUTO;
    new Phaser.Game(640, 960, Phaser.AUTO, null, BootState);

    GLOBAL = {};
};