cc.game.onStart = function(){
    cc.log("canvas Size : "+ window.screen.width);
    cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    cc.view.adjustViewPort(true);

    //load resources
    cc.LoaderScene.preload(g_resource, function () {
        cc.director.runScene(new MenuScene());
    }, this);
};
cc.game.run();