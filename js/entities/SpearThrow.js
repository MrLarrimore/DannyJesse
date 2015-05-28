game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing) {
        // initailizes function and hitboxes.
        this._super(me.Entity, "init", [x, y, {
                image: "spear",
                width: 25,
                height: 24,
                spritewidth: "25",
                spriteheight: "24",
                getShape: function() {
                    return (new me.Rect(0, 0, 25, 24)).toPolygon();
                }
            }]);
        // sets updates, abilities, and velocities.
        this.alwaysUpdate = true;
        this.body.setVelocity(8, 0);
        this.attack = game.data.ability3*3;
        this.type = "spear";
        this.facing = facing;
    },
    
    update: function(delta) {
        // If facing left, then exceed left. If right, then exceed right.
        if(this.facing === "left") {
            this.body.vel.x -= this.body.accel.x = me.timer.tick;
        }else{
            this.body.vel.x += this.body.accel.x = me.timer.tick;

        }
        // check for collisions.
        me.collision.check(this, true, this.collideHandeler.bind(this), true);
        // updates function.
        this.body.update(delta);
        // updates entity function.
        this._super(me.Entity, "update", [delta]);
        // returns true.
        return true;
    },
    
    collideHandeler: function(response){
        if (response.b.type === "EnemyBase" || response.b.type === "EnemyCreep"){
            // If collision with enemy base or creep, remove health.
            response.b.loseHealth(this.attack);
            
        }
    }
});


