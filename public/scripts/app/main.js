Vue.component('menuitem', {

	props: ['item', 'show', 'page'],


	template: "#menuitem",

	methods: {
		onHover: function(event)
		{

			this.item.hover = true;
		},
		onUnHover: function(event)
		{
			this.item.hover = false;
		},
		onClick: function(event)
		{
			history.pushState({page: this.item.name}, this.item.name, '.');
			this.page.name = this.item.name;
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

	props: ['item', 'show'],

	template: "#page",

});

Vue.component('commentpage', {

	props: ['item', 'show'],

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

	props: ['item', 'show'],

	template: "#contactpage",

    methods: {
        sendMail: function() {
            email = this.$data.item.email;
            message = this.$data.item.message;

            $.ajax({
			    url : "email",
			    type: "POST",
			    data : {'email': email, 'body': message},
			    context: this,
			    success: function(data)
			    {

			    },
			});

			this.$data.item.email = '';
        	this.$data.item.message = '';
        	this.$data.item.onthispage = false;
        }
    }
});

Vue.component('workpage', {

	props: ['item', 'show'],

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
			wasLastPage: false,
			workPieces: [],
			hover: false
		},

		about: {
			name: '',
			srcNormal: '',
			srcHover: '',
			wasLastPage: false,
			content: "",
			hover: false
		},

		contact: {
			name: '',
			srcNormal: '',
			srcHover: '',
			wasLastPage: false,
			hover: false,
            email: '',
            message: ''
		},

		comment: {
			name: '',
			srcNormal: '',
			srcHover: '',
			wasLastPage: false,
			comments: [],
			hover: false,
			commentName: '',
			commentTest: ''
		},
		page: {
			name: getPageFromUrl()
		}
	},

	created: function () {
	    this.fetchData()
	},

	methods: {
		back: function(){
			this.page.name = 'home';
		},
		goToPage: function(page) {
			this.page.name = page;
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

					}
				});


	    }
	},

	computed: {
		onMainPage: function()
		{
			return this.page.name == 'home';
		},
		onAboutPage: function()
		{
			return (this.page.name == this.about.name);
		},
		onWorkPage: function()
		{
			return (this.page.name == this.work.name);
		},
		onContactPage: function()
		{
			return (this.page.name == this.contact.name);
		},
		onCommentPage: function()
		{
			return (this.page.name == this.comment.name);
		}
	}
});

function getPageFromUrl()
{
	var page = location.search.split('page=')[1]

	if(page == undefined)
	{
		page = 'home';
	}

	return page;
}

//Handle Back Buton
history.pushState({page: 'home'}, 'home page', '.');

window.addEventListener('popstate', function(event) {
		vue.goToPage(event.state.page);
});
