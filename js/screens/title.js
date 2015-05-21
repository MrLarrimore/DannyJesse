game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
        
	onResetEvent: function() {	
            // resets screen to title-screen.
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10);
            // initailizes text and font for option 1.
                game.data.option1 = new (me.Renderable.extend({
                    init: function() {
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                        this.font = new me.Font('Times New Roman', 54, 'black');
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    // draws the following text.
                    draw: function(renderer) {
                        this.font.draw(renderer.getContext(), "Start a NEW GAME", this.pos.x, this.pos.y);
                        
                    },
                    // returns updates as true.
                    update: function(dt) {
                        return true;
                    },
                    // if new game is pressed, then change screen NEW.
                    newGame: function() {
                        me.input.releasePointerEvent('pointerdown', this);
                        me.input.releasePointerEvent('pointerdown', game.data.option1);
                        me.state.change(me.state.NEW);
                    }
                }));
                // adds option 1 onto screen.
                me.game.world.addChild(game.data.option1);
        // initializes text and font for option 2.
                game.data.option2 = new (me.Renderable.extend({
                    init: function() {
                        this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                        this.font = new me.Font('Times New Roman', 46, 'black');
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    // draws the following text.
                    draw: function(renderer) {
                        this.font.draw(renderer.getContext(), "Spend Exp", this.pos.x, this.pos.y);
                        
                    },
                    // returns updates as true.
                    update: function(dt) {
                        return true;
                    },
                    // if new game is pressed, then change screen NEW.
                    newGame: function() {
                        me.input.releasePointerEvent('pointerdown', this);
                        me.input.releasePointerEvent('pointerdown', game.data.option2);
                        me.state.change(me.state.LOAD);
                    }
                }));
                // adds option 2 onto screen.
                me.game.world.addChild(game.data.option2);

                game.data.option3 = new (me.Renderable.extend({
                    init: function() {
                        this._super(me.Renderable, 'init', [390, 440, 250, 50]);
                        this.font = new me.Font('Times New Roman', 46, 'black');
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    // draws the following text.
                    draw: function(renderer) {
                        this.font.draw(renderer.getContext(), "Controls", this.pos.x, this.pos.y);
                        
                    },
                    // returns updates as true.
                    update: function(dt) {
                        return true;
                    },
                    // if new game is pressed, then change screen NEW.
                    newGame: function() {
                        me.input.releasePointerEvent('pointerdown', this);
                        me.input.releasePointerEvent('pointerdown', game.data.option3);
                        me.state.change(me.state.LOAD);
                    }
                }));
                // adds option 2 onto screen.
                me.game.world.addChild(game.data.option3);
        },
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
