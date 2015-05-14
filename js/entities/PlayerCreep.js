game.PlayerCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                // initializes creep hitboxes.
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                // gives shape to creep.
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);
        this.health = game.data.PlayerCreepAttack;
        // this.attacking lets us know if the enemy is attacking;
        this.attacking = false;
        // this.lastAttacking keeps track of when our creep attacks anything.
        this.lastAttacking = new Date().getTime();
        // this.lastHit keeps tracck of the last time our creep hit anything.
        this.lastHit = new Date().getTime();
        this.alwaysUpdate = true;
        this.now = new Date().getTime();
        // sets velocity of creep.
        this.body.setVelocity(game.data.creepMoveSpeed, 20);
        // sets type to player creep.
        this.type = "PlayerCreep";
        // sets animation to walk.
        this.renderable.addAnimation("walk", [6, 7, 8], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    
    loseHealth: function(damage) {
        // update health in case of damage.
        this.health = this.health - damage;
    },
    
    update: function(delta) {
        if(this.health <= 0) {
            // If player creep's health is less than 0, than remove child.
            me.game.world.removeChild(this);
        }
            // refreshes update function.
        this.now = new Date().getTime();
            // makes player creep move left on the screen.
        this.body.vel.x += this.body.accel.x = me.timer.tick;
            // checks for collisions.
        me.collision.check(this, true, this.collideHandeler.bind(this), true);
            // update function.
        this.body.update(delta);
            // updates entity.
        this._super(me.Entity, "update", [delta]);
            // returns true.
        return true;
    },
    collideHandeler: function(response) {
        // checks for enemy base collisions.
        if (response.b.type === "EnemyBase") {
            this.attacking = true;
            this.lastAttacking = this.now;
            // Makes sure that the creep is moving to the right to maintain it's position.
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            // Checkes to see that it's been one second after it's attacked.
            if ((this.now - this.lastHit >= game.data.creepAttackTimer)) {
                // Updates the lasthit timer.
                this.lastHit = this.now;
                // Makes the player base call the loseHealth function and passes it 
                // as a damage of one.
                response.b.loseHealth(game.data.PlayerCreepAttack);
            }
        // checks for enemy creep collisions.
        } else if (response.b.type === "EnemyCreep") {
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking = true;
            //this.lastAttacking = this.now;
            if(xdif>0) {
            // Makes sure that the creep is moving to the right to maintain it's position.
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
        }
            // Checkes to see that it's been one second after it's attacking something.
            if ((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif >0) {
                // Updates the lasthit timer.
                this.lastHit = this.now;
                // Makes the player call the loseHealth function and passes it 
                // as a damage of one.
                response.b.loseHealth(game.data.PlayerCreepAttack);
            }
        }    
    }    
});