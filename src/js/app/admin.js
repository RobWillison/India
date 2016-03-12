Vue.component('administerpage', {

	props: ['page'],

	template: "#administerpage",
});

var vue = new Vue({

	el:'#app',

	data: {
		work: {
			name: '',
			src: '',
			workPieces: []
		},

		about: {
			name: '',
			src: '',
			content: ""
		},

		contact: {
			name: '',
			src: '',
		},

		more: {
			name: '',
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
				url: 'src/app/fetchPages.php',
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
	}
})
