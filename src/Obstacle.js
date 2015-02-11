/**
 * Created by Adonis on 8/25/2014.
 */
var Obstacle = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    _mapIndex:0,// which map belongs to
    get mapIndex() {
        return this._mapIndex;
    },
    set mapIndex(index) {
        this._mapIndex = index;
    },

    /** Constructor
     * @param {cc.SpriteBatchNode *}
     * @param {cp.Space *}
     * @param {cc.p}
     */
    ctor:function (spriteSheet,object_res, space, pos, sprite_layer, sprite_collision_tag) {
        this.space = space;

        // init coin animation
//        var animFrames = [];
//        for (var i = 0; i < 8; i++) {
//            var str = "coin" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFrames.push(frame);
//        }
//
//        var animation = cc.Animation.create(animFrames, 0.2);
//        var action = cc.RepeatForever.create(cc.Animate.create(animation));

        this.sprite = cc.PhysicsSprite.create(object_res);

        // init physics
        var radius = 0.95 * this.sprite.getContentSize().width / 2;
        var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);

        this.shape = new cp.CircleShape(body, radius, cp.vzero);
        this.shape.setCollisionType(sprite_collision_tag);
        //Sensors only call collision callbacks, and never generate real collisions
        this.shape.setSensor(true);

        this.space.addStaticShape(this.shape);

        // add sprite to sprite sheet
//        this.sprite.runAction(action);
        spriteSheet.addChild(this.sprite, sprite_layer);
    },

    removeFromParent:function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },

    getShape:function () {
        return this.shape;
    }
});