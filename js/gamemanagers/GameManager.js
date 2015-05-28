game.SpendGold = Object.extend({
    init: function(x, y, settings) {
        // initailizes screen and updates.
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
    },
    
    update: function() {
        // update update.
        this.now = new Date().getTime();
        if (me.input.isKeyPressed("buy") && this.now - this.lastBuy >= 1000) {
            // if buy ket is pressed, then begin buy function.
            this.lastBuy = this.now;
            if (!this.buying) {
                this.startBuying();
            } else {
                this.stopBuying();
            }
            
        }
        // checks buy keys.
        this.checkBuyKeys();
        // returns true.
        return true;
    },
    
    startBuying: function() {
        // starts buying.
        this.buying = true;
        // pauses PLAY screen.
        me.state.pause(me.state.PLAY);
        // pauses positions of entities.
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        // grabs gold screen.
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
        // updates buy screen and adds screen into game.
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        game.data.player.body.setVelocity(2, 2);
        me.game.world.addChild(game.data.buyscreen, 34);
        // sets keys and text.
        this.setKeys();
        this.setBuyText();
    },
    
    setKeys: function() {
        // sets keys for screen.
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
    },
    
    setBuyText: function() {
        game.data.buytext = new (me.Renderable.extend({
            // initializes pause text and font.
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font('Times New Roman', 26, 'white');
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            // draws out and displays data below.
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Press F1-F6 to SELECT, and B to EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Skill 1: Increase Health. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1 +1) *10), this.pos.x + 40, this.pos.y + 40);
                this.font.draw(renderer.getContext(), "Skill 2: More Speed. Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2 +1) *10), this.pos.x + 40, this.pos.y + 70);
                this.font.draw(renderer.getContext(), "Skill 3: Increase Damage. Current Level:  " + game.data.skill3 + " Cost: " + ((game.data.skill3 +1) *10), this.pos.x + 40, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "S Ability: Short Sprint! Current Level: " + game.data.abiltiy1 + " Cost: " + ((game.data.abiltiy1 +1) *10), this.pos.x + 40, this.pos.y + 130);
                this.font.draw(renderer.getContext(), "D Ability: Carnivore Bite! Current Level: " + game.data.ability2 + " Cost: " + ((game.data.ability2 +1) *10), this.pos.x + 40, this.pos.y + 160);
                this.font.draw(renderer.getContext(), "F Ability: Spear Toss! Current Level: " + game.data.ability3 + " Cost: " + ((game.data.ability3 +1) *10), this.pos.x + 40, this.pos.y + 190);

            }
        }));
        // adds text into game.
        me.game.world.addChild(game.data.buytext, 35);
    },
    
    stopBuying: function() {
        // stops buying, resumes PLAY screen.
        this.buying = false;
        me.state.resume(me.state.PLAY);
        // resomes player velocity, removes screen, keys, and text.
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        this.unsetKeys();
        me.game.world.removeChild(game.data.buytext);
    },
    
    unsetKeys: function() {
        // unsets F1-F6 keys.
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
    },
    
    checkBuyKeys: function() {
        if(me.input.isKeyPressed("F1")) {
            // if F1 is pressed, then checks cost and purchases.
            if(this.checkCost(1)) {
                this.makePurchase(1);
            }
        }else if(me.input.isKeyPressed("F2")) {
            // if F2 is pressed, then checks cost and purchases.
            if(this.checkCost(2)) {
                this.makePurchase(2);
            }
        }else if(me.input.isKeyPressed("F3")) {
            // if F3 is pressed, then checks cost and purchases.
            if(this.checkCost(3)) {
                this.makePurchase(3);
            }
        }else if(me.input.isKeyPressed("F4")) {
            // if F4 is pressed, then checks cost and purchases.
            if(this.checkCost(4)) {
                this.makePurchase(4);
            }
        }else if(me.input.isKeyPressed("F5")) {
            // if F5 is pressed, then checks cost and purchases.
            if(this.checkCost(5)) {
                this.makePurchase(5);
            }
        }else if(me.input.isKeyPressed("F6")) {
            // if F6 is pressed, then checks cost and purchases.
            if(this.checkCost(6)) {
                this.makePurchase(6);
            }
        }
    },
    
    checkCost: function(skill) {
        if(skill===1 && (game.data.gold >= ((game.data.skill1 +1) *10))) {
            // If skill is chosen, update level and cost.
            return true;
        }else if(skill===2 && (game.data.gold >= ((game.data.skill2 +1) *10))) {
            // If skill is chosen, update level and cost.
            return true;
        }else if(skill===3 && (game.data.gold >= ((game.data.skill3 +1) *10))) {
            // If skill is chosen, update level and cost.
            return true;
        }else if(skill===4 && (game.data.gold >= ((game.data.ability1 +1) *10))) {
            // If skill is chosen, update level and cost.
            return true;
        }else if(skill===5 && (game.data.gold >= ((game.data.ability2 +1) *10))) {
            // If skill is chosen, update level and cost.
            return true;
        }else if(skill===6 && (game.data.gold >= ((game.data.ability3 +1) *10))) {
            // If skill is chosen, update level and cost.
            return true;
        }else{
            // return false.
            return false;
        }
    },
    
    makePurchase: function(skill) {
        if (skill === 1) {
            // If skill chosen, update skill, ability of skill, and cost.
            game.data.gold -= ((game.data.skill1 + 1) * 10);
            game.data.skill1 += 1;
            game.data.playerAttack += 1;
        }else if(skill === 2) {
            // If skill chosen, update skill, ability of skill, and cost.
            game.data.gold -= ((game.data.skill2 + 1) * 10);
            game.data.skill2 += 1;
        }else if(skill === 3) {
            // If skill chosen, update skill, ability of skill, and cost.
            game.data.gold -= ((game.data.skill3 + 1) * 10);
            game.data.skill3 += 1;
        }else if(skill === 4) {
            // If skill chosen, update skill, ability of skill, and cost.
            game.data.gold -= ((game.data.ability1 + 1) * 10);
            game.data.ability1 += 1;
        }else if(skill === 5) {
            // If skill chosen, update skill, ability of skill, and cost.
            game.data.gold -= ((game.data.ability2 + 1) * 10);
            game.data.ability2 += 1;
        }else if(skill === 6) {
            // If skill chosen, update skill, ability of skill, and cost.
            game.data.gold -= ((game.data.ability3 + 1) * 10);
            game.data.ability3 += 1;
        }else{
            // returns false.
            return false;
        }
    }
});

