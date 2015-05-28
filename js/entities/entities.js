game.PlayerEntity = me.Entity.extend({    
    init: function(x, y, settings) {
        // initializes shape and hit boxes of player.
        this.setSuper(x, y);
        // sets update and functions.
        this.setPlayerTimers();
        //sets atributes give nto player(movement, health, attack).
        this.setAttributes();
        // sets type to player entity.
        this.type = "PlayerEntity";
        // sets faces and attacks.
        this.setFlags();
        // allows screen to follow player.
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //  sets animations to player.
        this.addAnimation();
        // sets current animations to idle.
        this.renderable.setCurrentAnimation("idle");
    },
    
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 25,
                height: 24,
                spritewidth: "25",
                spriteheight: "24",
                getShape: function() {
                    return(new me.Rect(0, 0, 25, 24)).toPolygon();
                }
            }]);
    },
    
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime();
    },
    
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed,  10);
        this.attack = game.data.playerAttack;
        this.body.gravity = 0;
    },
    
    setFlags: function() {
        // Keeps track of which direction your character is going.
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    
    addAnimation: function() {
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("walk", [38, 39], 80);
        this.renderable.addAnimation("walkup", [61, 62], 80);
        this.renderable.addAnimation("walkdown", [61, 62], 80);      
        this.renderable.addAnimation("attack", [23, 24, 25, 26, 27, 28], 80);
        this.renderable.addAnimation("attackup", [1, 2, 3, 4, 5, 6, 7, 8], 80);
        this.renderable.addAnimation("attackdown", [61, 62], 80);
        this.renderable.addAnimation("death", [404, 405, 406, 407], 80);

    },
    
    update: function(delta) {
        // resets update.
        this.now = new Date().getTime();
        // check if player's health is below zero.
        this.dead = this.checkIfDead();
        // check for key pressings and movement.
        this.checkKeyPressesAndMoves();
        // check ability and keys.
        this.checkAbilityKeys();
        // sets animations and modes for player.
        this.setAnimation();
        // check for any collisions with other entities.
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        // update entity. return true.
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    checkIfDead: function() {
        if (this.health <= 0) {
        this.renderable.setCurrentAnimation("death");
            return true;
        }
        return false;
    },
    
    checkKeyPressesAndMoves: function() {
        if (me.input.isKeyPressed("right")) {
            // check for right movement.
            this.moveRight();
 
        } else if (me.input.isKeyPressed("left")) {
            // check for left movement.
            this.moveLeft();
        } else if (me.input.isKeyPressed("up")) {
            // check for up movement.
            this.moveUp();
                        

        } else if (me.input.isKeyPressed("down")) {
            // check for down movement.
            this.moveDown();
        } else {
            // if no movement, no velocity.
            this.body.vel.x = 0;
            this.body.vel.y = 0;
        }
        // check if attacking.
        this.attacking = me.input.isKeyPressed("attack");
        this.attacking = me.input.isKeyPressed("attackup");
        this.attacking = me.input.isKeyPressed("attackdown");

    },
    
    moveRight: function() {
        //Sets the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(false);
    },
    
    moveLeft: function() {
        //Sets the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.facing = "left";
        this.flipX(true);
    },
    
    moveUp: function() {
        //Sets the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
        this.facing = "up";
        this.flipY(false);
    },
    
    moveDown: function() {
        //Sets the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.y += this.body.accel.y * me.timer.tick;
        this.facing = "down";
        this.flipY(false);
    },
    
    checkAbilityKeys: function() {
        if (me.input.isKeyPressed("skill1")) {
            //this.speedBurst();
        } else if (me.input.isKeyPressed("skill2")) {
            //this.eatCreep();
        } else if (me.input.isKeyPressed("skill3")) {
            this.throwSpear();
        }
    },
    
    throwSpear: function() {
        console.log(this.now + "this.now" + this.lastSpear + "lastSpear" + game.data.spearTimer + "SpearTimer" + game.data.ability3 + "skill3");
        if((this.now - this.lastSpear) >= game.data.spearTimer*1000 && game.data.skill3 > 0) {
            // creates Spear entity and updates spear.
            this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }
    },
    
    loseHealth: function(damage) {
        // updates health to any damage.
        this.health = this.health - damage;

    },
    
    setAnimation: function() {
        if (this.attacking) {
            // Sets the current animation to attack and ocne done,
            // sets it back to idle.
            if (!this.renderable.isCurrentAnimation("attack")) {
                this.renderable.setCurrentAnimation("attack", "idle");
                // Makes sure that the nexxt time that we use this animation, 
                // that we save the animation even if we swit
                this.renderable.setAnimationFrame();
            }

        } else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");

            }
        }else if (this.body.vel.y !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walkup")) {
                this.renderable.setCurrentAnimation("walkup");
        
        }else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    }
    },
    
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            // checks for collision with enemy bases.
            this.collideWithEnemyBase(response);
        } else if (response.b.type === "EnemyCreep") {
            // checks for collision with enemy creeps.
            this.collideWithEnemyCreep(response);
        }

    },
    
    collideWithEnemyBase: function(response) {
        // checks x + y positions.
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        // creates smaller hitbox and roof for enemy base.
        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
        } else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
        } else if (xdif < 70 && this.facing === 'left' && (xdif > 0)) {
            this.body.vel.x = 0;
        }
        
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            console.log("PlayerAttack: ", game.data.playerAttack);
            // If player is attacking, then damage to enemy base.
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);

        }
    },
    
    collideWithEnemyCreep: function(response) {
        // checks x + y positions.
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;
        // stops movement of player.
        this.stopMovement(xdif);
        this.stopMovement2(ydif);
        // if attacking, attack enemy creep.
        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
        };
         if (this.checkAttack2(xdif, ydif)) {
            this.hitCreep(response);
        };
        
    },
    
    stopMovement: function(xdif) {
        if (xdif > 0) {
            if (this.facing === "left") {
                // if attacking and facing left, stop player.
                this.body.vel.x = 0;
            }
        } else {
            if (this.facing === "right") {
                // if attacking and facing right, stop player.
                this.body.vel.x = 0;
            }
        }
    },
    
    stopMovement2: function(ydif) {
        if (ydif > 0) {
            if (this.facing === "up") {
                // if attacking and facing up, stop player.
                this.body.vel.y = 0;
            }
        } else {
            if (this.facing === "down") {
                // if attacking and facing down, stop player.
                this.body.vel.y = 0;
            }
        }
    },
    
    checkAttack: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))) {
            // if attacking, and attack timer true, and facing creep, then update hits.
            this.lastHit = this.now;
            // return true.
            return true;
        }
        // If not, return false.
        return false;
    },
    
    checkAttack2: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack2") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((ydif > 0) && this.facing === "up") || ((ydif < 0) && this.facing === "down"))) {
            // if attacking, and attack timer true, and facing creep, then update hits.
            this.lastHit = this.now;
            // return true.
            return true;
        }
        // If not, return false.
        return false;
    },
    
    hitCreep: function(response) {
        if (response.b.health <= this.attack) {
            // if kill creep, earn +2 gold.
            game.data.gold += 2;
        }
        // creep lose health.
        response.b.loseHealth(game.data.playerAttack);
    }

});







