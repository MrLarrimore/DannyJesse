game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
        
	onResetEvent: function() {	
            // on reset, change screen to new-screen.
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("new-screen")), -10);
                // input and register set to visible.
                document.getElementById("input").style.visibility = "visible";
                document.getElementById("register").style.visibility = "visible";
                // unbinds ability keys below.
                me.input.unbindKey(me.input.KEY.A);
                me.input.unbindKey(me.input.KEY.S);
                me.input.unbindKey(me.input.KEY.D);
                me.input.unbindKey(me.input.KEY.F);
                me.input.unbindKey(me.input.KEY.B);
                // adds font and text to new screen.
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function() {
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        this.font = new me.Font('Times New Roman', 26, 'black');
                    },
                    
                    draw: function(renderer) {
                        // draws text below.
                        this.font.draw(renderer.getContext(), "Pick A USERNAME And PASSWORD.", this.pos.x, this.pos.y + 20);
                    },
                    
                    update: function() {
                        // updates returns true.
                        return true;
                    }
                })));
                
                
        },
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            // on destroy, set input and register to hidden.
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("register").style.visibility = "hidden";      
	}
});






