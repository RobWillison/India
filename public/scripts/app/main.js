Vue.component('menuitem', {

	props: ['item', 'show'],


	template: "#menuitem",
});

Vue.component('menuitemsmallleft', {

	props: ['image', 'link', 'show'],


	template: "#menuitemsmallleft",
});

Vue.component('menuitemsmallright', {

	props: ['image', 'link', 'show'],


	template: "#menuitemsmallright",
});

Vue.component('page', {

	props: ['item'],

	template: "#page",
});

Vue.component('contactpage', {

	props: ['item'],

	template: "#contactpage",
});

Vue.component('workpage', {

	props: ['item'],

	template: "#workpage",
});

Vue.transition('rotateOff', {
	css: false,
	leave: function(el, done){
		$(el).removeClass('rollenterleft');
		$(el).removeClass('rollenterright');


		if (this.$data.item.onthispage) {
			this.$data.item.wasLastPage = true;

			$(el).addClass('rollleaveleft');

		} else {
			$(el).addClass('rollleaveright');
		}
	},

	enter: function(el, done){

		$(el).removeClass('rollleaveleft');
		$(el).removeClass('rollleaveright');

		if (this.$data.item.wasLastPage) {
			this.$data.item.wasLastPage = false;
			$(el).addClass('rollenterleft');

		} else {
			$(el).addClass('rollenterright');
		}
	},
});

Vue.transition('rotateOffLeft', {
	css: false,
	leave: function(el, done){
		$(el).removeClass('rollenterleft');

		$(el).addClass('rollleaveleft');
	},

	enter: function(el, done){
		$(el).removeClass('rollleaveleft');

		$(el).addClass('rollenterleft');
	},
});

Vue.transition('rotateOffRight', {
	css: false,
	leave: function(el, done){
		$(el).removeClass('rollenterright');

		$(el).addClass('rollleaveright');
	},

	enter: function(el, done){
		$(el).removeClass('rollleaveright');

		$(el).addClass('rollenterright');
	},
});


Vue.transition('slideup', {
	css: false,
	leave: function(el, done){
		$(el).removeClass('slideInUp');
		$(el).addClass('slideOutDown');
		setTimeout(done, 2000, true);
	},

	enter: function(el, done){
		$(el).removeClass('slideOutDown');
		$(el).addClass('slideInUp');
		slideUp(el)
	},
});

Vue.transition('fade', {
	css: false,
	leave: function(el, done){
			$(el).removeClass('fadeIn');
			$(el).addClass('fadeOut');
	},

	enter: function(el, done){
			$(el).removeClass('fadeOut');
			$(el).addClass('fadeIn');
	},
});

var vue = new Vue({

	el:'#app',

	data: {
		work: {
			name: '',
			src: '',
			onthispage: false,
			wasLastPage: false,
			workPieces: []
		},

		about: {
			name: '',
			src: '',
			onthispage: false,
			wasLastPage: false,
			content: ""
		},

		contact: {
			name: '',
			src: '',
			onthispage: false,
			wasLastPage: false,
		},

		more: {
			name: '',
			src: '',
			onthispage: false,
			wasLastPage: false,
			content: ""
		},
	},

	created: function () {
	    this.fetchData()
	},

	methods: {
		back: function() {
			if (this.more.onthispage || this.contact.onthispage || this.about.onthispage || this.work.onthispage) {
				this.more.onthispage = false;
				this.contact.onthispage = false;
				this.about.onthispage = false;
				this.work.onthispage = false;

				history.pushState(null, null, '.');
			}
		},

		submitContactForm: function() {

		},

		fetchData: function () {
		      $.ajax({
				  dataType: "json",
				  url: 'work',
				  context: this,
				  success: function (data) {
				  		this.work.workPieces = data
				  }
				});

				$.ajax({
				dataType: "json",
				url: 'page/all',
				context: this,
				success: function (data) {
							this.work.name = data[1]['title']
							this.work.src = data[1]['src']

							this.about.name = data[2]['title']
							this.about.src = data[2]['src']
							this.about.content = data[2]['content']

							this.more.name = data[3]['title']
							this.more.src = data[3]['src']
							this.more.content = data[3]['content']

							this.contact.name = data[4]['title']
							this.contact.src = data[4]['src']

					}
				});
	    }
	},

	computed: {
		onMainPage: function()
		{
			return !(this.about.onthispage || this.work.onthispage || this.contact.onthispage || this.more.onthispage);
		}
	}
})

//Handle Back Buton
history.pushState(null, null, '.');

window.addEventListener('popstate', function(event) {
		vue.back();
});
