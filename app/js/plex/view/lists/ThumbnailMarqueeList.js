define(
	[
		'text!templates/lists/ThumbnailMarqueeList.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/items/ThumbnailMarqueeListItem',

		// Globals
		'use!backbone',
		'use!handlebars',
	],

	function (template, appModel, BaseView, ThumbnailMarqueeListItem) {

		var template = Handlebars.compile(template)

		var ThumbnailMarqueeList = BaseView.extend({

			//
			// -------------------- Declarations --------------------
			//

			tagName: 'div',
			className: 'thumbnail-marquee-list',

			numVisibleItems: 5,
			speed: 1.5,
			index: 0,
			loop: false,
			running: false,
			animating: false,

			$list: undefined,

			loaded: false,
			loadedThumbnails: 0,

			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				this.numVisibleItems = this.options.numVisibleItems ? this.options.numVisibleItems : 5;
				this.speed = this.options.speed ? this.options.speed : 1;

				this.index = this.numVisibleItems;

				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);

				_.bindAll(this,	'onThumbnailLoaded', 
								'onNextThumbnailLoaded',
								'onAnimateComplete');
			},
			
			render: function () {
				this.$el.html(template());
				this.$list = this.$('ul');

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			//
			// -------------------- Control --------------------
			//

			start: function () {
				if (this.loaded && !this.running) {
					this.running = true;

					if (!this.animating) {
						this.addNextThumb();
					}
				}
			},

			stop: function () {
				this.running = false;
			},

			addNextThumb: function () {
				var item;

				if (this.index > this.collection.length - 1) {
					this.index = 0;
				}

				item = new ThumbnailMarqueeListItem({ model: this.collection.at(this.index) });
				item.on('thumbnailLoaded', this.onNextThumbnailLoaded);

				// Register the view so it will be cleaned up on destroy
				this.registerView(item.render());
			},

			itemWidth: function(item) {
				var $item = $(item);

				return 	parseInt($item.css('width')) +
						parseInt($item.css('marginLeft')) +
						parseInt($item.css('marginRight'));
			},

			//
			// -------------------- Listeners --------------------
			//

			onAdd: function (thumbnail) {
				var item = new ThumbnailMarqueeListItem({ model: thumbnail });
				item.on('thumbnailLoaded', this.onThumbnailLoaded);

				// Register the view so it will be cleaned up on destroy
				this.registerView(item);
				
				this.$list.append(item.render().el);				
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				if (this.collection.length > 0) {
					this.$el.css('opacity', 0);

					this.loaded = false;
					this.loadedThumbnails = 0;

					for (var i = 0; i < this.collection.length; i++) {
						if (i < this.numVisibleItems) {
							this.onAdd(this.collection.at(i));
						}
					}
				}
			},

			onThumbnailLoaded: function (item) {
				item.off('thumbnailLoaded', this.onThumbnailLoaded);

				this.loadedThumbnails++;

				if (this.loadedThumbnails === this.numVisibleItems) {
					this.$el.addClass('animated fadeIn');

					this.loaded = true;
				}
			},

			onNextThumbnailLoaded: function (item) {
				item.off('thumbnailLoaded', this.onThumbnailLoaded);

				this.$list.append(item.el);

				var self = this;
				var containerWidth = 0;
				var duration = this.speed * 1000;
				var $images = this.$list.find('img');

				this.index++;
				this.animating = true;

				$images.each(function () {
					containerWidth += self.itemWidth(this);
				});

				var marginLeft = this.itemWidth($images[$images.length - 1]);

				this.$el.css('width', containerWidth);
				this.$list.css({
					'width': containerWidth,
					'marginLeft': marginLeft
				});

				this.$list.animate(
					{
						'marginLeft': 0
					}, 
					duration,
					this.onAnimateComplete
				);

				this.$list.find('li:first-child img').fadeOut(duration);
				this.$list.find('li:last-child img').hide().fadeIn(duration);
			},

			onAnimateComplete: function (event) {
				var self = this;
				var containerWidth = 0;
				var $images = this.$list.find('img');

				this.animating = false;

				for (var i = 1 ; i < $images.length; i++) {
					containerWidth += self.itemWidth($images[i]);
				};

				this.removeView(this.views[0]);
				this.$el.css('width', containerWidth);
				this.$list.css('width', containerWidth);

				if (this.running) {
					this.addNextThumb();
				}
			}
		});

		return ThumbnailMarqueeList;
	}
);