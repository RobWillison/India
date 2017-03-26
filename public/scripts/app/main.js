Vue.component('menuitem', {

	props: ['item', 'show', 'page', 'activecolor'],


	template: "#menuitem",

	methods: {
		onHover: function(event)
		{
			this.activecolor = this.item.color
		},
		onUnHover: function(event)
		{
			this.activecolor = '#ebf3f4'
		},
		onClick: function(event)
		{
			history.pushState({page: this.item.name}, this.item.name, '.');
			this.page.name = this.item.name;
			console.log(this.item.name)
		}
	}

});

Vue.component('page', {

	props: ['item', 'show'],

	template: "#page",

});

Vue.component('confettie', {

	props: ['data'],

	template: "#confettie",

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
			color: '#ee1f61',
			srcNormal: '',
			srcHover: '',
			wasLastPage: false,
			workPieces: [],
			hover: false
		},

		about: {
			name: '',
			color: '#eec01f',
			srcNormal: '',
			srcHover: '',
			wasLastPage: false,
			content: "",
			hover: false
		},

		contact: {
			name: '',
			color: '#33b6d7',
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
		},
		confettiedata: {
			pieces: []
		}
	},

	created: function () {
	    this.fetchData()
			this.positionConfettie(30)
			var self = this
			setInterval(function(){ self.moveConfettie(self); }, 100)
	},

	methods: {
		positionConfettie: function(numberOf){
			for (var i = 0; i < numberOf; i++) {
				side = Math.floor(Math.random() * 4)
				var b = {};
				b.number = Math.floor(Math.random() * 9) + 1;
				b.angle = Math.floor(Math.random() * 360);

				if (side == 0) {
					b.top = Math.floor(Math.random() * 5);
					b.left = Math.floor(Math.random() * 98);
				} else if (side == 1) {
					b.top = Math.floor(Math.random() * 5) + 90;
					b.left = Math.floor(Math.random() * 98);
				} else if (side == 2) {
					b.top = Math.floor(Math.random() * 95);
					b.left = Math.floor(Math.random() * 10);
				} else if (side == 3) {
					b.top = Math.floor(Math.random() * 95);
					b.left = Math.floor(Math.random() * 10) + 88;
				}
				b.angularFreq = Math.floor(Math.random() * 5);
				b.amplitude = 0.5;
				b.speed = Math.random();
				this.confettiedata.pieces.push(b);
			}
		},
		moveConfettie: function(self){
			for (var i = 0; i < self.confettiedata.pieces.length; i++) {
				var y = self.confettiedata.pieces[i].top + 0.5;
				self.confettiedata.pieces[i].left = self.confettiedata.pieces[i].left + self.confettiedata.pieces[i].amplitude * Math.sin(self.confettiedata.pieces[i].angularFreq * y);

				self.confettiedata.pieces[i].top = y;
			}
		},
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
