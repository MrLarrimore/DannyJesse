//game.EnemyCreep = me.Entity.extend({
//    init: function(x, y, settings) {
//        this._super(me.Entity, "init", [x, y, {
//                // initializes hit box of creep.
//                image: "creep1",
//                width: 25,
//                height: 24,
//                spritewidth: "25",
//                spriteheight: "24",
//                getShape: function() {
//                    // gives creep shape.
//                    return (new me.Rect(0, 0, 25, 24)).toPolygon();
//                }
//            }]);
//        this.health = game.data.enemyCreepHealth;
//        // this.attacking lets us know if the enemy is attacking;
//        this.attacking = false;
//        // this.lastAttacking keeps track of when our creep attacks anything.
//        this.lastAttacking = new Date().getTime();
//        // this.lastHit keeps tracck of the last time our creep hit anything.
//        this.lastHit = new Date().getTime();
//        this.alwaysUpdate = true;
//        this.now = new Date().getTime();
//        //sets creep velocity.
//        this.body.setVelocity(game.data.creepMoveSpeed, 20);
//        // makes the type enemy creep.
//        this.type = "EnemyCreep";
//        // sets animation for creep.
//        this.renderable.addAnimation("walk", [68, 69], 80);
//        this.renderable.setCurrentAnimation("walk");
//    },
//    
//    loseHealth: function(damage) {
//        // update health in case of damage.
//        this.health = this.health - damage;
//    },
//    
//    update: function(delta) {        
//        if(this.health <= 0) {
//            // if health below\equal to zero, remove child.
//            me.game.world.removeChild(this);            
//        }
//        // resets update.
//        this.now = new Date().getTime();
//        // makes creep entity move left.
//        this.body.vel.x -= this.body.accel.x = me.timer.tick;
//        // checks for any collisions.
//        me.collision.check(this, true, this.collideHandeler.bind(this), true);
//        // update update function.
//        this.body.update(delta);
//        // updates entity.
//        this._super(me.Entity, "update", [delta]);
//        // returns true.
//        return true;
//    },
//    
//    collideHandeler: function(response) {
//        if (response.b.type === "PlayerBase") {
//            this.attacking = true;
//            this.lastAttacking = this.now;
//            // Makes sure that the creep is moving to the right to maintain it's position.
//            this.body.vel.x = 0;
//            this.pos.x = this.pos.x + 1;
//            // Checkes to see that it's been one second after it's attacked.
//            if ((this.now - this.lastHit >= game.data.creepAttackTimer)) {
//                // Updates the lasthit timer.
//                this.lastHit = this.now;
//                // Makes the player base call the loseHealth function and passes it 
//                // as a damage of one.
//                response.b.loseHealth(game.data.enemyCreepAttack);
//            }
//        } else if (response.b.type === "PlayerEntity") {
//            var xdif = this.pos.x - response.b.pos.x;
//            
//            this.attacking = true;
//            //this.lastAttacking = this.now;
//            if(xdif>0) {
//            // Makes sure that the creep is moving to the right to maintain it's position.
//            this.body.vel.x = 0;
//            this.pos.x = this.pos.x + 1;
//        }
//            // Checkes to see that it's been one second after it's attacking something.
//            if ((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif >0) {
//                // Updates the lasthit timer.
//                this.lastHit = this.now;
//                // Makes the player call the loseHealth function and passes it 
//                // as a damage of one.
//                response.b.loseHealth(game.data.enemyCreepAttack);
//            }
//        }
//    }
//});