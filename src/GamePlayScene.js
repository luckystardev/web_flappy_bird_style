/**
 * Created by Adonis on 8/23/2014.
 */


var game_selected_char = 0;

var game_character_sprite;
var game_action_updown = true;
var m_yspeed = 0;
var temp_height = 0;
var temp_sack_height = 0;
var gap_height = 240;
var initial_height = 320;
var character_degree = 0;
var building_obstacle = [];
var building_obstacle_cl = [];
var road_sign_board = [];
var golden_sack = [];
var green_sack = [];
var game_state_setEnable = false;
var game_hit_state = false;
var game_slide_sate = 0;
var game_character_rect;
var m_iscore = 0;
var m_isackscore = 0;
var label_Score;
var Label_Sack_Score;
var menu_start;
var replay_menu_btn;
var replay_menu_nl;
var replay_menu_sel;
var menu_btn;
var menu_nl;
var menu_sel;
var GameOverTitle;
var Sack_Coin_Title;
var coin_hit_status = [];

var GamePlayLayer = cc.Layer.extend({
//    space : null,
//    game_character_sprite : null,
//    game_action_updown : true,
//    m_yspeed : 0,
//    temp_height : 0,
//    gap_height : 240,
//    initial_height : 320,
//    character_degree : 0,
//    building_obstacle : [],
//    building_obstacle_cl : [],
//    game_state_setEnable : false,
//    game_hit_state : false,
//    game_slide_sate : 0,
//    game_character_rect : null,
//    m_iscore : 0,
//    label_Score : null,
//    menu_start : null,
//    replay_menu_btn : null,
//    replay_menu_nl : null,
//    replay_menu_sel : null,
//    menu_btn : null,
//    menu_nl : null,
//    menu_sel : null,
//    GameOverTitle : null,


    ctor : function(){
        //1. call super class's ctor function
        this._super();
//        this.init();
    },

    end : function(){
        this.end();
        cc.audioEngine.pauseAllEffects();
    },
    init : function (){
        //call super class's super function
        this._super();
        game_slide_sate = 1;

        game_action_updown = true;
        m_yspeed = 0;
        temp_height = 0;
        gap_height = 240;
        initial_height = 320;
        character_degree = 0;
        game_state_setEnable = false;
        game_hit_state = false;
        m_iscore = 0;
        m_isackscore = 0;

        for(i=0; i < 4; i++){
            coin_hit_status[i] = false;
        }

        //2. get the screen size of your game canvas
        winSize = cc.director.getWinSize();

        winHeightRate=winSize.height/640;
        winWidthRate=winSize.width/960;

        cc.log("winHeightRate  :   "+winHeightRate);
        cc.log("winWidthRate   :   "+winWidthRate);
        cc.log("winHeight      :   "+winSize.height);
        cc.log("winHeight      :   "+winSize.width);
        cc.log("game selected character : " + game_selected_char);
        //3. calculate the center point
        var centerpos = cc.p(winSize.width / 2, 365 * winHeightRate);

        //4. create a background image and set it's position at the center of the screen
        spritebg = cc.Sprite.create(resource.game_background);
        spritebg.setPosition(centerpos);
        spritebg.scaleX=winWidthRate;
        spritebg.scaleY=winHeightRate;

//        spritebg.x=winWidthRate*160;
//        spritebg.y=winHeightRate*240;
        this.addChild(spritebg, 0);

        var animFrames = [];
        var animation = cc.Animation.create();;
        if(game_selected_char == 1){
            game_character_sprite = cc.Sprite.create(resource.game_character_plane_1);
//            game_character_sprite = new Obstacle(this, resource.game_character_plane,this.space, cc.p(350 * winWidthRate, 360 * winHeightRate), 6, 100);

            // init runningAction
            for (var i = 1; i < 3; i++) {
                var str = "res/image/character_plane_" + i + ".png";
                animation.addSpriteFrameWithFile(str);
            }
        }
        if(game_selected_char == 2){
            game_character_sprite = cc.Sprite.create(resource.game_character_helicoptor_1);
//            game_character_sprite = new Obstacle(this, resource.game_character_helicoptor,this.space, cc.p(350 * winWidthRate, 360 * winHeightRate), 6, 100);

            // init runningAction

            for (var i = 1; i < 3; i++) {
                var str = "res/image/character_helicopter_" + i + ".png";
                animation.addSpriteFrameWithFile(str);
            }
        }

        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.Animate.create(animation);

        game_character_sprite.setPosition(cc.p(350 * winWidthRate, 360 * winHeightRate));
        game_character_sprite.scaleX = winWidthRate;
        game_character_sprite.scaleY = winHeightRate;

        this.addChild(game_character_sprite, 6);

        var action_move_up = cc.MoveTo.create(1, cc.p(game_character_sprite.getPosition().x, game_character_sprite.getPosition().y + 40));
        var action_move_down = cc.MoveTo.create(1.3, cc.p(game_character_sprite.getPosition().x, game_character_sprite.getPosition().y - 40));
        var repeat_move_updown = cc.Sequence.create(action_move_up, action_move_down);
        game_character_sprite.runAction(cc.RepeatForever.create(repeat_move_updown));
        game_character_sprite.runAction(cc.RepeatForever.create(action));

        for(i = 0; i < 2; i++){
            bg_ground[i] = cc.Sprite.create(resource.game_ground);
            bg_ground[i].setAnchorPoint(0.5, 0.0);
            bg_ground[i].setPosition(cc.p(480 + (i * 960) * winWidthRate, 0));

            this.addChild(bg_ground[i], 1);

            cc.log("ground sprite width : " + bg_ground[i].getPosition().x);
            cc.log("ground sprite height : " + bg_ground[i].getPosition().y);
        }

        for(i = 0; i < 4; i++){
            road_sign_board[i] = cc.Sprite.create(resource.game_roadsignboard);
            road_sign_board[i].setAnchorPoint(0.5,0.0);
            road_sign_board[i].setPosition(cc.p(480+ (i * 960)*winWidthRate, 100 * winHeightRate));
            this.addChild(road_sign_board[i], 5);
        }


        for(i = 0; i < 4; i ++){
            if(i == 0 || i == 2){
                golden_sack[i] = cc.Sprite.create(resource.game_golden_sack);
            }
            if(i == 1 || i== 3){
                golden_sack[i] = cc.Sprite.create(resource.game_green_sack);
            }

            golden_sack[i].setAnchorPoint(0.5, 0.0);
            temp_sack_height = Math.random() * gap_height + initial_height;
            cc.log("random count" + temp_sack_height);
            if(i==0 && temp_sack_height < 250){
                temp_sack_height = 250;
            }
            golden_sack[i].setPosition(cc.p(1335 + i * 270 * winWidthRate, temp_sack_height * winHeightRate));
            this.addChild(golden_sack[i], 3);
        }


        building_obstacle = [];
        building_obstacle[0] = cc.Sprite.create(resource.game_obstacle_buildingOne);
        building_obstacle[1] = cc.Sprite.create(resource.game_obstacle_buildingTwo);
        building_obstacle[2] = cc.Sprite.create(resource.game_obstacle_buildingThird);
        building_obstacle[3] = cc.Sprite.create(resource.game_obstacle_buildingFour);
        building_obstacle[4] = cc.Sprite.create(resource.game_obstacle_buildingFive);
        building_obstacle[5] = cc.Sprite.create(resource.game_obstacle_flagTable);
        building_obstacle[6] = cc.Sprite.create(resource.game_obstacle_flag);

        for (i = 0; i < 7; i++){
            building_obstacle[i].setAnchorPoint(0.5, 0.0);

            if(i < 4 ){
                building_obstacle[i].setPosition(cc.p(1200 + i * 250 * winWidthRate, 120 * winHeightRate));
            }
            if(i == 4){
                building_obstacle[i].setPosition(cc.p(1200 + (i-1) * 250 * winWidthRate + 100 * winWidthRate, 120 * winHeightRate));
            }
            if(i == 5){
                building_obstacle[i].setPosition(cc.p(building_obstacle[i-1].getPosition().x + 250 * winWidthRate, 120 * winHeightRate));
            }
            if(i == 6){
                building_obstacle[i].setPosition(cc.p(building_obstacle[i-1].getPosition().x + 45 * winWidthRate, 245 * winHeightRate));
            }

            this.addChild(building_obstacle[i], 3);
        }
        building_obstacle_cl = [];
        building_obstacle_cl[0] = cc.Sprite.create(resource.game_obstacle_cloudOne);
        building_obstacle_cl[1] = cc.Sprite.create(resource.game_obstacle_cloudTwo);
        building_obstacle_cl[2] = cc.Sprite.create(resource.game_obstacle_cloudThird);
        building_obstacle_cl[3] = cc.Sprite.create(resource.game_obstacle_cloudFour);
        building_obstacle_cl[4] = cc.Sprite.create(resource.game_obstacle_cloudFive);

        for (i = 0; i < 5; i ++ ){

            building_obstacle_cl[i].setAnchorPoint(0.5, 0.0);

            temp_height = Math.random() * gap_height + initial_height;
            cc.log("random count" + temp_height);
            if(i==0 && temp_height < 400){
                temp_height = 400;
            }
            building_obstacle_cl[i].setPosition(cc.p(1200 + i * 270 * winWidthRate, temp_height * winHeightRate));

            this.addChild(building_obstacle_cl[i], 1);
        }


        Sack_Coin_Title = cc.Sprite.create(resource.game_sack_board);
        Sack_Coin_Title.setAnchorPoint(0.5, 0.0);
        Sack_Coin_Title.setPosition(cc.p(winSize.width * 0.1 * winWidthRate, winSize.height * 0.9 * winHeightRate));
        this.addChild(Sack_Coin_Title, 11);

        Label_Sack_Score = cc.LabelTTF.create("0", "System", 30);
        Label_Sack_Score.setAnchorPoint(0.5, 0.0);
        Label_Sack_Score.setColor(cc.color(245,205,153));//black color
        Label_Sack_Score.x = winWidthRate* winSize.width * 0.15;
        Label_Sack_Score.y = winHeightRate*winSize.height * 0.9;
        this.addChild(Label_Sack_Score,10);

        label_Score = cc.LabelTTF.create("0", "System", 50);
        label_Score.setColor(cc.color(105,77,224));//black color
        label_Score.x = winWidthRate* winSize.width/2;
        label_Score.y = winHeightRate*winSize.height * 0.9;
        this.addChild(label_Score,10);

        // GameOver Layer Menu.
        GameOverTitle = cc.Sprite.create(resource.game_over_title);
        GameOverTitle.setAnchorPoint(0.5, 0.0);
        GameOverTitle.setPosition(cc.p(winSize.width / 2, -300 * winHeightRate));
        this.addChild(GameOverTitle, 11);


        menu_nl = cc.Sprite.create(resource.game_menu_select_nl);
        menu_sel = cc.Sprite.create(resource.game_menu_select_pr);

        menu_btn = cc.MenuItemSprite.create(menu_nl, menu_sel, this.onGotoplay_plane, this);
        menu_btn.setScaleX = winWidthRate;
        menu_btn.setScaleY = winHeightRate;
        menu_btn.setPosition(cc.p(610 * winWidthRate, -450 * winHeightRate));

        replay_menu_nl = cc.Sprite.create(resource.game_replay_nl);
        replay_menu_sel = cc.Sprite.create(resource.game_replay_pr);

        replay_menu_btn = cc.MenuItemSprite.create(replay_menu_nl, replay_menu_sel, this.onGotoplay_helicoptor, this);
        replay_menu_btn.setScaleX = winWidthRate;
        replay_menu_btn.setScaleY = winHeightRate;
        replay_menu_btn.setPosition(350 * winWidthRate, -450 * winHeightRate);

        menu_start = cc.Menu.create(replay_menu_btn, menu_btn);
//        menu_start.alignItemsHorizontallyWithPadding(8);
        this.addChild(menu_start, 11);
        menu_start.x = 0; menu_start.y = 0;

        ///////////////////////

        this.schedule(this.update);


//        this.setTouchEnabled = true;
        this.setMouseEnabled = true;
        m_yspeed = 0;

        if( true || 'touches' in cc.sys.capabilities ) { // touches work on mac but return false
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: function(touches, event) {
                    console.log("onTouchesBegan!");

                    var touch = touches[0];
                    var loc = touch.getLocation();

                    self.touchStartPoint = {
                        x: loc.x,
                        y: loc.y
                    };

                    self.touchLastPoint = {
                        x: loc.x,
                        y: loc.y
                    };
//                    alert("hello");

                    if(game_action_updown){
                        game_character_sprite.stopAllActions();
                        game_action_updown = false;
                    }
//                        game_character_sprite.runaction(cc.MoveTo.create(0.15, cc.p(game_character_sprite.getPosition().x, game_character_sprite.getPosition().y + 30 * winHeightRate)));
                    if(!game_state_setEnable && !game_hit_state){
                        cc.audioEngine.stopAllEffects();
                        cc.audioEngine.playEffect(resource.game_wing_music);
                        game_character_sprite.runAction(action);
                        m_yspeed = 7 * winHeightRate;
                        game_character_sprite.setRotation(- 20);
                        character_degree = - 20;
                    }
                },

                onTouchesMoved: function(touches, event) {
                    var touch = touches[0];
                    var loc = touch.getLocation(),
                        start = self.touchStartPoint;

                    // check for left
//                    if( loc.x < start.x - self.touchThreshold ) {
//                        // if direction changed while swiping left, set new base point
//                        if( loc.x > self.touchLastPoint.x ) {
//                            start = self.touchStartPoint = {
//                                x: loc.x,
//                                y: loc.y
//                            };
//                            self.isSwipeLeft = false;
//                        } else {
//                            self.isSwipeLeft = true;
//                        }
//                    }
//
//                    // check for right
//                    if( loc.x > start.x + self.touchThreshold ) {
//                        // if direction changed while swiping right, set new base point
//                        if( loc.x < self.touchLastPoint.x ) {
//                            self.touchStartPoint = {
//                                x: loc.x,
//                                y: loc.y
//                            };
//                            self.isSwipeRight = false;
//                        } else {
//                            self.isSwipeRight = true;
//                        }
//                    }
//
//                    // check for down
//                    if( loc.y < start.y - self.touchThreshold ) {
//                        // if direction changed while swiping down, set new base point
//                        if( loc.y > self.touchLastPoint.y ) {
//                            self.touchStartPoint = {
//                                x: loc.x,
//                                y: loc.y
//                            };
//                            self.isSwipeDown = false;
//                        } else {
//                            self.isSwipeDown = true;
//                        }
//                    }
//
//                    // check for up
//                    if( loc.y > start.y + self.touchThreshold ) {
//                        // if direction changed while swiping right, set new base point
//                        if( loc.y < self.touchLastPoint.y ) {
//                            self.touchStartPoint = {
//                                x: loc.x,
//                                y: loc.y
//                            };
//                            self.isSwipeUp = false;
//                        } else {
//                            self.isSwipeUp = true;
//                        }
//                    }
//
//                    self.touchLastPoint = {
//                        x: loc.x,
//                        y: loc.y
//                    };
                },

                onTouchesEnded: function(touches, event){
                    console.log("onTouchesEnded!");

                    var touch = touches[0],
                        loc = touch.getLocation()
                    size = self.size;

                    self.touchStartPoint = null;
//
//                    if( !self.isSwipeUp && !self.isSwipeLeft && !self.isSwipeRight && !self.isSwipeDown ) {
//                        if( loc.y > size.height*0.25 && loc.y < size.height*0.75 ) {
//                            (loc.x < size.width*0.50)? self.isTouchLeft = true : self.isTouchRight = true;
//                        } else if( loc.y > size.height*0.75 ) {
//                            self.isTouchUp = true;
//                        } else {
//                            self.isTouchDown = true;
//                        }
//                    }
//
//                    self.isSwipeUp = self.isSwipeLeft = self.isSwipeRight = self.isSwipeDown = false;
//
//                    //location.y = self.size.height;
//                    //event.getCurrentTarget().addNewTileWithCoords(location);
                }
            }), this);
        } else {
            cc.log("TOUCH_ALL_AT_ONCE is not supported");
        }
//        if ('mouse' in cc.sys.capabilities) {
////            //add some event listener
////
//            cc.eventManager.addListener({
//                event: cc.EventListener.MOUSE,
//                onMouseMove: function(event){
//                    var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
//                    // do something...
//                },
//                onMouseUp: function(event){
////                    var str = "Mouse Up detected, Key: " + event.getButton();
//                    // do something...
//                    if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
//                    {
//
//                        if(game_action_updown){
//                            game_character_sprite.stopAllActions();
//                            game_action_updown = false;
//                        }
////                        game_character_sprite.runaction(cc.MoveTo.create(0.15, cc.p(game_character_sprite.getPosition().x, game_character_sprite.getPosition().y + 30 * winHeightRate)));
//                       if(!game_state_setEnable && !game_hit_state){
//                           cc.audioEngine.stopAllEffects();
//                           cc.audioEngine.playEffect(resource.game_wing_music);
//                           game_character_sprite.runAction(action);
//                           m_yspeed = 7 * winHeightRate;
//                           game_character_sprite.setRotation(- 20);
//                           character_degree = - 20;
//                       }
//                    }
//                },
//                onMouseDown: function(event){
//                    var str = "Mouse Down detected, Key: " + event.getButton();
//                    // do something...
//                },
//                onMouseScroll: function(event){
//                    var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
//                    // do something...
//                }
//
//            },this);
//
//        }
        return true;
    },


    onGotoplay_plane : function (psender){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.playEffect(resource.game_click_music, false);
        var scene = cc.Scene.create();
        scene.addChild(MenuScene.create());
        cc.director.runScene(cc.TransitionFade.create(1.2, scene));
    },

    onGotoplay_helicoptor : function(psender){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.playEffect(resource.game_click_music, false);
        var scene = cc.Scene.create();

        scene.addChild(GamePlayScene.create(game_selected_char));
        //cc.director.popScene();
        cc.director.runScene(cc.TransitionFade.create(1.2, scene));
        //cc.director.pushScene(scene);
    },

    gameHitEvent : function(){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.playEffect(resource.game_hit_music, false);
        game_hit_state = true;
        game_slide_sate = 0;
    },

    gameOverMenuMove : function(){
        GameOverTitle.runAction(cc.MoveTo.create(1, cc.p(GameOverTitle.getPosition().x, 350 * winHeightRate)));
        menu_btn.runAction(cc.MoveTo.create(1, cc.p(menu_btn.getPosition().x, 220 * winHeightRate)));
        replay_menu_btn.runAction(cc.MoveTo.create(1, cc.p(replay_menu_btn.getPosition().x, 220 * winHeightRate)));
    },

    update : function(dt){
//        temp_height = Math.random();
//        cc.log("random count" + temp_height);

        game_character_rect = cc.rect(game_character_sprite.getPosition().x - game_character_sprite.getContentSize().width * 0.4 * winWidthRate,
            game_character_sprite.getPosition().y + game_character_sprite.getContentSize().width * 0.1 * winHeightRate,
                game_character_sprite.getContentSize().width * 0.6 * winWidthRate,
                game_character_sprite.getContentSize().height * 0.2 * winHeightRate);

        if(!cc.rectContainsRect(this.getBoundingBox(), game_character_sprite.getBoundingBox())){
            game_state_setEnable = true;
        }else{
            game_state_setEnable = false;
        }


        for(i = 0; i < 2; i++){
            bg_ground[i].setPosition(new cc.Point(bg_ground[i].getPosition().x - 2.5 * winWidthRate * game_slide_sate, bg_ground[i].getPosition().y));

            if(bg_ground[i].getPosition().x < - 480 * winWidthRate){
                bg_ground[i].setPosition(new cc.Point(1440 * winWidthRate, bg_ground[i].getPosition().y));
            }
        }

        for(i = 0; i < 4; i ++){
            road_sign_board[i].setPosition(new cc.Point(road_sign_board[i].getPosition().x - 2.5 * winWidthRate * game_slide_sate, road_sign_board[i].getPosition().y));

            if (road_sign_board[i].getPosition().x < - 480 * winWidthRate){
                road_sign_board[i].setPosition(new cc.Point(3360 * winWidthRate, road_sign_board[i].getPosition().y));
            }
        }

        if(game_action_updown) return;
        for(i = 0; i < 7; i++){
            building_obstacle[i].setPosition(new cc.Point(building_obstacle[i].getPosition().x - 3 * winWidthRate * game_slide_sate, building_obstacle[i].getPosition().y));

            if(building_obstacle[i].getPosition().x < - 100 * winWidthRate){
                building_obstacle[i].setPosition(new cc.Point(1300 * winWidthRate, building_obstacle[i].getPosition().y));
            }

            var obstacle_collision_rt = cc.rect(building_obstacle[i].getPosition().x - building_obstacle[i].getContentSize().width / 2,
                building_obstacle[i].getPosition().y,
                    building_obstacle[i].getContentSize().width * 0.8 * winWidthRate,
                    building_obstacle[i].getContentSize().height * 0.95 * winHeightRate);

            if(cc.rectIntersectsRect(game_character_rect, obstacle_collision_rt) && !game_hit_state){
//                cc.log("building collision : " + i);
                this.gameHitEvent();
            }
        }


        for(i = 0; i < 4; i++){
            golden_sack[i].setPosition(new cc.Point(golden_sack[i].getPosition().x - 3 * winWidthRate * game_slide_sate, golden_sack[i].getPosition().y));

            if(golden_sack[i].getPosition().x < - 100 * winWidthRate){
                temp_sack_height = Math.random() * gap_height + initial_height;
                if(temp_sack_height < 250){
                    temp_sack_height = 250;
                }
                golden_sack[i].setPosition(new cc.Point(1020 * winWidthRate, temp_sack_height * winHeightRate));
                golden_sack[i].setVisible(true);
                coin_hit_status[i] = false;
            }


            var obstacle_collision_rt = cc.rect(golden_sack[i].getPosition().x - golden_sack[i].getContentSize().width / 2,
                golden_sack[i].getPosition().y,
                    golden_sack[i].getContentSize().width * 0.8 * winWidthRate,
                    golden_sack[i].getContentSize().height * 0.95 * winHeightRate);
            if(cc.rectIntersectsRect(game_character_rect, golden_sack[i].getBoundingBox())&&!game_hit_state){
                golden_sack[i].setVisible(false);

                if(!coin_hit_status[i]){
                    coin_hit_status[i] = true;
                    m_isackscore ++;
//                    cc.log("current score : " + m_iscore);
                    Label_Sack_Score.setString(parseInt(m_isackscore));
                }
            }


        }

        for(i = 0 ; i < 5; i ++){
            building_obstacle_cl[i].setPosition(new cc.Point(building_obstacle_cl[i].getPosition().x - 3 * winWidthRate * game_slide_sate, building_obstacle_cl[i].getPosition().y));

            if(building_obstacle_cl[i].getPosition().x < - 100 * winWidthRate){
                temp_height = Math.random() * gap_height + initial_height;
                if(i==0 && temp_height < 400){
                    temp_height = 400;
                }
                building_obstacle_cl[i].setPosition(new cc.Point(1300 * winWidthRate, temp_height * winHeightRate));
            }

            var obstacle_collision_rt = cc.rect(building_obstacle_cl[i].getPosition().x - building_obstacle_cl[i].getContentSize().width * 0.4 * winWidthRate,
                building_obstacle_cl[i].getPosition().y + building_obstacle_cl[i].getContentSize().height * 0.3 * winHeightRate,
                    building_obstacle_cl[i].getContentSize().width * 0.25 * winWidthRate,
                    building_obstacle_cl[i].getContentSize().height * 0.3 * winHeightRate);

            if(cc.rectIntersectsRect(game_character_rect, building_obstacle_cl[i].getBoundingBox())){
//                cc.log("cloud collision : " + i);
                this.gameHitEvent();
            }
        }

        if(!game_hit_state){
            for(i = 0; i < 5; i++){
                if(building_obstacle_cl[i].getPosition().x < 350 * winWidthRate && building_obstacle_cl[i].getPosition().x > 347 * winWidthRate){
                    m_iscore ++;
//                    cc.log("current score : " + m_iscore);
                    label_Score.setString(parseInt(m_iscore));
                }
            }

        }
        game_character_sprite.setPosition(new cc.Point(game_character_sprite.getPosition().x, game_character_sprite.getPosition().y + m_yspeed * winHeightRate));

        if(character_degree < - 10){
            character_degree += 0.4;
            game_character_sprite.setRotation(character_degree);
        }
        if(character_degree > - 10 && character_degree <= 90){
            character_degree += 3.5;
            game_character_sprite.setRotation(character_degree);
        }

        m_yspeed -= 0.4;

        if(cc.rectIntersectsRect(game_character_sprite.getBoundingBox(), bg_ground[0].getBoundingBox()) || cc.rectIntersectsRect(game_character_sprite.getBoundingBox(), bg_ground[1].getBoundingBox())){

            cc.log("rect collision");
            if(!game_hit_state){
                cc.audioEngine.stopAllEffects();
                cc.audioEngine.playEffect(resource.game_hit_ground_music,false);
            }
            game_hit_state = true;
            this.gameOverMenuMove();
            this.unscheduleAllCallbacks();
        }
    }
});

cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
    cc.audioEngine._pausePlaying();
//    cc.audioEngine.stopMusic(resource.game_bg_music);
    cc.audioEngine.stopAllEffects();
    cc.log("the end music");
});
cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
    cc.audioEngine._resumePlaying();
//    cc.audioEngine.playMusic(resource.game_bg_music, true);
});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GamePlayLayer();
        layer.init();
        this.addChild(layer);
    }
});

GamePlayScene.create = function (val) {
//    alert(val);
    game_selected_char = val;
    var sg = new GamePlayScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GamePlayScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = GamePlayScene.create();
    scene.addChild(layer);
    return scene;
};