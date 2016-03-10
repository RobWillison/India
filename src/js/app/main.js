Vue.component('menuitem', {

	props: ['item', 'show'],


	template: "#menuitem",
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

Vue.transition('rotateOffLeft', {
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
			name: 'WORK',
			src: 'img/india1.jpg',
			onthispage: false,
			wasLastPage: false,
			workPieces: []
		},

		about: {
			name: 'ABOUT',
			src: 'img/india2.jpg',
			onthispage: false,
			wasLastPage: false,
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		contact: {
			name: 'CONTACT',
			src: 'img/india3.jpg',
			onthispage: false,
			wasLastPage: false,
		},

		more: {
			name: 'MORE',
			src: 'img/india4.jpg',
			onthispage: false,
			wasLastPage: false,
			content: "Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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

				history.pushState(null, null, 'home');
			}
		},

		submitContactForm: function() {

		},

		fetchData: function () {
		      $.ajax({
				  dataType: "json",
				  url: 'src/app/fetchWork.php',
				  context: this,
				  success: function (data) {
				  		this.work.workPieces = data
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
history.pushState(null, null, 'home');

window.addEventListener('popstate', function(event) {
		vue.back();
});
