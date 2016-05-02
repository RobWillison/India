Vue.component('menuitem', {

	props: ['item', 'show'],


	template: "#menuitem",

	methods: {
		onHover: function(event)
		{

			this.item.hover = true;
		},
		onUnHover: function(event)
		{
			this.item.hover = false;
		}
	}

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

Vue.component('commentpage', {

	props: ['item'],

	template: "#commentpage",

	methods: {
        sendComment: function() {
            name = this.$data.item.commentName;
            comment = this.$data.item.commentText;

            $.ajax({
			    url : "comment/add",
			    type: "POST",
			    data : {'name': name, 'comment': comment},
			    context: this,
			    success: function(data)
			    {			        
		            this.$parent.$root.fetchData();
			    },
			});

			this.$data.item.commentText = '';
        	this.$data.item.commentName = '';
        }
    }
});

Vue.component('contactpage', {

	props: ['item'],

	template: "#contactpage",

    methods: {
        sendMail: function() {
            email = this.$data.item.email;
            message = this.$data.item.message;
        }
    }
});

Vue.component('workpage', {

	props: ['item'],

	template: "#workpage",

	methods: {
		onHover: function(item, event)
		{
			item.hover = true;
		},
		onUnHover: function(item, event)
		{
			item.hover = false;
		}
	}
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
			srcNormal: '',
			srcHover: '',
			onthispage: false,
			wasLastPage: false,
			workPieces: [],
			hover: false
		},

		about: {
			name: '',
			srcNormal: '',
			srcHover: '',
			onthispage: false,
			wasLastPage: false,
			content: "",
			hover: false
		},

		contact: {
			name: '',
			srcNormal: '',
			srcHover: '',
			onthispage: false,
			wasLastPage: false,
			hover: false,
            email: '',
            message: ''
		},

		comment: {
			name: '',
			srcNormal: '',
			srcHover: '',
			onthispage: false,
			wasLastPage: false,
			comments: [],
			hover: false,
			commentName: '',
			commentTest: ''
		},
	},

	created: function () {
	    this.fetchData()
	},

	methods: {
		back: function() {
			if (this.comment.onthispage || this.contact.onthispage || this.about.onthispage || this.work.onthispage) {
				this.comment.onthispage = false;
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
				  url: 'comment/0',
				  context: this,
				  success: function (data) {
				  		this.comment.comments = data
				  }
				});

				$.ajax({
				dataType: "json",
				url: 'page/all',
				context: this,
				success: function (data) {
							this.work.name = data[1]['title']
							this.work.srcNormal = data[1]['src'] + '-normal.png'
							this.work.srcHover = data[1]['src'] + '-hover.png'

							this.about.name = data[2]['title']
							this.about.srcNormal = data[2]['src'] + '-normal.png'
							this.about.srcHover = data[2]['src'] + '-hover.png'
							this.about.content = data[2]['content']

							this.comment.name = data[3]['title']
							this.comment.srcNormal = data[3]['src'] + '-normal.png'
							this.comment.srcHover = data[3]['src'] + '-hover.png'

							this.contact.name = data[4]['title']
							this.contact.srcNormal = data[4]['src'] + '-normal.png'
							this.contact.srcHover = data[4]['src'] + '-hover.png'

							var page = location.search.split('page=')[1]

							if (page == 'work') {
								this.work.onthispage = true;
							}

					}
				});

				
	    }
	},

	computed: {
		onMainPage: function()
		{
			return !(this.about.onthispage || this.work.onthispage || this.contact.onthispage || this.comment.onthispage);
		}
	}
});

//Handle Back Buton
history.pushState(null, null, '.');

window.addEventListener('popstate', function(event) {
		vue.back();
});
