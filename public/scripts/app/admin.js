Vue.component('administerpage', {

	props: ['page'],

	template: "#administerpage",
});

var vue = new Vue({

	el:'#app',

	data: {
		work: {
			name: '',
			id: 0,
			src: '',
			workPieces: []
		},

		about: {
			name: '',
			id: 0,
			src: '',
			content: ""
		},

		contact: {
			name: '',
			id: 0,
			src: '',
		},

		more: {
			name: '',
			id: 0,
			src: '',
			content: ""
		},
	},

	created: function () {
	    this.fetchData()
	},

	methods: {

		fetchData: function () {
				$.ajax({
				dataType: "json",
				url: 'page/all',
				context: this,
				success: function (data) {
							this.work.name = data[1]['title']
							this.work.id = data[1]['id']
							this.work.src = data[1]['src']

							this.about.name = data[2]['title']
							this.about.id = data[1]['id']
							this.about.src = data[2]['src']
							this.about.content = data[2]['content']

							this.more.name = data[3]['title']
							this.more.id = data[1]['id']
							this.more.src = data[3]['src']
							this.more.content = data[3]['content']

							this.contact.name = data[4]['title']
							this.contact.id = data[1]['id']
							this.contact.src = data[4]['src']

					}
				});
	    }
	}
})
