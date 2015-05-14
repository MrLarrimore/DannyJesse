game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // initializes hitboxes and functions.
        this._super(me.Entity, "init", [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        // sets attributes and collisions.
        this.broken = false;
        this.health = game.data.playerBaseHealth;
        this.alwaysUpdate = false;
        this.body.onCollision = this.onCollision.bind(this);
        // sets type to player base.
        this.type = "PlayerBase";
        // sets animations and sets current animation.
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta) {
        if (this.health <= 0) {
            // If health is zero, then win is false and broken/ broken animation is true.
            this.broken = true;
            game.data.win = false;
            this.renderable.setCurrentAnimation("broken");
        }
        // updates finction.
        this.body.update(delta);
        // updates entity, rreutrns true.
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage) {
        // updates health to damage.
        this.health = this.health - damage;
    },
    
    onCollision: function() {

    }
});
