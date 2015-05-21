game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
        
	onResetEvent: function() {
            // on reset, change screen to load-screen.
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("load-screen")), -10);
                // set input and load to visible.
                document.getElementById("input").style.visibility = "visible";
                document.getElementById("load").style.visibility = "visible";
                // unbinds ability keys.
                me.input.unbindKey(me.input.KEY.A);
                me.input.unbindKey(me.input.KEY.S);
                me.input.unbindKey(me.input.KEY.D);
                me.input.unbindKey(me.input.KEY.F);
                me.input.unbindKey(me.input.KEY.B);
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function() {
                        // sets font and text for load screen.
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        this.font = new me.Font('Times New Roman', 26, 'white');
                    },
                    
                    draw: function(renderer) {
                        // draws text below.
                        this.font.draw(renderer.getContext(), "Enter Your USERNAME And PASSWORD.", this.pos.x, this.pos.y + 20);
                    },
                    
                    update: function() {
                        // returns updates as true.
                        return true;
                    }
                })));
                
                
        },
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            // on destroy, sets input and load to hidden.
               document.getElementById("input").style.visibility = "hidden";
               document.getElementById("load").style.visibility = "hidden";
	}
});








