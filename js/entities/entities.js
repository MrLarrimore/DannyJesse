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
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
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
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    
    setFlags: function() {
        // Keeps track of which direction your character is going.
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

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
        }
        // check if attacking.
        this.attacking = me.input.isKeyPressed("attack");
    },
    
    moveRight: function() {
        //Sets the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
    },
    
    moveLeft: function() {
        //Sets the position of my x by the velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.facing = "left";
        this.flipX(false);
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
    
    jump: function() {
        // make sure we are not already jumping or falling
        if (!this.body.jumping && !this.body.falling) {
            // set current vel to the maximum defined value
            // gravity will then do the rest
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.body.jumping = true;
        }
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
        console.log(this.now + "this.now" + this.lastSpear + "lastSpear" + game.data.spearTimer + "SpearTimer" + game.data.ability3 + "Ability 3");
        if((this.now - this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0) {
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
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
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
        // if attacking, attack enemy creep.
        if (this.checkAttack(xdif, ydif)) {
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
    
    hitCreep: function(response) {
        if (response.b.health <= this.attack) {
            // if kill creep, earn +2 gold.
            game.data.gold += 2;
        }
        // creep lose health.
        response.b.loseHealth(game.data.playerAttack);
    }

});







