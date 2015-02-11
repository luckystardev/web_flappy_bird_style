/**
 * Created by Adonis on 8/22/2014.
 */

var bg_ground = [];
var winSize;
var setSoundSetFlag = false;
var setSoundDis_Btn;
var setSoundEna_Btn;


var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
//        this.init();
    },
    init:function (){
        //call super class's super function
        this._super();


        // background music.
        cc.audioEngine.playMusic(resource.game_bg_music, true);




        //2. get the screen size of your game canvas
        winSize = cc.director.getWinSize();

        winHeightRate=winSize.height/640;
        winWidthRate=winSize.width/960;

        cc.log("winHeightRate  :   "+winHeightRate);
        cc.log("winWidthRate   :   "+winWidthRate);
        cc.log("winHeight      :   "+winSize.height);
        cc.log("winHeight      :   "+winSize.width);

        //3. calculate the center point
        var centerpos = cc.p(winSize.width / 2, 365 * winHeightRate);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = cc.Sprite.create(resource.game_background);
        spritebg.setPosition(centerpos);
        spritebg.scaleX=winWidthRate;
        spritebg.scaleY=winHeightRate;

//        spritebg.x=winWidthRate*160;
//        spritebg.y=winHeightRate*240;
        this.addChild(spritebg, 0);

        var music_setEna_nl = cc.Sprite.create(resource.game_setSoundEna_nl);
        var music_setEna_sel = cc.Sprite.create(resource.game_setSoundEna_st);

        setSoundEna_Btn = cc.MenuItemSprite.create(music_setEna_nl, music_setEna_sel, this.onSetSoundEnableFunc, this);
        setSoundEna_Btn.setScaleX = winWidthRate;
        setSoundEna_Btn.setScaleY = winHeightRate;
        setSoundEna_Btn.setPosition(cc.p(850 * winWidthRate, 50 * winHeightRate));
       if(setSoundSetFlag){
           setSoundEna_Btn.setVisible(false);
       }

        var music_setDis_nl = cc.Sprite.create(resource.game_setSoundDis_nl);
        var music_setDis_sel = cc.Sprite.create(resource.game_setSoundDis_st);

        setSoundDis_Btn = cc.MenuItemSprite.create(music_setDis_nl, music_setDis_sel, this.onSetSoundDisbleFunc, this);
        setSoundDis_Btn.setScaleX = winWidthRate;
        setSoundDis_Btn.setScaleY = winHeightRate;
        setSoundDis_Btn.setPosition(cc.p(850 * winWidthRate, 50 * winHeightRate));
        if(!setSoundSetFlag){
            setSoundDis_Btn.setVisible(false);
        }

        var plane_menu_nl = cc.Sprite.create(resource.game_plane);
        var plane_menu_sel = cc.Sprite.create(resource.game_plane_sel);

        var plane_menu_btn = cc.MenuItemSprite.create(plane_menu_nl, plane_menu_sel, this.onGotoplay_plane, this);
        plane_menu_btn.setScaleX = winWidthRate;
        plane_menu_btn.setScaleY = winHeightRate;
        plane_menu_btn.setPosition(cc.p(600 * winWidthRate, 300 * winHeightRate));

        var helicoptor_menu_nl = cc.Sprite.create(resource.game_helicoptor);
        var helicoptor_menu_sel = cc.Sprite.create(resource.game_helicoptor_sel);

        var helicoptor_menu_btn = cc.MenuItemSprite.create(helicoptor_menu_nl, helicoptor_menu_sel, this.onGotoplay_helicoptor, this);
        helicoptor_menu_btn.setScaleX = winWidthRate;
        helicoptor_menu_btn.setScaleY = winHeightRate;
        helicoptor_menu_btn.setPosition(300 * winWidthRate, 250);

        var menu_start = cc.Menu.create(plane_menu_btn, helicoptor_menu_btn, setSoundEna_Btn, setSoundDis_Btn);
//        menu_start.alignItemsHorizontallyWithPadding(8);
        this.addChild(menu_start, 2);
        menu_start.x = 0; menu_start.y = 0;


        var game_title = cc.Sprite.create(resource.game_title);
        game_title.setPosition(cc.p(480 * winWidthRate, 500 * winHeightRate));
        game_title.setScaleX = winWidthRate;
        game_title.setScaleY = winHeightRate;
        this.addChild(game_title, 2);

        var action_move_up = cc.MoveTo.create(0.5, cc.p(game_title.getPosition().x - 20, game_title.getPosition().y));
        var action_move_down = cc.MoveTo.create(0.5, cc.p(game_title.getPosition().x + 20, game_title.getPosition().y));
        var repeat_move_updown = cc.Sequence.create(action_move_up, action_move_down);
        game_title.runAction(cc.RepeatForever.create(repeat_move_updown));


        for(i = 0; i < 2; i++){
            bg_ground[i] = cc.Sprite.create(resource.game_ground);
            bg_ground[i].setAnchorPoint(0.5, 0.0);
            bg_ground[i].setPosition(cc.p(480 + (i * 960) * winWidthRate, 0));

            this.addChild(bg_ground[i], 1);

            cc.log("ground sprite width : " + bg_ground[i].getPosition().x);
            cc.log("ground sprite height : " + bg_ground[i].getPosition().y);
        }

        this.schedule(this.update);
        return true;
    },

    update : function(dt){
        for(i = 0; i < 2; i++){
            bg_ground[i].setPosition(new cc.Point(bg_ground[i].getPosition().x - 2.5 * winWidthRate, bg_ground[i].getPosition().y));

            if(bg_ground[i].getPosition().x < - 480 * winWidthRate){
                bg_ground[i].setPosition(new cc.Point(1440 * winWidthRate, bg_ground[i].getPosition().y));
            }
        }
    },


    onSetSoundEnableFunc : function (psender){
       setSoundSetFlag = true;
        cc.audioEngine.setEffectsVolume(0);
        cc.audioEngine.setMusicVolume(0);
        psender.setVisible(false);
//        var sp_menu = this.getTag(101);
//        sp_menu.setVisible(true);
        setSoundDis_Btn.setVisible(true);
    },
    onSetSoundDisbleFunc : function (psender){
        setSoundSetFlag = false;
        cc.audioEngine.setEffectsVolume(1);
        cc.audioEngine.setMusicVolume(1);
        psender.setVisible(false);

        setSoundEna_Btn.setVisible(true);
    },
    onGotoplay_plane : function (psender){
        cc.log("seleceted character one");
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.playEffect(resource.game_click_music, false);
        this.unschedule(this.update);
//        game_selected_char = 1;
        var scene = cc.Scene.create();
        scene.addChild(GamePlayScene.create(1));
        cc.director.runScene(cc.TransitionFade.create(1.2, scene));
    },

    onGotoplay_helicoptor : function(psender){
        this.unschedule(this.update);
        cc.log("selected character two");
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.playEffect(resource.game_click_music, false);
//        game_selected_char = 2;
        var scene = cc.Scene.create();
        scene.addChild(GamePlayScene.create(2));
        cc.director.runScene(cc.TransitionFade.create(1.2, scene));
    }
});


//MenuScene.scene = function () {
//    var scene = new cc.Scene();
//    var layer = new MenuScene();
//    scene.addChild(layer);
//    return scene;
//};

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});

MenuScene.create = function () {
    var sg = new MenuScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MenuScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = MenuScene.create();
    scene.addChild(layer);
    return scene;
};